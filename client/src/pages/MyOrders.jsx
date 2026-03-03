import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/AppContext'; 

const MyOrders = () => {
    const { backendUrl, isLoggedin, token } = useAppContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const activeToken = token || localStorage.getItem('token');
            
            if (!activeToken) {
                setError("Please login to view your orders.");
                setLoading(false);
                return;
            }

            const response = await axios.get(`${backendUrl}/api/order/user-orders`, {
                headers: { token: activeToken }
            });

            if (response.data.success) {
                setOrders(response.data.orders);
            } else {
                setError(response.data.message || "Failed to fetch orders");
            }
        } catch (err) {
            console.error("Frontend Fetch Error:", err);
            setError("Could not connect to Balaji Mart server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (backendUrl && isLoggedin) {
            fetchUserOrders();
        }
    }, [backendUrl, isLoggedin, token]);

    if (loading) return (
        <div className="flex flex-col justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-green-600 border-gray-200"></div>
        </div>
    );

    if (error) return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl text-center shadow-sm border">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-800">Notice</h2>
            <p className="text-gray-500 mt-2 text-sm">{error}</p>
            <button onClick={fetchUserOrders} className="mt-6 bg-red-600 text-white px-8 py-2 rounded-full font-semibold">
                Retry
            </button>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-8">📦 My Orders</h1>
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white border rounded-xl overflow-hidden shadow-sm">
                            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center flex-wrap gap-4">
                                <div className="flex gap-6">
                                    <div>
                                        <p className="text-[10px] uppercase text-gray-400 font-bold">Date</p>
                                        <p className="text-sm">{new Date(order.date).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase text-gray-400 font-bold">Total</p>
                                        <p className="text-sm font-bold">₹{order.amount}</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-700">
                                    {order.status}
                                </span>
                            </div>
                            <div className="divide-y">
                                {order.items?.map((item, idx) => (
                                    <div key={idx} className="p-4 flex items-center gap-4">
                                        <div className="w-16 h-16 border rounded flex-shrink-0">
                                            <img 
                                                src={Array.isArray(item.product?.image) ? item.product.image[0] : item.product?.image} 
                                                alt="" 
                                                className="w-full h-full object-contain p-1" 
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-sm text-gray-800">{item.product?.name || "Product Item"}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyOrders;