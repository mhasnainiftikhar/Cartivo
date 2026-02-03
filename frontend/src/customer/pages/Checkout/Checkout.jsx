import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Button,
    Divider,
    IconButton,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import AddressForm from './AddressForm';

const dummyCartItems = [
    {
        id: 1,
        name: "Apple MacBook Pro 14 M3 Chip - Space Black",
        brand: "Apple",
        image: "https://m.media-amazon.com/images/I/71jQbkYw5KL._AC_UY327_FMwebp_QL65_.jpg",
        price: 1999.00,
        quantity: 1
    }
];

const Checkout = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Address, 2: Payment
    const [paymentMethod, setPaymentMethod] = useState('card');

    const subtotal = dummyCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = 20.00;
    const total = subtotal + shipping;

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
                        Checkout
                    </Typography>
                </div>

                <Grid container spacing={10}>
                    {/* Left Side: Address & Payment */}
                    <Grid item xs={12} lg={8}>
                        <div className="space-y-10">
                            {/* Step Indicator */}
                            <div className="flex items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
                                <Typography className={`font-black ${step >= 1 ? 'text-[#001742]' : 'text-gray-400'}`}>Address</Typography>
                                <div className="h-px bg-gray-100 flex-1 mx-4"></div>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
                                <Typography className={`font-black ${step >= 2 ? 'text-[#001742]' : 'text-gray-400'}`}>Payment</Typography>
                            </div>

                            <Box className="bg-white rounded-[40px] p-8 lg:p-12 shadow-sm border border-gray-100">
                                {step === 1 ? (
                                    <AddressForm onComplete={() => setStep(2)} />
                                ) : (
                                    <Box className="space-y-8">
                                        <Typography className="text-2xl font-black text-[#001742]">Payment Method</Typography>
                                        <FormControl component="fieldset" className="w-full">
                                            <RadioGroup
                                                value={paymentMethod}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="space-y-4"
                                            >
                                                <div className={`p-6 rounded-2xl border-2 transition-all ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                                                    <FormControlLabel
                                                        value="card"
                                                        control={<Radio color="primary" />}
                                                        label={
                                                            <div className="ml-2">
                                                                <Typography className="font-black text-[#001742]">Credit / Debit Card</Typography>
                                                                <Typography className="text-sm text-gray-500 font-medium">Pay securely with your credit card</Typography>
                                                            </div>
                                                        }
                                                    />
                                                </div>
                                                <div className={`p-6 rounded-2xl border-2 transition-all ${paymentMethod === 'cod' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                                                    <FormControlLabel
                                                        value="cod"
                                                        control={<Radio color="primary" />}
                                                        label={
                                                            <div className="ml-2">
                                                                <Typography className="font-black text-[#001742]">Cash on Delivery</Typography>
                                                                <Typography className="text-sm text-gray-500 font-medium">Pay when your order is delivered</Typography>
                                                            </div>
                                                        }
                                                    />
                                                </div>
                                            </RadioGroup>
                                        </FormControl>

                                        <Box className="pt-6 flex gap-4">
                                            <Button
                                                variant="text"
                                                onClick={() => setStep(1)}
                                                className="text-gray-500 font-black px-8 py-4 rounded-2xl capitalize"
                                            >
                                                Back to Address
                                            </Button>
                                            <Button
                                                variant="contained"
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black text-lg capitalize shadow-xl shadow-blue-600/20"
                                            >
                                                Complete Purchase
                                            </Button>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </div>
                    </Grid>

                    {/* Right Side: Order Summary */}
                    <Grid item xs={12} lg={4}>
                        <Box className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 sticky top-24">
                            <Typography className="text-2xl font-black text-[#001742] mb-8">Order Summary</Typography>

                            <div className="space-y-6 mb-8">
                                {dummyCartItems.map(item => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 p-2">
                                            <img src={item.image} alt="" className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <Typography className="font-black text-[#001742] text-sm line-clamp-2 leading-tight mb-1">
                                                {item.name}
                                            </Typography>
                                            <Typography className="text-xs text-gray-400 font-bold">Qty: {item.quantity}</Typography>
                                            <Typography className="text-blue-600 font-black mt-1">${item.price.toFixed(2)}</Typography>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Divider className="mb-8" />

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-gray-500 font-medium">
                                    <span>Subtotal</span>
                                    <span className="text-[#001742] font-black">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-500 font-medium">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-black">${shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                    <span className="text-lg font-black text-[#001742]">Grand Total</span>
                                    <span className="text-3xl font-black text-blue-600">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Box className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                <Typography className="text-[#001742] font-black text-sm mb-2">Estimated Delivery</Typography>
                                <Typography className="text-gray-500 font-bold text-sm">3 - 5 Business Days</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
};

export default Checkout;
