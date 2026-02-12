import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Plus } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import ServicesDropdown from './ServicesDropdown';
import IndustriesDropdown from './IndustriesDropdown';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showServices, setShowServices] = useState(false);
    const [showIndustries, setShowIndustries] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
                    <img src={logo} alt="AlgorianAI" className="nav-logo-image" />
                </Link>

                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <div
                        className="nav-item"
                        onMouseEnter={() => setShowServices(true)}
                        onMouseLeave={() => setShowServices(false)}
                    >
                        <Link to="/services" onClick={() => setIsOpen(false)}>
                            Services <ChevronDown size={16} />
                        </Link>

                        <AnimatePresence>
                            {showServices && <ServicesDropdown />}
                        </AnimatePresence>
                    </div>

                    <div
                        className="nav-item"
                        onMouseEnter={() => setShowIndustries(true)}
                        onMouseLeave={() => setShowIndustries(false)}
                    >
                        <span className="nav-item-link">
                            Industries <ChevronDown size={16} />
                        </span>

                        <AnimatePresence>
                            {showIndustries && <IndustriesDropdown />}
                        </AnimatePresence>
                    </div>

                    <Link to="/portfolio" className="nav-item" onClick={() => setIsOpen(false)}>Portfolio</Link>
                    <Link to="/about" className="nav-item" onClick={() => setIsOpen(false)}>About</Link>
                    <Link to="/blog" className="nav-item" onClick={() => setIsOpen(false)}>Insights</Link>
                    <Link to="/contact" className="contact-btn" onClick={() => setIsOpen(false)}>Let's Talk</Link>
                </div>

                <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;