import { Schema, Document } from 'mongoose';

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  productImg: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  perStock: { type: Number, required: true },
}, { timestamps: true });

export interface IProduct extends Document {
  title: string;
  productImg: string;
  price: number;
  quantity: number;
  perStock: number;
  createdAt: Date;
  updatedAt: Date;
}

export default ProductSchema;
