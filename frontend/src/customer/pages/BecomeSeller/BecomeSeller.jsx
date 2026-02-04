import React, { useState } from 'react';
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    TextField,
    Grid,
    Container,
    Paper,
    Link,
    IconButton,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const steps = [
    'Tax Details & Mobile',
    'Pickup Address',
    'Bank Details',
    'Supplier Details'
];

const BecomeSeller = () => {
    const [activeStep, setActiveStep] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        mobile: '',
        gstin: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        accountNumber: '',
        ifscCode: '',
        bankName: '',
        storeName: '',
        storeDescription: ''
    });

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            // Final submission logic
            navigate('/seller/dashboard');
        } else {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>Contact Details</Typography>
                        <TextField
                            fullWidth
                            label="Mobile Number"
                            name="mobile"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            value={formData.mobile}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="GSTIN Number"
                            name="gstin"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            value={formData.gstin}
                            onChange={handleInputChange}
                        />
                    </Box>
                );
            case 1:
                return (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>Pickup Address</Typography>
                        <TextField
                            fullWidth
                            label="Street Address"
                            name="street"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            value={formData.street}
                            onChange={handleInputChange}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    name="city"
                                    variant="outlined"
                                    sx={{ mb: 3 }}
                                    value={formData.city}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="State"
                                    name="state"
                                    variant="outlined"
                                    sx={{ mb: 3 }}
                                    value={formData.state}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            fullWidth
                            label="Pincode"
                            name="pincode"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            value={formData.pincode}
                            onChange={handleInputChange}
                        />
                    </Box>
                );
            case 2:
                return (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>Bank Details</Typography>
                        <TextField
                            fullWidth
                            label="Account Number"
                            name="accountNumber"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            value={formData.accountNumber}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="IFSC Code"
                            name="ifscCode"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            value={formData.ifscCode}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="Bank Name"
                            name="bankName"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            value={formData.bankName}
                            onChange={handleInputChange}
                        />
                    </Box>
                );
            case 3:
                return (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>Supplier Details</Typography>
                        <TextField
                            fullWidth
                            label="Store Name"
                            name="storeName"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            value={formData.storeName}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="Store Description"
                            name="storeDescription"
                            variant="outlined"
                            multiline
                            rows={4}
                            sx={{ mb: 3 }}
                            value={formData.storeDescription}
                            onChange={handleInputChange}
                        />
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
            <Grid container sx={{ minHeight: '100vh' }}>
                {/* Left Side - Form */}
                <Grid item xs={12} md={5} sx={{ p: { xs: 3, md: 8 }, borderRight: '1px solid #eee' }}>
                    <Box sx={{ maxWidth: 450, mx: 'auto' }}>
                        <Stepper
                            activeStep={activeStep}
                            alternativeLabel
                            sx={{
                                '& .MuiStepIcon-root.Mui-active': { color: '#00897b' },
                                '& .MuiStepIcon-root.Mui-completed': { color: '#00897b' },
                                mb: 8
                            }}
                        >
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel
                                        StepIconProps={{
                                            sx: { fontSize: '1.5rem' }
                                        }}
                                    >
                                        <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 600 }}>
                                            {label}
                                        </Typography>
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {renderStepContent(activeStep)}

                        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                fullWidth
                                variant="contained"
                                sx={{
                                    bgcolor: '#e0e0e0',
                                    color: 'text.secondary',
                                    boxShadow: 'none',
                                    '&:hover': { bgcolor: '#d5d5d5', boxShadow: 'none' },
                                    py: 1.5,
                                    fontWeight: 'bold',
                                    textTransform: 'none'
                                }}
                            >
                                BACK
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                fullWidth
                                sx={{
                                    bgcolor: '#00897b',
                                    '&:hover': { bgcolor: '#00796b' },
                                    py: 1.5,
                                    fontWeight: 'bold',
                                    textTransform: 'none'
                                }}
                            >
                                {activeStep === steps.length - 1 ? 'FINISH' : 'CONTINUE'}
                            </Button>
                        </Box>

                        <Box sx={{ textAlign: 'center', mt: 6 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                Already have an account?
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/login')}
                                fullWidth
                                sx={{
                                    borderColor: '#00897b',
                                    color: '#00897b',
                                    py: 1.2,
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    '&:hover': { borderColor: '#00796b', bgcolor: 'rgba(0, 137, 123, 0.05)' }
                                }}
                            >
                                LOGIN
                            </Button>
                        </Box>
                    </Box>
                </Grid>

                {/* Right Side - Illustration */}
                {!isMobile && (
                    <Grid item md={7} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#fafafa',
                        p: 4
                    }}>
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography variant="h3" fontWeight="900" sx={{ color: '#1a1a1a', mb: 1 }}>
                                Join the Marketplace Revolution
                            </Typography>
                            <Typography variant="h5" color="#00897b" fontWeight="600">
                                Boost Your Sales Today
                            </Typography>
                        </Box>
                        <Box
                            component="img"
                            src="/src/assets/seller_onboarding_illustration.png"
                            alt="Seller Illustration"
                            sx={{
                                width: '80%',
                                maxWidth: 600,
                                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))'
                            }}
                        />
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default BecomeSeller;
