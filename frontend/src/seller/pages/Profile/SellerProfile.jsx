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
    CloudUpload as CloudUploadIcon,
    Visibility,
    VisibilityOff
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold">Profile Settings</Typography>
                {!isEditing ? (
                    <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => setIsEditing(true)}
                        sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
                    >
                        Edit Profile
                    </Button>
                ) : (
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" color="inherit" onClick={() => setIsEditing(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={handleSaveProfile}
                            sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
                        >
                            Save Changes
                        </Button>
                    </Stack>
                )}
            </Box>

            <Grid container spacing={4}>
                {/* Left Column - Avatar & Personal Info */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 4, textAlign: 'center', mb: 4 }}>
                        <Box sx={{ position: 'relative', display: 'inline-block' }}>
                            <Avatar
                                src="https://via.placeholder.com/150"
                                alt="Seller Avatar"
                                sx={{ width: 120, height: 120, mb: 2, mx: 'auto', border: '4px solid #f0f0f0' }}
                            />
                            {isEditing && (
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        bottom: 20,
                                        right: 0,
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        '&:hover': { bgcolor: 'primary.dark' }
                                    }}
                                    component="label"
                                >
                                    <CloudUploadIcon fontSize="small" />
                                    <input hidden accept="image/*" type="file" />
                                </IconButton>
                            )}
                        </Box>
                        <Typography variant="h6" fontWeight="bold">{profileData.sellerName}</Typography>
                        <Typography variant="body2" color="text.secondary">{profileData.businessDetails.businessName}</Typography>
                        <Typography variant="caption" display="block" color="text.disabled" sx={{ mt: 1 }}>
                            Seller ID: {seller.seller?._id}
                        </Typography>
                    </Paper>

                    {/* Business Info Section - Moved to left for better balance */}
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h6" gutterBottom fontWeight="600">Business Details</Typography>
                        <Divider sx={{ mb: 3 }} />
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Business Name"
                                name="businessDetails.businessName"
                                value={profileData.businessDetails.businessName}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                            <TextField
                                fullWidth
                                label="Business Email"
                                name="businessDetails.businessEmail"
                                value={profileData.businessDetails.businessEmail}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                            <TextField
                                fullWidth
                                label="Business Mobile"
                                name="businessDetails.businessMobile"
                                value={profileData.businessDetails.businessMobile}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                            <TextField
                                fullWidth
                                label="GSTIN"
                                name="GST"
                                value={profileData.GST}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </Stack>
                    </Paper>
                </Grid>

                {/* Right Column - Forms */}
                <Grid item xs={12} md={8}>
                    {/* Personal Information */}
                    <Paper sx={{ p: 4, mb: 4 }}>
                        <Typography variant="h6" gutterBottom fontWeight="600">Personal Information</Typography>
                        <Divider sx={{ mb: 3 }} />

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
                                    disabled // Email usually can't be changed easily
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
                        </Grid>
                    </Paper>

                    {/* Bank Details */}
                    <Paper sx={{ p: 4, mb: 4 }}>
                        <Typography variant="h6" gutterBottom fontWeight="600">Bank Details</Typography>
                        <Divider sx={{ mb: 3 }} />

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

                    {/* Address Information */}
                    <Paper sx={{ p: 4, mb: 4 }}>
                        <Typography variant="h6" gutterBottom fontWeight="600">Address Information</Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Business Address"
                                    name="businessDetails.businessAddress"
                                    value={profileData.businessDetails.businessAddress}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* Security / Password - Always editable if not strictly locked */}
                    <Paper sx={{ p: 4 }}>
                        <Typography variant="h6" gutterBottom fontWeight="600">Security</Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={3}>
                            <Grid item xs={12}>
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
                                                <IconButton
                                                    onClick={() => togglePasswordVisibility('current')}
                                                    edge="end"
                                                >
                                                    {showPassword.current ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
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
                                                <IconButton
                                                    onClick={() => togglePasswordVisibility('new')}
                                                    edge="end"
                                                >
                                                    {showPassword.new ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Confirm New Password"
                                    name="confirmPassword"
                                    type={showPassword.confirm ? 'text' : 'password'}
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => togglePasswordVisibility('confirm')}
                                                    edge="end"
                                                >
                                                    {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={!passwordData.currentPassword}
                                    onClick={handleUpdatePassword}
                                >
                                    Update Password
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SellerProfile;
