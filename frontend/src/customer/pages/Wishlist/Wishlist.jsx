import React from 'react';
import { Box, Typography, IconButton, Grid, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import WishlistItem from './WishlistItem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Wishlist = () => {
    const navigate = useNavigate();
    const { wishlist } = useSelector(store => store);

    const wishlistItems = wishlist.wishlist?.products || [];

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
                        My Wishlist <span className="text-gray-400 font-bold text-xl ml-2">({wishlistItems.length} items)</span>
                    </Typography>
                </div>

                {wishlistItems.length > 0 ? (
                    <Grid container spacing={4}>
                        {wishlistItems.map((item) => (
                            <Grid item xs={12} sm={6} lg={4} xl={3} key={item._id}>
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
