import express from "express";
import authUser from "../middlewares/authUser.js"; 
import { isAuth, updateCart, login, register, logout, addAddress } from "../controllers/userController.js"; 

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', logout);

userRouter.get('/is-auth', authUser, isAuth);
userRouter.post('/update-cart', authUser, updateCart);
userRouter.post('/save-address', authUser, addAddress); 

export default userRouter;