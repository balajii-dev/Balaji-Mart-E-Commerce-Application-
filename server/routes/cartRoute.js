import express from 'express';
import { updateCart, getUserCart } from '../controllers/cartController.js';
import authUser from '../middlewares/authUser.js';

const cartRouter = express.Router();

cartRouter.post('/get', authUser, getUserCart);
cartRouter.post('/update', authUser, updateCart);

export default cartRouter;