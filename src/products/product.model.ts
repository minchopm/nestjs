import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  document: { type: String },
});

export interface Product extends mongoose.Document {
  id: string;
  document: string;
}
