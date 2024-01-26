import { Router } from 'express';

import { getAll, getOne, post, deleteProduct, patchPublisher } from "../controllers/product.controllers";
import ProductMiddle from '../middlewares/product.middleware';

const product_router = Router();

product_router.get("/", getAll);

product_router.get("/:id", getOne);

product_router.post("/", ProductMiddle,post);

product_router.delete("/:id", deleteProduct);

product_router.patch("/:id", patchPublisher);

export { product_router };
