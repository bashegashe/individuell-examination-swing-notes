const checkNote = {
  create(req, res, next) {
    const { title, text } = req.body;

    if (!title || !text) {
      return res.status(400).json({ success: false, error: 'Title and text are required' });
    }

    if (typeof (title) !== 'string' || typeof (text) !== 'string') {
      return res.status(400).json({ success: false, error: 'Title and text must be strings' });
    }

    if (title.length > 50 || text.length > 300) {
      return res.status(400).json({ success: false, error: 'Title must be at most 50 characters long and text must be at most 300 characters long' });
    }

    next();
  },
  modify(req, res, next) {
    const { title, text, id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, error: 'Id is required' });
    }

    if (!title && !text) {
      return res.status(400).json({ success: false, error: 'Title or text is required' });
    }

    if (title && typeof (title) !== 'string') {
      return res.status(400).json({ success: false, error: 'Title must be a string' });
    }

    if (text && typeof (text) !== 'string') {
      return res.status(400).json({ success: false, error: 'Text must be a string' });
    }

    if (title && title.length > 50) {
      return res.status(400).json({ success: false, error: 'Title must be at most 50 characters long' });
    }

    if (text && text.length > 300) {
      return res.status(400).json({ success: false, error: 'Text must be at most 300 characters long' });
    }

    next();
  },
  delete(req, res, next) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, error: 'Id is required' });
    }

    next();
  },
  search(req, res, next) {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ success: false, error: 'Title is required' });
    }

    if (typeof (title) !== 'string') {
      return res.status(400).json({ success: false, error: 'Title must be a string' });
    }

    if (title.length > 50) {
      return res.status(400).json({ success: false, error: 'Title must be at most 50 characters long' });
    }

    next();
  },
};

export default checkNote;
