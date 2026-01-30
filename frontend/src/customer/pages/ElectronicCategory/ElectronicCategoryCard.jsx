import React from 'react'

const ElectronicCategoryCard = ({ item }) => {
  return (
    <div className="group cursor-pointer flex flex-col items-center">
      <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-2xl bg-gray-50 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-blue-500/10 overflow-hidden">
        {/* Subtle background pattern or gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <img
          src={item.image}
          alt={item.name}
          className="h-16 lg:h-20 object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-sm"
          loading="lazy"
        />
      </div>

      <div className="mt-4 text-center">
        <h2 className="text-sm lg:text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
          {item.name}
        </h2>
        <p className="text-[10px] lg:text-xs text-gray-400 uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
          Explore Now
        </p>
      </div>
    </div>
  )
}

export default ElectronicCategoryCard
