const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: { "type": "String" },
    body:  { "type": "String" },
},
{
    versionKey: false,
});

const Note = mongoose.model('Note', noteSchema);
console.log(Note);
module.exports = Note;
