import React from 'react'

const Grid = () => {
  const items = [
    {
      img: "https://m.media-amazon.com/images/I/61w9vJzXL2L._AC_UL480_FMwebp_QL65_.jpg",
      title: "Audio Excellence",
      subtitle: "Premium Sound Systems",
      cols: "col-span-3",
      rows: "row-span-12"
    },
    {
      img: "https://m.media-amazon.com/images/I/71rHkKY-NYL._AC_UL480_FMwebp_QL65_.jpg",
      title: "Smart Home",
      subtitle: "Living Elevated",
      cols: "col-span-2",
      rows: "row-span-6"
    },
    {
      img: "https://m.media-amazon.com/images/I/616R16Ga0oL._AC_UL480_FMwebp_QL65_.jpg",
      title: "Gaming Gear",
      subtitle: "Level Up",
      cols: "col-span-4",
      rows: "row-span-6"
    },
    {
      img: "https://m.media-amazon.com/images/I/51BNWMBG1dL._AC_UL480_FMwebp_QL65_.jpg",
      title: "Lifestyle",
      subtitle: "Must Haves",
      cols: "col-span-3",
      rows: "row-span-12"
    },
    {
      img: "https://m.media-amazon.com/images/I/81H3rikrd7L._AC_UL480_FMwebp_QL65_.jpg",
      title: "Productivity",
      subtitle: "Work Smarter",
      cols: "col-span-4",
      rows: "row-span-6"
    },
    {
      img: "https://m.media-amazon.com/images/I/614S6ffBSTL._AC_UL480_FMwebp_QL65_.jpg",
      title: "Wearables",
      subtitle: "Stay Connected",
      cols: "col-span-2",
      rows: "row-span-6"
    }
  ];

  return (
    <section className="py-16">
      <div className="flex flex-col items-center mb-12 text-center">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#001742] tracking-tight">Featured Collections</h2>
        <p className="mt-3 text-lg text-gray-500 font-medium">Curated products picked just for you.</p>
        <button className="mt-4 text-blue-600 font-bold text-sm lg:text-base hover:underline transition-all">
          Explore All Collections
        </button>
      </div>
      <div className='grid gap-6 grid-cols-12 grid-rows-12 lg:h-[700px]'>
        {items.map((item, index) => (
          <div key={index} className={`${item.cols} ${item.rows} relative group overflow-hidden rounded-2xl cursor-pointer bg-gray-100`}>
            <img
              className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
              src={item.img}
              alt={item.title}
            />
            {/* Overlay */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500' />

            <div className='absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500'>
              <p className='text-blue-400 text-xs font-bold uppercase tracking-widest mb-1'>{item.subtitle}</p>
              <h3 className='text-white text-xl lg:text-2xl font-bold leading-tight'>{item.title}</h3>

              <button className='mt-4 flex items-center text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                View Collection
                <svg className='ml-2 w-4 h-4 transition-transform group-hover:translate-x-1' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Grid
