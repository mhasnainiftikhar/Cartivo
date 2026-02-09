import React from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Divider,
    Typography,
    useTheme
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    ConfirmationNumber as CouponIcon,
    AddCircle as AddIcon,
    Home as HomeIcon,
    ElectricBolt as ElectronicsIcon,
    Category as CategoryIcon,
    LocalOffer as DealsIcon,
    Logout as LogoutIcon
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 260;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Coupons', icon: <CouponIcon />, path: '/admin/coupons' },
    { text: 'Add New Coupon', icon: <AddIcon />, path: '/admin/add-coupon' },
    { text: 'Home Page', icon: <HomeIcon />, path: '/admin/home-page' },
    { text: 'Electronics Category', icon: <ElectronicsIcon />, path: '/admin/electronics' },
    { text: 'Shop By Category', icon: <CategoryIcon />, path: '/admin/categories' },
    { text: 'Deals', icon: <DealsIcon />, path: '/admin/deals' },
];

const AdminSidebar = ({ open, onClose, mobile }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>
            <Toolbar /> {/* Spacer for fixed header */}
            <Box sx={{ p: 2, flexGrow: 1 }}>
                <List sx={{ mt: 2 }}>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <ListItem
                                key={item.text}
                                onClick={() => {
                                    navigate(item.path);
                                    if (onClose) onClose();
                                }}
                                selected={isActive}
                                sx={{
                                    borderRadius: '0 24px 24px 0',
                                    mb: 1,
                                    py: 1.5,
                                    px: 3,
                                    mr: 2,
                                    '&.Mui-selected': {
                                        bgcolor: 'rgba(0, 137, 123, 0.08)',
                                        color: '#00897b',
                                        borderLeft: '4px solid',
                                        borderLeftColor: '#00897b',
                                        '& .MuiListItemIcon-root': {
                                            color: '#00897b',
                                        },
                                        '&:hover': {
                                            bgcolor: 'rgba(0, 137, 123, 0.12)',
                                        },
                                    },
                                    '&:hover': {
                                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: isActive ? '#00897b' : 'text.secondary' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 600 : 500,
                                        fontSize: '0.95rem'
                                    }}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Box>

            <Divider />
            <Box sx={{ p: 2 }}>
                <ListItem
                    onClick={() => navigate('/signin')}
                    sx={{
                        borderRadius: '12px',
                        py: 1.5,
                        px: 3,
                        color: 'error.main',
                        '&:hover': {
                            bgcolor: 'error.lighter',
                            color: 'error.dark'
                        }
                    }}
                >
                    <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItem>
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
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none' },
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
                        borderRight: '1px solid #eee',
                        bgcolor: 'white'
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};

export default AdminSidebar;
