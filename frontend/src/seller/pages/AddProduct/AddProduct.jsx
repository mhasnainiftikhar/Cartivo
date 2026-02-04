import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    Divider,
    Stack,
    IconButton
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    Close as CloseIcon,
    Save as SaveIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const AddProduct = () => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        discountPrice: '',
        stock: '',
        category: '',
        subCategory: '',
        brand: '',
        sku: ''
    });

    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (event) => {
        if (event.target.files) {
            const newImages = Array.from(event.target.files).map(file => URL.createObjectURL(file));
            setImages(prev => [...prev, ...newImages]);
        }
    };

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Product Data:', productData);
        console.log('Images:', images);
        // Add API call logic here
        alert('Product added successfully! (Mock)');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">Add New Product</Typography>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color="inherit">
                        Discard
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        sx={{ bgcolor: '#001742', '&:hover': { bgcolor: '#001742ee' } }}
                    >
                        Publish Product
                    </Button>
                </Stack>
            </Box>

            <Grid container spacing={4}>
                {/* Left Column - Main Details */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 4, mb: 4 }}>
                        <Typography variant="h6" gutterBottom fontWeight="600">Product Information</Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Product Name"
                                    name="name"
                                    value={productData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Mens Casual T-Shirt"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    value={productData.description}
                                    onChange={handleChange}
                                    multiline
                                    rows={6}
                                    placeholder="Enter product description..."
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h6" gutterBottom fontWeight="600">Media</Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Box sx={{
                            border: '2px dashed #ccc',
                            borderRadius: 2,
                            p: 4,
                            textAlign: 'center',
                            cursor: 'pointer',
                            bgcolor: '#f9f9f9',
                            '&:hover': { bgcolor: '#f0f0f0' }
                        }}>
                            <Button
                                component="label"
                                role={undefined}
                                variant="text"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon sx={{ fontSize: 40 }} />}
                                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'none' }}
                            >
                                <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
                                    Click to upload images
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    or drag and drop here
                                </Typography>
                                <VisuallyHiddenInput type="file" multiple onChange={handleImageUpload} accept="image/*" />
                            </Button>
                        </Box>

                        {images.length > 0 && (
                            <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
                                {images.map((img, index) => (
                                    <Box key={index} sx={{ position: 'relative', width: 100, height: 100 }}>
                                        <Box
                                            component="img"
                                            src={img}
                                            alt={`Preview ${index}`}
                                            sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 1 }}
                                        />
                                        <IconButton
                                            size="small"
                                            onClick={() => removeImage(index)}
                                            sx={{
                                                position: 'absolute',
                                                top: -8,
                                                right: -8,
                                                bgcolor: 'white',
                                                boxShadow: 1,
                                                '&:hover': { bgcolor: '#ffebee' }
                                            }}
                                        >
                                            <CloseIcon fontSize="small" color="error" />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Paper>
                </Grid>

                {/* Right Column - Organization & Pricing */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, mb: 4 }}>
                        <Typography variant="h6" gutterBottom fontWeight="600">Pricing</Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Base Price"
                                name="price"
                                type="number"
                                value={productData.price}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                required
                            />
                            <TextField
                                fullWidth
                                label="Discounted Price"
                                name="discountPrice"
                                type="number"
                                value={productData.discountPrice}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                            />
                        </Stack>
                    </Paper>

                    <Paper sx={{ p: 3, mb: 4 }}>
                        <Typography variant="h6" gutterBottom fontWeight="600">Inventory</Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="SKU (Stock Keeping Unit)"
                                name="sku"
                                value={productData.sku}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                label="Quantity in Stock"
                                name="stock"
                                type="number"
                                value={productData.stock}
                                onChange={handleChange}
                                required
                            />
                        </Stack>
                    </Paper>

                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom fontWeight="600">Organization</Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Stack spacing={3}>
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="category"
                                    value={productData.category}
                                    label="Category"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Men">Men</MenuItem>
                                    <MenuItem value="Women">Women</MenuItem>
                                    <MenuItem value="Electronics">Electronics</MenuItem>
                                    <MenuItem value="Home">Home & Living</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="Brand"
                                name="brand"
                                value={productData.brand}
                                onChange={handleChange}
                            />
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddProduct;
