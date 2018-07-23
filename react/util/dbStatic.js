"use strict";
/*
 * These functions are made to be usable in the browser
 * */

const 	$ = require("jquery"),
		firebase = require("firebase/app"),
		firestore = require("firebase/firestore");

//returns a reference to the firebase db
function init(cb) {
	return $.ajax("/key", {
		contentType: "text/plain",
		dataType: "text"
	})
	.then(data => {
		firebase.initializeApp({
			apiKey: data,
			authDomain: "webtasks-78c6d.firebaseapp.com",
			databaseURL: "https://webtasks-78c6d.firebaseio.com",
			projectId: "webtasks-78c6d",
			storageBucket: "webtasks-78c6d.appspot.com",
			messagingSenderId: "946774295302"
		});
		let db = firebase.firestore();
		db.settings({
			timestampsInSnapshots: true
		});
		
		return db;
	});
}

function test(db) {
	db.collection("test").add({
		um: 56
	})
	.then(docRef => {
		console.log(`added doc ${docRef}`);
	})
	.catch(err => {
		console.log(`err ${err}`);
	});
}

module.exports = {
	init,
	test
};

