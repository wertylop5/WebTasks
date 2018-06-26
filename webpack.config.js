/*
 * This is used to bundle the modules used in the nodejs code so that
 * the code can be run in a browser.
 *
 * Before it does that, it will transpile (convert) JSX code into standard
 * javascript.
 * */

const path = require("path");

module.exports = {
	"mode": "development",
	
	//where to look for input files
	"context": path.resolve(__dirname, "static/js/"),
	
	//file we want to build
	"entry": "./index.js",
	"output": {
		"filename": "[id].bundle.js",
		"path": path.resolve(__dirname, "build/static/js")
	},
	"module": {
		"rules": [
			//We want to convert JSX code first
			{
				//a shortcut is just to use "test": regex
				"resource": {
					"test": /\.js$/
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
	}
};

