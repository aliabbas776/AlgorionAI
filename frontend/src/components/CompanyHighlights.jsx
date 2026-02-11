import React from 'react';
import { motion } from 'framer-motion';
import './CompanyHighlights.css';

const stats = [
    { value: '1000+', label: 'projects delivered' },
    { value: '120+', label: 'active clients, including Fortune 500 companies' },
    { value: '30+', label: 'years on the market' },
    { value: '20', label: 'offices and delivery centres globally' }
];

const awards = [
    { id: 1, name: 'The Webby Awards', logo: 'https://via.placeholder.com/100x50?text=Webby' }, // Replace with real logos
    { id: 2, name: 'IAOP', logo: 'https://via.placeholder.com/100x50?text=IAOP' },
    { id: 3, name: 'Clutch', logo: 'https://via.placeholder.com/100x50?text=Clutch' },
    { id: 4, name: 'Forrester', logo: 'https://via.placeholder.com/100x50?text=Forrester' },
    { id: 5, name: 'Gartner', logo: 'https://via.placeholder.com/100x50?text=Gartner' },
    { id: 6, name: 'Horizon', logo: 'https://via.placeholder.com/100x50?text=Horizon' },
];

const CompanyHighlights = () => {
    return (
        <section className="company-highlights-section">
            <div className="highlights-container">
                <div className="highlights-content">
                    {/* Left Column: Heading */}
                    <div className="highlights-left">
                        <motion.span
                            className="highlights-label"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Company highlights
                        </motion.span>
                        <motion.h2
                            className="highlights-title"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            We build lasting partnerships with our clients
                        </motion.h2>
                    </div>

                    {/* Right Column: Stats Grid */}
                    <div className="highlights-right">
                        <div className="stats-grid">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="stat-item"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                >
                                    <h3 className="stat-value">{stat.value}</h3>
                                    <p className="stat-label">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom: Awards Banner (Marquee) */}
                <div className="awards-marquee-container">
                    <div className="awards-track">
                        {/* First Set */}
                        {awards.map((award) => (
                            <div key={`a-${award.id}`} className="award-logo-item">
                                <span className="award-placeholder-text">{award.name}</span>
                            </div>
                        ))}
                        {/* Duplicate Set for Seemless Loop */}
                        {awards.map((award) => (
                            <div key={`b-${award.id}`} className="award-logo-item">
                                <span className="award-placeholder-text">{award.name}</span>
                            </div>
                        ))}
                        {/* Triplicate Set for wider screens if needed */}
                        {awards.map((award) => (
                            <div key={`c-${award.id}`} className="award-logo-item">
                                <span className="award-placeholder-text">{award.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompanyHighlights;
