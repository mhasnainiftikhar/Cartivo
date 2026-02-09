import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
    Grid,
    Divider,
    Rating,
    Breadcrumbs,
    Link as MuiLink,
    CircularProgress
} from '@mui/material';
import {
    FavoriteBorder,
    Favorite,
    Add,
    Remove,
    ShoppingCartOutlined,
    LocalShippingOutlined,
    HistoryOutlined,
    SecurityOutlined
} from '@mui/icons-material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart } from '../../../State/CartSlice';
import { addProductToWishlist, removeProductFromWishlist } from '../../../State/WishlistSlice';
import { findProductById } from '../../../State/ProductSlice';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth, wishlist, product } = useSelector(store => store);

    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("");

    useEffect(() => {
        dispatch(findProductById(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (product.product) {
            setSelectedImage(product.product.images[0]);
            setSelectedSize(product.product.size || "M");
        }
    }, [product.product]);

    const isWishlisted = wishlist.wishlist?.products?.some(p => p._id === id);

    const handleAddToCart = () => {
        if (!auth.user) {
            navigate("/login");
            return;
        }
        const data = {
            productId: id,
            size: selectedSize,
            quantity: quantity
        };
        dispatch(addItemToCart(data));
    };

    const handleWishlist = () => {
        if (!auth.user) {
            navigate("/login");
            return;
        }
        if (isWishlisted) {
            dispatch(removeProductFromWishlist(id));
        } else {
            dispatch(addProductToWishlist(id));
        }
    };

    if (product.loading) {
        return (
            <Box className="min-h-screen flex items-center justify-center">
                <CircularProgress />
            </Box>
        );
    }

    if (!product.product) {
        return (
            <Box className="min-h-screen flex flex-col items-center justify-center gap-4">
                <Typography variant="h5">Product not found</Typography>
                <Button onClick={() => navigate("/")} variant="contained" sx={{ bgcolor: '#001742' }}>Go Home</Button>
            </Box>
        );
    }

    const p = product.product;
    const discountedPrice = p.sellingPrice;

    return (
        <Box className="min-h-screen bg-gray-50/50 pb-20">
            <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-10">
                {/* Breadcrumbs */}
                <Breadcrumbs aria-label="breadcrumb" className="mb-8">
                    <MuiLink component={Link} to="/" underline="hover" color="inherit" className="text-sm font-medium">Home</MuiLink>
                    <MuiLink component={Link} to="/products" underline="hover" color="inherit" className="text-sm font-medium">Products</MuiLink>
                    <Typography color="text.primary" className="text-sm font-bold text-blue-600 truncate max-w-[200px] md:max-w-none">
                        {p.title}
                    </Typography>
                </Breadcrumbs>

                <div className="bg-white rounded-[40px] p-6 lg:p-12 shadow-sm border border-gray-100">
                    <Grid container spacing={8}>
                        {/* Left: Image Gallery */}
                        <Grid item xs={12} lg={6}>
                            <div className="space-y-6">
                                {/* Main Image */}
                                <div className="aspect-square rounded-[32px] overflow-hidden bg-gray-50 border border-gray-100 p-8">
                                    <img
                                        src={selectedImage}
                                        alt={p.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                {/* Thumbnails */}
                                <div className="flex gap-4">
                                    {p.images?.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(img)}
                                            className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all p-2 bg-gray-50 ${selectedImage === img ? 'border-blue-600 shadow-lg shadow-blue-500/10' : 'border-transparent'}`}
                                        >
                                            <img src={img} alt="" className="w-full h-full object-contain" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Grid>

                        {/* Right: Product Info */}
                        <Grid item xs={12} lg={6}>
                            <div className="flex flex-col h-full">
                                <Box className="mb-6">
                                    <Typography className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-2">
                                        {p.brand}
                                    </Typography>
                                    <h1 className="text-3xl lg:text-5xl font-black text-[#001742] leading-[1.1] mb-4">
                                        {p.title}
                                    </h1>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                                            <Rating value={4.5} readOnly precision={0.5} size="small" />
                                            <span className="ml-2 text-yellow-700 font-black text-sm">4.5</span>
                                        </div>
                                        <Typography className="text-gray-400 font-bold text-sm">
                                            124 Verified Reviews
                                        </Typography>
                                    </div>
                                </Box>

                                <div className="flex flex-wrap items-center gap-4 mb-8">
                                    <Typography className="text-4xl lg:text-5xl font-black text-[#001742]">
                                        ₹{discountedPrice.toFixed(2)}
                                    </Typography>
                                    {p.discountPercentage > 0 && (
                                        <div className="flex items-center gap-2">
                                            <Typography className="text-xl text-gray-400 font-bold line-through">
                                                ₹{p.mrpPrice.toFixed(2)}
                                            </Typography>
                                            <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full font-black text-sm">
                                                -{p.discountPercentage}% OFF
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <Typography className="text-gray-500 leading-relaxed font-medium mb-8">
                                    {p.description}
                                </Typography>

                                {/* Size Selection */}
                                <div className="mb-8">
                                    <Typography className="text-[#001742] font-black mb-4">Available Sizes</Typography>
                                    <div className="flex gap-3">
                                        {["S", "M", "L", "XL"].map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-6 py-3 rounded-2xl font-bold transition-all border-2 ${selectedSize === size ? 'bg-[#001742] text-white border-[#001742] shadow-xl shadow-blue-900/20' : 'bg-white text-gray-600 border-gray-100 hover:border-gray-300'}`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity and Actions */}
                                <div className="flex flex-wrap gap-4 mb-10 mt-auto">
                                    <div className="flex items-center bg-gray-50 rounded-2xl p-2 border border-gray-100">
                                        <IconButton
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="bg-white shadow-sm text-[#001742] hover:bg-gray-100"
                                        >
                                            <Remove fontSize="small" />
                                        </IconButton>
                                        <span className="w-14 text-center font-black text-xl text-[#001742]">{quantity}</span>
                                        <IconButton
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="bg-[#001742] text-white hover:bg-[#081e4b] shadow-lg shadow-blue-900/10"
                                        >
                                            <Add fontSize="small" />
                                        </IconButton>
                                    </div>

                                    <Button
                                        variant="contained"
                                        startIcon={<ShoppingCartOutlined />}
                                        onClick={handleAddToCart}
                                        disabled={p.quantity <= 0}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg py-4 capitalize shadow-xl shadow-blue-600/20"
                                    >
                                        {p.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                                    </Button>

                                    <IconButton
                                        onClick={handleWishlist}
                                        className={`rounded-2xl border-2 p-4 transition-all ${isWishlisted ? 'bg-red-50 border-red-100 text-red-500' : 'bg-white border-gray-100 text-gray-400'}`}
                                    >
                                        {isWishlisted ? <Favorite /> : <FavoriteBorder />}
                                    </IconButton>
                                </div>

                                {/* Features/Benefits */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                            <LocalShippingOutlined />
                                        </div>
                                        <div>
                                            <Typography className="text-[#001742] font-black text-sm">Free Delivery</Typography>
                                            <Typography className="text-gray-400 text-xs font-bold">Orders over ₹999</Typography>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                                            <HistoryOutlined />
                                        </div>
                                        <div>
                                            <Typography className="text-[#001742] font-black text-sm">Easy Returns</Typography>
                                            <Typography className="text-gray-400 text-xs font-bold">Within 30 days</Typography>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                                            <SecurityOutlined />
                                        </div>
                                        <div>
                                            <Typography className="text-[#001742] font-black text-sm">Secure Payment</Typography>
                                            <Typography className="text-gray-400 text-xs font-bold">100% Protected</Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                {/* Technical Specifications Section */}
                <div className="mt-12 bg-white rounded-[40px] p-8 lg:p-12 shadow-sm border border-gray-100">
                    <Typography className="text-2xl font-black text-[#001742] mb-8">Technical Specifications</Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        <div className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0 md:border-b">
                            <Typography className="text-gray-500 font-bold">Category</Typography>
                            <Typography className="text-[#001742] font-black">{p.category?.name || "N/A"}</Typography>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0 md:border-b">
                            <Typography className="text-gray-500 font-bold">Stock</Typography>
                            <Typography className="text-[#001742] font-black">{p.quantity} Units Available</Typography>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default ProductDetails;
