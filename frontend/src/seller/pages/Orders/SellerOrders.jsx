import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Chip,
    Divider,
    Stack,
    Avatar
} from '@mui/material';
import {
    AccessTime,
    LocalShipping,
    CheckCircle,
    Cancel,
    ArrowForward
} from '@mui/icons-material';

const mockOrders = [
    {
        id: '#ORD-001',
        customer: 'John Doe',
        date: 'Feb 4, 2026',
        total: '$150.00',
        status: 'Pending',
        items: 3,
        image: 'https://via.placeholder.com/50'
    },
    {
        id: '#ORD-002',
        customer: 'Jane Smith',
        date: 'Feb 3, 2026',
        total: '$89.99',
        status: 'Shipped',
        items: 1,
        image: 'https://via.placeholder.com/50'
    },
    {
        id: '#ORD-003',
        customer: 'Michael Brown',
        date: 'Feb 2, 2026',
        total: '$210.50',
        status: 'Delivered',
        items: 4,
        image: 'https://via.placeholder.com/50'
    },
    {
        id: '#ORD-004',
        customer: 'Emily White',
        date: 'Feb 1, 2026',
        total: '$45.00',
        status: 'Cancelled',
        items: 1,
        image: 'https://via.placeholder.com/50'
    },
    {
        id: '#ORD-005',
        customer: 'Chris Green',
        date: 'Jan 30, 2026',
        total: '$320.00',
        status: 'Processing',
        items: 2,
        image: 'https://via.placeholder.com/50'
    }
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Pending': return 'warning';
        case 'Processing': return 'info';
        case 'Shipped': return 'primary';
        case 'Delivered': return 'success';
        case 'Cancelled': return 'error';
        default: return 'default';
    }
};

const getStatusIcon = (status) => {
    switch (status) {
        case 'Pending': return <AccessTime fontSize="small" />;
        case 'Processing': return <AccessTime fontSize="small" />;
        case 'Shipped': return <LocalShipping fontSize="small" />;
        case 'Delivered': return <CheckCircle fontSize="small" />;
        case 'Cancelled': return <Cancel fontSize="small" />;
        default: return null;
    }
};

const OrderCard = ({ order }) => {
    return (
        <Card sx={{
            border: '1px solid #eee',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }
        }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        {order.id}
                    </Typography>
                    <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                        icon={getStatusIcon(order.status)}
                        variant="outlined"
                    />
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar src={order.image} alt={order.customer} sx={{ width: 40, height: 40, mr: 2 }} />
                    <Box>
                        <Typography variant="body1" fontWeight="500">{order.customer}</Typography>
                        <Typography variant="caption" color="text.secondary">{order.date}</Typography>
                    </Box>
                </Box>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                        {order.items} {order.items === 1 ? 'Item' : 'Items'}
                    </Typography>
                    <Typography variant="h6" color="primary.main" fontWeight="bold">
                        {order.total}
                    </Typography>
                </Stack>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                    fullWidth
                    variant="contained"
                    endIcon={<ArrowForward />}
                    sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        bgcolor: 'primary.main',
                        '&:hover': { bgcolor: 'primary.dark' }
                    }}
                >
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
};

const SellerOrders = () => {
    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>Orders</Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage and track all your customer orders efficiently.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {mockOrders.map((order) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={order.id}>
                        <OrderCard order={order} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SellerOrders;
