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
			tasks: this.acquireTasks()
		}
	}
	
	render() {
		return <div>
			<TaskForm />
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
				desc: "sleep",
				type: "sleep"
			}
		];
		return taskList;
	}

	//modifies tasks to add a time property
	calcTime(tasks, totTime) {
		let weights = [];
		for (let t of tasks) {
			weights.push(weightCalc.getWeight(t));
		}

		let factor = totTime / weights.reduce((tot, curVal) => tot+curVal);
		for (let x = 0; x < tasks.length(); x++) {
			tasks[x]["time"] = weights[x]*factor;
		}
	}
}

class TypeButton extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <p>{this.props.type}</p>
	}
}

class TypeButtonRow extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return <div>
			<TypeButton type="Test"/>
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
			<TypeButtonRow />
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
			<br />
			<p>{this.props.time}</p>
			<br />
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

