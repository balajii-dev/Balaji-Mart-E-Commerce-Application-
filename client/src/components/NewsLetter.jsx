import React from 'react';

const NewsLetter = () => {
    return (
        <div className="mt-10 md:mt-18 px-4 flex flex-col items-center justify-center text-center space-y-2">
            <h1 className="text-2xl md:text-4xl font-semibold text-gray-900">
                Never Miss a Deal!
            </h1>
            
            <p className="text-sm md:text-lg text-gray-500/70 pb-6 md:pb-8 max-w-lg">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts
            </p>
            <form 
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row items-center justify-center max-w-2xl w-full gap-0"
            >
                <input
                    className="w-full h-12 md:h-13 px-4 border border-gray-300 outline-none text-gray-600 rounded-md sm:rounded-r-none border-b-0 sm:border-b sm:border-r-0 transition-focus focus:border-red-400"
                    type="email"
                    placeholder="Enter your email id"
                    required
                />
                
                <button 
                    type="submit" 
                    className="w-full sm:w-auto md:px-12 px-8 h-12 md:h-13 text-white bg-red-500 hover:bg-red-600 transition-all cursor-pointer rounded-md sm:rounded-l-none font-medium active:scale-95"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default NewsLetter;