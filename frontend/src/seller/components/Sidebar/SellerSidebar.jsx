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
    Typography
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

    const handleLogout = () => {
        // Implement logout logic here
        console.log('Logging out...');
        navigate('/');
    };

    const drawerContent = (
        <div>
            <Toolbar /> {/* Spacer for Navbar */}
            <Divider />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => {
                                navigate(item.path);
                                if (onClose) onClose(); // Close drawer on mobile selection
                            }}
                            selected={location.pathname === item.path}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Box>
        </div>
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
                ModalProps={{ keepMounted: true }} // Better open performance on mobile.
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};

export default SellerSidebar;
