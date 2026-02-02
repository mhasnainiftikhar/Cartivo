import React from 'react'
import DealCard from './DealCard'

const dummyDeals = [
  {
    name: "Smart Watch",
    discount: 50,
    image: "https://m.media-amazon.com/images/I/61afO93SRXL._AC_UL480_FMwebp_QL65_.jpg"
  },
  {
    name: "Wireless Earbuds",
    discount: 40,
    image: "https://m.media-amazon.com/images/I/41XjE57VLvL._AC_UY327_FMwebp_QL65_.jpg"
  },
  {
    name: "DSLR Camera",
    discount: 30,
    image: "https://m.media-amazon.com/images/I/714hINuPoBL._AC_UY327_FMwebp_QL65_.jpg"
  },
  {
    name: "Premium Laptop",
    discount: 25,
    image: "https://m.media-amazon.com/images/I/71jQbkYw5KL._AC_UY327_FMwebp_QL65_.jpg"
  },
  {
    name: "Bluetooth Speaker",
    discount: 60,
    image: "https://m.media-amazon.com/images/I/81l7mB5LhsL._AC_UY327_FMwebp_QL65_.jpg"
  },
  {
    name: "Smartphone",
    discount: 15,
    image: "https://m.media-amazon.com/images/I/61c9OZyq2yL._AC_UL480_FMwebp_QL65_.jpg"
  }
]

const Deal = () => {
  return (
    <div className='py-16 bg-white relative overflow-hidden'>
      {/* Decorative background */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50' />

      <div className='mb-12 px-5 lg:px-10 flex flex-col items-center text-center'>
        <h2 className='text-3xl lg:text-5xl font-extrabold text-[#001742] tracking-tight'>Today's Hot Deals</h2>
        <p className='mt-3 text-lg text-gray-500 font-medium max-w-2xl'>Exclusive offers ending soon. Grab them before they're gone!</p>
        <button className='mt-6 text-blue-600 font-bold border-b-2 border-transparent hover:border-blue-600 transition-all'>
          View All Deals
        </button>
      </div>

      <div className='relative flex'>
        <div className='flex animate-marquee whitespace-nowrap'>
          {dummyDeals.map((item, index) => (
            <DealCard key={`deal-1-${index}`} item={item} />
          ))}
          {dummyDeals.map((item, index) => (
            <DealCard key={`deal-2-${index}`} item={item} />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  )
}

export default Deal
