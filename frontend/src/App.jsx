import { Routes, Route, useLocation } from 'react-router-dom'
import { Button, ThemeProvider } from "@mui/material"
import { CustomerTheme } from './theme/CustomerTheme'
import Home from './customer/pages/Home'
import Product from './customer/pages/Product/Product'
import Navbar from './customer/components/Navbar/Navbar'
import Login from './customer/pages/Auth/Login'
import Signup from './customer/pages/Auth/Signup'
import Cart from './customer/pages/Cart/Cart'
import Wishlist from './customer/pages/Wishlist/Wishlist'
import ProductDetails from './customer/pages/ProductDetails/ProductDetails'
import Checkout from './customer/pages/Checkout/Checkout'
import Footer from './customer/components/Footer/Footer'
import TermsAndConditions from './customer/pages/Info/TermsAndConditions'
import PrivacyPolicy from './customer/pages/Info/PrivacyPolicy'
import CustomerService from './customer/pages/Info/CustomerService'
import ContactUs from './customer/pages/Info/ContactUs'
import About from './customer/pages/Info/About'
import ShippingPolicy from './customer/pages/Info/ShippingPolicy'

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';
  const hideFooter = location.pathname === '/login' || location.pathname === '/signup';

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Informational Routes */}
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/customer-service" element={<CustomerService />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
      </Routes>
      {!hideFooter && <Footer />}
    </ThemeProvider>
  )
}

export default App
