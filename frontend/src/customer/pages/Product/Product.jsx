import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FilterSidebar from './FilterSidebar';
import ProductCard from './ProductCard';
import { fetchProducts } from '../../../State/ProductSlice';
import {
    Box,
    Typography,
    Menu,
    MenuItem,
    Button,
    Breadcrumbs,
    Link,
    CircularProgress
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

const Product = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { product } = useSelector(store => store);

    const sortOrder = searchParams.get('sort') || 'Newest';

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        dispatch(fetchProducts(params));
    }, [searchParams, dispatch]);

    const handleOpenSortMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseSortMenu = (order) => {
        if (order) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set('sort', order);
            setSearchParams(newParams);
        }
        setAnchorEl(null);
    };

    const handlePageChange = (page) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', page);
        setSearchParams(newParams);
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
                                    {product.loading ? 'Updating products...' : `Showing ${product.products.length} of ${product.totalElements || product.products.length} products`}
                                </Typography>
                            </Box>

                            <Box className="flex items-center gap-4">
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
                        {product.loading ? (
                            <Box className="flex justify-center py-20">
                                <CircularProgress color="primary" />
                            </Box>
                        ) : product.products.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {product.products.map((p) => (
                                    <ProductCard key={p._id || p.id} product={p} />
                                ))}
                            </div>
                        ) : (
                            <Box className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                                <Typography variant="h6" className="text-gray-400">No products found for the selected filters.</Typography>
                                <Button
                                    onClick={() => setSearchParams({})}
                                    className="mt-4 text-blue-600 font-bold"
                                >
                                    Clear All Filters
                                </Button>
                            </Box>
                        )}

                        {/* Pagination */}
                        {!product.loading && product.totalPages > 1 && (
                            <Box className="mt-16 flex justify-center">
                                <div className="flex gap-2">
                                    {[...Array(product.totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`w-12 h-12 rounded-xl font-bold transition-all ${(searchParams.get('page') || '1') === (i + 1).toString()
                                                    ? 'bg-[#001742] text-white shadow-lg shadow-blue-900/20'
                                                    : 'bg-white border border-gray-100 text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            </Box>
                        )}
                    </main>
                </div>
            </div>
        </Box>
    );
};

export default Product;
