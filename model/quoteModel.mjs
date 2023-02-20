import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  text : {
    type : String,
    required : true
  },
  author : String
});
export const Quote = mongoose.model("Quote",quoteSchema);
