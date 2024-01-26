import { Request, Response } from 'express';
import ProductModel from '../models/product.model';
import { IProduct } from '../schemas/product.schema';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const products: IProduct[] = await ProductModel.find({});
    res.json(products);
  } catch (err) {
     res.status(500).json({ message: (err as Error).message });
  }
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: IProduct | null = await ProductModel.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.json(product);
    }
  } catch (err) {
     res.status(500).json({ message: (err as Error).message });
  }
};

export const post = async (req: Request, res: Response): Promise<void> => {
  const newProduct: IProduct = new ProductModel(req.body);
  try {
    const savedProduct: IProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
     res.status(500).json({ message: (err as Error).message });
  }
};

export const patchPublisher = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedProduct: IProduct | null = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
     res.status(500).json({ message: (err as Error).message });
  }
};
