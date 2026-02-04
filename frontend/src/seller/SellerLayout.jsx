import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import SellerSidebar from './components/Sidebar/SellerSidebar';

const drawerWidth = 240;

const SellerLayout = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <SellerSidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar /> {/* Spacer for top if we had an AppBar, otherwise just nice spacing */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default SellerLayout;
