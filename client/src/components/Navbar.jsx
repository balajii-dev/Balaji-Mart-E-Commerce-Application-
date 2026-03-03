import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { 
    user, 
    isLoggedin, 
    search, setSearch, 
    cart, 
    products, 
    isSeller, 
    logout,
    setShowUserLogin 
  } = useAppContext();

  const cartCount = Object.entries(cart || {}).reduce((total, [key, qty]) => {
    const existsInProducts = products.some(p => p._id === key);
    const quantity = Number(qty);
    return (existsInProducts && quantity > 0) ? total + quantity : total;
  }, 0);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate('/');
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (window.location.pathname !== '/all-products') {
        navigate('/all-products');
    }
  };

  const linkClasses = ({ isActive }) => 
    `pb-1 border-b-2 transition-colors ${isActive ? "text-red-500 border-red-500" : "border-transparent hover:text-red-500"}`;

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white sticky top-0 z-50">
      <NavLink onClick={() => setOpen(false)} to="/" className="flex items-center">
        <img src="/balaji.png" alt="Balaji Mart" className="h-14 w-auto" />
        <span className="-ml-2 text-xl font-semibold">alaji <span className="font-bold">Mart</span></span>
      </NavLink>

      <div className="hidden sm:flex items-center gap-8">
        <NavLink to="/" className={linkClasses}>Home</NavLink>
        <NavLink to="/all-products" className={linkClasses}>All Products</NavLink>
        <NavLink to="/contact" className={linkClasses}>Contact</NavLink>
        
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
            value={search}
            onChange={handleSearchChange}
          />
          <img src="/search_icon.svg" alt="search" className="h-4 w-4" />
        </div>

        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src="/cart_icon.svg" alt="cart" className="w-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 text-[10px] flex items-center justify-center text-white bg-red-500 min-w-[18px] h-[18px] px-1 rounded-full font-bold">
              {cartCount}
            </span>
          )}
        </div>

        {!isLoggedin ? (
            <button onClick={() => setShowUserLogin(true)} className="px-8 py-2 bg-red-500 hover:bg-red-400 transition text-white rounded-full">Login</button>
        ) : ( 
            <div className="relative group">
                <img src="/profile_icon.png" alt="profile" className="w-10 cursor-pointer"/>
                <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow-lg border border-gray-200 py-3 w-40 rounded-md text-sm z-40">
                    <li onClick={() => navigate(isSeller ? '/seller/product-list' : '/my-profile')} className="p-2 pl-3 hover:bg-red-100 cursor-pointer">
                        {isSeller ? "Dashboard" : "My Profile"}
                    </li>
                    <li onClick={() => navigate('/my-orders')} className="p-2 pl-3 hover:bg-red-100 cursor-pointer">My Orders</li>
                    <hr className="my-1 border-gray-100" />
                    <li onClick={handleLogout} className="p-2 pl-3 hover:bg-red-100 cursor-pointer text-gray-700">Logout</li>
                </ul>
            </div> 
        )}
      </div>

      <button onClick={() => setOpen(!open)} className="sm:hidden">
        <img src="/menu_icon.svg" alt="menu" />
      </button>

      {open && (
        <div className="absolute top-[80px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm md:hidden z-50">
          <NavLink to="/" onClick={() => setOpen(false)} className="py-2 w-full border-b">Home</NavLink>
          <NavLink to="/all-products" onClick={() => setOpen(false)} className="py-2 w-full border-b">All Products</NavLink>
          <NavLink to="/cart" onClick={() => setOpen(false)} className="py-2 w-full border-b flex justify-between">
            Cart <span>({cartCount})</span>
          </NavLink>
          {!isLoggedin ? (
             <button onClick={() => { setShowUserLogin(true); setOpen(false); }} className="text-red-500 py-2 font-bold text-left w-full">Login</button>
          ) : (
             <button onClick={handleLogout} className="text-red-500 py-2 font-bold text-left w-full">Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;