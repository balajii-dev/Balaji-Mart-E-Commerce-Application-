import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
    try {
        const { sellerToken } = req.cookies;

        if (!sellerToken) {
            return res.json({ success: false, message: "Not Authorized. Login Again" });
        }

        const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
      
        if (decoded.email !== process.env.SELLER_EMAIL) {
            return res.json({ success: false, message: "Not Authorized." });
        }

        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export default authSeller;