const root = document.getElementById('root');

let booksJSON;

if(window.localStorage.books){
  booksJSON = window.localStorage.books;
}

let books = JSON.parse(booksJSON);

let addBtn = document.createElement('a');
addBtn.className = 'add-btn';
addBtn.innerText = 'Add';
addBtn.setAttribute('href', '#add');

let bookBlock = document.createElement('ul');
bookBlock.className = 'book-block';

let contentBlock = document.createElement('div');
contentBlock.className = 'content-block';

books.forEach(el => {
  bookBlock.appendChild(createBook(el));
});

root.appendChild(bookBlock);
root.appendChild(addBtn);
root.appendChild(contentBlock);

function createBook(el) {
  let bookItem = document.createElement('li');

  let bookName = document.createElement('a');
  bookName.className = 'book-name';
  bookName.setAttribute('id', el.id);
  bookName.setAttribute('href', '#preview');
  bookName.innerText = el.name;

  let editBtn = document.createElement('a');
  editBtn.className = 'edit-btn';
  editBtn.setAttribute('href', '#edit');
  editBtn.innerText = 'Edit';

  bookItem.appendChild(bookName);
  bookItem.appendChild(editBtn);

  return bookItem;
}

let updatestate,
  navEl,
  navElAdd,
  links;

navEl = document.querySelector('.book-block');
navElAdd = document.querySelector('.add-btn');
console.log(navElAdd)
links = {

};

updatestate = function (state) {
  if (!state) {
    return;
  }

  let content = links[location.hash.slice(1)];
  console.log(content);
};

window.addEventListener('popstate', function (e) {
  updatestate(e.state);
})

navEl.addEventListener('click', function (e) {
  let state;
  if (e.target.tagName !== 'A') {
    return;
  }
  if (e.target.className === 'book-name') {
    links.preview = bookPreview();
  } else if (e.target.className === 'edit-btn') {
    links.edit = editBook();
  }else if (e.target.className === 'add-btn'){
    links.add = addBook();
  }
  state = {
    page: e.target.getAttribute('href')
  };
  history.pushState(state, '', state.page);
  updatestate(state);
  e.preventDefault();
})

navElAdd.addEventListener('click', function (e) {
  let state;
  if (e.target.tagName !== 'A') {
    return;
  }
  if (e.target.className === 'add-btn'){
    links.add = addBook();
  }
  state = {
    page: e.target.getAttribute('href')
  };
  history.pushState(state, '', state.page);
  updatestate(state);
  e.preventDefault();
})

window.addEventListener('hashchange', updatestate);
window.addEventListener('load', updatestate);

let pattern = /https?:\/\/[\w\d:.:?&]+/g;

function bookPreview(e) {
  if (!e) {
    e = window.event;
  }
  document.location.search = `id=${e.target.id}`;

  let bookId = Number(e.target.id);
  let bookToShow = books.filter(el => el.id === bookId)[0];
  let bookDescr = document.createElement('div');
  let bookName = document.createElement('h2');
  let bookImg = document.createElement('img');
  let bookAuthor = document.createElement('p');
  let bookPlot = document.createElement('p');

  bookDescr.className = 'book-descr';
  bookName.innerText = bookToShow.name;
  
  if(pattern.exec(bookToShow.image)){
    bookImg.src = bookToShow.image;
  }else{
    bookImg.alt='Sorry, can not to show this image';
  }
  bookAuthor.className = 'book-author';
  bookAuthor.innerText = bookToShow.author;
  bookPlot.className = 'book-plot';
  bookPlot.innerText = bookToShow.plot;

  bookDescr.appendChild(bookName);
  bookDescr.appendChild(bookAuthor);
  bookDescr.appendChild(bookImg);
  bookDescr.appendChild(bookPlot);

  contentBlock.appendChild(bookDescr);

  return contentBlock.innerHTML;
}

function editBook(e) {
  if (!e) {
    e = window.event;
  }
  document.location.search = `id=${e.target.previousSibling.id}`;
  let bookId = Number(e.target.previousSibling.id);
  let bookToEdit = books.filter(el => el.id === bookId)[0];
  let bookNameInput = document.createElement('input');
  
  let bookAuthorInput = document.createElement('input');
  let bookImgUrlInput = document.createElement('input');
  let bookPlotInput = document.createElement('input');
  let saveBtn = document.createElement('button');
  let cancelBtn = document.createElement('button');

  bookNameInput.setAttribute('required', 'required');
  bookNameInput.setAttribute('required', 'required');
  bookImgUrlInput.setAttribute('required', 'required');
  bookPlotInput.setAttribute('required', 'required');

  bookAuthorInput.value = bookToEdit.author;
  bookNameInput.value = bookToEdit.name;
  bookImgUrlInput.type='url';
  bookImgUrlInput.value = bookToEdit.image;
  bookPlotInput.value = bookToEdit.plot;

  saveBtn.innerText = 'Save';
  saveBtn.addEventListener('click', save);
  cancelBtn.innerText = 'Cancel';
  cancelBtn.addEventListener('click', cancel);

  contentBlock.appendChild(bookNameInput);
  contentBlock.appendChild(bookAuthorInput);
  contentBlock.appendChild(bookImgUrlInput);
  contentBlock.appendChild(bookPlotInput);
  contentBlock.appendChild(saveBtn);
  contentBlock.appendChild(cancelBtn);

  function save() {
    if (!bookNameInput.value &&
      !bookAuthorInput.value &&
      !bookImgUrlInput.value &&
      !bookPlotInput.value) {
      return;
    }
    
    bookToEdit.id = bookId;
    bookToEdit.name = bookNameInput.value;
    bookToEdit.author = bookAuthorInput.value;
    bookToEdit.plot = bookPlotInput.value;

  if(pattern.exec(bookToEdit.image)){
    bookToEdit.image = bookImgUrlInput.value;
  }else{
    return;
  }

    let bookToUpdate = books.filter(el => el.id === bookId)[0];
    books.filter(el => el.id === bookId)[0] = bookToUpdate;
    window.localStorage.books = JSON.stringify(books);

    while(bookBlock.lastChild){
      bookBlock.removeChild(bookBlock.lastChild);
    }
    JSON.parse(localStorage.books).forEach(el => {
      bookBlock.appendChild(createBook(el));
    });
  }

  
  return contentBlock.innerHTML;
}

function cancel() {
  let flag = confirm('Discard changes?');
  if (flag) {
    history.back();
  }
}

function addBook() {
  let bookNameInput = document.createElement('input');  
  let bookAuthorInput = document.createElement('input');
  let bookImgUrlInput = document.createElement('input');
  let bookPlotInput = document.createElement('input');
  let saveBtn = document.createElement('button');
  let cancelBtn = document.createElement('button');

  bookNameInput.setAttribute('required', 'required');
  bookNameInput.setAttribute('required', 'required');
  bookImgUrlInput.setAttribute('required', 'required');
  bookPlotInput.setAttribute('required', 'required');

  bookImgUrlInput.type='url';
  saveBtn.innerText = 'Save';
  saveBtn.addEventListener('click', save);
  cancelBtn.innerText = 'Cancel';
  cancelBtn.addEventListener('click', cancel);

  contentBlock.appendChild(bookNameInput);
  contentBlock.appendChild(bookAuthorInput);
  contentBlock.appendChild(bookImgUrlInput);
  contentBlock.appendChild(bookPlotInput);
  contentBlock.appendChild(saveBtn);
  contentBlock.appendChild(cancelBtn);

  function save() {
    if (!bookNameInput.value &&
      !bookAuthorInput.value &&
      !bookImgUrlInput.value &&
      !bookPlotInput.value) {
      return;
    }
    let bookToAdd={};
    const NUM_TO_RAND=100,
        TIMEOUT=300;
    bookToAdd.id = Math.floor(Math.random()*NUM_TO_RAND+NUM_TO_RAND);

    if(pattern.exec(bookToAdd.image)){
      bookToAdd.image = bookImgUrlInput.value;
    }else{
      return;
    }

    bookToAdd.name = bookNameInput.value;
    bookToAdd.author = bookAuthorInput.value;
    bookToAdd.image = bookImgUrlInput.value;
    bookToAdd.plot = bookPlotInput.value;

    books.push(bookToAdd);
    window.localStorage.books = JSON.stringify(books);

    while(bookBlock.lastChild){
      bookBlock.removeChild(bookBlock.lastChild);
    }
    JSON.parse(localStorage.books).forEach(el => {
      bookBlock.appendChild(createBook(el));
    });

    setTimeout(mess,TIMEOUT);
  }
  return contentBlock.innerHTML;
}

function mess(){
  alert('Book successfully updated');
}