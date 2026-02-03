import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    Chip,
    Button
} from '@mui/material';

const Press = () => {
    const news = [
        {
            date: "February 1, 2026",
            source: "TechCrunch",
            title: "Cartivo Raises $50M to Redefine E-commerce Experience",
            snippet: "The new funding will be used to expand the product line and enhance AI capabilities."
        },
        {
            date: "January 15, 2026",
            source: "Forbes",
            title: "Top 10 E-commerce Platforms to Watch in 2026",
            snippet: "Cartivo makes the list for its innovative user interface and lightning-fast checkout."
        },
        {
            date: "December 10, 2025",
            source: "Retail Dive",
            title: "Cartivo Launches Sustainable Packaging Initiative",
            snippet: "The company commits to 100% recyclable packaging by the end of next year."
        },
    ];

    return (
        <Box sx={{ py: 10 }}>
            <Container maxWidth={false} sx={{ maxWidth: '1440px', mx: 'auto', px: { xs: 2.5, lg: 10 } }}>
                <Box sx={{ textAlign: 'center', mb: 10 }}>
                    <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 3, fontWeight: 700 }}>
                        NEWSROOM
                    </Typography>
                    <Typography variant="h2" sx={{ fontWeight: 900, mb: 2 }}>
                        Cartivo in the News
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {news.map((item, index) => (
                        <Grid item xs={12} md={8} sx={{ mx: 'auto' }} key={index}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: 4,
                                borderBottom: '1px solid #eee',
                                pb: 6
                            }}>
                                <Box sx={{ minWidth: 150 }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 1 }}>
                                        {item.date}
                                    </Typography>
                                    <Chip label={item.source} size="small" variant="outlined" sx={{ fontWeight: 700 }} />
                                </Box>
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1, cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                        {item.snippet}
                                    </Typography>
                                    <Button size="small" color="primary" sx={{ fontWeight: 700, p: 0 }}>
                                        Read Article &rarr;
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ mt: 10, bgcolor: '#000', color: 'white', p: 8, borderRadius: 4, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Media Inquiries</Typography>
                    <Typography sx={{ opacity: 0.7, mb: 4 }}>
                        For press kits, interviews, and other media requests, please contact our PR team.
                    </Typography>
                    <Button variant="contained" color="secondary" size="large">
                        Contact PR Team
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Press;
