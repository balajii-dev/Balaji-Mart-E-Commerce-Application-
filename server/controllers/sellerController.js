import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
            const token = jwt.sign({ email, role: 'seller' }, process.env.JWT_SECRET, { expiresIn: "7d" });
            
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000, 
            });

            return res.json({ 
                success: true, 
                token, 
                user: { 
                    email, 
                    role: 'seller', 
                    isSeller: true 
                }, 
                message: "Logged in as Seller" 
            });

        } else {
            return res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const isAuthSeller = async (req, res) => {
    try {
        return res.json({ 
            success: true, 
            user: { 
                email: process.env.SELLER_EMAIL, 
                role: 'seller', 
                isSeller: true 
            }
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const logoutSeller = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        });
        return res.json({ success: true, message: "Seller Logged Out" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};