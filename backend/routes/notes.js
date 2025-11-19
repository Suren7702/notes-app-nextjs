const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Note = require('../models/Note');

// list + search: /api/notes?q=term
router.get('/', auth, async (req, res) => {
  const q = req.query.q;
  const filter = { user: req.user.id };
  if (q) filter.$or = [{ title: new RegExp(q, 'i') }, { content: new RegExp(q, 'i') }];
  const notes = await Note.find(filter).sort({ createdAt: -1 });
  res.json(notes);
});

// create
router.post('/', auth, async (req, res) => {
  const { title, content, tags } = req.body;
  if (!title) return res.status(400).json({ message: 'Title required' });
  const note = await Note.create({ user: req.user.id, title, content, tags });
  res.json(note);
});

// update
router.put('/:id', auth, async (req, res) => {
  const note = await Note.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
  if (!note) return res.status(404).json({ message: 'Not found' });
  res.json(note);
});

// delete
router.delete('/:id', auth, async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ success: true });
});

module.exports = router;
