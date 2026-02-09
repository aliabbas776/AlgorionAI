import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { industriesAPI } from '../services/api';
import './Industries.css';

const Industries = () => {
    const [industries, setIndustries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        industriesAPI.getAll()
            .then(res => {
                setIndustries(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="industries-page">
            <section className="page-hero section-padding">
                <div className="container">
                    <span className="tag">Industries</span>
                    <h1>Tailored Solutions for <span className="premium-gradient">Every Sector</span></h1>
                    <p>We combine deep domain expertise with technical prowess to solve industry-specific challenges.</p>
                </div>
            </section>

            <section className="industries-list section-padding">
                <div className="container grid">
                    {industries.map((ind, index) => (
                        <motion.div
                            key={ind.id}
                            className="industry-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="industry-content">
                                <h2>{ind.name}</h2>
                                <p>{ind.hero_subtitle}</p>
                                <div className="logos-preview">
                                    {ind.logos?.slice(0, 3).map((logo, lIdx) => (
                                        <img key={lIdx} src={logo.logo} alt="Client Logo" />
                                    ))}
                                </div>
                                <a href={ind.button_link} className="ind-link">{ind.button_text}</a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Industries;
