import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Avatar,
    Divider,
    Grid,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Modal,
    TextField,
    Stack
} from '@mui/material';
import {
    Person as PersonIcon,
    LocationOn as LocationIcon,
    ShoppingBag as OrderIcon,
    Edit as EditIcon,
    Logout as LogoutIcon,
    ChevronRight as ChevronRightIcon,
    Add as AddIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateUserProfile, addUserAddress } from '../../../State/AuthSlice';
import { useNavigate } from 'react-router-dom';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 500 },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const Profile = () => {
    const { auth } = useSelector(store => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [openProfileModal, setOpenProfileModal] = useState(false);
    const [openAddressModal, setOpenAddressModal] = useState(false);

    const [profileData, setProfileData] = useState({
        name: auth.user?.name || '',
        mobile: auth.user?.mobile || ''
    });

    React.useEffect(() => {
        if (auth.user) {
            setProfileData({
                name: auth.user.name || '',
                mobile: auth.user.mobile || ''
            });
        }
    }, [auth.user]);

    const [addressData, setAddressData] = useState({
        name: '',
        locality: '',
        state: '',
        pincode: '',
        address: '',
        mobile: ''
    });

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleAddressChange = (e) => {
        setAddressData({ ...addressData, [e.target.name]: e.target.value });
    };

    const onSaveProfile = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile(profileData));
        setOpenProfileModal(false);
    };

    const onAddAddress = (e) => {
        e.preventDefault();
        dispatch(addUserAddress(addressData));
        setOpenAddressModal(false);
        setAddressData({
            name: '',
            locality: '',
            state: '',
            pincode: '',
            address: '',
            mobile: ''
        });
    };

    if (!auth.user) {
        return (
            <Box sx={{ py: 10, textAlign: 'center' }}>
                <Typography variant="h5">Please login to view your profile</Typography>
                <Button variant="contained" onClick={() => navigate("/login")} sx={{ mt: 2 }}>Login</Button>
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: 'grey.50', minHeight: '90vh', py: { xs: 4, md: 8 } }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Side Navigation */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #eee' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                                <Avatar
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        bgcolor: '#001742',
                                        fontSize: '2.5rem',
                                        fontWeight: 700,
                                        mb: 2,
                                        boxShadow: '0 4px 12px rgba(0,23,66,0.2)'
                                    }}
                                >
                                    {auth.user?.name?.charAt(0).toUpperCase()}
                                </Avatar>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#001742' }}>
                                    {auth.user?.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {auth.user?.email}
                                </Typography>
                            </Box>

                            <Divider sx={{ mb: 2 }} />

                            <List component="nav" sx={{ '& .MuiListItem-root': { borderRadius: 1, mb: 1 } }}>
                                <ListItem button selected sx={{ bgcolor: 'rgba(0,23,66,0.05) !important' }}>
                                    <ListItemIcon><PersonIcon sx={{ color: '#001742' }} /></ListItemIcon>
                                    <ListItemText primary="Personal Information" primaryTypographyProps={{ fontWeight: 600 }} />
                                </ListItem>
                                <ListItem button onClick={() => navigate('/wishlist')}>
                                    <ListItemIcon><OrderIcon /></ListItemIcon>
                                    <ListItemText primary="My Orders" />
                                    <ChevronRightIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                                </ListItem>
                                <ListItem button onClick={handleLogout} sx={{ color: 'error.main' }}>
                                    <ListItemIcon><LogoutIcon sx={{ color: 'error.main' }} /></ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>

                    {/* Main Content */}
                    <Grid item xs={12} md={8}>
                        <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 2, border: '1px solid #eee' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                                <Typography variant="h4" sx={{ fontWeight: 800, color: '#001742' }}>
                                    Personal <span style={{ fontFamily: '"Playwrite NZ Basic"', fontWeight: 400 }}>Information</span>
                                </Typography>
                                <Button
                                    onClick={() => setOpenProfileModal(true)}
                                    startIcon={<EditIcon />}
                                    sx={{ fontWeight: 700, textTransform: 'none' }}
                                >
                                    Edit Profile
                                </Button>
                            </Box>

                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                                            Full Name
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 500, color: '#001742' }}>
                                            {auth.user?.name}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                                            Email Address
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 500, color: '#001742' }}>
                                            {auth.user?.email}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                                            Phone Number
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 500, color: '#001742' }}>
                                            {auth.user?.mobile || 'Not provided'}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                                            Account Status
                                        </Typography>
                                        <Box sx={{
                                            display: 'inline-block',
                                            bgcolor: 'success.light',
                                            color: 'success.dark',
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 1,
                                            fontSize: '0.75rem',
                                            fontWeight: 700
                                        }}>
                                            Active
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 4 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#001742' }}>
                                    Saved Addresses
                                </Typography>
                                <Button
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={() => setOpenAddressModal(true)}
                                    sx={{ textTransform: 'none', fontWeight: 600 }}
                                >
                                    Add New
                                </Button>
                            </Box>

                            {auth.user?.addresses && auth.user.addresses.length > 0 ? (
                                <Grid container spacing={2}>
                                    {auth.user.addresses.map((address, index) => (
                                        <Grid item xs={12} sm={6} key={address._id || index}>
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    p: 2,
                                                    border: '1px solid #eee',
                                                    borderRadius: 2,
                                                    position: 'relative',
                                                    '&:hover': { borderColor: 'primary.main' }
                                                }}
                                            >
                                                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#001742', mb: 0.5 }}>
                                                    {address.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {address.address}, {address.locality}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {address.state} - {address.pincode}
                                                </Typography>
                                                <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                                                    Mobile: {address.mobile}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <Box sx={{ textAlign: 'center', py: 4, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 2, border: '1px dashed #ccc' }}>
                                    <LocationIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                                    <Typography variant="body2" color="text.secondary">
                                        No addresses saved yet.
                                    </Typography>
                                    <Button onClick={() => setOpenAddressModal(true)} variant="text" sx={{ mt: 1, fontWeight: 700 }}>Add Address</Button>
                                </Box>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* Edit Profile Modal */}
            <Modal open={openProfileModal} onClose={() => setOpenProfileModal(false)}>
                <Box sx={modalStyle}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>Edit Profile</Typography>
                        <IconButton onClick={() => setOpenProfileModal(false)}><CloseIcon /></IconButton>
                    </Box>
                    <form onSubmit={onSaveProfile}>
                        <Stack spacing={3}>
                            <TextField
                                label="Full Name"
                                name="name"
                                value={profileData.name}
                                onChange={handleProfileChange}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Phone Number"
                                name="mobile"
                                value={profileData.mobile}
                                onChange={handleProfileChange}
                                fullWidth
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ py: 1.5, bgcolor: '#001742', fontWeight: 700 }}
                            >
                                Save Changes
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>

            {/* Add Address Modal */}
            <Modal open={openAddressModal} onClose={() => setOpenAddressModal(false)}>
                <Box sx={modalStyle}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>Add New Address</Typography>
                        <IconButton onClick={() => setOpenAddressModal(false)}><CloseIcon /></IconButton>
                    </Box>
                    <form onSubmit={onAddAddress}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Full Name"
                                    name="name"
                                    value={addressData.name}
                                    onChange={handleAddressChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Street Address"
                                    name="address"
                                    value={addressData.address}
                                    onChange={handleAddressChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Locality"
                                    name="locality"
                                    value={addressData.locality}
                                    onChange={handleAddressChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Pincode"
                                    name="pincode"
                                    value={addressData.pincode}
                                    onChange={handleAddressChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="State"
                                    name="state"
                                    value={addressData.state}
                                    onChange={handleAddressChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Mobile"
                                    name="mobile"
                                    value={addressData.mobile}
                                    onChange={handleAddressChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{ py: 1.5, mt: 2, bgcolor: '#001742', fontWeight: 700 }}
                                >
                                    Add Address
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
};

export default Profile;
