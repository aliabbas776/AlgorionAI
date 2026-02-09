import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioAPI } from '../services/api';
import { ArrowUpRight } from 'lucide-react';
import './Portfolio.css';

const Portfolio = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        portfolioAPI.getAll()
            .then(res => {
                setCases(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="portfolio-page">
            <section className="page-hero section-padding">
                <div className="container">
                    <span className="tag">Portfolio</span>
                    <h1>Success Stories that <span className="premium-gradient">Matter</span></h1>
                    <p>Explore how we've helped global enterprises solve their toughest challenges through innovative software and AI solutions.</p>
                </div>
            </section>

            <section className="portfolio-grid-section section-padding">
                <div className="container grid">
                    {cases.map((cs, index) => (
                        <motion.div
                            key={cs.id}
                            className="case-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="case-image">
                                <img src={cs.image} alt={cs.title} />
                                <div className="case-overlay">
                                    <span className="industry-tag">{cs.industry_name}</span>
                                </div>
                            </div>
                            <div className="case-info">
                                <h3>{cs.title}</h3>
                                <p className="client">{cs.client_name}</p>
                                <div className="results-preview">
                                    <strong>Results:</strong>
                                    <p>{cs.results}</p>
                                </div>
                                <button className="view-case">Full Story <ArrowUpRight size={18} /></button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
