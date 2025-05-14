/**
 * auth.js - Part of the Online Library backend.
 * Contains server logic, routes, models, or middleware.
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, phone, address, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, phone, address, password: hashedPassword, role });
  await user.save();
  res.send({ message: 'User registered' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).send('Invalid credentials');
  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.send({ token, role: user.role });
});

module.exports = router;