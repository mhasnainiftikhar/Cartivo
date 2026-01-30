import React from 'react'
import ElectronicCategoryCard from './ElectronicCategoryCard'

const electronics = [
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Camera",
    image: "https://m.media-amazon.com/images/I/714hINuPoBL._AC_UY327_FMwebp_QL65_.jpg",
    categoryId: "cameras",
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Watch",
    image: "https://m.media-amazon.com/images/I/61afO93SRXL._AC_UL480_FMwebp_QL65_.jpg",
    categoryId: "watches",
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Laptop",
    image: "https://m.media-amazon.com/images/I/71jQbkYw5KL._AC_UY327_FMwebp_QL65_.jpg",
    categoryId: "laptops",
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Phones",
    image: "https://m.media-amazon.com/images/I/61c9OZyq2yL._AC_UL480_FMwebp_QL65_.jpg",
    categoryId: "phones",
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "AirPods",
    image: "https://m.media-amazon.com/images/I/41XjE57VLvL._AC_UY327_FMwebp_QL65_.jpg",
    categoryId: "airpods",
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Speaker",
    image: "https://m.media-amazon.com/images/I/81l7mB5LhsL._AC_UY327_FMwebp_QL65_.jpg",
    categoryId: "speaker",
  },
]

const ElectronicsCategory = () => {
  return (
    <section className="bg-white border-b py-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#001742] tracking-tight">Electronics & Gadgets</h2>
          <p className="mt-3 text-lg text-gray-500 font-medium">Top picks for your digital lifestyle.</p>
          <button className="mt-4 text-blue-600 font-bold text-sm lg:text-base hover:underline transition-all">
            View All Electronics
          </button>
        </div>
        <div className="flex flex-wrap justify-between gap-6 lg:gap-10">
          {electronics.map((item) => (
            <ElectronicCategoryCard
              key={item.categoryId}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ElectronicsCategory
