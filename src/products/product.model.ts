import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  article: { type: String },
});

export interface Product extends mongoose.Document {
  id: string;
  article: string;
}
