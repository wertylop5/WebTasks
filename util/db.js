"use strict";

const	firebase = require("firebase/app"),
	firestore = require("firebase/firestore");

const fs = require("fs");

let db;

function init() {
	let key = "";
	
	let keyStream = fs.createReadStream("firebaseKey.txt");
	keyStream.on("data", chunk => {
		key += chunk;
	});

	keyStream.on("end", () => {
		firebase.initializeApp({
			apiKey: key,
			authDomain: "webtasks-78c6d.firebaseapp.com",
			databaseURL: "https://webtasks-78c6d.firebaseio.com",
			projectId: "webtasks-78c6d",
			storageBucket: "webtasks-78c6d.appspot.com",
			messagingSenderId: "946774295302"
		});

		db = firebase.firestore();
	});
	db.collection("test").add({
		um: 67
	})
	.then(docRef => {
		console.log(`document ${docRef} added`);
	})
	.error(err => {
		console.log(`error ${err}`);
	});
}

module.exports = {
	init
};

