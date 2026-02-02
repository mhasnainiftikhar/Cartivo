import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const slides = [
    {
        title: "Elevate Your lifestyle",
        description: "Discover the next generation of premium electronics and accessories. Crafted for performance, designed for you.",
        image: "https://m.media-amazon.com/images/I/71jQbkYw5KL._AC_UY327_FMwebp_QL65_.jpg",
        bgColor: "bg-[#001742]",
        accentColor: "text-blue-400",
        buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
        title: "Style Meets Comfort",
        description: "Explore our latest collection of premium fashion and accessories. Express yourself with every outfit.",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
        bgColor: "bg-[#1a202c]",
        accentColor: "text-yellow-400",
        buttonColor: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
        title: "Home Transformation",
        description: "Upgrade your living space with our curated selection of premium home decor and furniture.",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
        bgColor: "bg-[#2d3748]",
        accentColor: "text-green-400",
        buttonColor: "bg-green-600 hover:bg-green-700",
    }
];

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 7000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className={`relative h-[450px] lg:h-[600px] overflow-hidden transition-colors duration-1000 ${slides[currentSlide].bgColor}`}>
            {/* Background Decorative Elements */}
            <div className='absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none' />

            {/* Slide Content */}
            <div className='relative h-full px-5 lg:px-20 flex items-center max-w-7xl mx-auto'>
                <div className={`transition-all duration-1000 transform ${currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-0 opacity-100'} w-full lg:w-1/2`}>
                    <h1 className='text-4xl lg:text-7xl font-extrabold text-white leading-tight mb-6'>
                        {slides[currentSlide].title.split(' ').map((word, i) =>
                            i === slides[currentSlide].title.split(' ').length - 1 ?
                                <span key={i} className={slides[currentSlide].accentColor}>{word}</span> :
                                word + ' '
                        )}
                    </h1>
                    <p className='text-lg lg:text-xl text-gray-300 font-light leading-relaxed mb-10'>
                        {slides[currentSlide].description}
                    </p>

                    <div className='flex flex-wrap gap-4'>
                        <Link to="/products">
                            <button className={`px-10 py-4 ${slides[currentSlide].buttonColor} text-white font-bold rounded-lg transition-all shadow-xl`}>
                                Shop Now
                            </button>
                        </Link>
                        <button className='px-10 py-4 bg-white/10 text-white font-bold rounded-lg border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm'>
                            Details
                        </button>
                    </div>
                </div>

                {/* Floating Featured Image */}
                <div className='absolute right-10 lg:right-20 top-1/2 -translate-y-1/2 hidden lg:block w-[450px] h-[450px]'>
                    <div className='relative w-full h-full flex items-center justify-center'>
                        <div className='absolute inset-0 bg-white/5 rounded-full blur-3xl animate-pulse' />
                        <img
                            key={currentSlide}
                            src={slides[currentSlide].image}
                            alt="Featured"
                            className='relative z-10 max-w-full max-h-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transition-all duration-1000 transform scale-100 hover:scale-105'
                        />
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            <div className='absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 lg:px-10 pointer-events-none'>
                <IconButton
                    onClick={prevSlide}
                    sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        pointerEvents: 'auto',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                    }}
                >
                    <ChevronLeft fontSize="large" />
                </IconButton>
                <IconButton
                    onClick={nextSlide}
                    sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        pointerEvents: 'auto',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                    }}
                >
                    <ChevronRight fontSize="large" />
                </IconButton>
            </div>

            {/* Slide Indicators */}
            <div className='absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3'>
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-8' : 'bg-white/30'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;
