import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: Object, default: { line1: '', line2: '', city: '', state: '', pincode: '', phone: '' } },
    cartData: { type: Object, default: {} },
    role: { type: String, default: 'user' }
}, { minimize: false });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;