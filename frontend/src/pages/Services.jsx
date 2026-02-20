import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Globe, Users } from 'lucide-react';
import { categories } from '../constants/servicesData';
import './Services.css';

const Services = () => {
    return (
        <div className="services-page">
            {/* Full-width Hero Section */}
            <section className="services-hero">
                <div className="hero-overlay"></div>
                <div className="container hero-container">
                    <motion.div
                        className="hero-text-content"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="hero-tag">Services</span>
                        <h1>AlgorionAI Services</h1>
                        <p>End-to-end software engineering and technology consulting services tailored to your business goals.</p>
                        <button className="hero-cta-btn">Talk to an expert</button>
                    </motion.div>

                    <div className="hero-stats-cards">
                        <div className="stat-card">
                            <Star size={32} />
                            <span>Top tier talent</span>
                        </div>
                        <div className="stat-card">
                            <Globe size={32} />
                            <span>Global reach</span>
                        </div>
                        <div className="stat-card">
                            <Users size={32} />
                            <span>Client focused</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Categories Sections */}
            <div className="services-listing">
                {categories.map((cat, catIdx) => {
                    const isExpertise = cat.id === 'expertise';

                    return (
                        <React.Fragment key={cat.id}>
                            <section className={`category-section ${isExpertise ? 'section-dark' : ''}`}>
                                <div className="container">
                                    <div className="category-header">
                                        <div className="category-title-box">
                                            <div className="category-header-icon">
                                                {cat.icon}
                                            </div>
                                            <h2>{cat.title} services</h2>
                                        </div>
                                        <p className="category-description">{cat.description}</p>
                                    </div>

                                    <div className="services-grid">
                                        {cat.items.map((item, itemIdx) => (
                                            <motion.div
                                                key={itemIdx}
                                                className="service-card"
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: itemIdx * 0.1 }}
                                            >
                                                <div className="service-card-number">
                                                    {(itemIdx + 1).toString().padStart(2, '0')}
                                                </div>
                                                <h3 className="service-card-title">
                                                    <ArrowRight className="title-arrow" size={20} />
                                                    {item.title}
                                                </h3>
                                                {item.description && <p className="service-card-desc">{item.description}</p>}
                                                {item.subItems && (
                                                    <div className="service-card-footer">
                                                        <ul className="service-card-subs">
                                                            {item.subItems.map((sub, sIdx) => (
                                                                <li key={sIdx}>{sub}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                {item.hasButton && (
                                                    <button className="card-assessment-btn">
                                                        {item.buttonText} <ArrowRight size={14} />
                                                    </button>
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Banner Section after Advisory (id: advisory) */}
                            {cat.id === 'advisory' && (
                                <section className="tech-banner">
                                    <div className="banner-flex">
                                        <div className="banner-img-side">
                                            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="Team meeting" />
                                        </div>
                                        <div className="banner-text-side">
                                            <h2>Working with the latest technologies to build high-performance products and services.</h2>
                                            <button className="banner-btn">See our stack</button>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default Services;
