import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext"; 
import toast from "react-hot-toast";

const ProductsList = () => {
    const { products, isAuthLoaded, fetchProducts, axios, backendUrl, token } = useAppContext();
    useEffect(() => {
        fetchProducts();
    }, []);

    const toggleStock = async (id, currentStatus) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/product/stock`, 
                { id, inStock: !currentStatus },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                await fetchProducts(); 
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update stock");
        }
    };

    if (!isAuthLoaded) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-red-500"></div>
                <p className="ml-3 text-gray-500">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="flex-1 p-4 md:p-10 min-h-screen bg-gray-50/50">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">All Products</h2>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b text-gray-500 text-xs uppercase font-semibold bg-gray-50">
                                <th className="px-8 py-5">Product</th>
                                <th className="px-8 py-5">Category</th>
                                <th className="px-8 py-5">Price</th>
                                <th className="px-8 py-5 text-center">In Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((item) => (
                                <tr key={item._id} className="border-b hover:bg-gray-50 transition-colors">
                                    <td className="px-8 py-5 flex items-center gap-4">
                                        <img src={item.image?.[0]} className="h-12 w-12 object-contain rounded border bg-white" alt="" />
                                        <span className="font-medium text-gray-700">{item.name}</span>
                                    </td>
                                    <td className="px-8 py-5 text-gray-500">{item.category}</td>
                                    <td className="px-8 py-5 font-bold text-gray-900">₹{item.offerPrice}</td>
                                    <td className="px-8 py-5 text-center">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                className="sr-only peer" 
                                                checked={item.inStock !== false} 
                                                onChange={() => toggleStock(item._id, item.inStock)}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
                                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5 shadow-sm"></div>
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {products?.length === 0 && <div className="p-20 text-center text-gray-400">No products found.</div>}
            </div>
        </div>
    );
};

export default ProductsList;