import React from 'react';
import {
    Container,
    Typography,
    Grid,
    Box,
    TextField,
    Button,
    Paper,
    Stack,
    Link
} from '@mui/material';
import {
    Email,
    Phone,
    LocationOn,
    Facebook,
    Twitter,
    Instagram,
    LinkedIn
} from '@mui/icons-material';

const ContactUs = () => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <Container maxWidth={false} sx={{ maxWidth: '1440px', mx: 'auto', px: { xs: 2.5, lg: 10 }, py: 10 }}>
                <Grid container spacing={8} alignItems="center">
                    {/* Left Side: Visual & Info */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{ position: 'relative' }}>
                            <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: 2, color: 'primary.main', mb: 2, display: 'block' }}>
                                GET IN TOUCH
                            </Typography>
                            <Typography variant="h2" sx={{ fontWeight: 900, mb: 4, lineHeight: 1 }}>
                                Let's talk about everything!
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ mb: 6, fontWeight: 400 }}>
                                Hate forms? Send us an email instead.
                            </Typography>

                            <Stack spacing={4}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 1.5, borderRadius: 2 }}>
                                        <Email />
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 700, opacity: 0.6 }}>EMAIL US</Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>hello@cartivo.com</Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Box sx={{ bgcolor: 'secondary.main', color: 'black', p: 1.5, borderRadius: 2 }}>
                                        <Phone />
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 700, opacity: 0.6 }}>CALL US</Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>+1 (555) 000-0000</Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Box sx={{ bgcolor: '#eee', color: 'black', p: 1.5, borderRadius: 2 }}>
                                        <LocationOn />
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" sx={{ fontWeight: 700, opacity: 0.6 }}>VISIT US</Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>123 Cartivo Lane, SF, CA</Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>

                    {/* Right Side: Form */}
                    <Grid item xs={12} md={7}>
                        <Paper elevation={0} sx={{ p: { xs: 4, md: 8 }, bgcolor: 'white', border: '1px solid #f1f5f9', borderRadius: 8, boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Your Name" variant="filled" hiddenLabel InputProps={{ disableUnderline: true, sx: { borderRadius: 3 } }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Email Address" variant="filled" hiddenLabel InputProps={{ disableUnderline: true, sx: { borderRadius: 3 } }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Subject" variant="filled" hiddenLabel InputProps={{ disableUnderline: true, sx: { borderRadius: 3 } }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Write your message..." multiline rows={4} variant="filled" hiddenLabel InputProps={{ disableUnderline: true, sx: { borderRadius: 3 } }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" size="large" fullWidth sx={{ py: 2, borderRadius: 3, fontSize: '1.1rem', fontWeight: 800 }}>
                                        Send Message
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ContactUs;
