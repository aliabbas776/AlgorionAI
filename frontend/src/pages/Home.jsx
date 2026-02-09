import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
};

export default function Home() {
    const [heroSlides, setHeroSlides] = useState([]);
    const [activeSlide, setActiveSlide] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHeroSlides = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/hero-slides/`);
                const sortedSlides = response.data.sort((a, b) => a.order - b.order);
                setHeroSlides(sortedSlides);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching hero slides:', error);
                setLoading(false);
            }
        };

        fetchHeroSlides();
    }, []);

    useEffect(() => {
        if (heroSlides.length === 0) return;

        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [heroSlides.length]);

    const nextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (heroSlides.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="text-white text-xl">No hero slides available</div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-screen overflow-hidden bg-slate-900">
            {/* Background Image with Overlay */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    {heroSlides[activeSlide]?.image && (
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${getImageUrl(heroSlides[activeSlide].image)})`,
                            }}
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
                </motion.div>
            </AnimatePresence>

            {/* Side Accordion Navigation */}
            <div className="absolute left-0 top-0 h-full flex flex-col z-20">
                {heroSlides.map((slide, index) => (
                    <motion.button
                        key={slide.id}
                        onClick={() => setActiveSlide(index)}
                        className={`relative flex items-center justify-center transition-all duration-500 ${index === activeSlide
                                ? 'flex-[3] bg-slate-800/60'
                                : 'flex-1 bg-slate-900/80 hover:bg-slate-800/40'
                            }`}
                        whileHover={{ x: index === activeSlide ? 0 : 5 }}
                    >
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 opacity-0 transition-opacity duration-300"
                            style={{ opacity: index === activeSlide ? 1 : 0 }} />

                        <div className={`transform -rotate-90 whitespace-nowrap transition-all duration-500 ${index === activeSlide ? 'text-white text-lg font-semibold' : 'text-gray-400 text-sm'
                            }`}>
                            {slide.label}
                        </div>

                        {index === activeSlide && (
                            <div className="absolute left-12 top-1/2 -translate-y-1/2 flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse delay-100" />
                                <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse delay-200" />
                            </div>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-8 md:px-16 lg:px-24 ml-24">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSlide}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl"
                        >
                            <motion.h1
                                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                {heroSlides[activeSlide]?.title}
                            </motion.h1>

                            <motion.p
                                className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                {heroSlides[activeSlide]?.subtitle}
                            </motion.p>

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="group relative px-8 py-4 bg-white text-slate-900 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50"
                            >
                                <span className="relative z-10">Explore Industry Solutions</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                    Explore Industry Solutions →
                                </span>
                            </motion.button>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-8 right-8 flex gap-4 z-20">
                <button
                    onClick={prevSlide}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className={`transition-all duration-300 ${index === activeSlide
                                ? 'w-12 h-2 bg-white rounded-full'
                                : 'w-2 h-2 bg-white/40 rounded-full hover:bg-white/60'
                            }`}
                    />
                ))}
            </div>

            {/* Client Logos Section */}
            <div className="absolute bottom-24 left-24 right-24 z-10">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <p className="text-gray-400 text-sm mb-4 text-center">Clients</p>
                    <div className="flex items-center justify-center gap-8 flex-wrap">
                        {/* Placeholder for client logos - will be dynamic later */}
                        <div className="text-white/60 font-semibold text-lg">NAFTAN</div>
                        <div className="text-white/60 font-semibold text-lg">TechnoMC</div>
                        <div className="text-white/60 font-semibold text-lg">WASTEER</div>
                        <div className="text-white/60 font-semibold text-lg">NRI</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
