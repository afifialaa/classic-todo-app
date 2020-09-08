require('dotenv').config();
var app = require('./app.js');

var port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log('todo_app_mongo server is listening at port 8080');
});
