import express from 'express';
import { adminLogin, isAuthSeller, logoutSeller } from '../controllers/sellerController.js';
import authSeller from '../middlewares/authSeller.js'; 

const sellerRouter = express.Router();

sellerRouter.post('/login', adminLogin);
sellerRouter.get('/is-auth', authSeller, isAuthSeller);
sellerRouter.post('/logout', logoutSeller);


export default sellerRouter;