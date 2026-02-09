import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Toolbar,
    Divider,
    Typography,
    useTheme
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    ShoppingCart as OrdersIcon,
    Inventory as ProductIcon,
    AddBox as AddProductIcon,
    Payment as PaymentIcon,
    Receipt as TransactionsIcon,
    Person as ProfileIcon,
    ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sellerLogout } from '../../../State/SellerSlice';

const drawerWidth = 240;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/seller/dashboard' },
    { text: 'Orders', icon: <OrdersIcon />, path: '/seller/orders' },
    { text: 'Products', icon: <ProductIcon />, path: '/seller/products' },
    { text: 'Add Product', icon: <AddProductIcon />, path: '/seller/add-product' },
    { text: 'Payments', icon: <PaymentIcon />, path: '/seller/payments' },
    { text: 'Transactions', icon: <TransactionsIcon />, path: '/seller/transactions' },
    { text: 'Profile', icon: <ProfileIcon />, path: '/seller/profile' },
];

const SellerSidebar = ({ open, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(sellerLogout());
        navigate('/');
    };

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Toolbar /> {/* Spacer for Navbar */}
            <Divider />
            <Box sx={{ flexGrow: 1, overflow: 'auto', py: 2, px: 1.5 }}>
                <List sx={{ pt: 0 }}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <ListItem
                                key={item.text}
                                onClick={() => {
                                    navigate(item.path);
                                    if (onClose) onClose(); // Close drawer on mobile selection
                                }}
                                selected={isActive}
                                sx={{
                                    borderRadius: '12px',
                                    mb: 1,
                                    py: 1.2,
                                    px: 2,
                                    '&.Mui-selected': {
                                        bgcolor: 'rgba(0, 23, 66, 0.08)',
                                        color: 'primary.main',
                                        borderLeft: '4px solid',
                                        borderLeftColor: 'secondary.main',
                                        borderRadius: '0 12px 12px 0',
                                        '& .MuiListItemIcon-root': {
                                            color: 'primary.main',
                                        },
                                        '&:hover': {
                                            bgcolor: 'rgba(0, 23, 66, 0.12)',
                                        },
                                    },
                                    '&:hover': {
                                        bgcolor: 'rgba(0, 23, 66, 0.05)',
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: isActive ? 'primary.main' : 'text.secondary' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 600 : 500,
                                        fontSize: '0.925rem',
                                        letterSpacing: '0.3px'
                                    }}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Box>

            <Divider sx={{ mx: 2 }} />

            <Box sx={{ p: 2 }}>
                <List sx={{ pb: 0 }}>
                    <ListItem
                        onClick={handleLogout}
                        sx={{
                            borderRadius: '12px',
                            py: 1.2,
                            px: 2,
                            '&:hover': {
                                bgcolor: 'rgba(211, 47, 47, 0.05)',
                                color: 'error.main',
                                '& .MuiListItemIcon-root': { color: 'error.main' }
                            }
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Logout"
                            primaryTypographyProps={{
                                fontSize: '0.925rem',
                                fontWeight: 500,
                                letterSpacing: '0.3px'
                            }}
                        />
                    </ListItem>
                </List>
            </Box>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={open}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        borderRight: '1px solid #eee',
                        boxShadow: '4px 0 10px rgba(0,0,0,0.05)'
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        borderRight: '1px solid #eee'
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};

export default SellerSidebar;
