import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { servicesAPI } from '../services/api';
import './Services.css';

const Services = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        servicesAPI.getCategories()
            .then(res => {
                setCategories(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="services-page">
            <section className="page-hero section-padding">
                <div className="container">
                    <span className="tag">Services</span>
                    <h1>Expertise that Drives <span className="premium-gradient">Growth</span></h1>
                    <p>We provide full-cycle software engineering and technology consulting tailored to your business goals.</p>
                </div>
            </section>

            <section className="categories-section section-padding">
                <div className="container">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            className="category-block"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="category-info">
                                <h2>{cat.name}</h2>
                                <div className="services-list">
                                    {cat.services?.map(service => (
                                        <div key={service.id} className="service-item">
                                            <h3>{service.title}</h3>
                                            <p>{service.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Services;
