import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Badge,
    Box,
    Container,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {
    Search as SearchIcon,
    PersonOutline as PersonIcon,
    FavoriteBorder as WishlistIcon,
    ShoppingCartOutlined as CartIcon,
    Menu as MenuIcon,
    Close as CloseIcon,
    Logout as LogoutIcon
} from '@mui/icons-material';
import { Avatar, Tooltip } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../State/AuthSlice';

const Search = styled('div', {
    shouldForwardProp: (prop) => prop !== 'expand',
})(({ theme, expand }) => ({
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderRadius: theme.shape.borderRadius * 5,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    transition: theme.transitions.create(['width', 'background-color', 'box-shadow'], {
        duration: theme.transitions.duration.shorter,
    }),
    width: expand ? '320px' : '40px',
    height: '40px',
    boxShadow: expand ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
    overflow: 'hidden',
    marginLeft: theme.spacing(2),
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.1),
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    height: '100%',
    width: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    flexShrink: 0,
}));

const StyledInputBase = styled(InputBase, {
    shouldForwardProp: (prop) => prop !== 'expand',
})(({ theme, expand }) => ({
    color: 'inherit',
    width: '100%',
    opacity: expand ? 1 : 0,
    transition: theme.transitions.create('opacity'),
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        width: '100%',
        fontSize: '0.9rem',
        '&::placeholder': {
            color: '#000',
            opacity: 0.8,
        },
    },
}));

const NavButton = styled(Button)(({ theme }) => ({
    color: '#001742',
    fontWeight: 600,
    fontSize: '0.9rem',
    textTransform: 'none',
    margin: theme.spacing(0, 1),
    position: 'relative',
    '&:hover': {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 5,
        left: '50%',
        width: 0,
        height: '2px',
        backgroundColor: theme.palette.primary.main,
        transition: 'all 0.3s ease-in-out',
        transform: 'translateX(-50%)',
    },
    '&:hover::after': {
        width: '60%',
    },
}));

const categoryData = {
    "Men": ["T-Shirts", "Jeans", "Shoes", "Watches", "Activewear"],
    "Women": ["Dresses", "Tops", "Skirts", "Bags", "Jewelry"],
    "Kids": ["Boys Clothing", "Girls Clothing", "Toys", "School Supplies"],
    "Home": ["Decor", "Bedding", "Kitchen", "Furniture"],
    "Beauty": ["Makeup", "Skincare", "Fragrance", "Haircare"],
    "Electronics": ["Mobiles", "Laptops", "Headphones", "Cameras"]
};

const categories = Object.keys(categoryData);

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    const { auth, cart, wishlist, seller } = useSelector(store => store);

    const navigate = useNavigate();
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const searchInputRef = React.useRef(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [currentCategory, setCurrentCategory] = useState(null);

    const handleCategoryHover = (event, category) => {
        setAnchorEl(event.currentTarget);
        setCurrentCategory(category);
    };

    const handleCategoryClose = () => {
        setAnchorEl(null);
        setCurrentCategory(null);
    };

    const handleCategoryClick = (category) => {
        navigate(`/products?category=${category.toLowerCase()}`);
        if (mobileOpen) setMobileOpen(false);
        handleCategoryClose();
    };

    const handleSubCategoryClick = (category, subCategory) => {
        navigate(`/products?category=${category.toLowerCase()}&sub=${subCategory.toLowerCase()}`);
        handleCategoryClose();
    };

    const drawer = (
        <Box sx={{ width: 250, padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <IconButton onClick={handleDrawerToggle}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <List>
                {categories.map((item) => (
                    <ListItem button key={item} onClick={() => handleCategoryClick(item)}>
                        <ListItemText primary={item} sx={{ color: '#001742', fontWeight: 600 }} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const isSellerLoggedIn = !!seller.seller;

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Top Info Bar */}
            <Box sx={{
                bgcolor: '#001742',
                color: 'white',
                py: 0.5,
                textAlign: 'center',
                fontSize: '0.75rem',
                fontWeight: 500
            }}>
                Free Shipping on Orders Over $99 | Easy Returns
            </Box>

            <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 'none', borderBottom: '1px solid #eee', py: 0.5 }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>

                        {/* Left Group: Logo & Categories */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* Mobile Menu Icon */}
                            {isMobile && (
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerToggle}
                                    sx={{ color: '#001742', mr: 1 }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            )}

                            {/* Logo */}
                            <Typography
                                variant="h4"
                                noWrap
                                component={Link}
                                to="/"
                                sx={{
                                    fontWeight: 400,
                                    color: '#001742',
                                    cursor: 'pointer',
                                    letterSpacing: '1px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    textDecoration: 'none',
                                    fontFamily: '"Playwrite NZ Basic"',
                                    fontSize: { xs: '1.5rem', md: '2rem' },
                                    mr: { md: 4 },
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'scale(1.02)'
                                    }
                                }}
                            >
                                Cartivo<span style={{ color: '#2563eb' }}>.</span>
                            </Typography>

                            {/* Desktop Categories */}
                            {!isMobile && (
                                <Box sx={{ display: 'flex', gap: 0.5 }}>
                                    {categories.map((cat) => (
                                        <NavButton
                                            key={cat}
                                            onClick={() => handleCategoryClick(cat)}
                                            onMouseEnter={(e) => handleCategoryHover(e, cat)}
                                            aria-controls={currentCategory === cat ? 'category-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={currentCategory === cat ? 'true' : undefined}
                                        >
                                            {cat}
                                        </NavButton>
                                    ))}
                                    <Menu
                                        id="category-menu"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleCategoryClose}
                                        MenuListProps={{
                                            onMouseLeave: handleCategoryClose,
                                        }}
                                        sx={{ mt: 1 }}
                                    >
                                        {currentCategory && categoryData[currentCategory]?.map((sub) => (
                                            <MenuItem key={sub} onClick={() => handleSubCategoryClick(currentCategory, sub)}>
                                                {sub}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            )}
                        </Box>

                        {/* Right Group: Search, Seller, Icons */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/* Search Bar */}
                            {!isMobile && (
                                <Search
                                    expand={isSearchExpanded}
                                    onMouseEnter={() => setIsSearchExpanded(true)}
                                    onMouseLeave={() => {
                                        if (document.activeElement !== searchInputRef.current) {
                                            setIsSearchExpanded(false);
                                        }
                                    }}
                                    onClick={() => searchInputRef.current?.focus()}
                                    sx={{ mr: isSearchExpanded ? 2 : 1 }}
                                >
                                    <SearchIconWrapper>
                                        <SearchIcon size="small" />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        expand={isSearchExpanded}
                                        inputRef={searchInputRef}
                                        placeholder="Search products..."
                                        inputProps={{ 'aria-label': 'search' }}
                                        onFocus={() => setIsSearchExpanded(true)}
                                        onBlur={() => setIsSearchExpanded(false)}
                                    />
                                </Search>
                            )}

                            {/* Seller Button */}
                            {!isMobile && (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate(isSellerLoggedIn ? '/seller/dashboard' : '/become-seller')}
                                        sx={{
                                            mr: 1,
                                            color: 'primary.main',
                                            borderColor: 'primary.main',
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            borderRadius: 8,
                                            px: 2,
                                            whiteSpace: 'nowrap',
                                            '&:hover': {
                                                bgcolor: 'rgba(0, 23, 66, 0.05)',
                                                borderColor: 'primary.main',
                                            }
                                        }}
                                    >
                                        {isSellerLoggedIn ? 'Dashboard' : 'Become Seller'}
                                    </Button>
                                    {!isSellerLoggedIn && !auth.user && (
                                        <Button
                                            variant="text"
                                            onClick={() => navigate('/seller-login')}
                                            sx={{
                                                mr: 2,
                                                color: '#001742',
                                                fontWeight: 600,
                                                textTransform: 'none',
                                            }}
                                        >
                                            Seller Login
                                        </Button>
                                    )}
                                </Box>
                            )}

                            {/* Action Icons */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                                {isMobile && (
                                    <IconButton sx={{ color: '#001742' }}>
                                        <SearchIcon />
                                    </IconButton>
                                )}
                                <Tooltip title={auth.user ? "Account" : "Login"}>
                                    <IconButton
                                        onClick={() => navigate(auth.user ? '/account' : '/login')}
                                        sx={{
                                            color: '#001742',
                                            p: auth.user ? 0.5 : 1
                                        }}
                                    >
                                        {auth.user ? (
                                            <Avatar
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    bgcolor: '#001742',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 700
                                                }}
                                            >
                                                {auth.user.name?.charAt(0).toUpperCase()}
                                            </Avatar>
                                        ) : (
                                            <PersonIcon />
                                        )}
                                    </IconButton>
                                </Tooltip>
                                <IconButton onClick={() => navigate('/wishlist')} sx={{ color: '#001742' }}>
                                    <Badge badgeContent={wishlist.wishlist?.products?.length || 0} color="secondary" sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem', height: 16, minWidth: 16, color: '#001742', fontWeight: 900 } }}>
                                        <WishlistIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton onClick={() => navigate('/cart')} sx={{ color: '#001742' }}>
                                    <Badge badgeContent={cart.cart?.cartItems?.length || 0} color="secondary" sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem', height: 16, minWidth: 16, color: '#001742', fontWeight: 900 } }}>
                                        <CartIcon />
                                    </Badge>
                                </IconButton>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

export default Navbar;
