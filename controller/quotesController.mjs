import { Quote } from '../model/quoteModel.mjs';

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
  const id = req.params.id;
  res.send(`Getting quote at ${id}`);
};

export function getRandomQuote(req, res) {
  Quote.aggregate([{$sample : {size : 1}}])
    .then((data)=>{
      res.status(200).send({data : data[0]});
    })
    .catch((err)=>{
      res.status(200).send({data : {}});
    })
}

export async function postQuote(req, res) {
  let {text, author} = req.body;
  if (text && author) {
    await Quote.create({text,author})
      .then((data)=>{
        res.status(201).send({data : data});
      })
      .catch((err)=>{
        res.status(500).send({err})
      })
  }else{
    res.status(403).send({message : "Please check Docs."})
  }
}

export function updateQuote(req, res) {

}

