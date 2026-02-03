import React, { useState } from 'react';
import FilterSidebar from './FilterSidebar';
import ProductCard from './ProductCard';
import {
    Box,
    Typography,
    Menu,
    MenuItem,
    IconButton,
    Button,
    Breadcrumbs,
    Link
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

const dummyProducts = [
    {
        id: 1,
        name: "Apple MacBook Pro 14 M3 Chip - Space Black",
        brand: "Apple",
        image: "https://m.media-amazon.com/images/I/71jQbkYw5KL._AC_UY327_FMwebp_QL65_.jpg",
        price: 1999.00,
        discount: 10,
        color: "Black"
    },
    {
        id: 2,
        name: "Sony Alpha a7 IV Full-frame Mirrorless Camera",
        brand: "Sony",
        image: "https://m.media-amazon.com/images/I/714hINuPoBL._AC_UY327_FMwebp_QL65_.jpg",
        price: 2499.00,
        discount: 15,
        color: "Black"
    },
    {
        id: 3,
        name: "Lace Up Running Shoes - White/Blue",
        brand: "Adidas",
        image: "https://m.media-amazon.com/images/I/61w9vJzXL2L._AC_UL480_FMwebp_QL65_.jpg",
        price: 120.00,
        discount: 0,
        color: "White"
    },
    {
        id: 4,
        name: "Smart Watch Series 9 GPS + Cellular",
        brand: "Apple",
        image: "https://m.media-amazon.com/images/I/61afO93SRXL._AC_UL480_FMwebp_QL65_.jpg",
        price: 499.00,
        discount: 5,
        color: "Midnight"
    },
    {
        id: 5,
        name: "Wireless Over-Ear Noise Cancelling Headphones",
        brand: "Bose",
        image: "https://m.media-amazon.com/images/I/51BNWMBG1dL._AC_UL480_FMwebp_QL65_.jpg",
        price: 349.00,
        discount: 20,
        color: "Silver"
    },
    {
        id: 6,
        name: "Portable Bluetooth Waterproof Speaker",
        brand: "JBL",
        image: "https://m.media-amazon.com/images/I/81l7mB5LhsL._AC_UY327_FMwebp_QL65_.jpg",
        price: 129.99,
        discount: 0,
        color: "Blue"
    }
];

const Product = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [sortOrder, setSortOrder] = useState('Newest');

    const handleOpenSortMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseSortMenu = (order) => {
        if (order) setSortOrder(order);
        setAnchorEl(null);
    };

    return (
        <Box className="min-h-screen bg-gray-50/50">
            <div className="max-w-[1440px] mx-auto px-5 lg:px-20 py-10">

                {/* Breadcrumbs */}
                <Breadcrumbs aria-label="breadcrumb" className="mb-8">
                    <Link underline="hover" color="inherit" href="/" className="text-sm font-medium">Home</Link>
                    <Typography color="text.primary" className="text-sm font-bold text-blue-600">All Products</Typography>
                </Breadcrumbs>

                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Sidebar */}
                    <aside className="w-full lg:w-80 shrink-0">
                        <FilterSidebar />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">

                        {/* Header */}
                        <Box className="flex items-center justify-between mb-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <Box>
                                <h1 className="text-2xl lg:text-3xl font-black text-[#001742]">All Products</h1>
                                <Typography className="text-gray-400 font-medium text-sm mt-1">
                                    Showing 1-12 of 120 products
                                </Typography>
                            </Box>

                            <Box className="flex items-center gap-4">
                                <Box className="hidden md:flex gap-2">
                                    <Button variant="outlined" size="small" className="rounded-xl border-gray-200 text-gray-600 font-bold px-4">Grid</Button>
                                    <Button variant="text" size="small" className="rounded-xl text-gray-400 font-bold px-4">List</Button>
                                </Box>

                                <Box>
                                    <Button
                                        onClick={handleOpenSortMenu}
                                        startIcon={<SortIcon />}
                                        className="bg-gray-50 text-[#001742] font-bold px-6 py-2.5 rounded-xl border border-gray-100 hover:bg-white transition-all capitalize"
                                    >
                                        Sort By: {sortOrder}
                                    </Button>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={() => handleCloseSortMenu()}
                                        PaperProps={{
                                            className: "rounded-2xl shadow-xl border border-gray-50 p-2 mt-2 min-w-[200px]"
                                        }}
                                    >
                                        <MenuItem onClick={() => handleCloseSortMenu('Newest')} className="rounded-xl font-medium py-2">Newest First</MenuItem>
                                        <MenuItem onClick={() => handleCloseSortMenu('Price: Low to High')} className="rounded-xl font-medium py-2">Price: Low to High</MenuItem>
                                        <MenuItem onClick={() => handleCloseSortMenu('Price: High to Low')} className="rounded-xl font-medium py-2">Price: High to Low</MenuItem>
                                        <MenuItem onClick={() => handleCloseSortMenu('Popularity')} className="rounded-xl font-medium py-2">Popularity</MenuItem>
                                    </Menu>
                                </Box>
                            </Box>
                        </Box>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {dummyProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                            {/* Duplicate for demo */}
                            {dummyProducts.map((product) => (
                                <ProductCard key={`dup-${product.id}`} product={product} />
                            ))}
                        </div>

                        {/* Pagination Placeholder */}
                        <Box className="mt-16 flex justify-center">
                            <div className="flex gap-2">
                                <button className="w-12 h-12 rounded-xl bg-[#001742] text-white font-bold shadow-lg shadow-blue-900/20">1</button>
                                <button className="w-12 h-12 rounded-xl bg-white border border-gray-100 text-gray-600 font-bold hover:bg-gray-50">2</button>
                                <button className="w-12 h-12 rounded-xl bg-white border border-gray-100 text-gray-600 font-bold hover:bg-gray-50">3</button>
                                <button className="w-12 h-12 rounded-xl bg-white border border-gray-100 text-gray-600 font-bold hover:bg-gray-50">...</button>
                                <button className="w-12 h-12 rounded-xl bg-white border border-gray-100 text-gray-600 font-bold hover:bg-gray-50">12</button>
                            </div>
                        </Box>
                    </main>
                </div>
            </div>
        </Box>
    );
};

export default Product;
