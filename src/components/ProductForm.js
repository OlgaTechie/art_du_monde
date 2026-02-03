import React from 'react';

const ProductForm = ({
    formData,
    setFormData,
    editingProduct,
    API_BASE,
    ADMIN_TOKEN,
    onCancel,
    onSubmit
}) => {

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadFormData = new FormData();
        uploadFormData.append('image', file);

        try {
            const res = await fetch(`${API_BASE}/admin/upload`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` },
                body: uploadFormData
            });

            const data = await res.json();
            if (data.success) {
                setFormData(prev => ({
                    ...prev,
                    image: data.imageUrl
                }));
            }
        } catch (err) {
            console.error('Upload échoué:', err);
            alert('❌ Erreur upload image');
        }
    };

    return (
        <div className="form-container">
            <h2>{editingProduct ? '✏️ Modifier' : '➕ Ajouter'} Produit</h2>
            <form onSubmit={onSubmit} className="product-form">
                <input
                    placeholder="Nom produit"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Prix €"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                {formData.image && (
                    <img src={formData.image} alt="Preview" className="image-preview-small" />
                )}
                <input
                    placeholder="Catégorie (women/children)"
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
                <div className="form-actions">
                    <button type="submit" className="btn-success">💾 Sauvegarder</button>
                    <button type="button" className="btn-secondary" onClick={onCancel}>
                        ❌ Annuler
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;