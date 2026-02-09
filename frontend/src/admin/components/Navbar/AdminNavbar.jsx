import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Button } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = ({ onMenuClick }) => {
    const navigate = useNavigate();

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                bgcolor: 'white',
                color: 'primary.main',
                boxShadow: 'none',
                borderBottom: '1px solid #eee'
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={onMenuClick}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h4"
                        noWrap
                        component={Link}
                        to="/admin"
                        sx={{
                            fontWeight: 400,
                            color: 'primary.main',
                            textDecoration: 'none',
                            fontFamily: '"Playwrite NZ Basic"',
                            fontSize: '1.8rem'
                        }}
                    >
                        Cartivo<span style={{ color: '#00897b' }}>.</span>
                        <Typography
                            component="span"
                            sx={{
                                ml: 1,
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                color: 'text.secondary',
                                textTransform: 'uppercase',
                                letterSpacing: 1
                            }}
                        >
                            Admin
                        </Typography>
                    </Typography>
                </Box>

                <Button
                    variant="outlined"
                    onClick={() => navigate('/')}
                    sx={{
                        textTransform: 'none',
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        fontWeight: 600,
                        borderRadius: 2,
                        '&:hover': {
                            borderColor: 'primary.main',
                            bgcolor: 'rgba(0, 23, 66, 0.05)',
                        }
                    }}
                >
                    View Storefront
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default AdminNavbar;
