const express = require('express');
const router = express.Router();
const { pool } = require('../db');  

// prueba de vida
router.get('/test', (_req, res) => {
  res.json({ message: 'si esta funcionando la conexionn' });
});

router.post('/register', async (req, res) => {
  res.json({ message: 'User registration endpoint' });
});

router.post('/login', async (req, res) => {
  res.json({ message: 'User login endpoint' });
});

router.get('/restaurants', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  const sql = 'SELECT * FROM restaurants LIMIT $1 OFFSET $2';
  try {
    const result = await pool.query(sql, [limit, offset]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching restaurants:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
