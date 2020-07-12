const Note = require('../models/note');

function getAll(req, res) {
    Note.find({}, (err, notes) => {
        if (err)
            res.send(err);
        res.send(notes);
    });
}

async function postOne(req, res) {
    const reqBody = req.body;
    const note = new Note(reqBody);
    try {
        await note.save();
        res.send(note);
    }catch(error) {
        res.send(error);
    }
}

function getOne(req, res) {
    const id = req.params.id;
    Note.findById(id, (err, note) => {
        if (err)
            res.send(err);
        res.send(note);
    });
}

function deleteOne(req, res) {
    const id = req.params.id;
    Note.remove({'_id': id}, err => {
        if (err)
            res.send(err);
        res.send({'status': 'ok'});
    })
}

function updateOne(req, res) {
    const id = req.params.id;
    const newNote = req.body;
    Note.findByIdAndUpdate(id, newNote, { new: true }, (err, note) => {
        if (err)
            res.send(err);
        res.send(note);
    })
}

module.exports = {getAll, postOne, getOne, deleteOne, updateOne};
