import React from 'react'

const categories = [
    {
        name: "Men",
        image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=2071&auto=format&fit=crop",
    },
    {
        name: "Women",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    },
    {
        name: "Kids",
        image: "https://images.unsplash.com/photo-1540479859555-17af45c78602?q=80&w=2070&auto=format&fit=crop",
    },
    {
        name: "Home",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
    },
    {
        name: "Beauty",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop",
    },
    {
        name: "Sports",
        image: "https://images.unsplash.com/photo-1461896704690-474cb88d515a?q=80&w=2070&auto=format&fit=crop",
    },
    {
        name: "Jewelry",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb5ce33c?q=80&w=2070&auto=format&fit=crop",
    },
    {
        name: "Shoes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    },
    {
        name: "Electronics",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop",
    },
    {
        name: "Watches",
        image: "https://images.unsplash.com/photo-1524805444758-09913195200c?q=80&w=2070&auto=format&fit=crop",
    },
    {
        name: "Furniture",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop",
    },
    {
        name: "Bags",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop",
    }
]

const ShopByCategory = () => {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-5 lg:px-10">
                <div className="flex flex-col items-center mb-12 text-center">
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-[#001742] tracking-tight">Shop by Category</h2>
                    <button className="mt-4 text-blue-600 font-bold text-sm lg:text-base hover:underline transition-all">
                        See All Categories
                    </button>
                </div>

                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 lg:gap-10">
                    {categories.map((cat, index) => (
                        <div
                            key={index}
                            className="group cursor-pointer flex flex-col items-center"
                        >
                            <div className="relative w-20 h-20 md:w-28 md:h-28 lg:w-40 lg:h-40 rounded-full overflow-hidden mb-4 ring-2 ring-transparent group-hover:ring-blue-500 ring-offset-4 transition-all duration-300">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                            </div>
                            <h3 className="text-sm lg:text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                {cat.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ShopByCategory
