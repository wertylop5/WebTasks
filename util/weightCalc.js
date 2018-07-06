"use strict";

let task_types = {
	"study": 3,
	"sleep": 2,
	"break": 1
}

function getWeight(task) {
	if (!(task.type in task_types)) {
		return 0;
	}
	return task_types[task.type];
}

exports.getWeight = getWeight;

