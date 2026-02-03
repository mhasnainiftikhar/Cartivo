import React from 'react';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Grid, Paper, Stack, InputBase, IconButton } from '@mui/material';
import { ExpandMore, Search, LocalShipping, Payment, AccountCircle, Gavel } from '@mui/icons-material';

const CustomerService = () => {
    return (
        <Box>
            {/* Search Hero */}
            <Box sx={{ bgcolor: '#001742', color: 'white', py: 12, textAlign: 'center' }}>
                <Container maxWidth="md">
                    <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>How can we help you?</Typography>
                    <Paper
                        component="form"
                        sx={{ p: "2px 4px", display: 'flex', alignItems: 'center', width: '100%', maxWidth: 600, mx: 'auto', borderRadius: 10, pl: 3 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1, fontWeight: 600 }}
                            placeholder="Search for answers..."
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <IconButton type="button" sx={{ p: '10px', color: 'primary.main' }} aria-label="search">
                            <Search />
                        </IconButton>
                    </Paper>
                </Container>
            </Box>

            <Container maxWidth={false} sx={{ maxWidth: '1440px', mx: 'auto', px: { xs: 2.5, lg: 10 }, py: 10 }}>
                {/* Categories */}
                <Grid container spacing={4} sx={{ mb: 10, mt: -16 }}>
                    {[
                        { icon: <LocalShipping />, title: "Orders & Shipping", desc: "Track, change, or cancel order" },
                        { icon: <Payment />, title: "Returns & Refunds", desc: "Return info and refund status" },
                        { icon: <AccountCircle />, title: "My Account", desc: "Manage profile and preferences" },
                        { icon: <Gavel />, title: "Payment & Promos", desc: "Payment methods and coupons" },
                    ].map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 4,
                                    borderRadius: 4,
                                    textAlign: 'center',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    transition: '0.2s',
                                    '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 }
                                }}
                            >
                                <Box sx={{
                                    p: 2,
                                    bgcolor: 'primary.light',
                                    color: 'white',
                                    borderRadius: '50%',
                                    mb: 2,
                                    display: 'flex',
                                    width: 60, height: 60,
                                    alignItems: 'center', justifyContent: 'center'
                                }}>
                                    {React.cloneElement(item.icon, { fontSize: "large" })}
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>{item.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Popular Articles */}
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>Popular Articles</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 0, overflow: 'hidden', border: '1px solid #eee' }} elevation={0}>
                            {[
                                "Where is my order?",
                                "How to return an item",
                                "Change shipping address",
                                "Payment failed troubleshooting"
                            ].map((q, i) => (
                                <Box key={i} sx={{ p: 3, borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', '&:hover': { bgcolor: '#f9f9f9' } }}>
                                    <Typography fontWeight={600}>{q}</Typography>
                                    <Typography color="primary.main">&rarr;</Typography>
                                </Box>
                            ))}
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ bgcolor: '#e0f2fe', p: 6, borderRadius: 4, height: '100%' }}>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>Can't find what you need?</Typography>
                            <Typography sx={{ mb: 4 }}>We are available 24/7 to help you with any issues.</Typography>
                            <Button variant="contained" color="primary">Contact Support</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default CustomerService;
