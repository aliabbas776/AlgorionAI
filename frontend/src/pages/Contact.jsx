import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { contactAPI } from '../services/api';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', msg: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'info', msg: 'Sending...' });
        try {
            await contactAPI.submitForm(formData);
            setStatus({ type: 'success', msg: 'Message sent successfully!' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setStatus({ type: 'error', msg: 'Failed to send message. Please try again.' });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div className="contact-page">
            <div className="bg-glow"></div>

            <section className="page-hero section-padding">
                <motion.div
                    className="container"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    
                >
                    <motion.span className="tag" variants={itemVariants}>
                        Contact Us
                    </motion.span>
                    <motion.h1 variants={itemVariants}>
                        Let's Build Something <span className="premium-gradient">Exceptional</span>
                    </motion.h1>
                    <motion.p className="hero-subtitle" variants={itemVariants}>
                        Have a project in mind? We'd love to hear from you.
                        Our team is ready to help you navigate your AI journey.
                    </motion.p>
                </motion.div>
            </section>

            <section className="contact-section section-padding">
                <div className="container contact-grid">
                    <motion.div
                        className="contact-info"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        <motion.div className="info-card" variants={itemVariants}>
                            <div className="info-header">
                                <div className="icon-wrapper">
                                    <Mail className="icon" />
                                </div>
                                <h3>Email Us</h3>
                            </div>
                            <div className="info-body">
                                <p className="label">Main Support</p>
                                <p className="value">info@algorionai.com</p>
                            </div>
                        </motion.div>

                        <motion.div className="info-card" variants={itemVariants}>
                            <div className="info-header">
                                <div className="icon-wrapper">
                                    <Phone className="icon" />
                                </div>
                                <h3>Call Us</h3>
                            </div>
                            <div className="info-body">
                                <div className="info-row">
                                    {/* <p className="label">Global</p>
                                    <p className="value">+1 (555) 000-1111</p> */}
                                </div>
                                <div className="info-row">
                                    <p className="label">UK Office</p>
                                    <p className="value"> +44 7404 825779</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div className="info-card" variants={itemVariants}>
                            <div className="info-header">
                                <div className="icon-wrapper">
                                    <MapPin className="icon" />
                                </div>
                                <h3>Visit Us</h3>
                            </div>
                            <div className="info-body">
                                <p className="label">London Office</p>
                                <p className="value">Romford London, UK</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="contact-form-container"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="form-header">
                            <h2>Send us a message</h2>
                            <p>Fill out the form below and we'll get back to you within 24 hours.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>First & Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="email@company.com"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Subject</label>
                                <input
                                    type="text"
                                    placeholder="How can we help?"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    placeholder="Tell us about your project..."
                                    rows="5"
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-btn">
                                <span>Send Message</span>
                                <Send size={18} />
                            </button>
                            {status.msg && (
                                <p className={`status-msg ${status.type}`}>
                                    {status.msg}
                                </p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
