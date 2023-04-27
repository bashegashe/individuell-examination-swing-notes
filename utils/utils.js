import bcrypt from 'bcryptjs';

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);

  return isMatch;
}

// Mostly to reduce overall size sent to client, removes userId and internal _id from note object.
function trimNoteObject(note) {
  const { userId, _id, ...rest } = note;
  return rest;
}

export {
  hashPassword, comparePassword, trimNoteObject,
};
