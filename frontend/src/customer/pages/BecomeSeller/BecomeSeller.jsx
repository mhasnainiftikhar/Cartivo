import React, { useState, useEffect } from 'react';
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
    useMediaQuery,
    CircularProgress
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sellerSignup, sendSellerSignupOtp } from '../../../State/SellerSlice';

const steps = [
    'General Details',
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
    const dispatch = useDispatch();
    const { seller } = useSelector(store => store);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        otp: '',
        mobile: '',
        GST: '',
        pickupAddress: {
            name: '',
            mobile: '',
            pincode: '',
            address: '',
            city: '',
            state: '',
            locality: ''
        },
        bankDetails: {
            accountNumber: '',
            ifscCode: '',
            accountHolderName: ''
        },
        businessDetails: {
            businessName: '',
            businessEmail: '',
            businessMobile: '',
            businessAddress: '',
            logo: '',
            banner: ''
        }
    });

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            handleSignup();
        } else {
            setActiveStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData({
                ...formData,
                [parent]: { ...formData[parent], [child]: value }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSendOtp = () => {
        if (formData.email) {
            dispatch(sendSellerSignupOtp(formData.email));
        }
    };

    const handleSignup = () => {
        dispatch(sellerSignup(formData));
    };

    useEffect(() => {
        if (seller.sellerJwt) {
            navigate('/seller/dashboard');
        }
    }, [seller.sellerJwt, navigate]);

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>General Details</Typography>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                variant="outlined"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <Button
                                variant="contained"
                                onClick={handleSendOtp}
                                disabled={!formData.email || seller.loading}
                                sx={{ py: 1.8, bgcolor: '#00897b', '&:hover': { bgcolor: '#00796b' } }}
                            >
                                {seller.loading ? <CircularProgress size={24} color="inherit" /> : 'OTP'}
                            </Button>
                        </Box>
                        {seller.otpSent && (
                            <TextField
                                fullWidth
                                label="OTP"
                                name="otp"
                                variant="outlined"
                                sx={{ mb: 3 }}
                                value={formData.otp}
                                onChange={handleInputChange}
                            />
                        )}
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </Box>
                );
            case 1:
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
                            name="GST"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            value={formData.GST}
                            onChange={handleInputChange}
                        />
                    </Box>
                );
            case 2:
                return (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>Pickup Address</Typography>
                        <TextField
                            fullWidth
                            label="Street Address"
                            name="pickupAddress.address"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            value={formData.pickupAddress.address}
                            onChange={handleInputChange}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    name="pickupAddress.city"
                                    variant="outlined"
                                    sx={{ mb: 3 }}
                                    value={formData.pickupAddress.city}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="State"
                                    name="pickupAddress.state"
                                    variant="outlined"
                                    sx={{ mb: 3 }}
                                    value={formData.pickupAddress.state}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            fullWidth
                            label="Pincode"
                            name="pickupAddress.pincode"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            value={formData.pickupAddress.pincode}
                            onChange={handleInputChange}
                        />
                    </Box>
                );
            case 3:
                return (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>Bank Details</Typography>
                        <TextField
                            fullWidth
                            label="Account Number"
                            name="bankDetails.accountNumber"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            value={formData.bankDetails.accountNumber}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="IFSC Code"
                            name="bankDetails.ifscCode"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            value={formData.bankDetails.ifscCode}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="Account Holder Name"
                            name="bankDetails.accountHolderName"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            value={formData.bankDetails.accountHolderName}
                            onChange={handleInputChange}
                        />
                    </Box>
                );
            case 4:
                return (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>Supplier Details</Typography>
                        <TextField
                            fullWidth
                            label="Store Name"
                            name="businessDetails.businessName"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            value={formData.businessDetails.businessName}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            label="Store Description"
                            name="businessDetails.businessMobile"
                            variant="outlined"
                            placeholder="Store Mobile"
                            sx={{ mb: 3 }}
                            value={formData.businessDetails.businessMobile}
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
                                disabled={seller.loading}
                                sx={{
                                    bgcolor: '#00897b',
                                    '&:hover': { bgcolor: '#00796b' },
                                    py: 1.5,
                                    fontWeight: 'bold',
                                    textTransform: 'none'
                                }}
                            >
                                {seller.loading ? <CircularProgress size={24} color="inherit" /> : (activeStep === steps.length - 1 ? 'FINISH' : 'CONTINUE')}
                            </Button>
                        </Box>

                        <Box sx={{ textAlign: 'center', mt: 6 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                Already have an account?
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/seller-login')}
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
