const express = require('express');
const bcrypt = require('bcryptjs'); // Utiliser bcryptjs
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log('Login attempt failed: User not found'); // Log
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await user.validPassword(password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error in /login route:', error); // Log detailed error
    res.status(500).send('Server error');
  }
});

module.exports = router;