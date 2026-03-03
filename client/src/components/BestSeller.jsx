import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
  const { products } = useAppContext();
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setBestSellers(products.slice(0, 5));
    }
  }, [products]);

  return (
    <div className='mt-10 px-4 md:px-15'>
      <p className='font-bold text-3xl mb-6'>
        Best <span className='text-red-600'>Sellers</span>
      </p>
      
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
        {bestSellers.length > 0 ? (
          bestSellers.map((item) => (
            <ProductCard 
              key={item._id || item.id} 
              product={item} 
            />
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-gray-400">
            Fetching latest products...
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSeller;