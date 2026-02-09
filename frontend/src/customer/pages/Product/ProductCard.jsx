import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addProductToWishlist, removeProductFromWishlist } from '../../../State/WishlistSlice';
import { addItemToCart } from '../../../State/CartSlice';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth, wishlist } = useSelector(store => store);

    const isWishlisted = wishlist.wishlist?.products?.some(p => p._id === product.id || p._id === product._id);

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!auth.user) {
            navigate("/login");
            return;
        }
        if (isWishlisted) {
            dispatch(removeProductFromWishlist(product.id || product._id));
        } else {
            dispatch(addProductToWishlist(product.id || product._id));
        }
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!auth.user) {
            navigate("/login");
            return;
        }
        const data = {
            productId: product.id || product._id,
            quantity: 1,
            size: "M" // Default size or handle based on product type
        };
        dispatch(addItemToCart(data));
    };

    const title = product.title || product.name;
    const image = product.images?.[0] || product.image;
    const sellingPrice = product.sellingPrice || product.price;
    const mrpPrice = product.mrpPrice || (product.price / (1 - (product.discount || 0) / 100));
    const discount = product.discountPercentage || product.discount;

    return (
        <Link to={`/product/${product.id || product._id}`} className='group cursor-pointer bg-white rounded-3xl p-4 border border-gray-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 block no-underline text-inherit'>
            {/* Product Image */}
            <div className='relative aspect-square overflow-hidden rounded-2xl bg-gray-50 mb-6'>
                <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                <img
                    src={image}
                    alt={title}
                    className='w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 p-4'
                />

                {/* Wishlist Icon */}
                <button
                    onClick={handleWishlist}
                    className={`absolute z-20 top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center transition-all shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500 hover:bg-white'}`}
                >
                    <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>

                {/* Quick Action Button */}
                <div className='absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20'>
                    <button
                        onClick={handleAddToCart}
                        className='w-full py-3 bg-[#001742] text-white text-sm font-bold rounded-xl shadow-xl shadow-blue-900/20 active:scale-95 transition-transform'
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className='space-y-2 px-2'>
                <div className='flex items-center justify-between'>
                    <span className='px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded uppercase tracking-wider'>
                        {product.brand}
                    </span>
                    <div className='flex items-center gap-1'>
                        <div className='flex text-yellow-400'>
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className='text-[10px] text-gray-400 font-bold'>(124)</span>
                    </div>
                </div>

                <h3 className='font-bold text-gray-900 line-clamp-2 min-h-[2.5rem] group-hover:text-blue-600 transition-colors text-sm lg:text-base'>
                    {title}
                </h3>

                <div className='flex items-center gap-2'>
                    <span className='text-xl lg:text-2xl font-black text-[#001742]'>
                        ₹{sellingPrice.toFixed(2)}
                    </span>
                    {discount > 0 && (
                        <span className='text-xs text-gray-400 line-through font-medium'>
                            ₹{mrpPrice.toFixed(2)}
                        </span>
                    )}
                </div>

                <div className='flex items-center gap-2'>
                    <span className='text-[10px] font-bold text-blue-600 bg-blue-50 px-1 py-0.5 rounded'>Express Delivery</span>
                    {discount > 0 && (
                        <span className='text-[10px] font-bold text-red-600 bg-red-50 px-1 py-0.5 rounded'>Save {discount}%</span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
