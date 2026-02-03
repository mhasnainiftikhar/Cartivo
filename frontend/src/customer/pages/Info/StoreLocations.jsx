import React from 'react';
import { Box, Container, Typography, Grid, Paper, Stack, Chip, Button } from '@mui/material';
import { LocationOn, AccessTime, Phone } from '@mui/icons-material';

const StoreLocations = () => {
    const locations = [
        { city: "San Francisco", address: "123 Market St, CA 94105", status: "Open Now", phone: "+1 (415) 555-0123" },
        { city: "New York", address: "456 Broadway, NY 10012", status: "Open Now", phone: "+1 (212) 555-0123" },
        { city: "London", address: "789 Oxford St, London W1D", status: "Closed", phone: "+44 20 7123 4567" },
        { city: "Tokyo", address: "1-1 Shibuya, Tokyo 150", status: "Open Now", phone: "+81 3 1234 5678" }
    ];

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex' }}>
            <Container maxWidth={false} sx={{ maxWidth: '1440px', mx: 'auto', px: { xs: 2.5, lg: 10 }, py: 10 }}>
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 6 }}>Find a Store</Typography>

                <Grid container spacing={4}>
                    {/* List View */}
                    <Grid item xs={12} md={4}>
                        <Stack spacing={2} sx={{ height: '70vh', overflowY: 'auto', pr: 2 }}>
                            {locations.map((loc, index) => (
                                <Paper key={index} elevation={0} sx={{ p: 3, border: '1px solid #eee', cursor: 'pointer', transition: '0.2s', '&:hover': { borderColor: 'primary.main' } }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                                        <Typography variant="h6" sx={{ fontWeight: 800 }}>{loc.city}</Typography>
                                        <Chip label={loc.status} size="small" color={loc.status === "Open Now" ? "success" : "default"} variant="filled" sx={{ height: 20, fontSize: 10, fontWeight: 700 }} />
                                    </Stack>
                                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
                                        <LocationOn fontSize="small" /> {loc.address}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                        <Phone fontSize="small" /> {loc.phone}
                                    </Typography>
                                    <Button variant="outlined" fullWidth size="small">Get Directions</Button>
                                </Paper>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Map Placeholder */}
                    <Grid item xs={12} md={8}>
                        <Box sx={{
                            height: '70vh',
                            bgcolor: '#f0f0f0',
                            borderRadius: 4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundImage: 'url("https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=800x600&maptype=roadmap&sensor=false")', // Fake static map URL for visual
                            backgroundSize: 'cover'
                        }}>
                            <Paper sx={{ p: 2, borderRadius: 2 }}>
                                <Typography fontWeight={700}>San Francisco Store</Typography>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default StoreLocations;
