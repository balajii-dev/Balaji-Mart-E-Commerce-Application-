import React, { useEffect, useMemo } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const ProductCard = ({ product, quantity, onUpdateCart }) => {
    const navigate = useNavigate();
    const { isLoggedin } = useAppContext();
    const productId = product._id || product.id;
    const imageSrc = Array.isArray(product.image) ? product.image[0] : product.image;

    const handleAction = (e, change) => {
        e.stopPropagation();
        
        if (onUpdateCart) {
            if (!isLoggedin) {
                onUpdateCart(product, change);
                return;
            }

            if (change > 0) {
                toast.success("Item added to cart");
            } else if (change < 0 && quantity > 0) {
                toast.error("Item removed from cart");
            }
            onUpdateCart(product, change);
        }
    };

    const handleBuyNow = (e) => {
        e.stopPropagation();
        
        if (!isLoggedin) {
            onUpdateCart(product, 1);
            return;
        }

        if (quantity === 0) onUpdateCart(product, 1);
        navigate('/cart');
    };

    return (
        <div className="rounded-xl p-4 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full group">
            <div className="cursor-pointer flex-grow" onClick={() => navigate(`/product/${productId}`)}>
                <div className="flex items-center justify-center mb-4 h-32 w-full bg-gray-50 rounded-lg overflow-hidden">
                    <img src={imageSrc} alt={product.name} className="max-h-24 object-contain group-hover:scale-110 transition duration-300" />
                </div>
                <div className="text-left">
                    <p className="text-gray-400 font-semibold text-[11px] uppercase tracking-wider">
                        {Array.isArray(product.category) ? product.category[0] : product.category}
                    </p>
                    <h3 className="text-gray-800 font-bold text-sm leading-tight h-9 mt-1 line-clamp-2">{product.name}</h3>
                </div>
            </div>
            
            <div className="flex flex-col gap-3 mt-auto pt-2">
                <div className="flex items-center justify-between">
                    <span className="text-gray-900 font-bold text-base">₹{product.offerPrice || product.price}</span>
                    
                    <div className="flex items-center">
                        {quantity === 0 ? (
                            <button 
                                onClick={(e) => handleAction(e, 1)} 
                                className="px-5 py-1.5 bg-green-600 text-white rounded-lg font-bold text-[11px] hover:bg-green-700 transition-all active:scale-95"
                            >
                                ADD
                            </button>
                        ) : (
                            <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-200">
                                <button 
                                    onClick={(e) => handleAction(e, -1)} 
                                    className="w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm"
                                >
                                    <span className="text-lg leading-none">-</span>
                                </button>
                                
                                <span className="px-3 text-xs font-bold text-gray-700 min-w-[30px] text-center">{quantity}</span>
                                
                                <button 
                                    onClick={(e) => handleAction(e, 1)} 
                                    className="w-7 h-7 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-sm"
                                >
                                    <span className="text-lg leading-none">+</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <button 
                    onClick={handleBuyNow}
                    className="w-full bg-red-600 text-white py-2 rounded-lg font-bold text-[11px] hover:bg-red-700 transition-all shadow-sm active:scale-95"
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default function AllProducts() {
    const { products, search = "", setSearch, cart = {}, handleUpdateCart } = useAppContext();
    const { category } = useParams();

    useEffect(() => { window.scrollTo(0, 0); }, [category, search]); 

    const filteredProducts = useMemo(() => {
        if (!products || products.length === 0) return [];
        return products.filter((item) => {
            const itemCat = Array.isArray(item.category) ? item.category[0] : item.category;
            const matchesCategory = category ? itemCat?.toLowerCase() === category.toLowerCase() : true;
            const matchesSearch = item.name?.toLowerCase().includes(search.toLowerCase()) || 
                                 itemCat?.toLowerCase().includes(search.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [category, search, products]);

    return (
        <div className="w-full py-10 px-4 md:px-10 min-h-screen bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 border-b border-gray-100 pb-6">
                    <h1 className="text-3xl font-bold text-gray-900 capitalize tracking-tight">
                        {category ? `${category}` : "All Products"}
                    </h1>
                    {search && (
                        <p className="text-gray-500 mt-2 text-sm italic">
                            Showing results for <span className="text-red-500 font-semibold">"{search}"</span>
                        </p>
                    )}
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                        {filteredProducts.map((item) => (
                            <ProductCard 
                                key={item._id || item.id} 
                                product={item} 
                                quantity={cart[item._id] || cart[item.id] || 0} 
                                onUpdateCart={handleUpdateCart} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center flex flex-col items-center">
                        <div className="text-5xl mb-4">🔍</div>
                        <h2 className="text-xl font-bold text-gray-800">No products found</h2>
                        <p className="text-gray-400 mt-1">We couldn't find anything matching your search.</p>
                        <button 
                            onClick={() => setSearch("")} 
                            className="mt-6 text-red-600 font-bold underline hover:text-red-700"
                        >
                            Clear search and see all products
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}