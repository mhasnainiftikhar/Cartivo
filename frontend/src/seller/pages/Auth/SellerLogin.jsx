import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    CircularProgress,
    Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sellerLogin, sendSellerLoginOtp } from '../../../State/SellerSlice';

const SellerLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { seller } = useSelector(store => store);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        otp: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSendOtp = () => {
        if (loginData.email) {
            dispatch(sendSellerLoginOtp(loginData.email));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sellerLogin(loginData));
    };

    useEffect(() => {
        if (seller.sellerJwt) {
            navigate('/seller/dashboard');
        }
    }, [seller.sellerJwt, navigate]);

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#f5f5f5'
        }}>
            <Container maxWidth="xs">
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h4" fontWeight="900" sx={{ mb: 1, textAlign: 'center', color: '#001742' }}>
                        Seller Login
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
                        Manage your store and boost your sales
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mb: 2 }}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                variant="outlined"
                                value={loginData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <Button
                                variant="contained"
                                onClick={handleSendOtp}
                                disabled={!loginData.email || seller.loading}
                                sx={{ py: 1.8, bgcolor: '#00897b', '&:hover': { bgcolor: '#00796b' } }}
                            >
                                {seller.loading ? <CircularProgress size={24} color="inherit" /> : 'OTP'}
                            </Button>
                        </Box>

                        <TextField
                            fullWidth
                            label="OTP"
                            name="otp"
                            variant="outlined"
                            sx={{ mb: 2 }}
                            value={loginData.otp}
                            onChange={handleInputChange}
                            required
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            sx={{ mb: 3 }}
                            value={loginData.password}
                            onChange={handleInputChange}
                            required
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={seller.loading}
                            sx={{
                                py: 1.5,
                                bgcolor: '#00897b',
                                '&:hover': { bgcolor: '#00796b' },
                                fontWeight: 'bold'
                            }}
                        >
                            {seller.loading ? <CircularProgress size={24} color="inherit" /> : 'LOGIN'}
                        </Button>
                    </form>

                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Don't have a seller account?{' '}
                            <Link
                                component="button"
                                variant="body2"
                                onClick={() => navigate('/become-seller')}
                                sx={{ color: '#00897b', fontWeight: 'bold', textDecoration: 'none' }}
                            >
                                Become a Seller
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default SellerLogin;
