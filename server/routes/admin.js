const express = require('express');
const db = require('../db/database');

const router = express.Router();

// GET /api/admin/:adminToken
router.get('/:adminToken', (req, res) => {
  const event = db.prepare(`
    SELECT id, host_name, event_time, location
    FROM events WHERE admin_token = ?
  `).get(req.params.adminToken);

  if (!event) {
    return res.status(404).json({ error: 'Event not found.' });
  }

  const guests = db.prepare(`
    SELECT name, status, created_at FROM guests WHERE event_id = ? ORDER BY created_at ASC
  `).all(event.id);

  const attending = guests.filter(g => g.status === 'attending');
  const wish_only  = guests.filter(g => g.status === 'wish_only');

  return res.json({
    event: {
      host_name:  event.host_name,
      event_time: event.event_time,
      location:   event.location,
    },
    stats: {
      total_attending: attending.length,
      total_wish_only: wish_only.length,
    },
    guests: {
      attending: attending.map(({ name, created_at }) => ({ name, created_at })),
      wish_only:  wish_only.map(({ name, created_at }) => ({ name, created_at })),
    },
  });
});

module.exports = router;
