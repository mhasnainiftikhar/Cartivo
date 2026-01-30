import React from 'react'

const ElectronicCategoryCard = ({ item }) => {
  return (
    <div className='flex flex-col items-center group cursor-pointer'>
      <div className='w-20 h-20 lg:w-24 lg:h-24 bg-[#2161d8] rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg'>
        <img
          className="object-contain h-12 lg:h-14 transition-transform duration-300"
          src={item.image}
          alt={item.name}
        />
      </div>
      <h2 className='font-semibold text-sm lg:text-base mt-2 transition-colors duration-300 group-hover:text-blue-500'>
        {item.name}
      </h2>
    </div>
  )
}

export default ElectronicCategoryCard
