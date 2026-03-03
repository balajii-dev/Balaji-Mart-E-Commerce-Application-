import Order from "../models/order.js";
import User from "../models/user.js";
import Product from "../models/product.js";

export const placeOrderCOD = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.userId; 
        if (!userId) {
            return res.json({ success: false, message: "User identification failed. Please login again." });
        }

        if (!address || !items || items.length === 0) {
            return res.json({ success: false, message: "Invalid data: Missing address or items" });
        }
        let subtotal = 0;
        for (const item of items) {
            const productInfo = await Product.findById(item.product);
            if (productInfo) {
                // Ensure price is a number and fallback to price if offerPrice is missing
                const price = productInfo.offerPrice || productInfo.price || 0;
                subtotal += price * item.quantity;
            } else {
                return res.json({ success: false, message: `Product not found for ID: ${item.product}` });
            }
        }

        const tax = subtotal * 0.02;
        const shippingFee = (subtotal > 500 || subtotal === 0) ? 0 : 40;
        const finalAmount = Math.round(subtotal + tax + shippingFee);

        const orderData = {
            userId,
            items,
            address,
            amount: finalAmount,
            paymentType: "COD",
            payment: false,   
            isPaid: false,      
            status: "Order Placed", 
            date: Date.now() 
        };

        const newOrder = new Order(orderData);
        await newOrder.save();
        await User.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed Successfully" });

    } catch (error) {
        console.error("CRITICAL ORDER ERROR:", error); 
        res.json({ success: false, message: error.message || "Order failed" });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId; 
        const orders = await Order.find({ userId })
            .populate("items.product")
            .sort({ date: -1 });

        res.json({ success: true, orders });

    } catch (error) {
        console.log("Fetch Orders Error:", error.message);
        res.json({ success: false, message: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("items.product")
            .sort({ date: -1 });

        res.json({ success: true, orders });

    } catch (error) {
        console.log("Admin Orders Error:", error.message);
        res.json({ success: false, message: error.message });
    }
};