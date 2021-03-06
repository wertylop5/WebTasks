"use strict";

require("bootstrap");

const React = require("react");
const ReactDOM = require("react-dom");
const { hot } = require("react-hot-loader");

const weightCalc = require("./util/weightCalc");
const dbStatic = require("./util/dbStatic");

//only used on startup, do not use
let db;

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
			tasks: [],
			curTaskKey: 0,
			curDesc: "",	//current string in DescriptionEntry
			totTime: 10
		};
		
		this.acquireTasks = this.acquireTasks.bind(this);
		this.addTask = this.addTask.bind(this);
		this.updateDesc = this.updateDesc.bind(this);
		this.updateTime = this.updateTime.bind(this);
	}
	
	render() {
		return <div>
			<TaskForm addTask={this.addTask}
				updateDesc={this.updateDesc}
				updateTime={this.updateTime}
				descValue={this.state.curDesc}
				timeValue={this.state.totTime}
			/>
			<TaskList tasks={this.state.tasks}/>
		</div>;
	}

	//called after render()
	//make network requests here
	componentDidMount() {
		dbStatic.init().then(dbRef => {
			//convenient place to put it?
			this.dbRef = dbRef;
			
			this.acquireTasks()
				.then(tasks => {
					console.log(
						`initial curTaskKey: ${tasks.length}`);
					this.setState({
						tasks,
						curTaskKey: tasks.length
					});
				});
		});
	}

	//requests all tasks in the db
	acquireTasks() {
		return dbStatic.getTasks(this.dbRef)
			.then(tasks => {
				console.log("tasks received");
				console.log(`length ${tasks.length}`);
				tasks.forEach(task => {
					console.log(task);
				});
				
				this.calcTime(tasks,
					this.state.totTime);
				return tasks;
			});
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

	//adds the task to our local list and uploads it to
	//the db
	addTask(type) {
		this.setState((prevState, props) => {
			//if no task description was entered
			if (prevState.curDesc === "") {
				return null;
			}
			
			let curKey = prevState.curTaskKey;

			let newTask = {
					key: curKey,
					desc: prevState.curDesc,
					type
				};

			dbStatic.addTask(this.dbRef, newTask);
			
			let newTasks = [
				//access all the elements in the array
				...prevState.tasks,
				newTask
			];
			this.calcTime(newTasks, this.state.totTime);
			
			//don't call update function (ex: setState)
			//inside another update function
			return {
				tasks: newTasks,
				curTaskKey: curKey+1,
				curDesc: ""
			};
		});
	}

	updateDesc(desc) {
		this.setState({curDesc: desc});
	}

	updateTime(time) {
		this.setState((prevState, props) => {
			this.calcTime(prevState.tasks, time);
			
			return {
				tasks: prevState.tasks,
				totTime: time
			};
		});
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
			<TypeButton type="study" addTask={this.props.addTask}/>
			<TypeButton type="break" addTask={this.props.addTask}/>
		</div>;
	}
}

class TimeEntry extends React.Component {
	constructor(props) {
		super(props);

		this.changeTime = this.changeTime.bind(this);
	}

	changeTime(e) {
		this.props.updateTime(e.target.value);
	}
	
	render() {
		return <label>Total time
			<input type="number"
				onChange={this.changeTime}
				value={this.props.timeValue}
			/>
		</label>
	}
}

class DescriptionEntry extends React.Component {
	constructor(props) {
		super(props);
		
		this.changeDesc = this.changeDesc.bind(this);
	}

	changeDesc(e) {
		this.props.updateDesc(e.target.value);
	}
	
	render() {
		return <div>
			<label>Task Description
				<input id="taskDesc" type="text"
					onChange={this.changeDesc}
					value={this.props.descValue}
				/>
			</label>
		</div>;
	}
}

class TaskForm extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return <div>
			<DescriptionEntry descValue={this.props.descValue} updateDesc={this.props.updateDesc}/>
			<TimeEntry timeValue={this.props.timeValue} updateTime={this.props.updateTime}/>
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

