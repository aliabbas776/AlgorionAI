import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <section className="page-hero section-padding">
                <div className="container">
                    {/* <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="tag"
                    >
                        About Us
                    </motion.span> */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Architecting the <span className="premium-gradient">Future</span> Together
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        AlgorianAI is a global leader in enterprise software development, helping companies navigate the complexities of AI and digital transformation.
                    </motion.p>
                </div>
            </section>

            <section className="who-we-are section-padding">
                <div className="container">
                    <div className="two-column-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="content-side"
                        >
                            <h2 className="section-title">Who We Are</h2>
                            <p className="lead-text">
                                We are a team of innovators, dreamers, and doers committed to delivering exceptional digital experiences.
                                Since our founding, we've helped businesses scale, brands shine, and users fall in love with products they use every day.
                            </p>
                            <p>
                                Our philosophy is simple: blend creativity with technology to make an impact.
                                With every project, we strive to push the boundaries of design, functionality, and user delight.
                            </p>

                            <div className="sub-sections">
                                <div className="sub-section">
                                    <h3>Our Mission</h3>
                                    <p>To empower businesses and individuals by creating digital solutions that are innovative, reliable, and built to inspire. We believe in crafting experiences that don't just work, but work beautifully.</p>
                                </div>
                                <div className="sub-section">
                                    <h3>Our Vision</h3>
                                    <p>To be a global leader in delivering technology-driven experiences that transform industries, connect people, and shape the future.</p>
                                </div>
                                <div className="sub-section">
                                    <h3>Our Values</h3>
                                    <p>Integrity, creativity, and excellence are at the heart of everything we do. We work with passion, respect deadlines, and put client satisfaction above all else.</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="image-side"
                        >
                            <div className="image-wrapper">
                                <img
                                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80"
                                    alt="Team Collaboration"
                                />
                                <div className="image-overlay"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="stats-section section-padding no-padding-top">
                <div className="container">
                    <div className="stats-grid">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="stat-item">
                            <h3>20+</h3>
                            <p>Years of Excellence</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-item">
                            <h3>500+</h3>
                            <p>Experts Globally</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="stat-item">
                            <h3>1000+</h3>
                            <p>Projects Delivered</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="stat-item">
                            <h3>98%</h3>
                            <p>Client Retention</p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
