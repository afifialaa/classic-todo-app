console.log('hello world from book script');

loadBooks();

var contetnDiv = document.getElementById('');

function test(){
	const formElement = document.getElementById('addBook');
	const formData = new FormData(formElement);

	const body = {
		title: formData.get('title'),
		pageNum: formData.get('pageNum')
	}

	console.log(body.title);
	console.log(body.pageNum);
	
}

function loadBooks(){
	$.ajax({
		url: 'books/getBooks',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			console.log('fetched the data');
			const books = JSON.stringify(data);
			for(i=0; i<data.length; i++){
				createCard(data[i].bookTitle, data[i].pageNum);
			}
			//attaching button events
			attachDelEvent();
			attachEditEvent();
		},
		fail: function(){
			console.log('fetching failed');
		}
	});
};

//create html elements
function createCard(bookTitle, pageNum){

	//create div element
	var div = document.createElement('div');
	div.classList.add('bookCard');
		
	//create title header
	var titleHeader = document.createElement('h4');
	var titleNode = document.createTextNode(bookTitle);

	//create page number header
	var pageNumHeader = document.createElement('h4');
	var pageNumNode = document.createTextNode(pageNum);

	//create controls div
	var controlsDiv = document.createElement('div');
	controlsDiv.classList.add('controls');

	//create button nodes
	var delBtn = document.createElement('button');
	var delBtnNode = document.createTextNode('D');

	var editBtn = document.createElement('button');
	var editBtnNode = document.createTextNode('E');

	//append children
	titleHeader.appendChild(titleNode);
	pageNumHeader.appendChild(pageNumNode);

	delBtn.appendChild(delBtnNode);
	delBtn.classList.add('controlBtn', 'delBtn');
	editBtn.appendChild(editBtnNode);
	editBtn.classList.add('controlBtn', 'editBtn');

	controlsDiv.appendChild(editBtn);
	controlsDiv.appendChild(delBtn);

	div.appendChild(titleHeader);
	div.appendChild(pageNumHeader);
	div.appendChild(controlsDiv);

	//append children to progress div
	var bookProgDiv = document.getElementById('bookProgress');
	bookProgDiv.appendChild(div);
}

//add book button event
const addBtn = document.getElementById("addBookBtn");
addBtn.addEventListener('click', function(e){
	e.preventDefault();

	const formElement = document.getElementById('addBook');
	const formData = new FormData(formElement);

	const body = {
		title: formData.get('bookTitle'),
		pageNum: formDate.get('pageNum')
	}

	if(validate(body.title, body.pageNum)){
		$.ajax({
			url: 'books/addBook',
			type: 'POST',
			data: JSON.stringify(body)
		}).done(function(){
			console.log('book was added successfully');
			//display();
			location.reload();
		}).fail(function(){
			console.log('oops... an error has occured');
		}).always(function(){
			console.log('completed the assignment');
		});
	}else{
		alert('please fill fields');
		console.log('please fill fields');
		//reload page
		location.reload();
	}
});

function validate(bookTitle, pageNum){
	
	return true;
}

//attach delete handler
function attachDelEvent(){
	var delBtn = document.getElementsByClassName('delBtn');
	for(i=0; i<delBtn.length; i++){
		delBtn[i].addEventListener('click', function(e){
			console.log('delete button was pressed');

			var bookTitle = this.parentNode.previousSibling.previousSibling.textContent;
			console.log('you are trying to delete ' + bookTitle);
			
			//ajax delete request
			$.ajax({
				url: 'books/deleteBook',
				type: 'DELETE',
				//data and datatype
				data:{bookTitle:bookTitle}
			}).done(function(data){
				console.log('book was deleted');
				location.reload();
			}).fail(function(){
				console.log('oops... an error has occured');
			}).always(function(){
				console.log('completed the assignment');
			});
		});
	}

}

//attach edit handler
function attachEditEvent(){
	var editBtn = document.getElementsByClassName('editBtn');
	for(i=0; i<editBtn.length; i++){
		editBtn[i].addEventListener('click', function(e){
			console.log('edit button was pressed');

			//ajax edit request
			$.ajax({
				url: 'books/editBook',
				type: 'PUT',
				//data
				data:{bookTitle:'dummy object'}
			}).done(function(data){
				console.log('book was deleted');
				console.log(data);
			}).fail(function(){
				console.log('oops... an error has occured while trying to delete');
			}).always(function(){
				console.log('completed the assignment');
			});
		});
	}
}
