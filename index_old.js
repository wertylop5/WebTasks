"use strict";
//doesn't really handle files correctly
const http = require("http");
const fs = require("fs");

const PORT = 3000;
const HOST = "localhost";
const HTML_DIR = "static/html"
const JS_DIR = "static/js"

let server = http.createServer();

server.on("request", (req, res) => {
	let reqUrl = new URL(req.url, `http://${HOST}:${PORT}`);
	console.log(reqUrl);

	let file;
	if (reqUrl.pathname.endsWith(".js")) {
		file = fs.createReadStream(`${JS_DIR}/index.js`);
		
		res.setHeader("Content-Type", "application/javascript");
	}
	else {
		file = fs.createReadStream(`${HTML_DIR}/index.html`);
		
		res.setHeader("Content-Type", "text/html");
	}
	
	let data = "";
	file.on("data", chunk => {
		console.log(`received chunk: ${chunk}`);
		
		data += chunk;
	});
	file.on("end", () => {
		console.log(`final data: ${data}`);
		
		res.write(data);
		res.end();
	});
});

server.on("listening", () => {
	let addr = server.address();
	console.log(`server listening on ${addr.address}:${addr.port}`);
});

server.listen(PORT, HOST);

