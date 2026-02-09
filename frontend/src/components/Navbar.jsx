import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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
                <Link to="/" className="logo">
                    Algorian<span>AI</span>
                </Link>

                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <div className="nav-item">
                        <Link to="/services" onClick={() => setIsOpen(false)}>Services <ChevronDown size={16} /></Link>
                        {/* Mega menu placeholder */}
                    </div>
                    <div className="nav-item">
                        <Link to="/industries" onClick={() => setIsOpen(false)}>Industries <ChevronDown size={16} /></Link>
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
