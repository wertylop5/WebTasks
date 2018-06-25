"use strict";
const express = require("express");

let app = express();

const PORT = 3000;
const HOST = "localhost";

app.use(express.static("static/html"));
app.use(express.static("build/static/js"));

app.listen(PORT, HOST, () => {
	console.log("express");
	console.log(`app listening on ${HOST}:${PORT}`);
});

