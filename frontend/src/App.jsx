import { Routes, Route } from 'react-router-dom'
import { Button, ThemeProvider } from "@mui/material"
import { CustomerTheme } from './theme/CustomerTheme'
import Home from './customer/pages/Home'
import Product from './customer/pages/Product/Product'

const App = () => {
  return (
    <ThemeProvider theme={CustomerTheme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
