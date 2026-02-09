import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerOrders, updateOrderItemStatus } from '../../../State/SellerOrderSlice';
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
    Avatar,
    Select,
    MenuItem,
    FormControl,
    InputLabel
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

const OrderCard = ({ order, onStatusUpdate }) => {
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
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: 'text.secondary' }}>
                        #{order._id.slice(-6).toUpperCase()}
                    </Typography>
                    <Chip
                        label={order.orderStatus}
                        color={getStatusColor(order.orderStatus)}
                        size="small"
                        icon={getStatusIcon(order.orderStatus)}
                        variant="outlined"
                    />
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar variant="rounded" src={order.product?.images[0]} alt={order.product?.title} sx={{ width: 45, height: 45, mr: 2 }} />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" fontWeight="600" noWrap>{order.product?.title}</Typography>
                        <Typography variant="caption" color="text.secondary" display="block">Customer: {order.userId?.name}</Typography>
                        <Typography variant="caption" color="text.secondary">{new Date(order.createdAt).toLocaleDateString()}</Typography>
                    </Box>
                </Box>

                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Qty: {order.quantity}
                    </Typography>
                    <Typography variant="subtitle1" color="primary.main" fontWeight="bold">
                        ${order.sellingPrice.toFixed(2)}
                    </Typography>
                </Stack>

                <FormControl fullWidth size="small">
                    <InputLabel color="primary">Update Status</InputLabel>
                    <Select
                        value={order.orderStatus}
                        label="Update Status"
                        onChange={(e) => onStatusUpdate(order._id, e.target.value)}
                        sx={{ borderRadius: 2 }}
                    >
                        <MenuItem value="PENDING">Pending</MenuItem>
                        <MenuItem value="SHIPPED">Shipped</MenuItem>
                        <MenuItem value="DELIVERED">Delivered</MenuItem>
                        <MenuItem value="CANCELLED">Cancelled</MenuItem>
                    </Select>
                </FormControl>
            </CardContent>
        </Card>
    );
};

const SellerOrders = () => {
    const dispatch = useDispatch();
    const { sellerOrder } = useSelector(store => store);

    useEffect(() => {
        dispatch(fetchSellerOrders(localStorage.getItem("sellerJwt")));
    }, [dispatch]);

    const handleStatusUpdate = (orderItemId, status) => {
        dispatch(updateOrderItemStatus({ jwt: localStorage.getItem("sellerJwt"), orderItemId, status }));
    };

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>Orders</Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage and track all your customer orders efficiently.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {sellerOrder.orders.map((order) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={order._id}>
                        <OrderCard order={order} onStatusUpdate={handleStatusUpdate} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SellerOrders;
