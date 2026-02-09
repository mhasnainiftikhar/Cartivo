import React from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent } from '@mui/material';
import {
    TrendingUp,
    People,
    ShoppingCart,
    AttachMoney
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography color="text.secondary" variant="overline" fontWeight="700">
                        {title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                        {value}
                    </Typography>
                </Box>
                <Box sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: `${color}15`,
                    color: color,
                    display: 'flex'
                }}>
                    {icon}
                </Box>
            </Box>
        </CardContent>
    </Card>
);

const AdminDashboard = () => {
    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
                Admin Dashboard
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Revenue" value="$128,430" icon={<AttachMoney />} color="#00897b" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Users" value="1,240" icon={<People />} color="#2196f3" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total Orders" value="854" icon={<ShoppingCart />} color="#ffb74d" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Active Coupons" value="12" icon={<TrendingUp />} color="#f06292" />
                </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mt: 3 }}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, height: 400, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography color="text.secondary">Sales Analytics Chart Placeholder</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, height: 400, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography color="text.secondary">Recent Activities Placeholder</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
