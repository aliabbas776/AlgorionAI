import React from 'react';
import { motion } from 'framer-motion';
import './CompanyHighlights.css';

const stats = [
    { value: '1000+', label: 'projects delivered' },
    { value: '120+', label: 'active clients, including Fortune 500 companies' },
    { value: '30+', label: 'years on the market' },
    { value: '20', label: 'offices and delivery centres globally' }
];

const techStack = [
    { id: 1, name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { id: 2, name: 'Laravel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
    { id: 3, name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { id: 4, name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { id: 5, name: 'PHP', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
    { id: 6, name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { id: 7, name: 'Angular', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
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

                {/* Bottom: Tech Stack Marquee */}
                <div className="awards-marquee-container">
                    <div className="awards-track">
                        {/* Multiple sets for seamless loop */}
                        {[...Array(3)].map((_, setIndex) => (
                            <React.Fragment key={`set-${setIndex}`}>
                                {techStack.map((tech) => (
                                    <div key={`${setIndex}-${tech.id}`} className="tech-box">
                                        <div className="tech-icon-wrapper">
                                            <img src={tech.logo} alt={tech.name} className="tech-logo" />
                                        </div>
                                        <span className="tech-name">{tech.name}</span>
                                    </div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompanyHighlights;
