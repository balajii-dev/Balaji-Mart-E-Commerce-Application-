import express from 'express';
import { addProduct, productList, changeStock } from '../controllers/productController.js';
import upload from '../configs/multer.js'; 

const productRouter = express.Router();

productRouter.post('/add', upload.array('images', 5), addProduct);
productRouter.get('/list', productList);
productRouter.post('/stock', changeStock); 

export default productRouter;