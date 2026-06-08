const addBook = document.querySelector('.add-button');
const popup = document.querySelector('.pop-up');
const formSubmit = document.querySelector('#add-form');
const bookie = document.querySelector('.books');
const closed = document.querySelector('.close');

let books = [],
    reddit = 0;

class book {
    constructor(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
}
}

function entry(e) {
    e.preventDefault();
    const newbook = new book(e.target.title.value, e.target.author.value, e.target.readstat.value);
    if (newbook.read == 'read') reddit++;
    books.push(newbook);

    display();

    e.target.title.value = '';
    e.target.author.value = '';
    e.target.readstat.value = 'not read';

    popup.style.visibility = 'hidden';
    popup.style.opacity = 0;
}

function display() {
    while (bookie.firstChild) {
        bookie.removeChild(bookie.lastChild);
    }

    for (let i = 0; i < books.length; i++) {

        const container = document.createElement('div');
        const title = document.createElement('div');
        const author = document.createElement('div');
        const readstat = document.createElement('div');
        const edit = document.createElement('button');
        const remove = document.createElement('button');

        title.textContent = '"' + books[i].title + '"';
        author.textContent = '~ ' + books[i].author;
        readstat.textContent = books[i].read;

        edit.textContent = 'edit';
        edit.setAttribute('value', i);
        edit.classList.add('edit');

        remove.textContent = 'remove';
        remove.setAttribute('value', i);
        remove.classList.add('remove');

        container.classList.add('card');
        container.appendChild(title);
        container.appendChild(author);
        container.appendChild(readstat);
        container.appendChild(edit);
        container.appendChild(remove);
        bookie.appendChild(container);

        edit.addEventListener('click', editit);
        remove.addEventListener('click', removebook);

    }
    readstat();
}

function readstat() {
    const total = document.querySelector('.total-book');
    const readbook = document.querySelector('.read-book');
    const unreadbook = document.querySelector('.unread-book');
    if (books.length !== 0) {
        total.textContent = books.length;
        readbook.textContent = reddit;
        unreadbook.textContent = books.length - reddit;
    } else {
        total.textContent = books.length;
        readbook.textContent = 0;
        unreadbook.textContent = 0;
    }
}

function editit(e) {
    if (books[e.target.value].read == 'read') {
        reddit--;
        books[e.target.value].read = 'not read';
    } else {
        reddit++;
        books[e.target.value].read = 'read';
    }

    display();
}

function removebook(e) {
    console.log(e.target.value);
    if (books[e.target.value].read == 'read') reddit--;
    books.splice(e.target.value, 1);
    display();
}

function addbooks() {
    popup.style.visibility = "visible";
    popup.style.opacity = 1;
}

formSubmit.addEventListener('submit', entry);
addBook.addEventListener('click', addbooks);
closed.onclick = e => {
    popup.style.visibility = 'hidden';
    popup.style.opacity = 0;
}
document.onclick = e => {
    if (e.target == popup) {
        popup.style.visibility = 'hidden';
        popup.style.opacity = 0; // comment
    }
}
