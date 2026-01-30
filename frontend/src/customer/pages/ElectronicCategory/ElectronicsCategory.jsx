import React from 'react'
import ElectronicCategoryCard from './ElectronicCategoryCard'

const electronice = [
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Camera",
    image: "https://m.media-amazon.com/images/I/714hINuPoBL._AC_UY327_FMwebp_QL65_.jpg",
    categoryId: "cameras"
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Watch",
    image: "https://m.media-amazon.com/images/I/61afO93SRXL._AC_UL480_FMwebp_QL65_.jpg",
    categoryId: "watches"
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Laptop",
    image: "https://m.media-amazon.com/images/I/71jQbkYw5KL._AC_UY327_FMwebp_QL65_.jpg",
    categoryId: "laptops"
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Phones",
    image: "https://m.media-amazon.com/images/I/61c9OZyq2yL._AC_UL480_FMwebp_QL65_.jpg",
    categoryId: "phone"
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Airpods",
    image: "https://m.media-amazon.com/images/I/41XjE57VLvL._AC_UY327_FMwebp_QL65_.jpg",
    categoryId: "airpods"
  },
  {
    section: "ELECTRIC_CATEGORIES",
    name: "Speaker",
    image: "https://m.media-amazon.com/images/I/81l7mB5LhsL._AC_UY327_FMwebp_QL65_.jpg",
    categoryId: "speaker"
  },

]

const ElectronicsCategory = () => {
  return (
    <div className='flex flex-wrap justify-center gap-6 lg:gap-8 p-5 lg:p-8 border-b bg-white'>
      {electronice.map((item, index) => <ElectronicCategoryCard key={index} item={item} />)}
    </div>
  )
}

export default ElectronicsCategory
