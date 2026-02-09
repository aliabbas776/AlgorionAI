import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <section className="page-hero section-padding">
                <div className="container">
                    <span className="tag">About Us</span>
                    <h1>Architecting the <span className="premium-gradient">Future</span> Together</h1>
                    <p>AlgorianAI is a global leader in enterprise software development, helping companies navigate the complexities of AI and digital transformation.</p>
                </div>
            </section>

            <section className="mission-section section-padding">
                <div className="container grid">
                    <div className="mission-content">
                        <h2>Our Mission</h2>
                        <p>To empower global enterprises by delivering high-impact, guaranteed software solutions that drive measurable business value and technological excellence.</p>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <h3>20+</h3>
                            <p>Years of Excellence</p>
                        </div>
                        <div className="stat-item">
                            <h3>500+</h3>
                            <p>Experts Globally</p>
                        </div>
                        <div className="stat-item">
                            <h3>1000+</h3>
                            <p>Projects Delivered</p>
                        </div>
                        <div className="stat-item">
                            <h3>98%</h3>
                            <p>Client Retention</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team/Leadership sections can be added here with dynamic content later */}
        </div>
    );
};

export default About;
