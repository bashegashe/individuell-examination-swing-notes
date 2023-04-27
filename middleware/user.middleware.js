import jwt from 'jsonwebtoken';

function checkBody(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ success: false, error: 'Username and password are required' });
  }

  next();
}

function checkAuth(req, res, next) {
  const authHeader = req.get('Authorization');

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    if (token) {
      try {
        const user = jwt.verify(token, process.env.TOKEN_SECRET || 'a1b1c1');

        req.id = user.id;

        next();
      } catch (err) {
        res.status(401).json({ success: false, error: 'Unauthorized access' });
      }
    }
  } else {
    res.status(401).json({ success: false, error: 'Unauthorized access' });
  }
}

export {
  checkAuth,
  checkBody,
};
