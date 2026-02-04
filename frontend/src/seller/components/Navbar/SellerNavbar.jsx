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
                color: '#001742',
                boxShadow: 1, // Slight shadow for depth
                borderBottom: '1px solid #eee'
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
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        fontWeight: 700,
                        color: '#001742',
                        cursor: 'pointer',
                        letterSpacing: '1px',
                        display: 'flex',
                        alignItems: 'center',
                        mr: 4,
                        fontFamily: '"Playwrite NZ Basic"' // Matching client side if possible, or fallback
                    }}
                    onClick={() => navigate('/seller/dashboard')}
                >
                    Cartivo Seller
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <Button
                    variant="outlined"
                    onClick={() => navigate('/')}
                    sx={{
                        textTransform: 'none',
                        borderColor: '#001742',
                        color: '#001742',
                        fontWeight: 600,
                        '&:hover': {
                            borderColor: '#001742',
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
