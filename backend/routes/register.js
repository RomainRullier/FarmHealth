const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password_hash: password });
    console.log('User created:', user);

    const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error in /register route:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;