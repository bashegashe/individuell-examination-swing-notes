import { Router } from 'express';
import { checkAuth } from '../middleware/user.middleware.js';
import checkNote from '../middleware/notes.middleware.js';
import {
  createNote, findNotesByUserId, deleteNoteById, updateNoteById, findNoteByTitle,
} from '../model/notes.model.js';

const router = Router();

// Protect all routes after this middleware
router.use(checkAuth);

// Get all notes
router.get('/', async (req, res, next) => {
  try {
    const result = await findNotesByUserId(req.id);

    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Save notes
router.post('/', checkNote.create, async (req, res, next) => {
  try {
    const result = await createNote(req.body.title, req.body.text, req.id);

    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Modify notes
router.put('/', checkNote.modify, async (req, res, next) => {
  try {
    const result = await updateNoteById(req.id, req.body.id, req.body.title, req.body.text);

    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Delete notes
router.delete('/:id', checkNote.delete, async (req, res, next) => {
  try {
    const result = await deleteNoteById(req.id, req.params.id);

    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Search for notes by title
router.get('/search', checkNote.search, async (req, res, next) => {
  try {
    const result = await findNoteByTitle(req.id, req.query.title);

    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
