const mongoose = require('mongoose');
const mongodb = 'mongodb://localhost:27017/todos';

mongoose.connect(mongodb, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

var Schema = mongoose.Schema;

//task schema
var taskSchema = new Schema({
	task:{
		type:String,
		min:3,
		max:255,
		required: true
	}
});

//task model
var Task = mongoose.model('task', taskSchema);

//insert task method
var insertTask = function(task){
	task.save(function(err){
		if(err) throw err;
		console.log('task saved');
	});
};
module.exports.Task = Task;
module.exports.insertTask = insertTask;
	
