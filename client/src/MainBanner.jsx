import React from "react";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    /* RESPONSIVE MARGINS: 
       - mx-4 on mobile to prevent the "thin strip" look
       - mx-10 on tablets
       - mx-20 on large screens (your original design)
    */
    <div className="relative mx-4 sm:mx-10 md:mx-20 mt-6 overflow-hidden">
      
      {/* BACKGROUND IMAGE: 
          - Fixed height on mobile (h-[250px]) to ensure text space
          - object-cover prevents image distortion 
      */}
      <img 
        src="bg.png" 
        alt="banner" 
        className="rounded-lg w-full h-[250px] sm:h-[350px] md:h-auto object-cover" 
      />

      {/* CONTENT OVERLAY: 
          - Centers content vertically
          - Adds padding relative to screen size 
      */}
      <div className="absolute inset-0 flex flex-col items-start justify-center px-6 sm:px-12 md:pl-24">
        
        {/* HEADING: 
            - text-xl on mobile scaling to text-5xl on desktop
            - max-w limits the width so it doesn't overlap the 'place!' graphic 
        */}
        <h1 className="text-xl sm:text-3xl md:text-5xl font-bold text-left max-w-[200px] sm:max-w-md lg:w-[500px] text-gray-900 leading-tight">
          Everything your home needs, in one place!
        </h1>

        {/* BUTTON GROUP: 
            - Stacks vertically on tiny screens to avoid squashing
            - Switches to horizontal (flex-row) on larger screens 
        */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center mt-4 md:mt-6 font-medium gap-2 sm:gap-4">
          <Link
            to={"/all-products"}
            className="group flex items-center gap-2 px-5 md:px-7 py-2 md:py-3 bg-gray-900 hover:bg-gray-800 transition rounded text-white cursor-pointer text-xs md:text-base whitespace-nowrap shadow-sm"
          >
            Shop Now 
            <img src="white_arrow_icon.svg" alt="arrow" className="w-3 md:w-4" />
          </Link>

          <Link
            to={"/all-products"}
            className="group flex items-center gap-2 px-5 md:px-7 py-2 md:py-3 cursor-pointer text-xs md:text-base whitespace-nowrap text-gray-900 hover:underline"
          >
            Explore Deals
            <img src="black_arrow_icon.svg" alt="arrow" className="w-3 md:w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;