import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { checkBody, checkAuth } from '../middleware/user.middleware.js';
import { createUser, findUserByName } from '../model/user.model.js';
import { comparePassword } from '../utils/utils.js';

const router = Router();

// Create a new user
router.post('/signup', checkBody, async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const result = await createUser(username, password);

    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Login a user
router.post('/login', checkBody, async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await findUserByName(username);

    if (!user) {
      return res.json({ success: false, message: 'Username or password is incorrect' });
    }

    const isPasswordCorrect = await comparePassword(password, user.password);

    const result = {
      success: false,
    };

    if (isPasswordCorrect) {
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET || 'a1b1c1', {
        expiresIn: '30m',
      });

      result.success = true;
      result.token = token;
    } else {
      result.message = 'Username or password is incorrect';
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
});

// Check if a user is logged in
router.get('/check', checkAuth, (req, res) => {
  res.json({ success: true });
});

export default router;
