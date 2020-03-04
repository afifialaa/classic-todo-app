const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//task schema
const TaskSchema = new Schema({
	task:{
		type:String,
		min:3,
		max:255,
		required: true
	}
});

//task model
const Task = mongoose.model('task', TaskSchema);

module.exports = Task;
	
