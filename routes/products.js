import express from 'express';
import {getProducts, createProduct, updateProduct, updateStock} from '../controllers/products.js';
const router = express.Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.patch('/:id/updateStock', updateStock);

export default router;