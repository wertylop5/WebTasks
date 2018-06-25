"use strict";

const express = require("express");

let app = express();
app.use(express.static("static/html"));
/*
app.use((res, req, next) => {
	console.log("middle");
	//next();
});
*/

app.get("/", (req, res) => {
	console.log("uhh");
	//res.send("Hello");
	
	//won't work
	//res.render("static/html/index.html");
});

app.listen(3000, () => {
	console.log("Hi");
});

