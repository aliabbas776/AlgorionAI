import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import './Blog.css';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        blogAPI.getAll()
            .then(res => {
                setPosts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="blog-page">
            <section className="page-hero section-padding">
                <div className="container">
                    <span className="tag">Insights</span>
                    <h1>Expert Opinions & <span className="premium-gradient">Innovations</span></h1>
                    <p>Thought leadership from our experts on AI, cloud engineering, and the future of enterprise technology.</p>
                </div>
            </section>

            <section className="blog-grid-section section-padding">
                <div className="container grid">
                    {posts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            className="blog-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link to={`/blog/${post.slug}`}>
                                <div className="blog-image">
                                    <img src={post.thumbnail} alt={post.title} />
                                    <span className="blog-cat">{post.category_name}</span>
                                </div>
                                <div className="blog-content">
                                    <p className="blog-date">{new Date(post.published_at).toLocaleDateString()}</p>
                                    <h3>{post.title}</h3>
                                    <p className="excerpt">{post.content.substring(0, 120)}...</p>
                                    <span className="read-more">Read Full Insight</span>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Blog;
