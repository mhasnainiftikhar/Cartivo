import React, { useState } from 'react';
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
    const [profileData, setProfileData] = useState({
        fullName: 'James Anderson',
        email: 'james.anderson@example.com',
        phone: '+1 (555) 123-4567',
        businessName: 'Anderson Electronics',
        businessDescription: 'Premium electronics seller specializing in headphones and smart devices.',
        addressHost: '123 Market St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94103',
        country: 'USA'
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

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
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

    const handleSaveProfile = () => {
        setIsEditing(false);
        // Add API call here
        alert('Profile updated successfully! (Mock)');
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
                        sx={{ bgcolor: '#001742', '&:hover': { bgcolor: '#001742ee' } }}
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
                            sx={{ bgcolor: '#001742', '&:hover': { bgcolor: '#001742ee' } }}
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
                        <Typography variant="h6" fontWeight="bold">{profileData.fullName}</Typography>
                        <Typography variant="body2" color="text.secondary">{profileData.businessName}</Typography>
                        <Typography variant="caption" display="block" color="text.disabled" sx={{ mt: 1 }}>
                            Seller ID: SEL-883920
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
                                name="businessName"
                                value={profileData.businessName}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                            <TextField
                                fullWidth
                                label="Description"
                                name="businessDescription"
                                multiline
                                rows={4}
                                value={profileData.businessDescription}
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
                                    name="fullName"
                                    value={profileData.fullName}
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
                                    name="phone"
                                    value={profileData.phone}
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
                                    label="Street Address"
                                    name="addressHost"
                                    value={profileData.addressHost}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    name="city"
                                    value={profileData.city}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="State / Province"
                                    name="state"
                                    value={profileData.state}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Zip / Postal Code"
                                    name="zipCode"
                                    value={profileData.zipCode}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Country"
                                    name="country"
                                    value={profileData.country}
                                    onChange={handleChange}
                                    disabled={!isEditing}
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
                                <Button variant="contained" color="primary" disabled={!passwordData.currentPassword}>
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
