"use strict";
/*
 * These functions are made to be usable in the browser
 * */

const 	$ = require("jquery"),
		firebase = require("firebase/app"),
		firestore = require("firebase/firestore");

let db = null;

//returns a Promise that will contain the
//reference to the db
function init(cb) {
	if (db !== null) {
		return Promise.resolve(db);
	};
	
	return $.ajax("/key", {
		contentType: "text/plain",
		dataType: "text"
	})
	.then(data => {
		console.log("creating new db ref");
		firebase.initializeApp({
			apiKey: data,
			authDomain: "webtasks-78c6d.firebaseapp.com",
			databaseURL: "https://webtasks-78c6d.firebaseio.com",
			projectId: "webtasks-78c6d",
			storageBucket: "webtasks-78c6d.appspot.com",
			messagingSenderId: "946774295302"
		});
		let dbRef = firebase.firestore();
		dbRef.settings({
			timestampsInSnapshots: true
		});
		
		return db = dbRef;
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

function getTasks(db) {
	let taskCol = db.collection("tasks");
	
	return taskCol.get().then(snapshot => {
		let tasks = [];
		snapshot.forEach(doc => {
			console.log(`${doc.id}: ${doc.data()}`);
			tasks.push(doc.data());
		});
		return tasks;
	}).catch(err => {
		console.log(`err getting docs ${err}`);
	});
}

function addTask(db, task) {
	console.log(`got task ${JSON.stringify(task)}`);
	db.collection("tasks").add(task)
		.then(docRef => {
			console.log(`added task ${docRef}`);
		})
		.catch(err => {
			console.log(`err adding task ${err}`);
		});
}

module.exports = {
	init,
	test,
	getTasks,
	addTask
};

