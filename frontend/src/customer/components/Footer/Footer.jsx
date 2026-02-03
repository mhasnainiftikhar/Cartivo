import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Link,
    IconButton,
    TextField,
    Button,
    Divider,
    Stack
} from '@mui/material';
import {
    Facebook,
    Twitter,
    Instagram,
    LinkedIn,
    YouTube,
    Email,
    Phone,
    LocationOn
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: 'Company',
            links: [
                { label: 'About Us', path: '/about' },
                { label: 'Careers', path: '/about' }, // Redirect to About for now
                { label: 'Our Blog', path: '/products' }, // Redirect to Products for now
                { label: 'Press', path: '/about' },
            ],
        },
        {
            title: 'Shop',
            links: [
                { label: 'All Products', path: '/products' },
                { label: 'My Cart', path: '/cart' },
                { label: 'Wishlist', path: '/wishlist' },
                { label: 'My Account', path: '/login' },
            ],
        },
        {
            title: 'Support',
            links: [
                { label: 'Help Center', path: '/customer-service' },
                { label: 'Shipping & Delivery', path: '/shipping-policy' },
                { label: 'Returns & Refunds', path: '/shipping-policy' },
                { label: 'Contact Us', path: '/contact-us' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { label: 'Terms & Conditions', path: '/terms-and-conditions' },
                { label: 'Privacy Policy', path: '/privacy-policy' },
                { label: 'Cookie Policy', path: '/privacy-policy' }, // consolidated
                { label: 'Security', path: '/terms-and-conditions' }, // consolidated
            ],
        },
    ];

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'primary.main',
                color: 'white',
                pt: 8,
                pb: 4,
                mt: 10
            }}
        >
            <Container maxWidth="xl">
                <Grid container spacing={4}>
                    {/* Brand and Newsletter Section */}
                    <Grid item xs={12} lg={4}>
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, letterSpacing: 1 }}>
                            CARTIVO
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, maxWidth: 300 }}>
                            Your premium destination for high-quality electronics, fashion, and home essentials. Experience the best of online shopping.
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                            Subscribe to our Newsletter
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder="Enter your email"
                                sx={{
                                    bgcolor: 'white',
                                    borderRadius: 1,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'transparent' },
                                        '&:hover fieldset': { borderColor: 'transparent' },
                                        '&.Mui-focused fieldset': { borderColor: 'transparent' },
                                    }
                                }}
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ px: 3 }}
                            >
                                Join
                            </Button>
                        </Stack>
                    </Grid>

                    {/* Links Sections */}
                    {footerSections.map((section) => (
                        <Grid item xs={6} sm={6} md={3} lg={2} key={section.title}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                                {section.title}
                            </Typography>
                            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                                {section.links.map((link) => (
                                    <Box component="li" key={link.label} sx={{ mb: 1 }}>
                                        <Link
                                            component={RouterLink}
                                            to={link.path}
                                            sx={{
                                                color: 'inherit',
                                                textDecoration: 'none',
                                                opacity: 0.7,
                                                fontSize: '0.9rem',
                                                '&:hover': { opacity: 1, color: 'secondary.main' }
                                            }}
                                        >
                                            {link.label}
                                        </Link>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />

                <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                    <Grid item xs={12} md="auto">
                        <Typography variant="body2" sx={{ opacity: 0.6 }}>
                            © {currentYear} Cartivo Inc. All rights reserved.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md="auto">
                        <Stack direction="row" spacing={1}>
                            {[Facebook, Twitter, Instagram, LinkedIn, YouTube].map((Icon, index) => (
                                <IconButton
                                    key={index}
                                    size="small"
                                    sx={{
                                        color: 'white',
                                        '&:hover': { color: 'secondary.main', transform: 'translateY(-3px)' },
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <Icon fontSize="small" />
                                </IconButton>
                            ))}
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
