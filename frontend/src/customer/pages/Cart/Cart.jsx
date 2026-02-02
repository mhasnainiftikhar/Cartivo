import React from 'react';
import { Box, Typography, Button, Divider, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

const dummyCartItems = [
    {
        id: 1,
        name: "Apple MacBook Pro 14 M3 Chip - Space Black",
        brand: "Apple",
        image: "https://m.media-amazon.com/images/I/71jQbkYw5KL._AC_UY327_FMwebp_QL65_.jpg",
        price: 1999.00,
        discount: 10,
        color: "Black"
    },
    {
        id: 4,
        name: "Smart Watch Series 9 GPS + Cellular",
        brand: "Apple",
        image: "https://m.media-amazon.com/images/I/61afO93SRXL._AC_UL480_FMwebp_QL65_.jpg",
        price: 499.00,
        discount: 5,
        color: "Midnight"
    }
];

const Cart = () => {
    const navigate = useNavigate();

    const subtotal = dummyCartItems.reduce((acc, item) => acc + item.price, 0);
    const shipping = 20.00;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <Box className="min-h-screen bg-gray-50/50 pb-20">
            <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <IconButton
                        onClick={() => navigate(-1)}
                        className="bg-white shadow-sm border border-gray-100 text-[#001742]"
                    >
                        <ArrowBackIosNewIcon fontSize="small" />
                    </IconButton>
                    <Typography className="text-3xl lg:text-4xl font-black text-[#001742]">
                        Shopping Cart <span className="text-gray-400 font-bold text-xl ml-2">({dummyCartItems.length} items)</span>
                    </Typography>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Cart Items List */}
                    <div className="flex-1">
                        <Box className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
                            {dummyCartItems.length > 0 ? (
                                <div className="flex flex-col">
                                    {dummyCartItems.map((item) => (
                                        <CartItem key={item.id} item={item} />
                                    ))}
                                </div>
                            ) : (
                                <Box className="py-20 text-center">
                                    <Typography className="text-xl font-bold text-gray-400 mb-6">Your cart is empty</Typography>
                                    <Button
                                        variant="contained"
                                        onClick={() => navigate('/products')}
                                        className="bg-[#001742] hover:bg-[#001742]/90 text-white px-8 py-3 rounded-xl font-bold capitalize"
                                    >
                                        Start Shopping
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-[400px]">
                        <Box className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-24">
                            <Typography className="text-2xl font-black text-[#001742] mb-8">Order Summary</Typography>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-gray-500 font-medium">
                                    <span>Subtotal</span>
                                    <span className="text-[#001742] font-bold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-500 font-medium">
                                    <span>Shipping</span>
                                    <span className="text-[#001742] font-bold">${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-500 font-medium">
                                    <span>Tax (8%)</span>
                                    <span className="text-[#001742] font-bold">${tax.toFixed(2)}</span>
                                </div>
                                <Divider className="my-2" />
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-black text-[#001742]">Total</span>
                                    <span className="text-2xl font-black text-blue-600">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button
                                fullWidth
                                variant="contained"
                                className="bg-[#001742] hover:bg-[#001742]/90 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-900/10 mb-4 capitalize"
                            >
                                Checkout Now
                            </Button>

                            <Typography className="text-center text-sm text-gray-400 font-medium">
                                Free delivery on orders over $1000
                            </Typography>
                        </Box>
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default Cart;
