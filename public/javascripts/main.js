var listItems = document.getElementsByTagName('LI');
const todo_list = document.getElementById('todo-list');
const ul = document.getElementsByTagName('ul');
const todos = document.getElementsByClassName('todos');
const items = document.getElementsByClassName('items');

// create a remove button
for(var i=0; i<listItems.length; i++){
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "remove";
    span.appendChild(txt);
    listItems[i].appendChild(span);
}

// remove button functionality front end
var remove = document.getElementsByClassName("remove");
for(var i=0; i<remove.length; i++){
    remove[i].onClick = function(){
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// remove button functionallity back end
for(var i=0; i<close.length; i++){
    remove[i].addEventListener('click', function(){
	console.log('tried to remove a task');
	console.log(this.previousSibling);
    });
}

let count = 0;

//clicking on the item functionality
for(var i=0; i<items.length; i++){
    items[i].addEventListener('click', function(){
	this.firstChild.checked = !this.firstChild.checked;
	console.log('item is clicked on');
	// counting checked tasks
	if(this.firstChild.checked == true)
	    count++;
	else if(this.firstChild.checked == false)
	    count--;
    });
}

//validating input
function validateInput(input){
    if(input == ""){
	//invalid input
	console.log('empty string');
    	return false;
    }
    else{
	   //valid input
	   return true;
    }
}

const form = document.forms['todos'];
//form submition
form.addEventListener('submit', function(e){
    //prevent it being sent
    e.preventDefault();
    console.log('someone submitted the form');

    const input = document.forms['todos']['task'].value;
    var validation = validateInput(input);
    if(validation == true){
        //if valid, send data
        sendData(input);
	    console.log('sending the data');
    }
    else if(!validation == false){
    	//if not valid return false
    	console.log('not valid data');
    	return false;
    }
});

// sending data using ajax
function sendData(input){

    $.ajax({
    	type:'POST',
    	url: 'ajaxCall',
    	data : {inputTask: input},
    	success: function(){
    	    console.log('success!!!!!!');
    	},
    	error: function(){
    	    console.log('failed!!!!!');
    	}
    });
}

//remove button client side


//add select effect

//add hover effect
