import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioAPI } from '../services/api';
import { ArrowUpRight } from 'lucide-react';
import './Portfolio.css';

const staticCases = [
    {
        id: 1,
        title: "Tutorcat AI",
        description: "Revolutionary AI platform for personalized education and tutoring.",
        category: "AI & EdTech",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
        url: "https://tutorcat.ai/"
    },
    {
        id: 2,
        title: "Electra Vehicles",
        description: "Innovating electric vehicle solutions for a sustainable future.",
        category: "Brand & Web",
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
        url: "https://www.electravehicles.com/"
    },
    {
        id: 3,
        title: "Xtron App",
        description: "Sending and receiving cryptocurrency is seamless on Xtron Mobile App.",
        category: "Blockchain Platform",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80",
        url: "https://www.xtron.app/"
    },
    {
        id: 4,
        title: "Vasavi Team",
        description: "A powerful digital presence to elevate your business.",
        category: "Web Design",
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
        url: "https://vasaviteam.in/"
    },
    {
        id: 5,
        title: "Envision AI",
        description: "Revolutionizing the way AI avatars are generated.",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
        url: "https://apps.apple.com/pk/app/envision-ai-avatar-generator/id6474200275"
    },
    {
        id: 6,
        title: "Dosh App",
        description: "Bringing simplicity and efficiency to your financial life.",
        category: "Fintech",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        url: "https://apps.apple.com/au/app/dosh-app/id64100029939"
    }
];

const Portfolio = () => {
    return (
        <div className="portfolio-page">
            <section className="page-hero">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Success Stories that <span className="premium-gradient">Matter</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Explore a selection of our latest projects where innovation meets execution. From AI-powered solutions to scalable web and mobile applications, each product reflects our commitment to quality, performance, and impactful digital experiences.
                    </motion.p>
                </div>
            </section>

            <section className="portfolio-grid-section section-padding no-padding-top">
                <div className="container grid">
                    {staticCases.map((cs, index) => (
                        <a
                            key={cs.id}
                            href={cs.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="case-card-link"
                        >
                            <motion.div
                                className="case-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <div className="case-image">
                                    <img src={cs.image} alt={cs.title} />
                                </div>
                                <div className="case-info">
                                    <h3>{cs.title}</h3>
                                    <p className="description">{cs.description}</p>
                                    <div className="card-footer">
                                        <span className="category-tag">{cs.category}</span>
                                        <ArrowUpRight size={20} className="arrow-icon" />
                                    </div>
                                </div>
                            </motion.div>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
