import React from 'react';
import { Box, Typography, IconButton, Grid, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import WishlistItem from './WishlistItem';
import { useNavigate } from 'react-router-dom';

const dummyWishlistItems = [
    {
        id: 2,
        name: "Sony Alpha a7 IV Full-frame Mirrorless Camera",
        brand: "Sony",
        image: "https://m.media-amazon.com/images/I/714hINuPoBL._AC_UY327_FMwebp_QL65_.jpg",
        price: 2499.00,
        discount: 15,
        color: "Black"
    },
    {
        id: 5,
        name: "Wireless Over-Ear Noise Cancelling Headphones",
        brand: "Bose",
        image: "https://m.media-amazon.com/images/I/51BNWMBG1dL._AC_UL480_FMwebp_QL65_.jpg",
        price: 349.00,
        discount: 20,
        color: "Silver"
    },
    {
        id: 3,
        name: "Lace Up Running Shoes - White/Blue",
        brand: "Adidas",
        image: "https://m.media-amazon.com/images/I/61w9vJzXL2L._AC_UL480_FMwebp_QL65_.jpg",
        price: 120.00,
        discount: 0,
        color: "White"
    }
];

const Wishlist = () => {
    const navigate = useNavigate();

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
                        My Wishlist <span className="text-gray-400 font-bold text-xl ml-2">({dummyWishlistItems.length} items)</span>
                    </Typography>
                </div>

                {dummyWishlistItems.length > 0 ? (
                    <Grid container spacing={4}>
                        {dummyWishlistItems.map((item) => (
                            <Grid item xs={12} sm={6} lg={4} xl={3} key={item.id}>
                                <WishlistItem item={item} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box className="bg-white rounded-[40px] py-32 text-center border border-dashed border-gray-200">
                        <Typography className="text-2xl font-black text-gray-300 mb-8">Your wishlist is empty</Typography>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/products')}
                            className="bg-[#001742] hover:bg-[#001742]/90 text-white px-10 py-4 rounded-2xl font-black text-lg capitalize shadow-lg shadow-blue-900/10"
                        >
                            Explore Products
                        </Button>
                    </Box>
                )}
            </div>
        </Box>
    );
};

export default Wishlist;
