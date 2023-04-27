import Datastore from 'nedb-promise';
import uuid from 'uuid-random';
import { trimNoteObject } from '../utils/utils.js';

const db = new Datastore({ filename: 'db/notes.db', autoload: true });

async function createNote(title, text, userId) {
  const note = {
    id: uuid(),
    userId,
    title,
    text,
    createdAt: new Date(),
    modifiedAt: new Date(),
  };

  await db.insert(note);

  return {
    success: true,
    id: note.id,
  };
}

async function findNotesByUserId(userId) {
  const notes = await db.find({ userId });

  if (notes.length === 0) {
    return {
      success: false,
      message: 'No notes found',
    };
  }

  return {
    success: true,
    notes: notes.map((note) => trimNoteObject(note)),
  };
}

// Search function for notes by title
async function findNoteByTitle(userId, title) {
  const notes = await db.find({
    $where() {
      return this.userId === userId && this.title.toLowerCase().includes(title.toLowerCase());
    },
  });

  if (notes.length === 0) {
    return {
      success: false,
      message: 'No notes found',
    };
  }

  return {
    success: true,
    notes: notes.map((note) => trimNoteObject(note)),
  };
}

async function deleteNoteById(userId, id) {
  const note = await db.findOne({ userId, id });

  const noteRemoved = await db.remove({ userId, id });

  if (noteRemoved === 0) {
    return {
      success: false,
      message: 'Note not found',
    };
  }

  return {
    success: true,
    note: trimNoteObject(note),
  };
}

async function updateNoteById(userId, id, title, text) {
  const note = await db.findOne({ userId, id });

  if (!note) {
    return {
      success: false,
      message: 'Note not found',
    };
  }

  const newTitle = title || note.title;
  const newText = text || note.text;
  const modifiedAt = new Date();

  await db.update({ userId, id }, { $set: { title: newTitle, text: newText, modifiedAt } });

  return {
    success: true,
  };
}

export {
  createNote, findNotesByUserId, deleteNoteById, updateNoteById, findNoteByTitle,
};
