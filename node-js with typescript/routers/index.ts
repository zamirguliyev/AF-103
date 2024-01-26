import { Router } from 'express';
import { product_router } from './product.router'; 

const router = Router();

router.use('/product', product_router);

export default router;