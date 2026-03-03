import React, { useState, useEffect } from 'react';
import { useAppContext } from "../../context/AppContext";
import { toast } from 'react-hot-toast';

const Orders = () => {
    const { token, backendUrl, axios } = useAppContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllOrders = async () => {
        try {
            setLoading(true);
            const activeToken = token || localStorage.getItem('token');
            
            const response = await axios.get(`${backendUrl}/api/order/all-orders`, {
                headers: { token: activeToken }
            });

            if (response.data.success) {
                setOrders(Array.isArray(response.data.orders) ? response.data.orders.reverse() : []);
            }
        } catch (error) {
            console.error("Database Fetch Error:", error);
            toast.error("Could not connect to Balaji Mart server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token || localStorage.getItem('token')) {
            fetchAllOrders();
        }
    }, [token]);

    if (loading) return (
        <div className="flex flex-col justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-red-600 border-gray-200"></div>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen p-4 md:p-8 text-gray-800">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold italic text-slate-800">📦 All Customer Orders</h1>
                </div>

                <div className="space-y-8">
                    {orders.length === 0 ? (
                        <div className="bg-white p-20 text-center rounded-2xl border-2 border-dashed border-slate-200 italic text-gray-400">
                            No orders found in database.
                        </div>
                    ) : (
                        orders.map((order) => (
                            <div key={order._id} className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                            
                                <div className="bg-white px-8 py-5 border-b-2 border-slate-100 flex justify-between items-center flex-wrap gap-4">
                                    <div className="flex gap-16">
                                        <div>
                                            <p className="text-[10px] uppercase text-slate-400 font-extrabold tracking-widest">Date</p>
                                            <p className="text-sm font-bold mt-1 text-slate-700">
                                                {new Date(order.date || order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase text-slate-400 font-extrabold tracking-widest">Total Amount</p>
                                            <p className="text-sm font-bold mt-1 text-green-600">
                                                ₹{order.amount || order.totalAmount}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <button className="px-6 py-1.5 rounded-full text-[10px] font-bold uppercase border-2 border-red-600 textred-400">
                                        {order.status || "Order Placed"}
                                    </button>
                                </div>

                                {/* ITEMS LIST: Image, Name, Qty, and Order ID */}
                                <div className="divide-y-2 divide-slate-50">
                                    {(order.items || order.products)?.map((item, idx) => (
                                        <div key={idx} className="px-8 py-6 flex items-center justify-between gap-6">
                                            <div className="flex items-center gap-6">
                                                <div className="w-20 h-20 border-2 border-slate-100 rounded-xl flex-shrink-0 bg-white">
                                                    <img 
                                                        src={Array.isArray(item.product?.image) ? item.product.image[0] : (item.product?.image || item.image)} 
                                                        alt="" 
                                                        className="w-full h-full object-contain p-2" 
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-extrabold text-base text-slate-800 tracking-tight">
                                                        {item.product?.name || item.name}
                                                    </p>
                                                    <p className="text-sm text-slate-500 mt-1 font-semibold">
                                                        Qty: <span className="text-slate-800">{item.quantity}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right flex flex-col items-end gap-1">
                                                <p className="text-[11px] text-slate-300 font-mono italic">#{order._id.slice(-8)}</p>
                                                <p className="text-[11px] font-black text-red-400 uppercase tracking-tighter">
                                                    {order.paymentMethod || "COD"}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Footer removed as requested */}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;