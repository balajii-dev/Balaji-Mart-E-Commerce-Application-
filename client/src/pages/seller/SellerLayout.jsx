import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext"; 
import { toast } from "react-hot-toast"; 

const SellerLayout = () => {
  const navigate = useNavigate();
  const { logout, axios, backendUrl } = useAppContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
        await axios.post(backendUrl + '/api/seller/logout'); 
    } catch (error) {
        console.log("Server logout ignored");
    } finally {
        logout(); 
        toast.success("Logged out successfully", { id: toastId });
        navigate("/");
    }
  };

  const menuItems = [
    { name: "Add Product", path: "/seller/add-product", icon: "bi-plus-circle" },
    { name: "Product List", path: "/seller/product-list", icon: "bi-list-ul" },
    { name: "Orders", path: "/seller/orders", icon: "bi-box-seam" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
   
      <header className="flex items-center justify-between px-4 md:px-8 border-b border-gray-200 py-3 bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center">
          <img src="/balaji.png" alt="Balaji Mart" className="h-10 md:h-14 w-auto" />
          <span className="-ml-1 md:-ml-2 text-lg md:text-xl font-semibold text-gray-800">
            alaji <span className="font-bold text-red-600">Mart</span>
          </span>
        </div>
        
        <div className="flex items-center gap-3 md:gap-5">
          <span className="hidden sm:block text-gray-600 font-medium italic text-sm">
            Hello, <span className="text-gray-900 font-bold not-italic">Admin</span>
          </span>
          <button 
            onClick={handleLogout} 
            className="bg-red-600 text-white rounded-lg text-xs md:text-sm px-4 md:px-6 py-2 hover:bg-red-700 transition-all font-medium active:scale-95"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
     
        <aside className="hidden md:flex md:w-64 border-r border-gray-200 bg-white pt-4 flex-col sticky top-[73px] h-[calc(100vh-73px)]">
          {menuItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => 
                `flex items-center py-4 px-6 gap-3 transition-all border-r-4 ${
                  isActive 
                    ? "bg-red-50 border-red-600 text-red-600 font-bold" 
                    : "border-transparent text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <i className={`bi ${item.icon} text-xl`}></i>
              <span className="block">{item.name}</span>
            </NavLink>
          ))}
          <div className="mt-auto p-6 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">Balaji Mart Seller</p>
          </div>
        </aside>

        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center z-[100] h-16 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
          {menuItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => 
                `relative flex flex-col items-center justify-center w-full h-full gap-1 transition-all ${
                  isActive ? "text-red-600 font-bold" : "text-gray-500"
                }`
              }
            >
              <i className={`bi ${item.icon} text-xl`}></i>
              <span className="text-[9px] uppercase font-bold tracking-tighter">
                {item.name.includes("Add") ? "Add" : item.name.split(' ')[0]}
              </span>
             
              <div className={`absolute top-0 w-10 h-1 bg-red-600 rounded-b-full transition-opacity duration-300 ${
                
                location.pathname === item.path ? "opacity-100" : "opacity-0"
              }`}></div>
            </NavLink>
          ))}
        </nav>
        <main className="flex-1 p-3 md:p-10 mb-20 md:mb-0 overflow-y-auto">
          <div className="max-w-5xl mx-auto bg-white p-4 md:p-8 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm min-h-[60vh]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;