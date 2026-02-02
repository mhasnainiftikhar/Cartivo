import React from 'react';
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Slider,
    Typography,
    Box,
    Divider,
    Checkbox,
    FormGroup
} from '@mui/material';

const colors = [
    { name: 'White', color: '#FFFFFF' },
    { name: 'Black', color: '#000000' },
    { name: 'Red', color: '#EF4444' },
    { name: 'Blue', color: '#3B82F6' },
    { name: 'Green', color: '#10B981' },
    { name: 'Purple', color: '#8B5CF6' },
    { name: 'Yellow', color: '#F59E0B' },
];

const discounts = [
    { label: '10% Off or more', value: 10 },
    { label: '20% Off or more', value: 20 },
    { label: '30% Off or more', value: 30 },
    { label: '40% Off or more', value: 40 },
    { label: '50% Off or more', value: 50 },
    { label: '60% Off or more', value: 60 },
    { label: '70% Off or more', value: 70 },
];

const FilterSidebar = () => {
    return (
        <Box className="space-y-8 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm h-fit">
            <Typography variant="h6" className="font-extrabold text-[#001742] mb-4">
                Filters
            </Typography>

            {/* Color Filter */}
            <Box>
                <Typography className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-widest">
                    Color
                </Typography>
                <Box className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                        <Box
                            key={color.name}
                            className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-100 hover:scale-110 transition-transform shadow-sm relative group"
                            style={{ backgroundColor: color.color }}
                        >
                            <Box className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                                {color.name}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Divider className="opacity-50" />

            {/* Price Filter */}
            <Box>
                <Typography className="font-bold text-gray-800 mb-6 text-sm uppercase tracking-widest">
                    Price Range
                </Typography>
                <Box className="px-2">
                    <Slider
                        defaultValue={[100, 5000]}
                        max={10000}
                        min={0}
                        valueLabelDisplay="auto"
                        className="text-blue-600"
                    />
                    <Box className="flex justify-between mt-2">
                        <Typography variant="body2" className="text-gray-500 font-medium">$0</Typography>
                        <Typography variant="body2" className="text-gray-500 font-medium">$10,000</Typography>
                    </Box>
                </Box>
            </Box>

            <Divider className="opacity-50" />

            {/* Discount Filter */}
            <Box>
                <Typography className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-widest">
                    Discount
                </Typography>
                <FormControl>
                    <RadioGroup name="discount-filter">
                        {discounts.map((discount) => (
                            <FormControlLabel
                                key={discount.value}
                                value={discount.value.toString()}
                                control={<Radio size="small" className="text-blue-600" />}
                                label={
                                    <Typography className="text-sm text-gray-600 font-medium hover:text-blue-600 transition-colors">
                                        {discount.label}
                                    </Typography>
                                }
                                className="mb-1"
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Box>

            <Divider className="opacity-50" />

            <button className="w-full py-3 bg-[#001742] text-white rounded-xl text-sm font-bold hover:bg-blue-900 transition-all shadow-md shadow-blue-900/10">
                Clear All Filters
            </button>
        </Box>
    );
};

export default FilterSidebar;
