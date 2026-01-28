import React, { useState, useEffect } from 'react';
import './AdminPage.css';

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '', price: '', image: '', category: ''
    });

    const adminToken = 'admin-token-123';  // Force le token
    console.log('Token utilisé:', adminToken);  // Debug

    // 1. LISTER (avec token)
    const fetchProducts = async () => {
        try {
            const res = await fetch('http://localhost:5001/api/admin/products', {
                headers: {
                    'Authorization': 'Bearer admin-token-123',
                },
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error('Erreur fetch:', err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // 2. CREATE/UPDATE (avec token)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            title: formData.name,
            price: parseFloat(formData.price),
            imageUrl: formData.image,
            category: formData.category,
        };

        try {
            const endpoint = editingProduct
                ? `http://localhost:5001/api/admin/products/${editingProduct._id}`
                : 'http://localhost:5001/api/admin/products';

            console.log('🔍 URL utilisée:', endpoint);
            const response = await fetch(endpoint, {
                method: editingProduct ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer admin-token-123',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            await fetchProducts();
            resetForm();
            alert('✅ Produit sauvegardé !');
        } catch (err) {
            console.error('Erreur complète:', err);
            alert(`❌ Erreur: ${err.message}`);
        }
    };

    // 3. EDIT
    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.title,
            price: product.price,
            image: product.imageUrl,
            category: product.category
        });
        setShowForm(true);
    };

    // 4. DELETE (avec token)
    const handleDelete = async (id) => {
        if (!window.confirm('Supprimer ce produit ?')) return;
        try {
            await fetch(`http://localhost:5001/api/admin/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer admin-token-123',
                },
            });
            await fetchProducts();
        } catch (err) {
            alert('Erreur suppression');
        }
    };

    const resetForm = () => {
        setFormData({ name: '', price: '', image: '', category: '' });
        setEditingProduct(null);
        setShowForm(false);
    };

    if (loading) return <div>Chargement...</div>;

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>🛍️ Gestion Produits</h1>
                <button className="btn-primary" onClick={() => setShowForm(true)}>
                    ➕ Nouveau Produit
                </button>
            </div>

            {showForm && (
                <div className="form-container">
                    <h2>{editingProduct ? '✏️ Modifier' : '➕ Ajouter'}</h2>
                    <form onSubmit={handleSubmit} className="product-form">
                        <input
                            placeholder="Nom produit"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Prix €"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                        />
                        <input
                            placeholder="URL image"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Catégorie"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                        />
                        <div className="form-actions">
                            <button type="submit" className="btn-success">💾 Sauvegarder</button>
                            <button type="button" className="btn-secondary" onClick={resetForm}>❌ Annuler</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="products-grid">
                {products.map(product => (
                    <div key={product._id} className="product-card-admin">
                        <img src={product.imageUrl} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p className="price">€{product.price}</p>
                        <p className="category">{product.category}</p>
                        <div className="product-actions">
                            <button className="btn-edit" onClick={() => handleEdit(product)}>
                                ✏️ Modifier
                            </button>
                            <button className="delete-btn" onClick={() => handleDelete(product._id)}>
                                🗑️ Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;