import { Quote } from '../model/quoteModel.mjs';
import { Error } from 'mongoose';

export function getQuotes(req, res) {
  res.set('Content-Type', 'application/json');
  // res.stale(200);
  Quote.find((err, quotes) => {
    if (!err) {
      res.status(200)
        .send({ data: quotes });
    } else {
      res.status(200)
        .send({ data: '' });
    }
  });
}

export const getQuoteById = (req, res) => {
  const _id = req.params.id;
  Quote.find({ _id })
    .then((data) => {
      if (data.length === 0) throw Error;
      res.status(200)
        .send({ data });
    })
    .catch((err) => {
      console.log(err);
      res.status(404)
        .send({ message: 'Quote not found using specified ID' });
    });
};

export function getQuotesOf(req, res) {
  let author = decodeURI(req.params.author_name);
  Quote.find({ author })
    .then((data) => {
      if (data.length === 0) throw Error;
      res.status(200)
        .send({ data });
    })
    .catch((err) => {
      res.status(404)
        .send({ message: 'Author not found, check author name.' });
    });
}

export function getRandomQuote(req, res) {
  Quote.aggregate([{ $sample: { size: 1 } }])
    .then((data) => {
      res.status(200)
        .send({ data: data[0] });
    })
    .catch((err) => {
      res.status(200)
        .send({ data: {} });
    });
}

export async function postQuote(req, res) {
  let {
    text,
    author
  } = req.body;
  if (text && author) {
    await Quote.create({
      text,
      author
    })
      .then((data) => {
        res.status(201)
          .send({ data: data });
      })
      .catch((err) => {
        res.status(500)
          .send({ err });
      });
  } else {
    res.status(403)
      .send({ message: 'Please check Docs.' });
  }
}

export function updateQuote(req, res) {
  let {
    _id,
    text,
    author
  } = req.body;
  Quote.update({ _id: _id }, {
    text,
    author
  })
    .then((data) => {
      res.status(202)
        .send({ data: data.acknowledged });
    })
    .catch((err) => {
      res.status(204)
        .send({ err });
    });
}

