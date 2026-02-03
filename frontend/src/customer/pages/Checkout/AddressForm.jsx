import React from 'react';
import { Grid, TextField, Box, Typography, Button } from '@mui/material';

const AddressForm = () => {
    return (
        <Box className="space-y-8">
            <Typography className="text-2xl font-black text-[#001742]">Shipping Address</Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        className="bg-gray-50 rounded-2xl"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        className="bg-gray-50 rounded-2xl"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        label="Address Line 1"
                        variant="outlined"
                        className="bg-gray-50 rounded-2xl"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Address Line 2 (Optional)"
                        variant="outlined"
                        className="bg-gray-50 rounded-2xl"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        label="City"
                        variant="outlined"
                        className="bg-gray-50 rounded-2xl"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        label="State/Province"
                        variant="outlined"
                        className="bg-gray-50 rounded-2xl"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        label="ZIP / Postal Code"
                        variant="outlined"
                        className="bg-gray-50 rounded-2xl"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        label="Mobile Number"
                        variant="outlined"
                        className="bg-gray-50 rounded-2xl"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                    />
                </Grid>
            </Grid>

            <Box className="pt-4">
                <Button
                    variant="contained"
                    className="bg-[#001742] hover:bg-[#081e4b] text-white px-10 py-4 rounded-2xl font-black text-lg capitalize shadow-xl shadow-blue-900/10"
                >
                    Deliver to this Address
                </Button>
            </Box>
        </Box>
    );
};

export default AddressForm;
