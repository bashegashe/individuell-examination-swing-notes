import * as dotenv from 'dotenv';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import { readFileSync } from 'fs';

import notesRoute from './routes/notes.route.js';
import userRoute from './routes/user.route.js';

const apiDocs = JSON.parse(readFileSync('./docs/docs.json'));

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use('/api/docs', swaggerUI.serve);
app.get('/api/docs', swaggerUI.setup(apiDocs));

app.use('/api/user', userRoute);
app.use('/api/notes', notesRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// "catch-all" error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});
