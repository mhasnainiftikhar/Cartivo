import React, { useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import ProductCard from '../../pages/Product/ProductCard';

const ProductCarousel = ({ title, products }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = 300;
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <Box sx={{ my: 6, px: { xs: 2, lg: 10 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#001742' }}>
                    {title}
                </Typography>
                <Box>
                    <IconButton onClick={() => scroll('left')} size="small" sx={{ border: '1px solid #eee', mr: 1 }}>
                        <ChevronLeft />
                    </IconButton>
                    <IconButton onClick={() => scroll('right')} size="small" sx={{ border: '1px solid #eee' }}>
                        <ChevronRight />
                    </IconButton>
                </Box>
            </Box>

            <Box
                ref={scrollRef}
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    gap: 3,
                    pb: 3,
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                    scrollBehavior: 'smooth',
                }}
            >
                {products.map((product, index) => (
                    <Box key={index} sx={{ minWidth: { xs: '200px', md: '280px' }, maxWidth: { xs: '200px', md: '280px' } }}>
                        <ProductCard product={product} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ProductCarousel;
