import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='relative h-[400px] lg:h-[550px] overflow-hidden bg-[#001742]'>
            {/* Background Decorative Elements */}
            <div className='absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none' />
            <div className='absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl' />

            <div className='relative h-full px-5 lg:px-20 flex flex-col justify-center max-w-7xl mx-auto'>
                <div className='max-w-xl'>
                    <h1 className='text-4xl lg:text-7xl font-extrabold text-white leading-tight'>
                        Elevate Your <span className='text-blue-400'>Lifestyle</span>
                    </h1>
                    <p className='mt-6 text-lg lg:text-xl text-gray-300 font-light leading-relaxed'>
                        Discover the next generation of premium electronics and accessories.
                        Crafted for performance, designed for you.
                    </p>

                    <div className='mt-10 flex flex-wrap gap-4'>
                        <Link to="/products">
                            <button className='px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/40'>
                                Shop Now
                            </button>
                        </Link>
                        <button className='px-8 py-4 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm'>
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Floating Featured Image (Optional/Placeholder) */}
                <div className='absolute right-10 lg:right-20 top-1/2 -translate-y-1/2 hidden lg:block'>
                    <div className='relative w-96 h-96'>
                        <div className='absolute inset-0 bg-blue-500/20 rounded-full animate-pulse' />
                        <img
                            src="https://m.media-amazon.com/images/I/71jQbkYw5KL._AC_UY327_FMwebp_QL65_.jpg"
                            alt="Featured Product"
                            className='relative z-10 w-full h-full object-contain drop-shadow-2xl'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
