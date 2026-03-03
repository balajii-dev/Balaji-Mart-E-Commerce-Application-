import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddProducts = () => {
    const { axios, backendUrl, fetchProducts } = useAppContext();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([null, null, null, null]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [offerPrice, setOfferPrice] = useState("");

    const categories = ['Vegetables', 'Fruits', 'Dairy', 'Drinks', 'Grains', 'Bakery', 'Instant'];

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = file; 
            newImages[index].preview = URL.createObjectURL(file);
            setImages(newImages);
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            if (!category) {
                setLoading(false);
                return toast.error("Please select a category");
            }

            const productData = {
                name,
                description: description.split('\n').filter(line => line.trim() !== ""), 
                category,
                price: Number(price),
                offerPrice: Number(offerPrice)
            };

            const formData = new FormData();
            formData.append('productData', JSON.stringify(productData));

            images.forEach((img) => {
                if (img instanceof File) {
                    formData.append('images', img);
                }
            });

            const { data } = await axios.post(`${backendUrl}/api/product/add`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            if (data.success) {
                toast.success(data.message || "Product Added successfully!");
                
                if (fetchProducts) {
                    await fetchProducts();
                }

                setName("");
                setDescription("");
                setCategory("");
                setPrice("");
                setOfferPrice("");
                setImages([null, null, null, null]);
                
                navigate("/seller/product-list");
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error("Submission error:", error);
            toast.error(error.response?.data?.message || "Failed to add product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-between bg-white min-h-screen">
            <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-6 max-w-2xl">
                
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Add New <span className="text-red-600">Product</span></h2>
                    <p className="text-sm text-gray-500">Fill in the details to list a new item in the store.</p>
                </div>

                <div>
                    <p className="text-base font-semibold mb-3 text-gray-700">Product Images</p>
                    <div className="flex flex-wrap items-center gap-4">
                        {images.map((img, index) => (
                            <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
                                <input 
                                    accept="image/*" 
                                    type="file" 
                                    id={`image${index}`} 
                                    hidden 
                                    disabled={loading} 
                                    onChange={(e) => handleImageChange(e, index)}
                                />
                                {img ? (
                                    <div className="relative group">
                                        <img 
                                            className={`w-28 h-28 object-cover border-2 border-red-100 rounded-lg shadow-sm ${loading ? 'opacity-50' : ''}`} 
                                            src={img.preview} 
                                            alt="preview" 
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center text-white text-xs">Change</div>
                                    </div>
                                ) : (
                                    <div className="w-28 h-28 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-all bg-gray-50">
                                        <span className="text-3xl">+</span>
                                        <span className="text-xs mt-1 font-medium">Upload</span>
                                    </div>
                                )}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5 col-span-full">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Product Name</label>
                        <input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="outline-none py-3 px-4 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" 
                            type="text" 
                            placeholder="Product Name" 
                            required 
                            disabled={loading}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 col-span-full">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Description (One point per line)</label>
                        <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4} 
                            className="outline-none py-3 px-4 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none transition-all" 
                            placeholder="Description for the product"
                            disabled={loading}
                        ></textarea>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Category</label>
                        <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="outline-none py-3 px-4 rounded-lg border border-gray-300 bg-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all cursor-pointer"
                            required
                            disabled={loading}
                        >
                            <option value="">Select Category</option>
                            {categories.map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">MRP (₹)</label>
                            <input 
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                type="number" 
                                placeholder="0.00" 
                                className="outline-none py-3 px-4 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all" 
                                required 
                                disabled={loading}
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-700 uppercase tracking-tight">Offer Price (₹)</label>
                            <input 
                                value={offerPrice}
                                onChange={(e) => setOfferPrice(e.target.value)}
                                type="number" 
                                placeholder="0.00" 
                                className="outline-none py-3 px-4 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-red-600 font-semibold" 
                                disabled={loading}
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex gap-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`min-w-[200px] px-10 py-4 text-white font-black rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 uppercase tracking-widest ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 active:scale-95'}`}
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Processing...
                            </>
                        ) : (
                            "Add Product"
                        )}
                    </button>
                    <button 
                        type="button"
                        onClick={() => navigate("/seller/product-list")}
                        className="px-8 py-4 border border-gray-300 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProducts;