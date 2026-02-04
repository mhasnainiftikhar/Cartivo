import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton
} from '@mui/material';
import {
    AccountBalanceWallet,
    PendingActions,
    AttachMoney,
    History,
    InfoOutlined
} from '@mui/icons-material';

const PaymentCard = ({ title, amount, icon, color, buttonText }) => (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
        <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${color}15`, color: color }}>
                    {icon}
                </Box>
                <IconButton size="small">
                    <InfoOutlined fontSize="small" />
                </IconButton>
            </Box>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                {amount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {title}
            </Typography>
            {buttonText && (
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, bgcolor: color, '&:hover': { bgcolor: color } }}
                >
                    {buttonText}
                </Button>
            )}
        </CardContent>
    </Card>
);

const recentPayouts = [
    { id: 'PAY-8832', date: 'Feb 1, 2026', amount: '$1,250.00', status: 'Completed', method: 'Bank Transfer' },
    { id: 'PAY-8831', date: 'Jan 15, 2026', amount: '$850.50', status: 'Completed', method: 'Bank Transfer' },
    { id: 'PAY-8830', date: 'Jan 1, 2026', amount: '$2,100.00', status: 'Completed', method: 'PayPal' },
    { id: 'PAY-8829', date: 'Dec 15, 2025', amount: '$950.00', status: 'Failed', method: 'Bank Transfer' },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Completed': return 'success';
        case 'Processing': return 'info';
        case 'Failed': return 'error';
        default: return 'default';
    }
};

const SellerPayments = () => {
    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>Payments</Typography>
                <Typography variant="body1" color="text.secondary">
                    Track your earnings, view payouts, and manage withdrawal methods.
                </Typography>
            </Box>

            {/* Payment Metrics */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                    <PaymentCard
                        title="Available for Withdrawal"
                        amount="$3,450.00"
                        icon={<AccountBalanceWallet />}
                        color="#2e7d32"
                        buttonText="Withdraw Funds"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <PaymentCard
                        title="Pending Clearance"
                        amount="$1,280.50"
                        icon={<PendingActions />}
                        color="#ed6c02"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <PaymentCard
                        title="Total Earnings"
                        amount="$45,231.89"
                        icon={<AttachMoney />}
                        color="#1976d2"
                    />
                </Grid>
            </Grid>

            {/* Recent Payouts Table */}
            <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>Recent Payouts</Typography>
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eee' }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f9fafb' }}>
                        <TableRow>
                            <TableCell fontWeight="600">Payout ID</TableCell>
                            <TableCell fontWeight="600">Date</TableCell>
                            <TableCell fontWeight="600">Amount</TableCell>
                            <TableCell fontWeight="600">Method</TableCell>
                            <TableCell fontWeight="600">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recentPayouts.map((payout) => (
                            <TableRow key={payout.id}>
                                <TableCell>{payout.id}</TableCell>
                                <TableCell>{payout.date}</TableCell>
                                <TableCell fontWeight="bold">{payout.amount}</TableCell>
                                <TableCell>{payout.method}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={payout.status}
                                        color={getStatusColor(payout.status)}
                                        size="small"
                                        variant="outlined"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default SellerPayments;
