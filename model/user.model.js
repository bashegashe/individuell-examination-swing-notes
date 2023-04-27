import Datastore from 'nedb-promise';
import uuid from 'uuid-random';
import { hashPassword } from '../utils/utils.js';

const db = new Datastore({ filename: 'db/users.db', autoload: true });

async function createUser(username, password) {
  const usernameExists = await db.findOne({ username });

  if (usernameExists) {
    return {
      success: false,
      message: 'Username already exists',
    };
  }

  const user = {
    username,
    password: await hashPassword(password),
    id: uuid(),
  };

  await db.insert(user);

  return {
    success: true,
  };
}

function findUserByName(username) {
  return db.findOne({ username });
}

export { createUser, findUserByName };
