import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, ArrowUpRight } from 'lucide-react';
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
                                                <div className="awards-preview" style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginTop: 'auto' }}>
                                                    <span className="award-item" style={{ opacity: 0.6, fontSize: '0.8rem', letterSpacing: '1px' }}>AWARDS</span>
                                                    <div className="award-logo" style={{ opacity: 0.8, fontSize: '0.9rem', fontWeight: '600' }}>ISO 9001</div>
                                                    <div className="award-logo" style={{ opacity: 0.8, fontSize: '0.9rem', fontWeight: '600' }}>ISO 27001</div>
                                                    <div className="award-logo" style={{ opacity: 0.8, fontSize: '0.9rem', fontWeight: '600' }}>CLUTCH TOP 1000</div>

                                                    {/* Navigation Arrows Inside Expanded Content */}
                                                    <div className="hero-nav-buttons" style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                                                            className="hero-nav-btn"
                                                            style={{
                                                                width: '45px',
                                                                height: '45px',
                                                                borderRadius: '50%',
                                                                background: 'rgba(255, 255, 255, 0.1)',
                                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                                color: 'white',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                cursor: 'pointer',
                                                                transition: 'all 0.3s'
                                                            }}
                                                        >
                                                            <ChevronLeft size={20} />
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                                                            className="hero-nav-btn"
                                                            style={{
                                                                width: '45px',
                                                                height: '45px',
                                                                borderRadius: '50%',
                                                                background: 'rgba(255, 255, 255, 0.1)',
                                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                                color: 'white',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                cursor: 'pointer',
                                                                transition: 'all 0.3s'
                                                            }}
                                                        >
                                                            <ChevronRight size={20} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    ) : (
                                        /* Collapsed Content - Title Top, Plus Bottom */
                                        <div className="collapsed-content">
                                            <div className="collapsed-title-wrapper">
                                                <span className="collapsed-title">{slide.title}</span>
                                            </div>
                                            <div className="collapsed-plus-wrapper">
                                                <div className="plus-circle-icon">
                                                    <Plus size={20} />
                                                </div>
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
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                poster="https://eleks.com/wp-content/uploads/cta-video-poster-small.jpg"
                                className="cta-video"
                                src="https://eleks.com/wp-content/uploads/cta-video-small.webm"
                            >
                            </video>
                        </div>
                        <div className="cta-text">
                            <p>Receive a complimentary consultation</p>
                            <Link to="/contact">
                                Book now <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>
                </motion.div>

            </div>
            <ServiceCards />
            <SuccessStories />
            <CompanyHighlights />
            <IndustryCards />
        </>
    );
}
