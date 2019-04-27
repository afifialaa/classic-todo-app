var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/todos';
mongoose.connect(mongoDB, {useNewUrlParser:true});
var db = mongoose.connection;

//connection opened
db.on('open', function(){
    console.log('connection established');
})

//connection failed
db.on('error', console.error.bind(console, 'MongoDB connection error'));

module.exports = db;