"use strict";

const	firebase = require("firebase/app"),
	firestore = require("firebase/firestore");

const fs = require("fs");
const path = require("path");

const KEY_DIR = "./util";
const KEY_FILE = "firebaseKey.txt";

let db = null;

function getKey(cb) {
	let key = "";
	
	let keyStream = fs.createReadStream(
		path.join(KEY_DIR, KEY_FILE)
	);
	keyStream.on("data", chunk => {
		key += chunk;
	});

	keyStream.on("end", () => {
		cb(key);
	});
}

module.exports = {
	getKey
};

