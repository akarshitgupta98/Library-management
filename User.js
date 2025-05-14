/**
 * User.js - Part of the Online Library backend.
 * Contains server logic, routes, models, or middleware.
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  address: String,
  password: String,
  role: { type: String, enum: ['admin', 'student'], default: 'student' }
});

module.exports = mongoose.model('User', userSchema);