import Hero from './Home/Hero'
import BecomeSeller from './Home/BecomeSeller'
import ProductCarousel from '../components/ProductCarousel/ProductCarousel'
import CategoryGrid from '../components/CategoryGrid/CategoryGrid'
import Deal from './Deals/Deal'
import { Grid, Box, Typography } from '@mui/material'

const mockProducts = [
  { name: "Premium Wireless Headset", price: 299, discount: 15, brand: "AudioTech", image: "https://m.media-amazon.com/images/I/41XjE57VLvL._AC_UY327_FMwebp_QL65_.jpg" },
  { name: "Smart Watch Ultra", price: 499, discount: 10, brand: "Wristly", image: "https://m.media-amazon.com/images/I/61afO93SRXL._AC_UL480_FMwebp_QL65_.jpg" },
  { name: "Pro Series Camera", price: 1299, discount: 20, brand: "Capture", image: "https://m.media-amazon.com/images/I/714hINuPoBL._AC_UY327_FMwebp_QL65_.jpg" },
  { name: "Slim Laptop Pro", price: 1499, discount: 5, brand: "Techy", image: "https://m.media-amazon.com/images/I/71jQbkYw5KL._AC_UY327_FMwebp_QL65_.jpg" },
  { name: "Noise Cancelling Buds", price: 199, discount: 0, brand: "AudioTech", image: "https://m.media-amazon.com/images/I/41XjE57VLvL._AC_UY327_FMwebp_QL65_.jpg" },
  { name: "Portable Speaker Plus", price: 149, discount: 25, brand: "SoundBox", image: "https://m.media-amazon.com/images/I/81l7mB5LhsL._AC_UY327_FMwebp_QL65_.jpg" },
];

const homeCategories = [
  { name: "Kitchen", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=200" },
  { name: "Living Room", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=200" },
  { name: "Bedroom", image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=200" },
  { name: "Bathroom", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200" },
];

const fashionCategories = [
  { name: "Men's Tops", image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=200" },
  { name: "Women's Dresses", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200" },
  { name: "Kids' Wear", image: "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=200" },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1524805444758-09913195200c?w=200" },
];

const Home = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <Hero />

      <Box sx={{ maxWidth: '1440px', mx: 'auto', mt: { xs: 0, lg: -10 }, position: 'relative', zIndex: 10, px: { xs: 2, lg: 10 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <CategoryGrid title="Refresh Your Home" categories={homeCategories} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <CategoryGrid title="Trendsetters' Choice" categories={fashionCategories} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 4, height: '100%', border: '1px solid #eee' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: '#001742' }}>Sign in for the best experience</Typography>
              <button className="w-full py-3 bg-[#febd69] text-sm font-bold rounded-lg mb-4 hover:bg-[#f3a847] transition-all">Sign in securely</button>
              <div className='mt-10 overflow-hidden rounded-xl h-48'>
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" alt="Promo" className="w-full h-full object-cover" />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <section className='mt-10'>
        <Deal />
      </section>

      <div className='py-10'>
        <section>
          <ProductCarousel title="Curated for You" products={mockProducts} />
        </section>

        <section className='mt-10'>
          <ProductCarousel title="Best Sellers in Electronics" products={[...mockProducts].reverse()} />
        </section>

        <section className='px-5 lg:px-10 mt-16 mb-20'>
          <BecomeSeller />
        </section>
      </div>
    </div>
  )
}

export default Home
