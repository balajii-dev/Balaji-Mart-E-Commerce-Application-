import User from "../models/user.js"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.json({ success: false, message: "User not found" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        const userResponse = user.toObject();
        delete userResponse.password;

        res.cookie('token', token, cookieOptions);

        return res.json({ 
            success: true, 
            token, 
            user: userResponse
        });

    } catch (error) { 
        return res.json({ success: false, message: error.message }); 
    }
};

// Registerr
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.json({ success: false, message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({ 
            name, 
            email, 
            password: hashedPassword,
            role: 'user', 
            isSeller: false 
        });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, cookieOptions);
        
        return res.json({ 
            success: true, 
            token, 
            user: { name: user.name, email: user.email, role: user.role } 
        });
    } catch (error) { 
        return res.json({ success: false, message: error.message }); 
    }
};

// Is Auth
export const isAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        
        if (!user) return res.json({ success: false, message: "User not found" });
        return res.json({ 
            success: true, 
            user: user 
        });
    } catch (error) { 
        return res.json({ success: false, message: error.message }); 
    }
};

// update cart
export const updateCart = async (req, res) => {
    try {
        const { cartData } = req.body;
        await User.findByIdAndUpdate(req.userId, { cartData });
        return res.json({ success: true, message: "Cart Updated" });
    } catch (error) { 
        return res.json({ success: false, message: error.message }); 
    }
};

// Add Address
export const addAddress = async (req, res) => {
    try {
        const { address } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.userId, 
            { address }, 
            { new: true }
        ).select('-password');
        
        return res.json({ success: true, message: "Address saved!", user: updatedUser });
    } catch (error) { 
        return res.json({ success: false, message: error.message }); 
    }
};

// Logout
export const logout = async (req, res) => {
    res.clearCookie('token', cookieOptions);
    return res.json({ success: true, message: "Logged Out" });
};