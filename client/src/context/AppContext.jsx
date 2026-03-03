import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios'; 
import { toast } from 'react-hot-toast';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"; 
    const [isLoggedin, setIsLoggedin] = useState(false); 
    const [isSeller, setIsSeller] = useState(false); 
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]); 
    const [isAuthLoaded, setIsAuthLoaded] = useState(false); 
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [cart, setCart] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [search, setSearch] = useState(""); 

    axios.defaults.withCredentials = true;

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setIsLoggedin(false);
        setIsSeller(false);
        setUser(null);
        setCart({});
        toast.success("Logged out successfully");
    };

    const getUserData = async (passedToken) => {
        try {
            const activeToken = passedToken || token || localStorage.getItem('token');
            if (!activeToken) {
                setIsAuthLoaded(true); // Stop loading if no token
                return null;
            }
            
            const { data } = await axios.get(backendUrl + '/api/user/is-auth', {
                headers: { token: activeToken }
            });

            if (data.success) {
                setUser(data.user);
                setIsLoggedin(true); 
                setCart(data.user.cartData || {});
                
                // CRITICAL FIX: Ensure isSeller is set on refresh
                const sellerStatus = !!(data.user.role === 'seller' || data.user.isSeller === true);
                setIsSeller(sellerStatus);
                
                return data;
            }
        } catch (error) { 
            console.error("Auth Error:", error);
            setIsLoggedin(false); 
            setIsSeller(false);
            return null;
        }
    };

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/product/list');
            if (data.success) setProducts(data.products);
        } catch (error) { 
            console.error("Error fetching products:", error); 
        }
    };

    const handleUpdateCart = async (product, change) => {
        if (!isLoggedin) {
            toast.error("Please login first");
            setShowUserLogin(true);
            return;
        }
        const productId = product._id || product.id;
        let cartCopy = structuredClone(cart);
        const newQty = (cartCopy[productId] || 0) + change;

        if (newQty > 0) cartCopy[productId] = newQty;
        else delete cartCopy[productId];
        
        setCart(cartCopy);
        try {
            await axios.post(backendUrl + '/api/user/update-cart', { cartData: cartCopy }, { headers: { token: token } });
        } catch (e) { 
            console.error(e); 
        }
    };

    // This handles the refresh persistence
    useEffect(() => {
        const init = async () => {
            await Promise.all([getUserData(), fetchProducts()]);
            setIsAuthLoaded(true); 
        };
        init();
    }, []);

    const value = { 
        user, setUser, isLoggedin, setIsLoggedin, isSeller, setIsSeller, 
        products, setProducts, isAuthLoaded, showUserLogin, setShowUserLogin, 
        handleUpdateCart, cart, setCart, getUserData, fetchProducts, 
        logout, axios, backendUrl, token, setToken, search, setSearch 
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);