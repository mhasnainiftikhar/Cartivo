import React from 'react';
import { IconButton, Typography, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CartItem = ({ item }) => {
    return (
        <Box className="flex items-center gap-4 py-6 border-b border-gray-100 last:border-0">
            {/* Product Image */}
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Item Details */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <div>
                        <Typography className="text-sm font-bold text-blue-600 mb-1">
                            {item.brand}
                        </Typography>
                        <Typography className="text-base lg:text-lg font-black text-[#001742] leading-tight line-clamp-2">
                            {item.name}
                        </Typography>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: item.color.toLowerCase() }}></div>
                            <Typography className="text-sm text-gray-500 font-medium">{item.color}</Typography>
                        </div>
                    </div>

                    <IconButton size="small" className="text-gray-400 hover:text-red-500 transition-colors">
                        <DeleteOutlineIcon />
                    </IconButton>
                </div>

                <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                        <IconButton size="small" className="text-[#001742]">
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        <span className="w-10 text-center font-bold text-[#001742]">2</span>
                        <IconButton size="small" className="text-[#001742]">
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                        <Typography className="text-xl font-black text-[#001742]">
                            ${item.price.toFixed(2)}
                        </Typography>
                        {item.discount > 0 && (
                            <Typography className="text-sm text-gray-400 line-through font-medium">
                                ${(item.price * (1 + item.discount / 100)).toFixed(2)}
                            </Typography>
                        )}
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default CartItem;
