import React from 'react';
import { Box, Typography, Button, TextField, Grid, Paper, MenuItem } from '@mui/material';
import { Save } from '@mui/icons-material';

const AddCoupon = () => {
    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
                Add New Coupon
            </Typography>

            <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Coupon Code" placeholder="SALE50" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Discount Percentage" type="number" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth select label="Coupon Type" defaultValue="Percentage">
                            <MenuItem value="Percentage">Percentage</MenuItem>
                            <MenuItem value="Fixed">Fixed Amount</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Expiry Date" type="date" InputLabelProps={{ shrink: true }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Description" multiline rows={3} />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button
                            variant="contained"
                            startIcon={<Save />}
                            sx={{
                                bgcolor: '#00897b',
                                '&:hover': { bgcolor: '#00796b' },
                                px: 4,
                                py: 1.5,
                                fontWeight: 'bold'
                            }}
                        >
                            Save Coupon
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default AddCoupon;
