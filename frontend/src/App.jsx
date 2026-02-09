import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeProvider } from "@mui/material"
import { CustomerTheme } from './theme/CustomerTheme'
import { getUserProfile } from './State/AuthSlice'
import { fetchCart } from './State/CartSlice'
import { getWishlist } from './State/WishlistSlice'
import Home from './customer/pages/Home'
import Product from './customer/pages/Product/Product'
import Navbar from './customer/components/Navbar/Navbar'
import Login from './customer/pages/Auth/Login'
import Signup from './customer/pages/Auth/Signup'
import Cart from './customer/pages/Cart/Cart'
import Wishlist from './customer/pages/Wishlist/Wishlist'
import ProductDetails from './customer/pages/ProductDetails/ProductDetails'
import Checkout from './customer/pages/Checkout/Checkout'
import Profile from './customer/pages/Account/Profile'
import Footer from './customer/components/Footer/Footer'
import TermsAndConditions from './customer/pages/Info/TermsAndConditions'
import PrivacyPolicy from './customer/pages/Info/PrivacyPolicy'
import CustomerService from './customer/pages/Info/CustomerService'
import ContactUs from './customer/pages/Info/ContactUs'
import About from './customer/pages/Info/About'
import ShippingPolicy from './customer/pages/Info/ShippingPolicy'
import Careers from './customer/pages/Info/Careers'
import Press from './customer/pages/Info/Press'
import Blog from './customer/pages/Info/Blog'
import StoreLocations from './customer/pages/Info/StoreLocations'
import Security from './customer/pages/Info/Security'
import CookiePolicy from './customer/pages/Info/CookiePolicy'
import SellerLayout from './seller/SellerLayout'
import SellerDashboardPage from './seller/pages/Dashboard/SellerDashboardPage'
import SellerOrders from './seller/pages/Orders/SellerOrders'
import SellerProducts from './seller/pages/Products/SellerProducts'
import AddProduct from './seller/pages/AddProduct/AddProduct'
import SellerPayments from './seller/pages/Payment/SellerPayments'
import SellerTransactions from './seller/pages/Transactions/SellerTransactions'
import SellerProfile from './seller/pages/Profile/SellerProfile'
import BecomeSeller from './customer/pages/BecomeSeller/BecomeSeller'

// Admin Imports
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/pages/Dashboard/AdminDashboard'
import AdminCoupons from './admin/pages/Coupons/AdminCoupons'
import AddCoupon from './admin/pages/AddCoupon/AddCoupon'
import AdminPlaceholder from './admin/pages/AdminPlaceholder.jsx'

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);

  useEffect(() => {
    if (auth.jwt || localStorage.getItem("jwt")) {
      dispatch(getUserProfile(auth.jwt || localStorage.getItem("jwt")));
      dispatch(fetchCart());
      dispatch(getWishlist());
    }
  }, [auth.jwt, dispatch]);

  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/become-seller' || location.pathname.startsWith('/seller') || location.pathname.startsWith('/admin');
  const hideFooter = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/become-seller' || location.pathname.startsWith('/seller') || location.pathname.startsWith('/admin');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ThemeProvider theme={CustomerTheme}>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/become-seller" element={<BecomeSeller />} />

        {/* Informational Routes */}
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/customer-service" element={<CustomerService />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/press" element={<Press />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/stores" element={<StoreLocations />} />
        <Route path="/security" element={<Security />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />

        {/* Seller Routes */}
        <Route path="/seller" element={<SellerLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<SellerDashboardPage />} />
          <Route path="orders" element={<SellerOrders />} />
          <Route path="products" element={<SellerProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="payments" element={<SellerPayments />} />
          <Route path="transactions" element={<SellerTransactions />} />
          <Route path="profile" element={<SellerProfile />} />
        </Route>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="add-coupon" element={<AddCoupon />} />
          <Route path="home-page" element={<AdminPlaceholder title="Home Page Settings" />} />
          <Route path="electronics" element={<AdminPlaceholder title="Electronics Category" />} />
          <Route path="categories" element={<AdminPlaceholder title="Shop By Category" />} />
          <Route path="deals" element={<AdminPlaceholder title="Manage Deals" />} />
        </Route>
      </Routes>
      {!hideFooter && <Footer />}
    </ThemeProvider>
  )
}

export default App
