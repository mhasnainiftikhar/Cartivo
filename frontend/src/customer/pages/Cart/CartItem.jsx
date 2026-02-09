import { useDispatch } from 'react-redux';
import { updateCartItem, removeCartItem } from '../../../State/CartSlice';
import { IconButton, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleUpdateQuantity = (change) => {
        const newQuantity = item.quantity + change;
        if (newQuantity >= 1) {
            dispatch(updateCartItem({ cartItemId: item._id, quantity: newQuantity }));
        }
    };

    const handleRemove = () => {
        dispatch(removeCartItem(item._id));
    };

    return (
        <Box className="flex items-center gap-4 py-6 border-b border-gray-100 last:border-0">
            {/* Product Image */}
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Item Details */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <div>
                        <Typography className="text-sm font-bold text-blue-600 mb-1">
                            {item.product?.brand}
                        </Typography>
                        <Typography className="text-base lg:text-lg font-black text-[#001742] leading-tight line-clamp-2">
                            {item.product?.name}
                        </Typography>
                        <div className="flex items-center gap-2 mt-2">
                            {item.size && (
                                <Typography className="text-sm text-gray-500 font-medium">Size: {item.size}</Typography>
                            )}
                        </div>
                    </div>

                    <IconButton
                        onClick={handleRemove}
                        size="small"
                        className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <DeleteOutlineIcon />
                    </IconButton>
                </div>

                <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                        <IconButton
                            onClick={() => handleUpdateQuantity(-1)}
                            size="small"
                            className="text-[#001742]"
                            disabled={item.quantity <= 1}
                        >
                            <RemoveIcon fontSize="small" />
                        </IconButton>
                        <span className="w-10 text-center font-bold text-[#001742]">{item.quantity}</span>
                        <IconButton
                            onClick={() => handleUpdateQuantity(1)}
                            size="small"
                            className="text-[#001742]"
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                        <Typography className="text-xl font-black text-[#001742]">
                            ₹{item.sellingPrice.toFixed(2)}
                        </Typography>
                        {item.mrpPrice > item.sellingPrice && (
                            <Typography className="text-sm text-gray-400 line-through font-medium">
                                ₹{item.mrpPrice.toFixed(2)}
                            </Typography>
                        )}
                    </div>
                </div>
            </div>
        </Box>
    );
};

export default CartItem;
