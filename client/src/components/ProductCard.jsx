import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { cart = {}, handleUpdateCart } = useAppContext();

  if (!product) return null;

  const productId = product._id || product.id;
  
  const quantity = cart && cart[productId] ? cart[productId] : 0;
  const imageSrc = Array.isArray(product.image) 
  ? product.image[0] 
  : (product.image || 'https://via.placeholder.com/150');

  const updateQuantity = (e, change) => {
    e.stopPropagation();
    if (handleUpdateCart) {
      handleUpdateCart(product, change);
    }
  };

  return (
    <div 
      onClick={() => navigate(`/product/${productId}`)}
      className="border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer bg-white group h-full flex flex-col"
    >
      <div className="bg-gray-50 rounded-lg h-40 flex items-center justify-center overflow-hidden mb-3">
        <img 
          src={imageSrc} 
          alt={product.name} 
          className="max-h-32 object-contain group-hover:scale-110 transition duration-300"
          onError={(e) => { e.target.src = "https://via.placeholder.com/150" }} 
        />
      </div>

      <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">
        {Array.isArray(product.category) ? product.category[0] : product.category}
      </p>

      <h3 className="font-bold text-gray-800 text-sm truncate mt-1">{product.name}</h3>

      <div className="flex items-center justify-between mt-auto pt-3">
        <span className="text-red-600 font-bold text-base">₹{product.offerPrice || product.price}</span>
        
        <div className="min-w-[80px] flex justify-end">
          {quantity === 0 ? (
            <button 
              onClick={(e) => updateQuantity(e, 1)}
              className="px-4 py-1.5 border border-red-500 text-red-500 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition-all"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center bg-red-500 text-white rounded-lg overflow-hidden">
              <button onClick={(e) => updateQuantity(e, -1)} className="px-3 py-1.5 text-xs font-bold">-</button>
              <span className="px-2 text-xs font-bold min-w-[20px] text-center">{quantity}</span>
              <button onClick={(e) => updateQuantity(e, 1)} className="px-3 py-1.5 text-xs font-bold">+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;