let mongoose = require('mongoose');

let mongoDB = 'mongodb://localhost:27017/todos';

mongoose.connect(mongoDB, {useNewUrlParser:true});
let db = mongoose.connection;

//connection opened
db.on('open', function(){
    console.log('connection established*... dbConfig');
})

//connection failed
db.on('error', console.error.bind(console, 'MongoDB connection error'));

module.exports = db;