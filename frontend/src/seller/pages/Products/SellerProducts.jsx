import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    IconButton,
    Chip,
    TextField,
    InputAdornment,
    Stack
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    FilterList as FilterListIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock Data
const mockProducts = [
    {
        id: 1,
        name: 'Men\'s Casual T-Shirt',
        category: 'Men',
        price: 29.99,
        stock: 124,
        status: 'Active',
        image: 'https://via.placeholder.com/50'
    },
    {
        id: 2,
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: 99.99,
        stock: 45,
        status: 'Active',
        image: 'https://via.placeholder.com/50'
    },
    {
        id: 3,
        name: 'Summer Flora Dress',
        category: 'Women',
        price: 59.50,
        stock: 0,
        status: 'Out of Stock',
        image: 'https://via.placeholder.com/50'
    },
    {
        id: 4,
        name: 'Running Shoes',
        category: 'Men',
        price: 85.00,
        stock: 23,
        status: 'Active',
        image: 'https://via.placeholder.com/50'
    },
    {
        id: 5,
        name: 'Smart Watch Series 5',
        category: 'Electronics',
        price: 249.99,
        stock: 10,
        status: 'Low Stock',
        image: 'https://via.placeholder.com/50'
    },
    {
        id: 6,
        name: 'Leather Handbag',
        category: 'Women',
        price: 120.00,
        stock: 15,
        status: 'Active',
        image: 'https://via.placeholder.com/50'
    }
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Active': return 'success';
        case 'Out of Stock': return 'error';
        case 'Low Stock': return 'warning';
        case 'Draft': return 'default';
        default: return 'default';
    }
};

const SellerProducts = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = mockProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold">Products</Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your product inventory
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/seller/add-product')}
                    sx={{
                        textTransform: 'none',
                        bgcolor: '#001742',
                        '&:hover': { bgcolor: '#001742ee' }
                    }}
                >
                    Add Product
                </Button>
            </Box>

            {/* Filters and Search */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField
                    size="small"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ maxWidth: 400, bgcolor: 'white' }}
                />
                <Button
                    variant="outlined"
                    startIcon={<FilterListIcon />}
                    sx={{ textTransform: 'none', color: '#001742', borderColor: '#001742' }}
                >
                    Filters
                </Button>
            </Box>

            {/* Product Table */}
            <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #eee' }}>
                <Table sx={{ minWidth: 650 }} aria-label="product table">
                    <TableHead sx={{ bgcolor: '#f9fafb' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Product</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Stock</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f9f9f9' } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar variant="rounded" src={product.image} alt={product.name} />
                                        <Typography variant="body2" fontWeight="500">
                                            {product.name}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>${product.price.toFixed(2)}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={product.status}
                                        color={getStatusColor(product.status)}
                                        size="small"
                                        variant="outlined"
                                        sx={{ fontWeight: 500 }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <IconButton size="small" color="primary">
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" color="error">
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default SellerProducts;
