import express from "express";
import "dotenv/config"; 
import cookieParser from "cookie-parser";
import cors from "cors";
import ConnectedDB from "./configs/db.js"; 
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT || 5000;

ConnectedDB();
connectCloudinary();


app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "token"] 
}));

// API ROUTES
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);

app.get("/", (req, res) => res.send("API Is Working"));

app.listen(port, () => console.log(`Server running on port ${port}`));