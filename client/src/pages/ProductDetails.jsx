import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { 
        products, 
        cart, 
        handleUpdateCart, 
        isAuthLoaded, 
        isLoggedin, 
        setShowUserLogin 
    } = useAppContext();
    
    const [product, setProduct] = useState(null);

   
    useEffect(() => {
        if (isAuthLoaded && products.length > 0) {
            const found = products.find(item => (item._id || item.id) === id);
            if (found) {
                setProduct(found);
                window.scrollTo(0, 0);
            } else {
                navigate('/all-products');
            }
        }
    }, [id, products, isAuthLoaded, navigate]);

    // Memoized related products
    const relatedProducts = useMemo(() => {
        if (!product || !products.length) return [];
        const currentCat = Array.isArray(product.category) ? product.category[0] : product.category;
        
        return products
            .filter(item => {
                const itemCat = Array.isArray(item.category) ? item.category[0] : item.category;
                return itemCat === currentCat && (item._id || item.id) !== id;
            })
            .slice(0, 4);
    }, [product, products, id]);

    const handleBuyNow = async () => {
        if (!isLoggedin) {
            setShowUserLogin(true);
            return;
        }
        if (!cart[product._id]) {
            await handleUpdateCart(product, 1);
        }
        navigate('/cart');
    };

    if (!product) return <div className="p-20 text-center text-gray-500">Loading Product Details...</div>;

    const mainProductQty = cart[product._id] || 0;

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {/* Main Product Section */}
            <div className="flex flex-col md:flex-row gap-10 mb-16">
                <div className="flex-1 bg-white border p-8 rounded-2xl flex items-center justify-center shadow-sm">
                    <img 
                        src={Array.isArray(product.image) ? product.image[0] : product.image} 
                        className="max-h-[400px] object-contain hover:scale-105 transition-transform duration-300" 
                        alt={product.name} 
                    />
                </div>

                <div className="flex-1 flex flex-col justify-center">
                    <p className="text-red-600 font-bold uppercase text-sm mb-2 tracking-widest">
                        {Array.isArray(product.category) ? product.category[0] : product.category}
                    </p>
                    <h1 className="text-4xl font-extrabold mb-4 text-gray-800">{product.name}</h1>
                    <p className="text-3xl font-bold mb-8 text-gray-900">₹{product.price}</p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        {mainProductQty === 0 ? (
                            <button 
                                onClick={() => handleUpdateCart(product, 1)} 
                                className="border-2 border-red-600 text-red-600 px-10 py-4 rounded-xl font-bold flex-1 hover:bg-red-50 transition-colors"
                            >
                                Add to Cart
                            </button>
                        ) : (
                            <div className="flex items-center border-2 border-red-600 rounded-xl flex-1 bg-white">
                                <button onClick={() => handleUpdateCart(product, -1)} className="flex-1 text-2xl font-bold text-red-600 hover:bg-red-50 h-full rounded-l-lg">−</button>
                                <span className="flex-1 text-center font-bold text-xl">{mainProductQty}</span>
                                <button onClick={() => handleUpdateCart(product, 1)} className="flex-1 text-2xl font-bold text-red-600 hover:bg-red-50 h-full rounded-r-lg">+</button>
                            </div>
                        )}

                        <button 
                            onClick={handleBuyNow} 
                            className="bg-red-600 text-white px-10 py-4 rounded-xl font-bold flex-1 hover:bg-red-700 shadow-lg shadow-red-200 transition-all"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <div className="mt-20">
                    <h2 className="text-2xl font-extrabold mb-8 text-gray-800 border-b pb-4">Related Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedProducts.map(item => {
                            // Determine quantity for THIS specific related product
                            const itemQty = cart[item._id] || 0;

                            return (
                                <div 
                                    key={item._id} 
                                    onClick={() => navigate(`/product/${item._id}`)} 
                                    className="group border rounded-2xl p-4 cursor-pointer hover:shadow-xl transition-all flex flex-col bg-white"
                                >
                                    <div className="relative overflow-hidden mb-4 rounded-lg h-40 flex items-center justify-center">
                                        <img 
                                            src={Array.isArray(item.image) ? item.image[0] : item.image} 
                                            className="h-full object-contain group-hover:scale-110 transition-transform duration-300" 
                                            alt={item.name} 
                                        />
                                    </div>
                                    <h3 className="font-bold text-gray-800 truncate mb-1">{item.name}</h3>
                                    <p className="text-red-600 font-bold mb-4">₹{item.price}</p>
                                    
                        
                                    <div className="mt-auto">
                                        {itemQty === 0 ? (
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleUpdateCart(item, 1);
                                                }}
                                                className="w-full bg-gray-50 text-gray-700 py-2 rounded-lg text-sm font-bold border border-gray-200 hover:bg-red-600 hover:text-white transition-all"
                                            >
                                                + Add to Cart
                                            </button>
                                        ) : (
                                            <div 
                                                className="flex items-center border border-red-600 rounded-lg overflow-hidden bg-white"
                                                onClick={(e) => e.stopPropagation()} // Prevents navigating to product page when clicking controls
                                            >
                                                <button 
                                                    onClick={() => handleUpdateCart(item, -1)} 
                                                    className="flex-1 py-1 bg-red-50 text-red-600 font-bold hover:bg-red-600 hover:text-white transition-colors"
                                                >
                                                    −
                                                </button>
                                                <span className="flex-1 text-center font-bold text-sm text-gray-800">
                                                    {itemQty}
                                                </span>
                                                <button 
                                                    onClick={() => handleUpdateCart(item, 1)} 
                                                    className="flex-1 py-1 bg-red-50 text-red-600 font-bold hover:bg-red-600 hover:text-white transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;