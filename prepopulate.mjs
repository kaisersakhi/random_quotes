import jsonData from './data.json' assert {type : "json"}
import { json } from 'express';
import { Quote } from './model/quoteModel.mjs';

export function populate(){
  let i = 0;
  let data = jsonData.data;
  for (; i < data.length; ++i){
    Quote.create(data[i]);
  }
  return i + 1;
}
