import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
    const { products, cart, setCart, handleUpdateCart, user, axios, backendUrl, token } = useAppContext();
    const [paymentOption, setPaymentOption] = useState("COD");
    const navigate = useNavigate();

    useEffect(() => { 
        window.scrollTo(0, 0); 
    }, []);

    const userAddress = user?.address || null;

    const cartItems = products
        .filter(product => {
            const productId = product._id;
            return productId && cart[productId] && Number(cart[productId]) > 0;
        })
        .map(product => ({ ...product, quantity: Number(cart[product._id]) }));
    const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.offerPrice || item.price) * item.quantity), 0);
    const shippingFee = (subtotal > 500 || subtotal === 0) ? 0 : 40;
    const tax = subtotal * 0.02;
    const totalAmount = subtotal + shippingFee + tax;

    const placeOrder = async () => {
        try {
            if (cartItems.length === 0) return toast.error("Your cart is empty");

            if (!userAddress || !userAddress.street) {
                return toast.error("Please add a delivery address");
            }

            const orderData = {
                userId: user._id, 
                address: userAddress,
                items: cartItems.map(item => ({
                    product: item._id,
                    quantity: item.quantity
                })),
                amount: totalAmount,
                paymentType: paymentOption
            };

            if (paymentOption === "COD") {
                const { data } = await axios.post(
                    backendUrl + '/api/order/cod', 
                    orderData, 
                    { headers: { token } } 
                );

                if (data.success) {
                    setCart({}); 
                    toast.success(data.message);
                    navigate('/my-orders');
                } else {
                    toast.error(data.message);
                }
            } else {
                toast.info("Online payment integration coming soon!");
            }
        } catch (error) {
            // Log full error for debugging and show message to user
            console.error("Order error detail:", error.response?.data);
            toast.error(error.response?.data?.message || "Order failed");
        }
    };

    const displayAddress = userAddress?.street 
        ? `${userAddress.firstName} ${userAddress.lastName}, ${userAddress.street}, ${userAddress.city}, ${userAddress.state}` 
        : "No delivery address found. Please add one to continue.";
    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 min-h-[70vh] px-6 text-center">
                <div className="bg-gray-100 p-8 rounded-full mb-6 text-gray-300">
                   <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
                </div>
                <h1 className="text-2xl font-semibold text-gray-800">Your cart is empty</h1>
                <p className="text-gray-500 mt-2 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <button onClick={() => navigate('/all-products')} className="px-10 py-3 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-all shadow-md active:scale-95">
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto min-h-[70vh]">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6 text-gray-800">
                    Shopping Cart <span className="text-sm text-red-500 font-bold ml-2">{cartItems.length} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3 border-b border-gray-100">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartItems.map((item) => (
                    <div key={item._id} className="grid grid-cols-[2fr_1fr_1fr] text-gray-600 items-center py-4 border-b border-gray-50">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div className="w-24 h-24 flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden bg-white shrink-0 cursor-pointer" onClick={() => navigate(`/product/${item._id}`)}>
                                <img className="max-h-full object-contain p-2" src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.name} />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 leading-tight">{item.name}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <p className="text-xs text-gray-400 font-bold uppercase">Qty:</p>
                                    <select 
                                        className='outline-none bg-gray-100 px-2 py-0.5 rounded cursor-pointer text-red-500 font-bold text-sm'
                                        value={item.quantity}
                                        onChange={(e) => handleUpdateCart(item, Number(e.target.value) - item.quantity)}
                                    >
                                        {[...Array(10)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <p className="text-center font-bold text-gray-800">₹{(Number(item.offerPrice || item.price) * item.quantity).toLocaleString()}</p>
                        <button 
                            onClick={() => handleUpdateCart(item, -item.quantity)} 
                            className="cursor-pointer mx-auto text-red-500 text-sm hover:font-bold transition-all"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="max-w-[360px] w-full bg-gray-50 p-6 max-md:mt-16 border border-gray-200 rounded-lg h-fit sticky top-10 md:ml-10">
                <h2 className="text-xl font-medium text-gray-800">Order Summary</h2>
                <hr className="border-gray-200 my-5" />

                <div className="mb-6">
                    <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">Delivery Address</p>
                    <div className="flex justify-between items-start mt-2 gap-4">
                        <p className={`text-sm leading-relaxed ${userAddress ? 'text-gray-600' : 'text-red-400 italic'}`}>
                            {displayAddress}
                        </p>
                        <button onClick={() => navigate('/add-address')} className="text-red-500 text-sm font-semibold hover:underline whitespace-nowrap">
                            {userAddress ? "Change" : "Add"}
                        </button>
                    </div>

                    <p className="text-xs font-bold uppercase text-gray-400 mt-8 tracking-wider">Payment Method</p>
                    <select 
                        value={paymentOption}
                        onChange={(e) => setPaymentOption(e.target.value)}
                        className="w-full border border-gray-200 bg-white px-3 py-2 mt-2 text-sm rounded focus:border-red-500 outline-none cursor-pointer"
                    >
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-200" />
                <div className="text-gray-500 mt-6 space-y-3 text-sm">
                    <p className="flex justify-between"><span>Price</span><span className="text-gray-800">₹{subtotal.toFixed(2)}</span></p>
                    <p className="flex justify-between"><span>Shipping</span><span className="text-gray-800 font-medium">{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</span></p>
                    <p className="flex justify-between"><span>Tax (2%)</span><span className="text-gray-800">₹{tax.toFixed(2)}</span></p>
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-4 border-t mt-4">
                        <span>Total:</span><span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                </div>

                <button onClick={placeOrder} className="w-full py-4 mt-8 bg-red-500 text-white font-bold rounded shadow-lg hover:bg-red-600 active:scale-95 transition-all">
                    {paymentOption === "COD" ? "Place Order" : "Proceed to Payment"}
                </button>
            </div>
        </div>
    );
};

export default Cart;