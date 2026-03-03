import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SellerLogin = () => {
    const { isSeller, setIsLoggedin, setIsSeller, setUser, axios, backendUrl, setToken, isAuthLoaded } = useAppContext();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Only redirect once Auth check is finished
    useEffect(() => {
        if (isAuthLoaded && isSeller) {
            navigate('/seller/products-list');
        }
    }, [isSeller, isAuthLoaded, navigate]);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const toastId = toast.loading("Verifying Seller Credentials..."); 
        
        try {
            const { data } = await axios.post(backendUrl + '/api/seller/login', { email, password });
            
            if (data.success) {
                // 1. Set Token first
                localStorage.setItem('token', data.token);
                setToken(data.token);
                
                const userData = data.user;

                // 2. Validate Seller Role
                if (userData && (userData.role === 'seller' || userData.isSeller === true)) {
                    setUser(userData);
                    setIsSeller(true);
                    setIsLoggedin(true);
                    
                    toast.success("Welcome, Seller!", { id: toastId });
                    navigate('/seller/products-list');
                } else {
                    toast.error("Access Denied: You are not a seller.", { id: toastId });
                    localStorage.removeItem('token');
                    setToken('');
                    setIsSeller(false);
                }
            } else {
                toast.error(data.message || "Invalid Seller Credentials", { id: toastId });
            }
        } catch (error) {
            console.error(error);
            toast.error("Connection error. Check backend server.", { id: toastId });
        }
    };

    // If still checking auth on refresh, show nothing or a loader to prevent flicker
    if (!isAuthLoaded) return null;

    return (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-gray-100 p-4'>
            <form onSubmit={onSubmitHandler} className='flex flex-col gap-4 p-6 sm:p-10 border border-gray-200 rounded-xl shadow-2xl bg-white w-full max-w-[450px] transition-all'>
                
                <h1 className='text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-2 sm:mb-4'>
                    Seller <span className='text-red-600'>Login</span>
                </h1>
                
                <div className='flex flex-col gap-1'>
                    <label className='font-semibold text-gray-700 text-sm'>Seller Email</label>
                    <input 
                        className='border border-gray-300 p-3 rounded-lg w-full outline-none focus:border-red-500 text-black text-base' 
                        type="email" 
                        value={email} 
                        placeholder='Enter your seller email' 
                        onChange={(e)=>setEmail(e.target.value)} 
                        required 
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <label className='font-semibold text-gray-700 text-sm'>Password</label>
                    <input 
                        className='border border-gray-300 p-3 rounded-lg w-full outline-none focus:border-red-500 text-black text-base' 
                        type="password" 
                        placeholder='Enter your password' 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)} 
                        required 
                    />
                </div>

                <button type="submit" className='bg-red-600 text-white py-3 rounded-lg mt-4 font-bold text-lg hover:bg-red-700 active:scale-95 transition-all shadow-md'>
                    Access Dashboard
                </button>
                
                <p className='text-center text-xs text-gray-400 mt-2 italic font-medium'>
                    Authorized Seller Only Can Access
                </p>
            </form>
        </div>
    );
};

export default SellerLogin;