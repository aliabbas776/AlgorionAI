import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Facebook } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <Link to="/" className="logo">Algorian<span>AI</span></Link>
                    <p>Harnessing the power of AI to transform enterprises and drive innovation across industries.</p>
                    <div className="social-links">
                        <a href="#"><Twitter size={20} /></a>
                        <a href="#"><Linkedin size={20} /></a>
                        <a href="#"><Facebook size={20} /></a>
                        <a href="#"><Github size={20} /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <h3>Services</h3>
                    <ul>
                        <li><Link to="/services">AI & Data Solutions</Link></li>
                        <li><Link to="/services">Cloud Engineering</Link></li>
                        <li><Link to="/services">Custom Software</Link></li>
                        <li><Link to="/services">IT Consulting</Link></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h3>Company</h3>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/portfolio">Portfolio</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h3>Contact</h3>
                    <p>Address: Romford London, UK</p>
                    <p>Email: info@algorionai.com</p>
                    <p>Phone: +44 7404 825779</p>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; 2026 AlgorianAI. All rights reserved.</p>
                    <div className="legal-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
