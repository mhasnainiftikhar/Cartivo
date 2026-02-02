import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className='group cursor-pointer bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500'>
            {/* Product Image */}
            <div className='relative aspect-square overflow-hidden rounded-2xl bg-gray-50 mb-6'>
                <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                <img
                    src={product.image}
                    alt={product.name}
                    className='w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 p-4'
                />

                {/* Wishlist Icon */}
                <button className='absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0'>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>

                {/* Quick View Button */}
                <div className='absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
                    <button className='w-full py-3 bg-[#001742] text-white text-sm font-bold rounded-xl shadow-xl shadow-blue-900/20'>
                        Quick View
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className='space-y-2 px-2'>
                <div className='flex items-center gap-2'>
                    <span className='px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase tracking-wider'>
                        {product.brand}
                    </span>
                    {product.discount > 0 && (
                        <span className='px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold rounded uppercase tracking-wider'>
                            {product.discount}% OFF
                        </span>
                    )}
                </div>

                <h3 className='font-bold text-gray-900 line-clamp-2 min-h-[3rem] group-hover:text-blue-600 transition-colors'>
                    {product.name}
                </h3>

                <div className='flex items-end justify-between'>
                    <div className='flex flex-col'>
                        <span className='text-2xl font-black text-[#001742]'>
                            ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                        </span>
                        {product.discount > 0 && (
                            <span className='text-sm text-gray-400 line-through font-medium'>
                                ${product.price.toFixed(2)}
                            </span>
                        )}
                    </div>

                    <button className='w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#001742] hover:bg-blue-600 hover:text-white transition-all transform active:scale-90 group/btn'>
                        <svg className="w-6 h-6 transition-transform group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
