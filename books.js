/**
 * books.js - Part of the Online Library backend.
 * Contains server logic, routes, models, or middleware.
 */

const express = require('express');
const Book = require('../models/Book');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Access denied');
  const book = new Book(req.body);
  await book.save();
  res.send(book);
});

router.get('/all', auth, async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

router.post('/reserve', auth, async (req, res) => {
  const { isbn } = req.body;
  const book = await Book.findOne({ isbn });
  if (!book || book.isReserved) return res.status(400).send('Not available');
  book.isReserved = true;
  book.reservedBy = req.user._id;
  await book.save();
  res.send(book);
});

router.post('/return', auth, async (req, res) => {
  const { isbn } = req.body;
  const book = await Book.findOne({ isbn, reservedBy: req.user._id });
  if (!book) return res.status(400).send('Not found or not reserved by you');
  book.isReserved = false;
  book.reservedBy = null;
  await book.save();
  res.send(book);
});

module.exports = router;