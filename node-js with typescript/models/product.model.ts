import { model, Model } from 'mongoose';
import { IProduct } from '../schemas/product.schema';
import ProductSchema from '../schemas/product.schema';

const ProductModel: Model<IProduct> = model<IProduct>('Product', ProductSchema);

export default ProductModel;
