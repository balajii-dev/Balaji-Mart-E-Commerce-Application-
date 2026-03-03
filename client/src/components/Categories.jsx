import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from "../context/AppContext";

const categories = [
  { name: "Vegetables", img: "organic_vegitable_image.png" },
  { name: "Fruits", img: "fresh_fruits_image.png" },
  { name: "Drinks", img: "bottles_image.png" },
  { name: "Instant", img: "maggi_image.png" },
  { name: "Dairy", img: "dairy_product_image.png" },
  { name: "Bakery", img: "bakery_image.png" },
  { name: "Grains", img: "grain_image.png" },
]

const Categories = () => {
  const navigate = useNavigate()
  const { setSearch } = useAppContext()

  return (
    <div className="px-6 md:px-15 py-10">
      <p className="font-semibold text-3xl mb-6 text-gray-800">Shop by Category</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() => {
                if(setSearch) setSearch(""); 
                navigate(`/all-products/${item.name}`); 
            }}
            className="bg-red-50 rounded-lg shadow-sm border border-red-100 p-4 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-center h-[120px]">
              <img src={item.img} alt={item.name} className="h-[100px] object-contain" />
            </div>
            <p className="text-center font-medium mt-2 text-gray-700">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories