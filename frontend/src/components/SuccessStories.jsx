import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Plus, ArrowUpRight } from 'lucide-react';
import './SuccessStories.css';

const stories = [
    {
        id: 1,
        title: '7 continents hosted performances powered by Navigator',
        type: 'video',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200', // Meeting/People
    },
    {
        id: 2,
        title: 'Designing the future of office spaces with AI',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600', // Office blurred
    },
    {
        id: 3,
        title: 'Empowering women in tech leadership roles',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600', // Woman portrait
    },
    {
        id: 4,
        title: 'Data-driven insights for executive decision making',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600', // Man portrait
    }
];

export default function SuccessStories() {
    const [activeId, setActiveId] = useState(1);

    return (
        <section className="success-stories-section">
            <div className="container mx-auto">
                <div className="stories-header">
                    <span className="stories-label">Clients</span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Our customers success stories
                    </motion.h2>
                </div>

                <div className="stories-container">
                    {stories.map((story) => (
                        <div
                            key={story.id}
                            className={`story-card ${activeId === story.id ? 'active' : ''}`}
                            onMouseEnter={() => setActiveId(story.id)}
                        // Ensure first one is active by default if mouse leaves, or keep last hovered? 
                        // Usually keep last hovered or revert to 1. Let's keep last hovered for stability.
                        >
                            <div
                                className="story-bg"
                                style={{ backgroundImage: `url(${story.image})` }}
                            />

                            <div className="story-overlay">
                                {activeId === story.id ? (
                                    <>
                                        {story.type === 'video' && (
                                            <div className="video-badge">
                                                <Play size={16} fill="white" />
                                                Watch the video
                                            </div>
                                        )}
                                        <div className="story-content">
                                            <h3>{story.title}</h3>
                                        </div>
                                    </>
                                ) : null}
                            </div>

                            {/* Plus Icon: Shown only when NOT active */}
                            {activeId !== story.id && (
                                <div className="plus-circle-container">
                                    <div className="plus-circle-icon">
                                        <Plus size={20} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="clients-bar">
                    <div className="client-logos">
                        <div className="logo-item">TAIT</div>
                        <div className="text-sm text-gray-500 max-w-md ml-4 border-l pl-4 border-gray-300">
                            Developing custom motion control software and hardware solutions for TAIT
                        </div>
                        {/* Add more logos as needed placeholder text for now */}
                        <div className="logo-item ml-8" style={{ color: '#de002b' }}>dpd</div>
                        <div className="logo-item ml-8" style={{ color: '#fdb913' }}>natran</div>
                        <div className="logo-item ml-8 font-serif italic">David Lloyd</div>
                    </div>

                    <a href="/case-studies" className="view-case-study-link">
                        View case study <ArrowUpRight size={18} />
                    </a>
                </div>
            </div>
        </section>
    );
}
