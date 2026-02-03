import React from 'react';
import { Container, Typography, Box, Divider, Paper } from '@mui/material';

const ShippingPolicy = () => {
    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 800 }}>
                Shipping & Returns
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Everything you need to know about delivery and refunds.
            </Typography>

            <Divider sx={{ mb: 6 }} />

            {/* Shipping Section */}
            <Box sx={{ mb: 6 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
                    Shipping Policy
                </Typography>

                <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8fafc', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Standard Shipping</Typography>
                    <Typography variant="body2" paragraph>
                        Delivery within 5-7 business days. Free for orders over $50.
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Express Shipping</Typography>
                    <Typography variant="body2">
                        Delivery within 2-3 business days. Flat rate of $15.
                    </Typography>
                </Paper>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Order Processing</Typography>
                    <Typography variant="body1" paragraph>
                        All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>International Shipping</Typography>
                    <Typography variant="body1" paragraph>
                        We currently ship to select international destinations. Shipping charges for your order will be calculated and displayed at checkout.
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ mb: 6 }} />

            {/* Returns Section */}
            <Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
                    Return & Refund Policy
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>30-Day Return Policy</Typography>
                    <Typography variant="body1" paragraph>
                        You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
                    </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Refund Process</Typography>
                    <Typography variant="body1" paragraph>
                        Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.
                        If your return is approved, we will initiate a refund to your credit card (or original method of payment).
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Return Shipping</Typography>
                    <Typography variant="body1" paragraph>
                        You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default ShippingPolicy;
