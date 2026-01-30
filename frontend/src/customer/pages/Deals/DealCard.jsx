import React from 'react'

const DealCard = ({ item }) => {
  return (
    <div className='flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-5 min-w-[200px] mx-4 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100'>
      <div className='w-32 h-32 flex items-center justify-center mb-4'>
        <img
          className='max-h-full max-w-full object-contain'
          src={item.image}
          alt={item.name}
        />
      </div>
      <div className='text-center'>
        <h3 className='font-bold text-gray-800 text-lg'>{item.discount}% Off</h3>
        <p className='text-gray-500 text-sm font-medium'>{item.name}</p>
      </div>
      <button className='mt-4 bg-[#001742] text-white px-6 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-800 transition-colors w-full'>
        Shop Now
      </button>
    </div>
  )
}

export default DealCard
