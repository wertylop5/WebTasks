"use strict";

require("bootstrap");

const React = require("react");
const ReactDOM = require("react-dom");
const { hot } = require("react-hot-loader");

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
		return [
			{
				key: 0,
				desc: "Study chem",
				time: "3 hr"
			},
			{
				key: 1,
				desc: "sleep",
				time: "8 hr"
			}
		]
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
				return <Task key={elem.key}
					desc={elem.desc} time={elem.time} />;
			})}
		</ul>
		</div>;
	}
}

ReactDOM.render(<TaskApp />, document.getElementById("root"));

//notifies this module that it can be hot reloaded
module.exports = hot(module)(TaskApp)

