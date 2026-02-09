import React from 'react'
import { useNavigate } from 'react-router-dom';

const DealCard = ({ item }) => {
  const navigate = useNavigate();
  const title = item.title || item.name;
  const image = item.images?.[0] || item.image;
  const discount = item.discountPercentage || item.discount;

  const handleClick = () => {
    // If it's a category deal, navigate to category. If product, navigate to product.
    if (item.categoryId) {
      navigate(`/products/${item.categoryId}`);
    } else if (item._id || item.id) {
      navigate(`/product/${item._id || item.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className='flex flex-col items-center bg-white rounded-2xl p-6 min-w-[240px] mx-4 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 border border-gray-100 group cursor-pointer'
    >
      <div className='relative w-40 h-40 flex items-center justify-center mb-6 overflow-hidden'>
        <div className='absolute inset-0 bg-gray-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500' />
        <img
          className='relative z-10 max-h-32 max-w-full object-contain transition-transform duration-500 group-hover:scale-110'
          src={image}
          alt={title}
        />
      </div>

      <div className='text-center w-full'>
        <span className='inline-block px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full mb-2'>
          {discount}% OFF
        </span>
        <h3 className='font-semibold text-gray-900 text-lg mb-4 line-clamp-1'>{title}</h3>
      </div>

      <button className='w-full py-3 bg-[#febd69] text-[#001742] rounded-xl text-sm font-bold hover:bg-[#f3a847] transition-all duration-300 transform active:scale-95 shadow-md shadow-black/5'>
        Shop Now
      </button>
    </div>
  )
}

export default DealCard
