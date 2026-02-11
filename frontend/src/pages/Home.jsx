import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import './Home.css';
import ServiceCards from '../components/ServiceCards';
import SuccessStories from '../components/SuccessStories';
import CompanyHighlights from '../components/CompanyHighlights';
import IndustryCards from '../components/IndustryCards';

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
        <>
            <div className="hero-accordion">
                <div className="hero-slider-container">
                    {heroSlides.map((slide, index) => {
                        const isActive = index === activeSlide;

                        return (
                            <div
                                key={slide.id}
                                className={`hero-slide-panel ${isActive ? 'active' : ''}`}
                                onClick={() => setActiveSlide(index)}
                            >
                                {/* Background Image */}
                                <div
                                    className="slide-bg"
                                    style={{
                                        backgroundImage: `url(${getImageUrl(slide.image)})`
                                    }}
                                />
                                <div className="slide-overlay" />

                                {/* Content Logic */}
                                <div className="slide-content-wrapper">
                                    {isActive ? (
                                        /* Expanded Content */
                                        <div className="slide-expanded-content">
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2, duration: 0.5 }}
                                            >
                                                <div className="hero-label">
                                                    <span className="dot"></span>
                                                    <span>ALGORIAN AI OVERVIEW</span>
                                                </div>
                                                <h1>{slide.title}</h1>
                                                <p>{slide.subtitle}</p>

                                                {/* Awards Section - Only on Active Slide */}
                                                <div className="awards-preview">
                                                    <span className="award-item">AWARDS</span>
                                                    <div className="award-logo">ISO 9001</div>
                                                    <div className="award-logo">ISO 27001</div>
                                                    <div className="award-logo">CLUTCH TOP 1000</div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    ) : (
                                        /* Collapsed Pillar Content */
                                        <div className="slide-collapsed-content">
                                            <span className="vertical-label">{slide.label}</span>
                                            <div className="plus-icon-circle">
                                                <span className="plus-symbol">+</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Floating CTA Card - Positioned absolutely over the slider */}
                <motion.div
                    className="floating-cta"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="cta-inner">
                        <div className="cta-img">
                            <img src="https://via.placeholder.com/80" alt="Team" />
                        </div>
                        <div className="cta-text">
                            <p>Receive a complimentary discovery session</p>
                            <a href="#contact">
                                Book now →
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Navigation Arrows */}
                <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '1rem',
                    zIndex: 20
                }}>
                    <button
                        onClick={prevSlide}
                        style={{
                            padding: '0.75rem',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            color: 'white',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        style={{
                            padding: '0.75rem',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            color: 'white',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
            <ServiceCards />
            <SuccessStories />
            <CompanyHighlights />
            <IndustryCards />
        </>
    );
}
