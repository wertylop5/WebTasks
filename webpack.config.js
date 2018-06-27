/*
 * This is used to bundle the modules used in the nodejs code so that
 * the code can be run in a browser.
 *
 * Before it does that, it will transpile (convert) JSX code into standard
 * javascript.
 * */

const path = require("path");
const webpack = require("webpack");

module.exports = {
	"mode": "development",
	
	//where to look for input files
	"context": path.resolve(__dirname, "static/js/"),
	
	//file we want to build
	"entry": [
		"./index.react.js",
		"react-hot-loader/patch",
		"webpack-hot-middleware/client"
	],
	"output": {
		"filename": "[id].bundle.js",
		"path": path.resolve(__dirname, "build/static/js"),

		//required for hot reload
		"publicPath": "http://localhost:3000/static/js"
	},
	"module": {
		"rules": [
			//We want to convert JSX code first
			{
				//a shortcut is just to use "test": regex
				//and "exclude": string
				"resource": {
					"test": /\.react\.js$/,
					"exclude": path.resolve(__dirname, "node_modules")
				},
				"use": [
					//a UseEntry
					{
						"loader": "babel-loader",
						"options": {
							//use babelrc file
							"babelrc": true
						}
					}
				]
			}
		]
	},
	"plugins": [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
};

