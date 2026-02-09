import React, { useState, useEffect } from 'react';
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
    IconButton,
    Alert,
    CircularProgress
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    Close as CloseIcon,
    Save as SaveIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import api from '../../../Config/api';

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
        title: '',
        description: '',
        mrpPrice: '',
        discountPercentage: '',
        quantity: '',
        color: '',
        size: '',
        categoryData: {
            name: '',
            categoryId: '',
            size: ''
        }
    });

    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('category.')) {
            const categoryField = name.split('.')[1];
            setProductData(prev => ({
                ...prev,
                categoryData: {
                    ...prev.categoryData,
                    [categoryField]: value
                }
            }));
        } else {
            setProductData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleImageUpload = (event) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);

            // Limit to 5 images
            if (imageFiles.length + files.length > 5) {
                setError('You can only upload up to 5 images');
                return;
            }

            setImageFiles(prev => [...prev, ...files]);

            // Create preview URLs
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => {
            // Revoke the URL to free memory
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Check if seller is logged in
            const token = localStorage.getItem('sellerJwt');
            if (!token) {
                setError('You must be logged in as a seller to add products');
                setLoading(false);
                return;
            }

            // Create FormData
            const formData = new FormData();

            // Append product data
            formData.append('title', productData.title);
            formData.append('description', productData.description);
            formData.append('mrpPrice', productData.mrpPrice);
            formData.append('discountPercentage', productData.discountPercentage);
            formData.append('quantity', productData.quantity);
            formData.append('color', productData.color);
            formData.append('size', productData.size);
            formData.append('categoryData', JSON.stringify(productData.categoryData));

            // Append images
            imageFiles.forEach((file) => {
                formData.append('images', file);
            });

            // Send to backend - axios will automatically set Content-Type with boundary
            const response = await api.post('/api/products', formData);

            setSuccess('Product added successfully!');

            // Reset form
            setProductData({
                title: '',
                description: '',
                mrpPrice: '',
                discountPercentage: '',
                quantity: '',
                color: '',
                size: '',
                categoryData: {
                    name: '',
                    categoryId: '',
                    size: ''
                }
            });
            setImageFiles([]);
            setImagePreviews([]);

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    const handleDiscard = () => {
        setProductData({
            title: '',
            description: '',
            mrpPrice: '',
            discountPercentage: '',
            quantity: '',
            color: '',
            size: '',
            categoryData: {
                name: '',
                categoryId: '',
                size: ''
            }
        });
        setImageFiles([]);
        setImagePreviews([]);
        setError('');
        setSuccess('');
    };

    // Calculate selling price
    const sellingPrice = productData.mrpPrice && productData.discountPercentage
        ? (productData.mrpPrice - (productData.mrpPrice * productData.discountPercentage / 100)).toFixed(2)
        : '';

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">Add New Product</Typography>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color="inherit" onClick={handleDiscard} disabled={loading}>
                        Discard
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                        disabled={loading}
                        sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
                    >
                        {loading ? 'Publishing...' : 'Publish Product'}
                    </Button>
                </Stack>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

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
                                    label="Product Title"
                                    name="title"
                                    value={productData.title}
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
                                    required
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
                                    or drag and drop here (Max 5 images)
                                </Typography>
                                <VisuallyHiddenInput type="file" multiple onChange={handleImageUpload} accept="image/*" />
                            </Button>
                        </Box>

                        {imagePreviews.length > 0 && (
                            <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap' }}>
                                {imagePreviews.map((img, index) => (
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
                                label="MRP Price"
                                name="mrpPrice"
                                type="number"
                                value={productData.mrpPrice}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                required
                            />
                            <TextField
                                fullWidth
                                label="Discount Percentage"
                                name="discountPercentage"
                                type="number"
                                value={productData.discountPercentage}
                                onChange={handleChange}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                                required
                            />
                            {sellingPrice && (
                                <Alert severity="info">
                                    Selling Price: ${sellingPrice}
                                </Alert>
                            )}
                        </Stack>
                    </Paper>

                    <Paper sx={{ p: 3, mb: 4 }}>
                        <Typography variant="h6" gutterBottom fontWeight="600">Inventory</Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Quantity in Stock"
                                name="quantity"
                                type="number"
                                value={productData.quantity}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                fullWidth
                                label="Color"
                                name="color"
                                type="number"
                                value={productData.color}
                                onChange={handleChange}
                                placeholder="Color code"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Size"
                                name="size"
                                value={productData.size}
                                onChange={handleChange}
                                placeholder="e.g. M, L, XL"
                            />
                        </Stack>
                    </Paper>

                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom fontWeight="600">Category</Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Category Name"
                                name="category.name"
                                value={productData.categoryData.name}
                                onChange={handleChange}
                                placeholder="e.g. Electronics, Clothing"
                                required
                                helperText="Enter the category name for your product"
                            />
                            <TextField
                                fullWidth
                                label="Category ID"
                                name="category.categoryId"
                                value={productData.categoryData.categoryId}
                                onChange={handleChange}
                                placeholder="e.g. electronics, clothing"
                                required
                                helperText="Unique identifier (lowercase, no spaces)"
                            />
                            <TextField
                                fullWidth
                                label="Category Size"
                                name="category.size"
                                value={productData.categoryData.size}
                                onChange={handleChange}
                                placeholder="e.g. N/A, Standard"
                                required
                                helperText="Size category or N/A if not applicable"
                            />
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddProduct;
