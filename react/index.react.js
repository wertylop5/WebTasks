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

		let tasks = this.acquireTasks();
		this.state = {
			tasks,
			curTaskKey: tasks.length,
			curDesc: ""	//current string in DescriptionEntry
		};
		
		this.acquireTasks = this.acquireTasks.bind(this);
		this.addTask = this.addTask.bind(this);
		this.updateDesc = this.updateDesc.bind(this);
	}
	
	render() {
		return <div>
			<TaskForm addTask={this.addTask} updateDesc={this.updateDesc}/>
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
		//this.setState({curTaskKey: 3});
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

	addTask(type) {
		this.setState((prevState, props) => {
			let curKey = prevState.curTaskKey;
			let newTasks = [
				//access all the elements in the array
				...prevState.tasks,
				{
					key: curKey,
					desc: prevState.curDesc,
					type
				}
			];
			this.calcTime(newTasks, 10);
			
			return {
				tasks: newTasks,
				curTaskKey: curKey+1
			};
		});
	}

	updateDesc(desc) {
		this.setState({curDesc: desc});
	}
}

class TypeButton extends React.Component {
	constructor(props) {
		super(props);
		
		this.createTask = this.createTask.bind(this);
	}

	createTask(e) {
		this.props.addTask(this.props.type);
	}

	render() {
		return <button
			type="button"
			className="btn btn-primary"
			onClick={this.createTask}>{this.props.type}</button>
	}
}

class TypeButtonRow extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return <div>
			<TypeButton type="sleep" addTask={this.props.addTask}/>
		</div>;
	}
}

class DescriptionEntry extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			text: ""
		};
		this.changeDesc = this.changeDesc.bind(this);
	}

	changeDesc(e) {
		this.props.updateDesc(e.target.value);
	}
	
	render() {
		return <textarea onChange={this.changeDesc}></textarea>;
	}
}

class TaskForm extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return <div>
			<DescriptionEntry updateDesc={this.props.updateDesc}/>
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

