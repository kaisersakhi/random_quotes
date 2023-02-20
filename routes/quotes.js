import express from 'express';
import {
  getQuotes,
  getQuoteById,
  getRandomQuote,
  postQuote,
  updateQuote,
  getQuotesOf
} from './../controller/quotesController.mjs';

const quotes = express.Router();

quotes
  .get('/', getQuotes)
  .get('/random', getRandomQuote)
  .get('/:id', getQuoteById)
  .get('/author/:author_name', getQuotesOf)
  .post('/', postQuote)
  .put('/', updateQuote);

export {
  quotes as quotesRouter
};
