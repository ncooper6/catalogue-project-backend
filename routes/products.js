import express from 'express';
import {getProducts, createProduct, updateProduct, updateStock} from '../controllers/products.js';
import auth from '../middleware/auth.js';

//routes the front end can use to contact the backend for requests.
//some routes require the user the be authenticated.
const router = express.Router();

router.get('/', getProducts);
router.post('/', auth, createProduct);
router.patch('/:id',auth, updateProduct);
router.patch('/:id/updateStock', auth,updateStock);

export default router;