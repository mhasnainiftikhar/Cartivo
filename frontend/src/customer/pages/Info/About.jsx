import React from 'react';
import { Container, Typography, Box, Grid, Paper, Avatar, Stack } from '@mui/material';
import { Storefront, Groups, Public, EmojiEvents } from '@mui/icons-material';

const About = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
                    About Cartivo
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                    We are redefining the online shopping experience by bringing quality, style, and convenience directly to your doorstep.
                </Typography>
            </Box>

            {/* Mission Section */}
            <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={0}
                        sx={{
                            height: 400,
                            bgcolor: 'grey.200',
                            backgroundImage: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: 4
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Our Mission</Typography>
                    <Typography variant="body1" paragraph color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                        Founded in 2024, Cartivo started with a simple idea: to create an e-commerce platform that puts the customer first. We believe that shopping should be seamless, secure, and enjoyable.
                    </Typography>
                    <Typography variant="body1" paragraph color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                        Our mission is to provide a curated selection of high-quality products across electronics, fashion, and home essentials, all while delivering exceptional customer service and lightning-fast shipping.
                    </Typography>
                </Grid>
            </Grid>

            {/* Stats Section */}
            <Grid container spacing={4} sx={{ mb: 8 }}>
                {[
                    { icon: <Storefront sx={{ fontSize: 40 }} />, count: "10K+", label: "Products" },
                    { icon: <Groups sx={{ fontSize: 40 }} />, count: "50K+", label: "Happy Customers" },
                    { icon: <Public sx={{ fontSize: 40 }} />, count: "20+", label: "Countries Served" },
                    { icon: <EmojiEvents sx={{ fontSize: 40 }} />, count: "15+", label: "Industry Awards" },
                ].map((stat, index) => (
                    <Grid item xs={6} md={3} key={index}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                bgcolor: 'primary.main',
                                color: 'white',
                                borderRadius: 2
                            }}
                        >
                            <Box sx={{ mb: 1, opacity: 0.9 }}>{stat.icon}</Box>
                            <Typography variant="h4" sx={{ fontWeight: 800 }}>{stat.count}</Typography>
                            <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>{stat.label}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Values Section */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 6 }}>Why Choose Us?</Typography>
                <Grid container spacing={4}>
                    {[
                        { title: "Quality Assurance", desc: "We handpick every item to ensure it meets our high standards." },
                        { title: "Secure Payments", desc: "Your transactions are protected with top-tier encryption technology." },
                        { title: "Fast Delivery", desc: "We partner with optimal logistics providers to get your order to you fast." }
                    ].map((value, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Box sx={{ p: 3, height: '100%' }}>
                                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{value.title}</Typography>
                                <Typography color="text.secondary">{value.desc}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default About;
