"use strict";

const React = require("react");
const ReactDOM = require("react-dom");
const { hot } = require("react-hot-loader");

class App extends React.Component {
	render() {
		return <div>
			<h1>React!</h1>
			<h2>Another</h2>
			</div>;
	}
}

ReactDOM.render(<App />, document.getElementById("root"));

//notifies this module that it can be hot reloaded
module.exports = hot(module)(App)

