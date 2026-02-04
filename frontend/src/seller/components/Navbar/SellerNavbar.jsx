import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SellerNavbar = ({ handleDrawerToggle }) => {
    const navigate = useNavigate();

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                bgcolor: 'white',
                color: 'primary.main',
                boxShadow: 'none',
                borderBottom: '1px solid #eee',
                py: 0.5
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Logo */}
                <Typography
                    variant="h4"
                    noWrap
                    component="div"
                    sx={{
                        fontWeight: 400,
                        color: 'primary.main',
                        cursor: 'pointer',
                        letterSpacing: '1px',
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        fontFamily: '"Playwrite NZ Basic"',
                        fontSize: { xs: '1.5rem', md: '2rem' }
                    }}
                    onClick={() => navigate('/seller/dashboard')}
                >
                    Cartivo<span style={{ color: '#2563eb' }}>.</span>
                    <Typography component="span" sx={{ ml: 1, fontSize: '0.9rem', fontWeight: 600, color: 'text.secondary', verticalAlign: 'middle', mt: 1.5 }}>
                        Seller
                    </Typography>
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <Button
                    variant="outlined"
                    onClick={() => navigate('/')}
                    sx={{
                        textTransform: 'none',
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        fontWeight: 600,
                        borderRadius: 8,
                        px: 3,
                        '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'rgba(0, 23, 66, 0.05)'
                        }
                    }}
                >
                    Go to Client Site
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default SellerNavbar;
