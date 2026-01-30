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
    <div className='py-10 bg-gray-50 overflow-hidden rounded-lg'>
      <div className='mb-8 px-5 lg:px-10'>
        <h2 className='text-3xl font-bold text-[#001742]'>Today's Hot Deals</h2>
        <p className='text-gray-500'>Don't miss out on these exclusive offers!</p>
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

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}

export default Deal
