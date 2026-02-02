import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CategoryGrid = ({ title, categories }) => {
    const navigate = useNavigate();

    return (
        <Paper elevation={0} sx={{ p: 3, border: '1px solid #eee', borderRadius: 4, height: '100%', transition: 'all 0.3s', '&:hover': { boxShadow: '0 10px 30px rgba(0,0,0,0.05)' } }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, color: '#001742' }}>
                {title}
            </Typography>
            <Grid container spacing={2}>
                {categories.map((cat, index) => (
                    <Grid item xs={6} key={index}>
                        <Box
                            onClick={() => navigate(`/products?category=${cat.name.toLowerCase()}`)}
                            sx={{
                                cursor: 'pointer',
                                '&:hover img': { transform: 'scale(1.05)' },
                                '&:hover p': { color: '#2563eb' }
                            }}
                        >
                            <Box sx={{
                                aspectSquare: '1/1',
                                overflow: 'hidden',
                                borderRadius: 2,
                                bgcolor: '#f8fafc',
                                mb: 1,
                                height: '120px'
                            }}>
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.5s ease'
                                    }}
                                />
                            </Box>
                            <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', textAlign: 'center', transition: 'color 0.3s' }}>
                                {cat.name}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Typography
                variant="body2"
                sx={{
                    mt: 3,
                    color: '#2563eb',
                    fontWeight: 700,
                    cursor: 'pointer',
                    '&:hover': { textDecoration: 'underline' }
                }}
            >
                Shop all {title.toLowerCase()}
            </Typography>
        </Paper>
    );
};

export default CategoryGrid;
