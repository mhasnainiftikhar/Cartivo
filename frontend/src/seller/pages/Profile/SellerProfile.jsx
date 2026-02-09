import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSellerProfile, getSellerProfile } from '../../../State/SellerSlice';
import {
    Box,
    Typography,
    Grid,
    TextField,
    Button,
    Avatar,
    Paper,
    Divider,
    Stack,
    InputAdornment,
    IconButton
} from '@mui/material';
import {
    Edit as EditIcon,
    Save as SaveIcon,
    Visibility,
    VisibilityOff,
    Business as BusinessIcon,
    Person as PersonIcon,
    AccountBalance as BankIcon,
    LocationOn as AddressIcon,
    Lock as LockIcon
} from '@mui/icons-material';

const SellerProfile = () => {
    const dispatch = useDispatch();
    const { seller } = useSelector(store => store);
    const [isEditing, setIsEditing] = useState(false);

    const [profileData, setProfileData] = useState({
        sellerName: '',
        email: '',
        mobile: '',
        GST: '',
        businessDetails: {
            businessName: '',
            businessEmail: '',
            businessMobile: '',
            businessAddress: ''
        },
        bankDetails: {
            accountHolderName: '',
            accountNumber: '',
            ifscCode: '',
            bankName: ''
        }
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });

    useEffect(() => {
        const jwt = localStorage.getItem("sellerJwt");
        if (jwt && !seller.seller) {
            dispatch(getSellerProfile(jwt));
        }
    }, [dispatch]);

    useEffect(() => {
        if (seller.seller) {
            setProfileData({
                sellerName: seller.seller.sellerName || '',
                email: seller.seller.email || '',
                mobile: seller.seller.mobile || '',
                GST: seller.seller.GST || '',
                businessDetails: {
                    businessName: seller.seller.businessDetails?.businessName || '',
                    businessEmail: seller.seller.businessDetails?.businessEmail || '',
                    businessMobile: seller.seller.businessDetails?.businessMobile || '',
                    businessAddress: seller.seller.businessDetails?.businessAddress || ''
                },
                bankDetails: {
                    accountHolderName: seller.seller.bankDetails?.accountHolderName || '',
                    accountNumber: seller.seller.bankDetails?.accountNumber || '',
                    ifscCode: seller.seller.bankDetails?.ifscCode || '',
                    bankName: seller.seller.bankDetails?.bankName || ''
                }
            });
        }
    }, [seller.seller]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setProfileData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setProfileData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSaveProfile = () => {
        dispatch(updateSellerProfile({
            jwt: localStorage.getItem("sellerJwt"),
            sellerData: profileData
        }));
        setIsEditing(false);
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleUpdatePassword = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        dispatch(updateSellerProfile({
            jwt: localStorage.getItem("sellerJwt"),
            sellerData: { password: passwordData.newPassword }
        }));
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
            {/* Header / Summary Card */}
            <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3, bgcolor: '#001742', color: 'white' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                        <Typography variant="h4" fontWeight="900" gutterBottom>
                            {profileData.sellerName}
                        </Typography>
                        <Stack direction="row" spacing={3} alignItems="center">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <BusinessIcon fontSize="small" sx={{ opacity: 0.8 }} />
                                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                    {profileData.businessDetails.businessName}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                    Seller ID: {seller.seller?._id}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                    {!isEditing ? (
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={() => setIsEditing(true)}
                            sx={{
                                bgcolor: 'white',
                                color: '#001742',
                                fontWeight: 'bold',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                                borderRadius: 2,
                                px: 3
                            }}
                        >
                            Edit Profile
                        </Button>
                    ) : (
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="outlined"
                                onClick={() => setIsEditing(false)}
                                sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', '&:hover': { borderColor: 'white' } }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<SaveIcon />}
                                onClick={handleSaveProfile}
                                sx={{ bgcolor: 'primary.main', fontWeight: 'bold', '&:hover': { bgcolor: 'primary.dark' } }}
                            >
                                Save Changes
                            </Button>
                        </Stack>
                    )}
                </Box>
            </Paper>

            <Grid container spacing={4}>
                {/* Information Sections */}
                <Grid item xs={12} lg={8}>
                    <Stack spacing={4}>
                        {/* Personal Information */}
                        <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid #eee' }} elevation={0}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <PersonIcon color="primary" />
                                <Typography variant="h6" fontWeight="bold">Personal Information</Typography>
                            </Box>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        name="sellerName"
                                        value={profileData.sellerName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={profileData.email}
                                        disabled
                                        helperText="Email cannot be changed"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        name="mobile"
                                        value={profileData.mobile}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="GSTIN"
                                        name="GST"
                                        value={profileData.GST}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* Business Details */}
                        <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid #eee' }} elevation={0}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <BusinessIcon color="primary" />
                                <Typography variant="h6" fontWeight="bold">Business Details</Typography>
                            </Box>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Business Name"
                                        name="businessDetails.businessName"
                                        value={profileData.businessDetails.businessName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Business Email"
                                        name="businessDetails.businessEmail"
                                        value={profileData.businessDetails.businessEmail}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Business Mobile"
                                        name="businessDetails.businessMobile"
                                        value={profileData.businessDetails.businessMobile}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>

                        {/* Bank Details */}
                        <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid #eee' }} elevation={0}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <BankIcon color="primary" />
                                <Typography variant="h6" fontWeight="bold">Bank Details</Typography>
                            </Box>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Account Holder Name"
                                        name="bankDetails.accountHolderName"
                                        value={profileData.bankDetails.accountHolderName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Account Number"
                                        name="bankDetails.accountNumber"
                                        value={profileData.bankDetails.accountNumber}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="IFSC Code"
                                        name="bankDetails.ifscCode"
                                        value={profileData.bankDetails.ifscCode}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Bank Name"
                                        name="bankDetails.bankName"
                                        value={profileData.bankDetails.bankName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Stack>
                </Grid>

                {/* Right Column - Address & Security */}
                <Grid item xs={12} lg={4}>
                    <Stack spacing={4}>
                        <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid #eee' }} elevation={0}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <AddressIcon color="primary" />
                                <Typography variant="h6" fontWeight="bold">Address</Typography>
                            </Box>
                            <TextField
                                fullWidth
                                label="Business Address"
                                name="businessDetails.businessAddress"
                                value={profileData.businessDetails.businessAddress}
                                onChange={handleChange}
                                disabled={!isEditing}
                                multiline
                                rows={4}
                            />
                        </Paper>

                        <Paper sx={{ p: 4, borderRadius: 3, border: '1px solid #eee' }} elevation={0}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <LockIcon color="primary" />
                                <Typography variant="h6" fontWeight="bold">Security</Typography>
                            </Box>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Current Password"
                                    name="currentPassword"
                                    type={showPassword.current ? 'text' : 'password'}
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => togglePasswordVisibility('current')} edge="end">
                                                    {showPassword.current ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="New Password"
                                    name="newPassword"
                                    type={showPassword.new ? 'text' : 'password'}
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => togglePasswordVisibility('new')} edge="end">
                                                    {showPassword.new ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleUpdatePassword}
                                    disabled={!passwordData.newPassword || !passwordData.currentPassword}
                                    sx={{ py: 1.5, fontWeight: 'bold' }}
                                >
                                    Update Password
                                </Button>
                            </Stack>
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SellerProfile;
