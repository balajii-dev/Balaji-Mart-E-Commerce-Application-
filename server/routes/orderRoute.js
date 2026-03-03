import express from 'express';
import authUser from '../middlewares/authUser.js';
import { placeOrderCOD, getUserOrders, getAllOrders } from '../controllers/orderController.js';

const orderRouter = express.Router();

// Route for placing an order
orderRouter.post('/cod', authUser, placeOrderCOD);

// Route for fetching user orders - Changed to .get and added the hyphen
orderRouter.get('/user-orders', authUser, getUserOrders); 

// Route for admin to see all orders
orderRouter.get('/all-orders', getAllOrders);

export default orderRouter;