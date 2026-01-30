import React from 'react'

const Grid = () => {
  return (
    <div className='grid gap-4 grid-cols-12 grid-rows-12 lg:h-[600px]'>
      <div className='col-span-3 row-span-12 group overflow-hidden rounded-md shadow-md'>
        <img className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110' src="https://m.media-amazon.com/images/I/61w9vJzXL2L._AC_UL480_FMwebp_QL65_.jpg" alt="" />
      </div>
      <div className='col-span-2 row-span-6 group overflow-hidden rounded-md shadow-md'>
        <img className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110' src="https://m.media-amazon.com/images/I/71rHkKY-NYL._AC_UL480_FMwebp_QL65_.jpg" alt="" />
      </div>
      <div className='col-span-4 row-span-6 group overflow-hidden rounded-md shadow-md'>
        <img className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110' src="https://m.media-amazon.com/images/I/616R16Ga0oL._AC_UL480_FMwebp_QL65_.jpg" alt="" />
      </div>
      <div className='col-span-3 row-span-12 group overflow-hidden rounded-md shadow-md'>
        <img className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110' src="https://m.media-amazon.com/images/I/51BNWMBG1dL._AC_UL480_FMwebp_QL65_.jpg" alt="" />
      </div>
      <div className='col-span-4 row-span-6 group overflow-hidden rounded-md shadow-md'>
        <img className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110' src="https://m.media-amazon.com/images/I/81H3rikrd7L._AC_UL480_FMwebp_QL65_.jpg" alt="" />
      </div>
      <div className='col-span-2 row-span-6 group overflow-hidden rounded-md shadow-md'>
        <img className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110' src="https://m.media-amazon.com/images/I/614S6ffBSTL._AC_UL480_FMwebp_QL65_.jpg" alt="" />
      </div>
    </div>
  )
}

export default Grid
