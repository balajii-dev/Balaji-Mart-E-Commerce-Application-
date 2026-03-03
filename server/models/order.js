import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [{

        product: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'product',
            required: true 
        }, 
        quantity: { type: Number, required: true }
    }],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'Order Placed' },
    paymentType: { type: String, required: true },
    isPaid: { type: Boolean, default: false },
    // Adding date here to match your controller logic
    date: { type: Number, required: true } 
}, { timestamps: true });

const Order = mongoose.models.order || mongoose.model('order', orderSchema);
export default Order;