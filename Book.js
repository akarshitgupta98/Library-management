/**
 * Book.js - Part of the Online Library backend.
 * Contains server logic, routes, models, or middleware.
 */

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  isbn: String,
  isReserved: { type: Boolean, default: false },
  reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});

module.exports = mongoose.model('Book', bookSchema);