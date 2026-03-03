import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login"; 
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import ProductDetails from "./pages/ProductDetails"; 
import AddAddress from "./pages/AddAddress"; 
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProducts from "./pages/seller/AddProducts";
import ProductsList from "./pages/seller/ProductsList";
import Orders from "./pages/seller/Orders";

const SellerGuard = ({ isSeller, isAuthLoaded, children }) => {
    if (!isAuthLoaded) return null; 
    return isSeller ? children : <Navigate to="/seller-login" replace />;
};

const App = () => {
    const location = useLocation();
    const { isSeller, isAuthLoaded, showUserLogin, isLoggedin } = useAppContext();
    const isSellerPage = location.pathname.startsWith("/seller") || location.pathname === "/seller-login";
    if (!isAuthLoaded && location.pathname !== "/seller-login") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Toaster position="top-center" containerStyle={{ zIndex: 100000 }} />
            {showUserLogin && <div className="fixed inset-0 z-[9999]"><Login /></div>}
            {!isSellerPage && <Navbar />}

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/all-products" element={<AllProducts />} />
                    <Route path="/all-products/:category" element={<AllProducts />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/add-address" element={<AddAddress />} />
                    <Route path="/my-orders" element={isLoggedin ? <MyOrders /> : <Navigate to="/" replace />} />
                    <Route path="/seller-login" element={isSeller ? <Navigate to="/seller/product-list" replace /> : <SellerLogin />} />

                    <Route path="/seller" element={
                        <SellerGuard isSeller={isSeller} isAuthLoaded={isAuthLoaded}>
                            <SellerLayout />
                        </SellerGuard>
                    }>
                        <Route index element={<Navigate to="product-list" replace />} />
                        <Route path="add-product" element={<AddProducts />} />
                        <Route path="product-list" element={<ProductsList />} />
                        <Route path="orders" element={<Orders />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            {!isSellerPage && <Footer />}
        </div>
    );
};

export default App;