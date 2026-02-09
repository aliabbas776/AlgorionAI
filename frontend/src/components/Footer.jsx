import { Github, Twitter, Linkedin, Facebook } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <h2 className="logo">Algorian<span>AI</span></h2>
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
                        <li><a href="#">AI & Data Solutions</a></li>
                        <li><a href="#">Cloud Engineering</a></li>
                        <li><a href="#">Custom Software</a></li>
                        <li><a href="#">IT Consulting</a></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h3>Company</h3>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Portfolio</a></li>
                        <li><a href="#">Insights</a></li>
                        <li><a href="#">Careers</a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h3>Contact</h3>
                    <p>Global HQ: 123 Innovation Drive, Silicon Valley</p>
                    <p>Email: hello@algorian.ai</p>
                    <p>Phone: +1 (555) 000-1111</p>
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
