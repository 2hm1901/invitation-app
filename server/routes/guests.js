const express = require('express');
const db = require('../db/database');

const router = express.Router();

const VALID_STATUSES = ['attending', 'wish_only'];

// POST /api/events/:id/guests
router.post('/:id/guests', (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;

  if (!name?.trim()) {
    return res.status(400).json({ error: 'name is required.' });
  }
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${VALID_STATUSES.join(', ')}.` });
  }

  const event = db.prepare('SELECT id FROM events WHERE id = ?').get(id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found.' });
  }

  const result = db.prepare(`
    INSERT INTO guests (event_id, name, status) VALUES (?, ?, ?)
  `).run(id, name.trim(), status);

  return res.status(201).json({ success: true, guest_id: result.lastInsertRowid });
});

module.exports = router;
