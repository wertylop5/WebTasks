"use strict";

require("bootstrap");

const React = require("react");
const ReactDOM = require("react-dom");
const { hot } = require("react-hot-loader");

const weightCalc = require("../util/weightCalc");

/*
 * A task should be formatted as:
 * {
 * 	desc: <string>,
 * 	type: <string>
 * }
*/

class TaskApp extends React.Component {
	//TaskForm will pass new tasks here
	//TaskList will acquire the tasks via props
	constructor(props) {
		super(props);

		this.state = {
			tasks: this.acquireTasks(),
			curTaskKey: 0
		}
		this.acquireTasks = this.acquireTasks.bind(this);
		this.addTask = this.addTask.bind(this);
	}
	
	render() {
		return <div>
			<TaskForm addTask={this.addTask}/>
			<TaskList tasks={this.state.tasks}/>
		</div>;
	}

	acquireTasks() {
		let taskList = [
			{
				key: 0,
				desc: "Study chem",
				type: "study"
			},
			{
				key: 1,
				desc: "Study calc",
				type: "study"
			},
			{
				key: 2,
				desc: "sleep",
				type: "sleep"
			}
		];
		this.setState({curTaskKey: 3});
		this.calcTime(taskList, 10);
		return taskList;
	}

	//modifies tasks to add a time property
	calcTime(tasks, totTime) {
		let weights = [];
		for (let t of tasks) {
			weights.push(weightCalc.getWeight(t));
		}

		let factor = totTime / weights.reduce((tot, curVal) => tot+curVal);
		for (let x = 0; x < tasks.length; x++) {
			tasks[x]["time"] = weights[x]*factor;
		}
	}

	addTask(desc, type) {
		this.setState((prevState, props) => {
			return {tasks: [
				//access all the elements in the array
				...prevState.tasks,
				
				{key: 3, desc: "yum", type: "break", time: 1}
			]};
		});
	}
}

class TypeButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <button
			type="button"
			className="btn btn-primary"
			onClick={this.props.addTask}>{this.props.type}</button>
	}
}

class TypeButtonRow extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return <div>
			<TypeButton type="Test" addTask={this.props.addTask}/>
		</div>;
	}
}

class DescriptionEntry extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			text: ""
		};
	}
	
	render() {
		return <textarea></textarea>;
	}
}

class TaskForm extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return <div>
			<DescriptionEntry />
			<TypeButtonRow addTask={this.props.addTask}/>
		</div>;
	}
}

class Task extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return <li>
		<div>
			<p>{this.props.desc}</p>
			<p>{this.props.time}</p>
		</div>
		</li>;
	}
}

class TaskList extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return <div>
		<h1>Tasks</h1>
		<ul>
			{this.props.tasks.map(elem => {
				return <Task key={elem.key} type={elem.type}
					desc={elem.desc} time={elem.time} />;
			})}
		</ul>
		</div>;
	}
}

ReactDOM.render(<TaskApp />, document.getElementById("root"));

//notifies this module that it can be hot reloaded
module.exports = hot(module)(TaskApp)

