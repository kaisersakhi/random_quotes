import express from 'express';
import {
  getQuotes,
  getQuoteById,
  getRandomQuote,
  postQuote,
  updateQuote
} from './../controller/quotesController.mjs';

const quotes = express.Router();

quotes
  .get('/', getQuotes)
  .get('/random', getRandomQuote)
  .get('/:id', getQuoteById)
  .post('/', postQuote)
  .put('/', updateQuote);

export {
  quotes as quotesRouter
};
