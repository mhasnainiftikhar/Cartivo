import React from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Link,
    TextField,
    Typography
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, sendSignupOtp } from '../../../State/AuthSlice';
import { useEffect, useState } from 'react';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        otp: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOtp = () => {
        if (formData.email) {
            dispatch(sendSignupOtp(formData.email));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(register(formData));
    };

    useEffect(() => {
        if (auth.user) {
            navigate("/");
        }
    }, [auth.user, navigate]);

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'stretch' }}>
            {/* Left Side - Image */}
            <Box
                sx={{
                    flex: { xs: 0, md: 1 },
                    display: { xs: 'none', md: 'block' },
                    backgroundImage: 'url(https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                }}
            >
                <Box sx={{
                    absolute: 'inset-0',
                    bgcolor: 'rgba(0, 23, 66, 0.4)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    px: 10,
                    color: 'white'
                }}>
                    <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, fontFamily: '"Playwrite NZ Basic"' }}>
                        Join Our Community
                    </Typography>
                    <Typography variant="h6" sx={{ fontStyle: 'italic', opacity: 0.9 }}>
                        Create an account to track your orders, save items to wishlist, and get personalized recommendations.
                    </Typography>
                </Box>
            </Box>

            {/* Right Side - Form */}
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: 'white',
                px: { xs: 4, sm: 8, md: 12 }
            }}>
                <Box sx={{ maxWidth: '450px', width: '100%', mx: 'auto' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#001742' }}>
                        Create <span style={{ fontFamily: '"Playwrite NZ Basic"', fontWeight: 400 }}>Account</span>
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                        Join thousands of happy shoppers at Cartivo.
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={formData.name}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                sx={{ mb: 2, flexGrow: 1 }}
                            />
                            <Button
                                onClick={handleSendOtp}
                                disabled={auth.loading || !formData.email}
                                sx={{ height: '56px', mt: '8px', mb: '16px', fontWeight: 'bold' }}
                            >
                                {auth.otpSent ? "Resend" : "Send OTP"}
                            </Button>
                        </Box>

                        {auth.otpSent && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="otp"
                                label="OTP"
                                name="otp"
                                autoComplete="one-time-code"
                                value={formData.otp}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                        )}

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handleInputChange}
                            sx={{ mb: 2 }}
                        />

                        <FormControlLabel
                            control={<Checkbox value="terms" color="primary" required />}
                            label={
                                <Typography variant="body2">
                                    I agree to the{' '}
                                    <Link sx={{ fontWeight: 600, color: '#2563eb' }}>Terms of Service</Link>
                                    {' '}and{' '}
                                    <Link sx={{ fontWeight: 600, color: '#2563eb' }}>Privacy Policy</Link>
                                </Typography>
                            }
                            sx={{ mb: 3 }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={auth.loading || !auth.otpSent}
                            sx={{
                                py: 1.5,
                                fontSize: '1rem',
                                bgcolor: '#febd69',
                                color: '#001742',
                                fontWeight: 800,
                                '&:hover': { bgcolor: '#f3a847' },
                                mb: 3
                            }}
                        >
                            {auth.loading ? "Creating..." : "Create Account"}
                        </Button>

                        <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                            Already have an account?{' '}
                            <Link component={RouterLink} to="/login" sx={{ fontWeight: 700, color: '#2563eb', textDecoration: 'none' }}>
                                Sign In
                            </Link>
                        </Typography>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default Signup;
