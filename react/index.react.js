"use strict";

const React = require("react");
const ReactDOM = require("react-dom");
const { hot } = require("react-hot-loader");

class TaskApp extends React.Component {
	render() {
		return <div>
			<TaskForm />
			<TaskList />
			</div>;
	}
}

class TypeButton extends React.Component {
	render() {
		return <p>This is a type button</p>
	}
}

class TypeButtonRow extends React.Component {
	render() {
		return <div>
			<TypeButton />
		</div>;
	}
}

class DescriptionEntry extends React.Component {
	render() {
		return <textarea></textarea>;
	}
}

class TaskForm extends React.Component {
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
		return <li>{this.props.desc}</li>;
	}
}

class TaskList extends React.Component {
	render() {
		return <div>
		<h1>Tasks</h1>
		<ul>
			<Task desc="study"/>
		</ul>
		</div>;
	}
}

ReactDOM.render(<TaskApp />, document.getElementById("root"));

//notifies this module that it can be hot reloaded
module.exports = hot(module)(App)

