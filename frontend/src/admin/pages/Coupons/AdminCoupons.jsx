import React from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    Button
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const mockCoupons = [
    { id: 1, code: 'WELCOME10', discount: '10%', type: 'Percentage', expiry: '2026-12-31', status: 'Active' },
    { id: 2, code: 'SUMMER50', discount: '$50', type: 'Fixed', expiry: '2026-08-30', status: 'Active' },
    { id: 3, code: 'EXPIRED20', discount: '20%', type: 'Percentage', expiry: '2025-01-01', status: 'Expired' },
];

const AdminCoupons = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">
                    Manage Coupons
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => navigate('/admin/add-coupon')}
                    sx={{
                        bgcolor: '#00897b',
                        '&:hover': { bgcolor: '#00796b' },
                        textTransform: 'none',
                        fontWeight: 'bold',
                        borderRadius: 2
                    }}
                >
                    Add New Coupon
                </Button>
            </Box>

            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eee', borderRadius: 2 }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f9fafb' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Coupon Code</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Discount</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Type</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Expiry Date</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockCoupons.map((coupon) => (
                            <TableRow key={coupon.id} sx={{ '&:hover': { bgcolor: '#fafafa' } }}>
                                <TableCell sx={{ fontWeight: 600, color: 'primary.main' }}>{coupon.code}</TableCell>
                                <TableCell>{coupon.discount}</TableCell>
                                <TableCell>{coupon.type}</TableCell>
                                <TableCell>{coupon.expiry}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={coupon.status}
                                        size="small"
                                        color={coupon.status === 'Active' ? 'success' : 'default'}
                                        sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton size="small" sx={{ mr: 1, color: '#00897b' }}>
                                        <Edit fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" color="error">
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AdminCoupons;
