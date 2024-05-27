const selectElement = (selector) => document.querySelector(selector);

const noteForm = selectElement('.noteForm');
const noteList = selectElement('.noteList');

const notes = JSON.parse(localStorage.getItem('notes')) || [];

function createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    });
    return element;
}

function addNote(e) {
    e.preventDefault();

    const title = this.querySelector('.title').value;
    const content = this.querySelector('.note').value;

    if (!title.trim() || !content.trim()) {
        alert('Both title and content are required.');
        return;
    }

    const note = {
        title,
        content,
    };

    notes.unshift(note);
    closeModal('myModal');
    updateUI(notes, noteList);
    localStorage.setItem('notes', JSON.stringify(notes));

    this.reset();
}

function closeModal(id) {
    const modalToClose = document.getElementById(id);
    if (modalToClose) {
        modalToClose.style.display = 'none';
    }
}

function updateUI(arr = [], list) {
    list.innerHTML = '';
    arr.forEach((el, i) => {
        const note = createElement('li', { 'data-index': i, class: 'note' }, [
            createElement('div', { class: 'card-tools' }, [
                createElement('span', { 'data-index': i, title: 'Delete', class: 'close' }, ['❌'])
            ]),
            createElement('h2', {}, [el.title]),
            createElement('p', {}, [el.content])
        ]);
        list.appendChild(note);
    });
}

function deleteNote(e) {
    const [element, index] = [e.target, e.target.dataset.index];

    if (element.classList.contains('close')) {
        notes.splice(index, 1);

        updateUI(notes, noteList);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

noteForm.addEventListener('submit', addNote);
noteList.addEventListener('click', deleteNote);

updateUI(notes, noteList);


const openModal = selectElement('.openModal');
const modal = selectElement('.modal');

openModal.onclick = function () {
    modal.style.display = 'block';
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
