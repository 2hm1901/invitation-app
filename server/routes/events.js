const express = require('express');
const { v4: uuidv4 } = require('uuid');
const rateLimit = require('express-rate-limit');
const db = require('../db/database');

const router = express.Router();

const createEventLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many events created from this IP, please try again later.' },
});

// POST /api/events
router.post('/', createEventLimiter, (req, res) => {
  const { host_name, event_time, location } = req.body;

  if (!host_name?.trim() || !event_time?.trim() || !location?.trim()) {
    return res.status(400).json({ error: 'host_name, event_time, and location are required.' });
  }

  const id          = uuidv4();
  const admin_token = uuidv4();
  const base        = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

  db.prepare(`
    INSERT INTO events (id, admin_token, host_name, event_time, location)
    VALUES (?, ?, ?, ?, ?)
  `).run(id, admin_token, host_name.trim(), event_time.trim(), location.trim());

  return res.status(201).json({
    publicUrl: `${base}/e/${id}`,
    adminUrl:  `${base}/manage/${admin_token}`,
  });
});

// GET /api/events/:id
router.get('/:id', (req, res) => {
  const event = db.prepare(`
    SELECT host_name, event_time, location FROM events WHERE id = ?
  `).get(req.params.id);

  if (!event) {
    return res.status(404).json({ error: 'Event not found.' });
  }

  return res.json(event);
});

module.exports = router;
