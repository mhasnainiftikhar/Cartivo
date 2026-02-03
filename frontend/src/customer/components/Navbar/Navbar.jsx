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
    Close as CloseIcon
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius * 5,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
        minWidth: '400px',
    },
    display: 'flex',
    alignItems: 'center',
    padding: '2px 15px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 1),
        transition: theme.transitions.create('width'),
        width: '100%',
        fontSize: '0.9rem',
    },
}));

const NavButton = styled(Button)(({ theme }) => ({
    color: '#001742',
    fontWeight: 600,
    fontSize: '0.9rem',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
    },
}));

const categoryData = {
    "Men": ["T-Shirts", "Jeans", "Shoes", "Watches", "Activewear"],
    "Women": ["Dresses", "Tops", "Skirts", "Bags", "Jewelry"],
    "Kids": ["Boys Clothing", "Girls Clothing", "Toys", "School Supplies"],
    "Home & Living": ["Decor", "Bedding", "Kitchen", "Furniture"],
    "Beauty": ["Makeup", "Skincare", "Fragrance", "Haircare"],
    "Electronics": ["Mobiles", "Laptops", "Headphones", "Cameras"]
};

const categories = Object.keys(categoryData);

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const navigate = useNavigate();

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

                        {/* Mobile Menu Icon */}
                        {isMobile && (
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerToggle}
                                sx={{ color: '#001742' }}
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
                                mt: -1,
                                fontFamily: '"Playwrite NZ Basic"'
                            }}
                        >
                            Cartivo<span style={{ color: '#2563eb' }}>.</span>
                        </Typography>

                        {!isMobile && (
                            <Box sx={{ display: 'flex', gap: 1, ml: 4 }}>
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

                        {/* Search Bar */}
                        {!isMobile && (
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon size="small" />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search for products, brands and more..."
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        )}

                        {/* Action Icons */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
                            {isMobile && (
                                <IconButton sx={{ color: '#001742' }}>
                                    <SearchIcon />
                                </IconButton>
                            )}
                            <IconButton onClick={() => navigate('/login')} sx={{ color: '#001742' }}>
                                <PersonIcon />
                            </IconButton>
                            <IconButton onClick={() => navigate('/wishlist')} sx={{ color: '#001742' }}>
                                <Badge badgeContent={4} color="secondary" sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem', height: 16, minWidth: 16, color: '#001742', fontWeight: 900 } }}>
                                    <WishlistIcon />
                                </Badge>
                            </IconButton>
                            <IconButton onClick={() => navigate('/cart')} sx={{ color: '#001742' }}>
                                <Badge badgeContent={2} color="secondary" sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem', height: 16, minWidth: 16, color: '#001742', fontWeight: 900 } }}>
                                    <CartIcon />
                                </Badge>
                            </IconButton>
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
