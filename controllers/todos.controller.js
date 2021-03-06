const Task = require('../models/task.model');

//fetch tasks from db
function getTasks(req, res){

    console.log('getting tasks');

    let tasks = [
        "task1",
        "task2",
        "task2",
        "task2",
        "task2",
        "task2"
    ]

    Task.find({}, (err, tasks)=>{
        if(err) console.log(err);

        console.log(tasks);
        // Send tasks with response
        res.json(tasks);
    })

}

function index(req, res){
    res.render('pages/todos.html');
}

function addTask(req, res){
    let body = {
        task:req.body.task
    }

    // Insert task in database
    let task = new Task(body);

    task.save((err, task)=>{
        if(err) console.log(err);

        console.log('task was added to database');
        res.json({'msg': 'task was added'});
    });
}

// Delete task controller
function deleteTask(req, res){
	console.log('hitting delete task endpoint');
	let body = {
		task: req.body.task
	}

	console.log('task is: ' + body.task);

	Task.deleteOne({task: body.task}, function(err){
		if(err) console.log(err);

		console.log('task was delelted');
	})

	res.send();
}

module.exports = {
    	getTasks,
    	addTask,
    	index,
	deleteTask
}
