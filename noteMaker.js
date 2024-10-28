let notes = JSON.parse(localStorage.getItem('notes')) || [];
let currentNoteIndex = null;

document.addEventListener("DOMContentLoaded", displayNotes);

function saveNote() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;

    if (title === '' || content === '') {
        alert("Both title and content are required!");
        return;
    }

    const newNote = { title, content };
    
    if (currentNoteIndex !== null) {
        notes[currentNoteIndex] = newNote;
        currentNoteIndex = null;
    } else {
        notes.push(newNote);
    }
    
    localStorage.setItem('notes', JSON.stringify(notes));
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    displayNotes();
}

function displayNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note.title;
        li.onclick = () => viewNote(index);
        notesList.appendChild(li);
    });
}

function viewNote(index) {
    currentNoteIndex = index;
    const note = notes[index];
    document.getElementById('viewNoteTitle').textContent = note.title;
    document.getElementById('viewNoteContent').textContent = note.content;
    document.getElementById('viewNoteScreen').style.display = 'block';
}

function editNote() {
    const note = notes[currentNoteIndex];
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteContent').value = note.content;
    closeView();
}

function deleteNote() {
    notes.splice(currentNoteIndex, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    closeView();
    displayNotes();
}

function closeView() {
    document.getElementById('viewNoteScreen').style.display = 'none';
    currentNoteIndex = null;
}
