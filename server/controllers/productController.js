import { v2 as cloudinary } from "cloudinary"
import Product from "../models/Product.js"

export const addProduct = async (req, res) => {
    try {
        if (!req.body.productData) {
            return res.status(400).json({ success: false, message: "Product data is missing" });
        }

        let productData = JSON.parse(req.body.productData);
        const images = req.files || [];

        if (images.length === 0) {
            return res.status(400).json({ success: false, message: "Please upload at least one image" });
        }
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        )
        await Product.create({ 
            ...productData, 
            image: imagesUrl[0],
            images: imagesUrl   
        });

        res.json({ success: true, message: "Product Added successfully" });

    } catch (error) {
        console.error("Backend Error:", error); // Logs actual error to your terminal
        res.status(500).json({ success: false, message: error.message });
    }
}

export const productList = async (req, res) => {
    try {
        const products = await Product.find({}); 
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, { inStock }); 
        res.json({ success: true, message: "Stock Updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}