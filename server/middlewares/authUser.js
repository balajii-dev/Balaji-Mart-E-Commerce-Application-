import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.token; 

        if (!token) {
            return res.json({ success: false, message: "Not Authorized. Login again." });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.id) {
            req.userId = decoded.id;
            next();
        } else {
            return res.json({ success: false, message: "Invalid Token." });
        }
    } catch (error) {
        return res.json({ success: false, message: "Session expired." });
    }
};

export default authUser;