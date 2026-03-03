import React from "react";

export default function Footer() {
  const handleClick = (e) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full from-[#F1EAFF] to-[#FFFFFF] text-gray-800">
      <div className=" mt-25 bg-red-100 max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
        <a
          href="/"
          onClick={handleClick}
          className="flex items-center mb-6 group cursor-pointer"
        >
          <img
            src="/balaji.png"
            alt="Balaji Mart"
            className="h-14 w-auto object-contain transition-transform"
          />
          <span className="text-2xl font-semibold tracking-tighter -ml-1.5 text-gray-900">
            alaji <span className="font-extrabold text-black">Mart</span>
          </span>
        </a>

        <p className="text-center max-w-xl text-sm font-medium leading-relaxed text-gray-600">
          From the farm to your front door. We source the freshest local
          ingredients so you can serve the very best. Quality you can taste,
          prices you’ll love.
        </p>
      </div>

      <div className="border-t border-gray-200">
        <div className="max-w-7xl  bg-red-100 mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-normal text-gray-500">
          <p>© 2025 Balaji Mart. All rights reserved.</p>

          <div className="flex gap-6">
            <a
              href="/"
              onClick={handleClick}
              className="hover:text-red-500 transition-colors"
            >
              balajimart.dev
            </a>
            <a
              href="/"
              onClick={handleClick}
              className="hover:text-red-500 transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
