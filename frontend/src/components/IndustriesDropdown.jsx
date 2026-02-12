import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { industriesData } from '../constants/industriesData';
import './IndustriesDropdown.css';

const IndustriesDropdown = () => {
    const [activeIndustry, setActiveIndustry] = React.useState(industriesData[0]);

    return (
        <motion.div
            className="industries-mega-menu"
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 10, x: "-50%" }}
            transition={{ duration: 0.2 }}
        >
            <div className="mega-menu-container">
                {/* Left Side: Dark Grid */}
                <div className="industries-grid-side">
                    <div className="industries-nav-grid">
                        {industriesData.map((industry) => (
                            <div
                                key={industry.id}
                                className={`industry-nav-item ${activeIndustry.id === industry.id ? 'active' : ''}`}
                                onMouseEnter={() => setActiveIndustry(industry)}
                            >
                                <div className="industry-nav-icon">
                                    {industry.icon}
                                </div>
                                <span className="industry-nav-name">{industry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Content Pane */}
                <div className="industry-content-side">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndustry.id}
                            className="industry-preview-content"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="preview-text">
                                <h2 className="preview-main-title">Innovative solutions across industries</h2>
                                <p className="preview-subtitle">
                                    Expert software services tailored to meet the unique needs of every sector.
                                </p>
                            </div>
                            <div className="preview-image-container">
                                <img
                                    src={activeIndustry.image}
                                    alt={activeIndustry.name}
                                    className="preview-image"
                                />
                                <div className="image-overlay"></div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default IndustriesDropdown;
