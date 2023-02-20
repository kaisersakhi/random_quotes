import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { quotesRouter } from './routes/quotes.js';
import { populate } from './prepopulate.mjs';
import { Quote } from './model/quoteModel.mjs';

dotenv.config({ path: './config.env' });

const app = express();
app.use(express.json());
app.use(express.urlencoded());

mongoose.connect(process.env.DATABASE_URI + '/quotesDB')
  .then((p) => {
    Quote.find({}).limit(1)
      .then((data)=>{
        if (data.length  === 0){
          populate()
        }
      });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

app.use('/quote', quotesRouter);

app.listen((process.env.PORT || 3000), () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
