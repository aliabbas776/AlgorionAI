import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { ArrowLeft, User, Calendar, Tag } from 'lucide-react';
import './BlogDetail.css';

const BlogDetail = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        blogAPI.getDetail(slug)
            .then(res => {
                setPost(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [slug]);

    if (loading) return <div className="loading">Loading Insight...</div>;
    if (!post) return <div className="loading">Insight not found.</div>;

    return (
        <div className="blog-detail-page">
            <div className="container">
                <Link to="/blog" className="back-link"><ArrowLeft size={20} /> Back to Insights</Link>

                <header className="article-header">
                    <span className="tag">{post.category_name}</span>
                    <h1>{post.title}</h1>
                    <div className="article-meta">
                        <span><User size={16} /> {post.author_name}</span>
                        <span><Calendar size={16} /> {new Date(post.published_at).toLocaleDateString()}</span>
                    </div>
                </header>

                <div className="article-hero">
                    <img src={post.thumbnail} alt={post.title} />
                </div>

                <article className="article-content">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>
            </div>
        </div>
    );
};

export default BlogDetail;
