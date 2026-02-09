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

    return (
        <div className="contact-page">
            <section className="page-hero section-padding">
                <div className="container">
                    <span className="tag">Contact Us</span>
                    <h1>Let's Build Something <span className="premium-gradient">Exceptional</span></h1>
                </div>
            </section>

            <section className="contact-section section-padding">
                <div className="container contact-grid">
                    <div className="contact-info">
                        <div className="info-item">
                            <Mail className="icon" />
                            <div>
                                <h3>Email Us</h3>
                                <p>hello@algorian.ai</p>
                                <p>partners@algorian.ai</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <Phone className="icon" />
                            <div>
                                <h3>Call Us</h3>
                                <p>+1 (555) 000-1111</p>
                                <p>+44 20 7946 0000</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <MapPin className="icon" />
                            <div>
                                <h3>Visit Us</h3>
                                <p>Silicon Valley, CA</p>
                                <p>London, UK</p>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        className="contact-form-container"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    placeholder="Your Message"
                                    rows="5"
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-btn">
                                Send Message <Send size={18} />
                            </button>
                            {status.msg && <p className={`status-msg ${status.type}`}>{status.msg}</p>}
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
