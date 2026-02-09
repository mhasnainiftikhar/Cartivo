import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

const SellerProtectedRoute = () => {
    const { seller } = useSelector(store => store);

    // If still loading and no seller data yet, show spinner
    if (seller.loading && !seller.seller) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress color="primary" />
            </Box>
        );
    }

    // If not authenticated, redirect to login
    if (!seller.sellerJwt && !localStorage.getItem("sellerJwt")) {
        return <Navigate to="/seller-login" replace />;
    }

    // If authenticated, render nested routes
    return <Outlet />;
};

export default SellerProtectedRoute;
