import { Routes, Route, useLocation } from 'react-router-dom'
import { Button, ThemeProvider } from "@mui/material"
import { CustomerTheme } from './theme/CustomerTheme'
import Home from './customer/pages/Home'
import Product from './customer/pages/Product/Product'
import Navbar from './customer/components/Navbar/Navbar'
import Login from './customer/pages/Auth/Login'
import Signup from './customer/pages/Auth/Signup'

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <ThemeProvider theme={CustomerTheme}>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
