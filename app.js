"use strict";

//shoutout to this post:
//https://stackoverflow.com/questions/42294827/webpack-vs-webpack-dev-server-vs-webpack-dev-middleware-vs-webpack-hot-middlewar

const fs = require("fs");

const express = require("express");

const webpackMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config.js");
const compiler = require("webpack")(webpackConfig);

const db = require("./util/db");

let app = express();

const PORT = 3000;
const HOST = "localhost";

app.use(express.static("static/html"));
app.use(express.static("static/css"));
app.use(express.static("build"));

//webpack-dev-middleware runs webpack in watch mode,
//so we still need to reload the page on file changes
app.use(webpackMiddleware(compiler, {
	"publicPath": webpackConfig.output.publicPath
}));

//however, with webpack-hot-middleware, we can now get
//hot reloading (no page reload needed)
app.use(require("webpack-hot-middleware")(compiler));

app.get("/key", (req, res) => {
	db.getKey(key => {
		res.type("text/plain");
		res.end(key);
	});
});

app.listen(PORT, HOST, () => {
	console.log(`app listening on ${HOST}:${PORT}`);
});

