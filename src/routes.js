const express = require('express');
const Note = require('./models/Note');

const router = express.Router();

// Create a new note
router.post('/notes', async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
    });
    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all notes
router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).send(notes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single note
router.get('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send();
    }
    res.status(200).send(note);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a note
router.put('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!note) {
      return res.status(404).send();
    }
    res.status(200).send(note);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a note
router.delete('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).send();
    }
    res.status(200).send(note);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
