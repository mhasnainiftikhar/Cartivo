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
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 800, mb: 2 }}>
                Contact Us
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6, fontWeight: 400 }}>
                Have questions? We'd love to hear from you.
            </Typography>

            <Grid container spacing={5}>
                {/* Contact Form */}
                <Grid item xs={12} md={7}>
                    <Paper elevation={0} sx={{ p: 4, border: '1px solid #e2e8f0' }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Send us a message</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="First Name" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="Last Name" variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Email Address" variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Subject" variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Message"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{ px: 4, py: 1.5, fontWeight: 700 }}
                                >
                                    Send Message
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                {/* Contact Info */}
                <Grid item xs={12} md={5}>
                    <Stack spacing={4}>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>Information</Typography>
                            <Stack spacing={3}>
                                <Stack direction="row" spacing={2} alignItems="flex-start">
                                    <Box sx={{ bgcolor: 'secondary.main', p: 1, borderRadius: 1 }}>
                                        <LocationOn sx={{ color: 'white' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Headquarters</Typography>
                                        <Typography color="text.secondary">123 Market Street, Suite 456<br />San Francisco, CA 94105</Typography>
                                    </Box>
                                </Stack>

                                <Stack direction="row" spacing={2} alignItems="flex-start">
                                    <Box sx={{ bgcolor: 'secondary.main', p: 1, borderRadius: 1 }}>
                                        <Phone sx={{ color: 'white' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Phone</Typography>
                                        <Typography color="text.secondary">+1 (555) 123-4567</Typography>
                                    </Box>
                                </Stack>

                                <Stack direction="row" spacing={2} alignItems="flex-start">
                                    <Box sx={{ bgcolor: 'secondary.main', p: 1, borderRadius: 1 }}>
                                        <Email sx={{ color: 'white' }} />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Email</Typography>
                                        <Typography color="text.secondary">support@cartivo.com</Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Box>

                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Follow Us</Typography>
                            <Stack direction="row" spacing={2}>
                                {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, index) => (
                                    <Link href="#" key={index} sx={{ color: 'primary.main', '&:hover': { color: 'secondary.main' } }}>
                                        <Icon sx={{ fontSize: 28 }} />
                                    </Link>
                                ))}
                            </Stack>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ContactUs;
