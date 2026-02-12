import React from 'react';
import { motion } from 'framer-motion';
import {
    Code, Target, Cloud, Grid, Terminal,
    Layers, Shield, Search, Zap, Repeat, Cpu,
    Database, Activity, CheckCircle, Headphones,
    Settings, Globe, Eye, UserCheck, HardDrive,
    Monitor, BarChart, Server, Cpu as AiIcon
} from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { categories } from '../constants/servicesData';
import './ServicesDropdown.css';

const ServicesDropdown = () => {
    const [activeCategory, setActiveCategory] = React.useState('engineering');
    const activeData = categories.find(cat => cat.id === activeCategory) || categories[0];

    return (
        <motion.div
            className="services-mega-menu"
            initial={{ opacity: 0, y: 15, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 15, x: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <div className="mega-menu-container">
                {/* Sidebar */}
                <div className="mega-menu-sidebar">
                    {categories.map(cat => (
                        <div
                            key={cat.id}
                            className={`sidebar-item ${activeCategory === cat.id ? 'active' : ''}`}
                            onMouseEnter={() => setActiveCategory(cat.id)}
                        >
                            <h3>{cat.title}</h3>
                            <p>{cat.description}</p>
                        </div>
                    ))}
                </div>

                {/* Content Area */}
                <div className="mega-menu-content">
                    <div className="services-grid">
                        {activeData.items?.map((item, idx) => (
                            <div key={idx} className="service-detail-card">
                                <div className="service-icon-box">
                                    {item.icon}
                                </div>
                                <div className="service-info">
                                    <h4 className="service-title-link">
                                        <ArrowRight size={18} className="title-arrow" />
                                        {item.title}
                                    </h4>
                                    {item.description && <p className="service-desc">{item.description}</p>}
                                    {item.subItems && (
                                        <div className="service-sub-items">
                                            {item.subItems.map((sub, sIdx) => (
                                                <span key={sIdx}>{sub}</span>
                                            ))}
                                        </div>
                                    )}
                                    {item.hasButton && (
                                        <button className="assessment-btn">
                                            {item.buttonText} <ArrowRight size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ServicesDropdown;
