import React from 'react';
import { Typography, Box, Button, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const WishlistItem = ({ item }) => {
    return (
        <Box className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 group transition-all hover:shadow-xl hover:border-blue-100 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-6">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <IconButton className="absolute top-4 right-4 bg-white/80 backdrop-blur-md shadow-sm text-gray-400 hover:text-red-500 transition-colors">
                    <DeleteOutlineIcon />
                </IconButton>
            </div>

            {/* Info */}
            <div className="flex-1">
                <Typography className="text-sm font-bold text-blue-600 mb-1">
                    {item.brand}
                </Typography>
                <Typography className="text-lg font-black text-[#001742] mb-3 leading-tight line-clamp-2 min-h-[3rem]">
                    {item.name}
                </Typography>

                <div className="flex items-center gap-3 mb-6">
                    <Typography className="text-2xl font-black text-[#001742]">
                        ${item.price.toFixed(2)}
                    </Typography>
                    {item.discount > 0 && (
                        <Typography className="text-sm text-gray-400 line-through font-medium">
                            ${(item.price * (1 + item.discount / 100)).toFixed(2)}
                        </Typography>
                    )}
                </div>
            </div>

            {/* Actions */}
            <Button
                fullWidth
                variant="outlined"
                startIcon={<ShoppingCartOutlinedIcon />}
                className="rounded-2xl border-gray-100 text-[#001742] font-black py-4 hover:bg-[#001742] hover:text-white hover:border-[#001742] transition-all capitalize"
            >
                Move to Cart
            </Button>
        </Box>
    );
};

export default WishlistItem;
