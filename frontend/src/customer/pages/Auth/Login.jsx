import React from 'react';
import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../State/AuthSlice';
import { useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get('email'),
            password: data.get('password'),
        };
        dispatch(login(userData));
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
                    backgroundImage: 'url(https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop)',
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
                        Welcome Back
                    </Typography>
                    <Typography variant="h6" sx={{ fontStyle: 'italic', opacity: 0.9 }}>
                        Discover the latest trends and exclusive offers curated just for you.
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
                        Login to <span style={{ fontFamily: '"Playwrite NZ Basic"', fontWeight: 400 }}>Cartivo</span>
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                        Enter your credentials to access your account.
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            sx={{ mb: 1 }}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label={<Typography variant="body2">Remember me</Typography>}
                            />
                            <Link component={RouterLink} to="/forgot-password" variant="body2" sx={{ fontWeight: 600, color: '#2563eb' }}>
                                Forgot password?
                            </Link>
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
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
                            Sign In
                        </Button>

                        <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', mt: 2 }}>
                            Are you a seller?{' '}
                            <Link component={RouterLink} to="/seller-login" sx={{ fontWeight: 700, color: '#febd69', textDecoration: 'none' }}>
                                Seller Login
                            </Link>
                        </Typography>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
