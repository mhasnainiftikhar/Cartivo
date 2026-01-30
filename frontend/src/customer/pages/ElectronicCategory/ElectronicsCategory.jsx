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
    <section className="bg-white border-b">
      <div className="flex flex-wrap justify-between gap-6 lg:gap-10 px-5 py-6 lg:px-10">
        {electronics.map((item) => (
          <ElectronicCategoryCard
            key={item.categoryId}
            item={item}
          />
        ))}
      </div>
    </section>
  )
}

export default ElectronicsCategory
