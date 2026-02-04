import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SellerSidebar from './components/Sidebar/SellerSidebar';
import SellerNavbar from './components/Navbar/SellerNavbar';

const drawerWidth = 240;

const SellerLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navbar - Fixed at top */}
            <SellerNavbar handleDrawerToggle={handleDrawerToggle} />

            {/* Sidebar - Responsive */}
            <SellerSidebar
                open={mobileOpen}
                onClose={handleDrawerToggle}
            />

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    bgcolor: 'background.default',
                    minHeight: '100vh'
                }}
            >
                <Toolbar /> {/* Spacer for the fixed AppBar */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default SellerLayout;
