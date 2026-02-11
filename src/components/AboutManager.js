import React, { useState } from 'react';

const AboutManager = ({
    aboutData, setAboutData,
    showAboutForm, setShowAboutForm,
    editingSection, setEditingSection,
    aboutFormData, setAboutFormData,
    API_BASE, ADMIN_TOKEN, fetchAbout,
    deleteConfirm, setDeleteConfirm,
    moveSection,
    onSuccess
}) => {
    const [isOpen, setIsOpen] = useState(false);

    // 👇 AJOUTE CETTE FONCTION (manquante)
    const handleEdit = (section) => {
        setAboutFormData({
            title: section.title,
            text: section.text,
            imageUrl: section.imageUrl,
            imageRight: section.imageRight
        });
        setEditingSection(section);
        setShowAboutForm(true);
    };

    const saveAboutHeader = async () => {
        try {
            const res = await fetch(`${API_BASE}/admin/about`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ADMIN_TOKEN}`
                },
                body: JSON.stringify({
                    title: aboutData.title,
                    subtitle: aboutData.subtitle
                })
            });
            if (res.ok) {
                fetchAbout();
            }
        } catch (err) {
            alert('❌ Erreur');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = editingSection
                ? `${API_BASE}/admin/about/section/${editingSection._id}`
                : `${API_BASE}/admin/about/section`;

            const res = await fetch(endpoint, {
                method: editingSection ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ADMIN_TOKEN}`
                },
                body: JSON.stringify(aboutFormData)
            });

            if (res.ok) {
                fetchAbout();
                setShowAboutForm(false);
                setEditingSection(null);
                setAboutFormData({ title: '', text: '', imageUrl: '', imageRight: true });

                // 👇 CALLBACK vers AdminPage.js
                if (typeof onSuccess === 'function') {
                    const message = editingSection ? 'Section modifiée !' : 'Section créée !';
                    onSuccess(`✅ ${message}`);
                }
            }
        } catch (err) {
            alert('❌ Erreur');
        }
    };

    return (
        <div className="admin-section collapsible about-manager">
            <div className="section-header" onClick={() => setIsOpen(!isOpen)}>
                <h2>Page À propos</h2>
                <button className="toggle-btn">
                    {isOpen ? '▲' : '▼'}
                </button>
            </div>

            {isOpen && (
                <div className="section-content">
                    {/* Header */}
                    <div className="form-group">
                        <label>Titre principal</label>
                        <input
                            value={aboutData.title}
                            onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
                            placeholder="À propos d'Art du Monde"
                            className="admin-input full-width"
                        />
                    </div>

                    <div className="form-group">
                        <label>Sous-titre</label>
                        <input
                            value={aboutData.subtitle}
                            onChange={(e) => setAboutData({ ...aboutData, subtitle: e.target.value })}
                            placeholder="Artisanat du monde entier..."
                            className="admin-input full-width"
                        />
                    </div>

                    <div className="form-group">
                        <button onClick={saveAboutHeader} className="admin-btn primary">
                            Sauvegarder Header
                        </button>
                    </div>

                    {/* 👇 FORMULAIRE INLINE (POSITION PARFAITE) */}
                    {showAboutForm && (
                        <div className="form-section">
                            <h4>{editingSection ? '✏️ Modifier une section' : '➕ Nouvelle section'}</h4>

                            <div className="form-group">
                                <label>Titre de la section</label>
                                <input
                                    value={aboutFormData.title}
                                    onChange={(e) => setAboutFormData({ ...aboutFormData, title: e.target.value })}
                                    placeholder="Ex: Notre histoire"
                                    className="admin-input"
                                />
                            </div>

                            <div className="form-group">
                                <label>Texte descriptif</label>
                                <textarea
                                    value={aboutFormData.text}
                                    onChange={(e) => setAboutFormData({ ...aboutFormData, text: e.target.value })}
                                    placeholder="Racontez votre histoire..."
                                    rows="4"
                                    className="admin-textarea"
                                />
                            </div>

                            <div className="form-group">
                                <label>Photo de la section</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const formData = new FormData();
                                            formData.append('image', file);

                                            try {
                                                const res = await fetch(`${API_BASE}/admin/upload`, {
                                                    method: 'POST',
                                                    headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` },
                                                    body: formData
                                                });
                                                const data = await res.json();
                                                if (data.success) {
                                                    setAboutFormData(prev => ({ ...prev, imageUrl: data.imageUrl }));
                                                }
                                            } catch (err) {
                                                alert('❌ Erreur upload');
                                            }
                                        }
                                    }}
                                    className="admin-input"
                                />
                                {aboutFormData.imageUrl && (
                                    <img
                                        src={aboutFormData.imageUrl}
                                        alt="Preview"
                                        className="image-preview"
                                    />
                                )}
                            </div>

                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={aboutFormData.imageRight}
                                        onChange={(e) => setAboutFormData({ ...aboutFormData, imageRight: e.target.checked })}
                                    />
                                    Image à droite (sinon à gauche)
                                </label>
                            </div>

                            <div className="form-actions">
                                <button onClick={handleSubmit} className="admin-btn primary">
                                    Sauvegarder
                                </button>
                                <button
                                    onClick={() => {
                                        setShowAboutForm(false);
                                        setEditingSection(null);
                                    }}
                                    className="admin-btn secondary"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Bouton ➕ Liste */}
                    <div className="sections-actions">
                        <button
                            onClick={() => setShowAboutForm(true)}
                            className="admin-btn primary"
                            disabled={showAboutForm}
                        >
                            ➕ Ajouter une section
                        </button>
                    </div>

                    <div className="sections-list">
                        {aboutData.sections.length === 0 ? (
                            <p>Aucune section pour l'instant.</p>
                        ) : (
                            aboutData.sections.map((section, index) => (
                                <div key={section._id} className="section-item">
                                    <div className="section-preview">
                                        {section.imageUrl ? (
                                            <img
                                                src={section.imageUrl}
                                                alt={section.title}
                                                className="section-image-preview"
                                            />
                                        ) : (
                                            <div className="no-image">📷</div>
                                        )}
                                        <div className="section-text">
                                            <h5>{section.title}</h5>
                                            <p>{section.text.substring(0, 60)}...</p>
                                            <small>Image: {section.imageRight ? 'droite' : 'gauche'}</small>
                                        </div>
                                    </div>
                                    <div className="section-actions">
                                        <button
                                            onClick={() => moveSection(section._id, 'up')}
                                            className="btn-small btn-move"
                                            disabled={index === 0}
                                            title="Monter"
                                        >
                                            ↑
                                        </button>
                                        <button
                                            onClick={() => moveSection(section._id, 'down')}
                                            className="btn-small btn-move"
                                            disabled={index === aboutData.sections.length - 1}
                                            title="Descendre"
                                        >
                                            ↓
                                        </button>
                                        <button
                                            onClick={() => handleEdit(section)}
                                            className="btn-small btn-primary"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => setDeleteConfirm({ show: true, sectionId: section._id })}
                                            className="btn-small btn-danger"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AboutManager;