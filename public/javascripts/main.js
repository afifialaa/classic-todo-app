const form = document.getElementById("todosForm");
const submitBtn = document.getElementById("submitBtn");

const taskInput = document.getElementById('myInput');

getTasks();

// Adding click event to add button
submitBtn.addEventListener('click', (e) => {
	console.log('button was clicked');
	let body = {
		task: taskInput.value
	}
	sendData(body);
})

// Sending tasks to server
function sendData(body) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/todos/addTask', true);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
            console.log('finished processing');
        }
    }
    xhr.send(JSON.stringify(body));
}

// Fetching tasks from sever
function getTasks() {

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            const res = JSON.parse(xhr.responseText);
            for(let i=0; i<res.length; i++){
                newElement(res[i].task);
            }
        }
    };
    xhr.open("GET", 'http://localhost:8080/todos/getTasks', true);
    xhr.send();
}


// Create close button with every item
function createCloseButton() {
    let myNodelist = document.getElementsByTagName("LI");
    for (let i = 0; i < myNodelist.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }

    // Close event handle.
    let closeBtn = document.getElementsByClassName("close");
    console.log(closeBtn.length);

    for (let i = 0; i < closeBtn.length; i++) {
        closeBtn[i].addEventListener('click', function (e) {
            console.log('pressing button');
        })
    }

    let list = document.querySelector('ul');
    list.addEventListener('click', (ev) => {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
        }
    }, false);
}

function newElement(inputValue) {
    let li = document.createElement("li");
    let t = document.createTextNode(inputValue);
    li.appendChild(t);

    document.getElementById("myUL").appendChild(li);

    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

	// Close button handle
    span.addEventListener('click', function(e){
        let div = this.parentElement;
        div.style.display = "none";
	    removeTask(e);
    })

    li.addEventListener('click', function(e){
        li.classList.toggle('checked');
    })
}

// Removing task handle.
function removeTask(e){
	let body = {
		task: e.target.previousSibling.textContent
	};

	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://localhost:8080/todos/deleteTask', true);
    	xhr.setRequestHeader('Content-Type', 'application/json');
    	xhr.onreadystatechange = () => {
        	if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            		// Request finished. Do processing here.
            		console.log('finished processing');
        	}
    	}
    	xhr.send(JSON.stringify(body));
}
