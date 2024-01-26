import { Request, Response, NextFunction } from 'express';
import ProductValidation from '../validations/product.validation';

const ProductMiddle = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = ProductValidation.validate(req.body);

  if (!error) {
    next();
  } else {
    const { details } = error;
    const message = details[0].message;
    res.status(400).send({ message });
  }
};

export default ProductMiddle;
