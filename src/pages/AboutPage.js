import React, { useState, useEffect } from 'react';
import './AboutPage.css';

const API_BASE = 'http://localhost:5001/api';

const AboutPage = () => {
    const [aboutData, setAboutData] = useState({ title: '', subtitle: '', sections: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE}/admin/public-about`)
            .then(res => res.json())
            .then(data => {
                setAboutData(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="loading">Chargement...</div>;

    return (
        <div className="about-page">
            <div className="about-hero">
                <h1>{aboutData.title}</h1>
                <p className="subtitle">{aboutData.subtitle}</p>
            </div>
            <div className="about-sections">
                {aboutData.sections.map(section => (
                    <Section key={section._id} section={section} />
                ))}
            </div>
        </div>
    );
};

const Section = ({ section }) => (
    <div className={`about-section ${section.imageRight ? 'image-right' : 'image-left'}`}>
        <div className="text-side">
            <h2>{section.title}</h2>
            <p>{section.text}</p>
        </div>
        {section.imageUrl && (
            <div
                className="image-side"
                style={{ backgroundImage: `url(${section.imageUrl})` }}
            />
        )}
    </div>
);

export default AboutPage;