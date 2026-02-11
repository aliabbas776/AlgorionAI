import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Zap, Landmark, ChevronLeft, ChevronRight } from 'lucide-react';
import './IndustryCards.css';

const industries = [
    {
        id: 1,
        title: 'Fintech',
        icon: <TrendingUp size={24} />,
        description: [
            'Navigate financial risks with ease',
            'Speed up transactions, reduce costs'
        ],
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 2,
        title: 'Healthcare',
        icon: <Activity size={24} />,
        description: [
            'Deliver exceptional patient service',
            'Automate administrative tasks, optimise costs'
        ],
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 3,
        title: 'Energy',
        icon: <Zap size={24} />,
        description: [
            'Boost operational efficiency with automation',
            'Reduce your direct carbon footprint'
        ],
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 4,
        title: 'Government',
        icon: <Landmark size={24} />,
        description: [
            'Digitise your public services',
            'Defend against cyber crime'
        ],
        image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=400'
    }
];

const IndustryCards = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 380; // Adjusted for wider cards (350px + gap)
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <section className="industry-section">
            <div className="industry-container">
                {/* Header */}
                <div className="industry-header">
                    <div className="header-text-block">
                        <span className="section-label">Industries</span>
                        <h2>Game-changing solutions customized for every sector</h2>
                    </div>
                    {/* Controls */}
                    <div className="industry-controls">
                        <button onClick={() => scroll('left')} className="control-btn" aria-label="Previous">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={() => scroll('right')} className="control-btn" aria-label="Next">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Cards Row */}
                <div className="industry-cards-row" ref={scrollRef}>
                    {industries.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="industry-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="card-top-content">
                                <div className="industry-icon-box">
                                    {item.icon}
                                </div>
                                <h3>{item.title}</h3>
                                <ul className="industry-desc-list">
                                    {item.description.map((desc, i) => (
                                        <li key={i}>{desc}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="card-bottom-image">
                                <img src={item.image} alt={item.title} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IndustryCards;
