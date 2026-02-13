import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Minus } from 'lucide-react';
import './ServiceCards.css';

const services = [
    {
        id: 1,
        category: 'Engineering',
        title: 'App development',
        description: 'Bring your most complex software vision to life with innovation and scalability in mind',
        link: '/services/app-development',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600' // Coding/Screen
    },
    {
        id: 2,
        category: 'Advisory',
        title: 'Product and service design',
        description: 'Get strategic guidance on creating best-in-class domain-specific technology solutions',
        link: '/services/product-design',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600' // Strategy/Team
    },
    {
        id: 3,
        category: 'Data & AI',
        title: 'AI Development',
        description: 'Revolutionise your industry with AI-powered innovation and data-centric solutions',
        link: '/services/ai-development',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600' // AI/Brain
    },
    {
        id: 4,
        category: 'Data & AI',
        title: 'Data Science',
        description: 'Deep-dive into your data to uncover actionable insights and drive performance',
        link: '/services/data-science',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600' // Data/Charts
    }
];

export default function ServiceCards() {
    const containerRef = useRef(null);

    const scroll = (direction) => {
        if (containerRef.current) {
            const scrollAmount = 420; // Width + gap
            containerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="service-cards-section">
            <div className="service-cards-header">
                <p className="text-sm uppercase tracking-widest mb-4 text-gray-500">See how we can help you reach your goals</p>
                <h2>
                    Answer three questions to help us match our expertise and software solutions to your needs
                </h2>
            </div>

            <div className="cards-wrapper relative">
                <div className="cards-container" ref={containerRef}>

                    {/* 1. Questionnaire Card */}
                    <motion.div
                        className="card questionnaire-card"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="question-step">
                            <div className="question-header">
                                <h3>1. What best describes the current state of your software project?</h3>
                                <Minus size={20} className="collapse-icon" />
                            </div>
                            <div className="options-grid">
                                {['Idea', 'PoC', 'Prototype', 'MVP', 'Ready product', 'Legacy system'].map(opt => (
                                    <span key={opt} className={`option-pill ${opt === 'Idea' ? 'selected' : ''}`}>
                                        {opt}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="question-placeholder">
                            2. What is your primary business need?
                        </div>

                        <div className="question-placeholder" style={{ borderBottom: 'none' }}>
                            3. Does your project have any specific requirements?
                        </div>
                    </motion.div>

                    {/* 2. Service Cards */}
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            className="card service-card"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="service-content-top">
                                <div className="service-category">
                                    {service.category}
                                </div>
                                <div className="service-content">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                            </div>

                            {/* Hover Pill at Bottom */}
                            <div className="service-hover-pill" style={{ backgroundImage: `url(${service.image})` }}>
                                <div className="pill-overlay" />
                                <div className="pill-content">
                                    <span className="view-text">View service</span>
                                    <div className="arrow-circle">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="cards-nav">
                    <button onClick={() => scroll('left')} className="nav-btn">
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={() => scroll('right')} className="nav-btn">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
}
