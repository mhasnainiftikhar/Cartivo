import React, { useState } from 'react';
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
    TextField,
    InputAdornment,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const mockTransactions = [
    { id: 'TXN-001', date: 'Feb 4, 2026', type: 'Order Payment', amount: '+$150.00', status: 'Completed', ref: '#ORD-001' },
    { id: 'TXN-002', date: 'Feb 3, 2026', type: 'Refund', amount: '-$50.00', status: 'Completed', ref: '#ORD-998' },
    { id: 'TXN-003', date: 'Feb 1, 2026', type: 'Service Fee', amount: '-$5.00', status: 'Completed', ref: 'N/A' },
    { id: 'TXN-004', date: 'Jan 28, 2026', type: 'Payout', amount: '-$1,200.00', status: 'Processing', ref: 'PAY-8832' },
    { id: 'TXN-005', date: 'Jan 25, 2026', type: 'Order Payment', amount: '+$89.99', status: 'Completed', ref: '#ORD-002' },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Completed': return 'success';
        case 'Processing': return 'warning';
        case 'Failed': return 'error';
        case 'Refunded': return 'info';
        default: return 'default';
    }
};

const SellerTransactions = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');

    const filteredTransactions = mockTransactions.filter(txn =>
        (typeFilter === 'All' || txn.type === typeFilter) &&
        (txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            txn.ref.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>Transactions</Typography>
                <Typography variant="body1" color="text.secondary">
                    Detailed history of all your financial transactions.
                </Typography>
            </Box>

            {/* Filters */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                    size="small"
                    placeholder="Search by ID or Reference..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ minWidth: 300, bgcolor: 'white' }}
                />
                <FormControl size="small" sx={{ minWidth: 150 }}>
                    <Select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="All">All Types</MenuItem>
                        <MenuItem value="Order Payment">Order Payments</MenuItem>
                        <MenuItem value="Payout">Payouts</MenuItem>
                        <MenuItem value="Refund">Refunds</MenuItem>
                        <MenuItem value="Service Fee">Fees</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Transactions Table */}
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eee' }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f9fafb' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Transaction ID</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Reference</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTransactions.map((txn) => (
                            <TableRow
                                key={txn.id}
                                sx={{ '&:hover': { bgcolor: '#f9f9f9' } }}
                            >
                                <TableCell component="th" scope="row" sx={{ fontFamily: 'monospace' }}>
                                    {txn.id}
                                </TableCell>
                                <TableCell>{txn.date}</TableCell>
                                <TableCell>{txn.type}</TableCell>
                                <TableCell>{txn.ref}</TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: 600,
                                        color: txn.amount.startsWith('+') ? 'success.main' :
                                            txn.amount.startsWith('-') && !txn.type.includes('Payout') ? 'error.main' : 'text.primary'
                                    }}
                                >
                                    {txn.amount}
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={txn.status}
                                        color={getStatusColor(txn.status)}
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

export default SellerTransactions;
