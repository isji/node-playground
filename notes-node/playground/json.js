// var obj = {
//     name: 'isji'
// }
// var stringObj = JSON.stringify(obj);
// console.log(typeof stringObj);
// console.log(stringObj);

// var personString = '{"name": "SJ", "age": 30}';
// var person = JSON.parse(personString);
// console.log(typeof person);
// console.log(person);
// console.log(person.name);

const fs = require('fs');

var originalNote = {
    title: 'Janus',
    body: 'Some body'
}

var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);

var noteString = fs.readFileSync('notes.json');
var note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);