import React from 'react'

const BottomBanner = () => {
  return (
    <div className='mx-4 sm:mx-10 md:mx-20 my-10'>
      <div className="relative overflow-hidden rounded-lg">
   
        <img 
          src="bottom_image.png" 
          alt="bottomimage" 
          className='hidden md:block w-full h-auto object-cover rounded-lg'
        />
        <div className="relative md:absolute top-0 right-0 h-full w-full md:w-1/2 flex flex-col justify-center p-8 sm:p-12 md:pr-16 bg-white md:bg-transparent rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Why We Are the Best?
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-red-500 p-3 rounded-lg shadow-md shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 leading-tight">Fastest Delivery</h4>
                <p className="text-gray-800 text-sm md:text-base">Groceries delivered in under 30 minutes.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-red-500 p-3 rounded-lg shadow-md shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 leading-tight">Freshness Guaranteed</h4>
                <p className="text-gray-800 text-sm md:text-base">Fresh produce straight from the source.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-red-500 p-3 rounded-lg shadow-md shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 leading-tight">Affordable Prices</h4>
                <p className="text-gray-800 text-sm md:text-base">Quality groceries at unbeatable prices.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-red-500 p-3 rounded-lg shadow-md shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 leading-tight">Trusted by Thousands</h4>
                <p className="text-gray-800 text-sm md:text-base">Loved by 10,000+ happy customers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomBanner