import React from 'react';

const BannerManager = ({
    bannerData,
    setBannerData,
    bannerLoading,
    API_BASE,
    ADMIN_TOKEN,
    fetchBanner,
    saveBanner
}) => {

    const handleBannerFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);

            const res = await fetch(`${API_BASE}/admin/upload`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` },
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                setBannerData(prev => ({ ...prev, imageSrc: data.imageUrl }));
            }
        }
    };

    const updateButton = (index, field, value) => {
        const newButtons = [...bannerData.buttons];
        newButtons[index] = { ...newButtons[index], [field]: value };
        setBannerData(prev => ({ ...prev, buttons: newButtons }));
    };

    const addButton = () => {
        setBannerData(prev => ({
            ...prev,
            buttons: [...prev.buttons, { label: '', path: '' }]
        }));
    };

    const removeButton = (index) => {
        const newButtons = bannerData.buttons.filter((_, i) => i !== index);
        setBannerData(prev => ({ ...prev, buttons: newButtons }));
    };

    return (
        <div className="admin-section">
            <h2>🏠 Banner HomePage</h2>

            {/* Image upload */}
            <div className="form-group">
                <label>📸 Photo Banner</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerFileChange}
                    className="admin-input"
                />
                {bannerData.imageSrc && (
                    <img src={bannerData.imageSrc} alt="Preview" className="image-preview" />
                )}
            </div>

            {/* Texte */}
            <div className="form-group">
                <label>Texte principal</label>
                <textarea
                    value={bannerData.text}
                    onChange={(e) => setBannerData(prev => ({ ...prev, text: e.target.value }))}
                    placeholder="Plongez dans la douceur balinaise..."
                    className="admin-textarea"
                    rows="3"
                />
            </div>

            {/* Boutons dynamiques */}
            <div className="form-group">
                <label>Boutons</label>
                {bannerData.buttons.map((btn, index) => (
                    <div key={index} className="button-row dynamic-button-row">
                        <input
                            value={btn.label}
                            onChange={(e) => updateButton(index, 'label', e.target.value)}
                            placeholder={`Label bouton ${index + 1} (ex: Femmes)`}
                            className="admin-input-small"
                        />
                        <input
                            value={btn.path}
                            onChange={(e) => updateButton(index, 'path', e.target.value)}
                            placeholder={`Chemin ${index + 1} (ex: /women)`}
                            className="admin-input-small"
                        />
                        {bannerData.buttons.length > 1 && (
                            <button
                                type="button"
                                className="admin-btn secondary small"
                                onClick={() => removeButton(index)}
                            >
                                🗑️
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" className="admin-btn primary" onClick={addButton}>
                    ➕ Ajouter un bouton
                </button>
            </div>

            <div className="banner-actions">
                <button onClick={fetchBanner} className="admin-btn secondary">
                    🔄 Charger actuel
                </button>
                <button onClick={saveBanner} disabled={bannerLoading} className="admin-btn primary">
                    💾 Sauvegarder Banner
                </button>
            </div>
        </div>
    );
};

export default BannerManager;