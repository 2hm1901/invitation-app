require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const eventsRouter = require('./routes/events');
const guestsRouter = require('./routes/guests');
const adminRouter  = require('./routes/admin');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/events', eventsRouter);
app.use('/api/events', guestsRouter);
app.use('/api/admin',  adminRouter);

// ── SPA Fallbacks ─────────────────────────────────────────────────────────────
app.get('/e/:eventId', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/event.html'));
});

app.get('/manage/:adminToken', (_req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin.html'));
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  const base = process.env.BASE_URL || `http://localhost:${PORT}`;
  console.log(`✓ Server running at ${base}`);
});
