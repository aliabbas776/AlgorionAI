import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, ArrowUpRight } from 'lucide-react';
import './Home.css';
import ServiceCards from '../components/ServiceCards';
import SuccessStories from '../components/SuccessStories';
import CompanyHighlights from '../components/CompanyHighlights';
import IndustryCards from '../components/IndustryCards';

// Static hero slides data
const heroSlides = [
    {
        id: 1,
        title: 'Web Development',
        subtitle: 'Build powerful, scalable web applications with cutting-edge technologies and modern frameworks',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1920',
        order: 1
    },
    {
        id: 2,
        title: 'AI & Machine Learning',
        subtitle: 'Transform your business with intelligent solutions powered by artificial intelligence and data science',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1920',
        order: 2
    },
    {
        id: 3,
        title: 'Cloud Solutions',
        subtitle: 'Scale your infrastructure with secure, reliable cloud computing and DevOps practices',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920',
        order: 3
    },
    {
        id: 4,
        title: 'Mobile Development',
        subtitle: 'Create seamless mobile experiences with native and cross-platform application development',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1920',
        order: 4
    }
];

export default function Home() {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

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
                                        backgroundImage: `url(${slide.image})`
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
