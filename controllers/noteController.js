const Note = require('../models/note');

function getAll(req, res) {
    const curUser = req.user._id;
    Note.find({userId: curUser}, (err, notes) => {
        if (err)
            res.send(err);
        res.send(notes);
    });
}

async function postOne(req, res) {
    const newNote = req.body;
    newNote.userId = req.user._id;
    const note = new Note(newNote);
    try {
        await note.save();
        res.send(note);
    }catch(error) {
        res.send(error);
    }
}

function getOne(req, res) {
    const id = req.params.id;
    const curUser = req.user._id;

    Note.findOne({userId: curUser, _id: id}, (err, note) => {
        if (err)
            return res.send(err);
        return res.send(note);
    })
}

function deleteOne(req, res) {
    const id = req.params.id;
    const curUser = req.user._id;

    Note.remove({'_id': id, userId: curUser}, err => {
        if (err)
            return res.send(err);
        res.send({'status': 'ok'});
    })
}

function updateOne(req, res) {
    const id = req.params.id;
    const curUser = req.user._id;
    const newNote = req.body;
    newNote.userId = curUser;
    Note.findOneAndUpdate({_id: id, userId: curUser}, newNote, { new: true }, (err, note) => {
        if (err)
            res.send(err);
        res.send(note);
    })
}

module.exports = {getAll, postOne, getOne, deleteOne, updateOne};
