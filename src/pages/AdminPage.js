import React, { useState, useEffect } from 'react';
import './AdminPage.css';

// ✅ API BASE URL (pas d'import externe)
const API_BASE = 'http://localhost:5001/api';
const ADMIN_TOKEN = 'admin-token-123';

const AdminPage = () => {
    // États PRODUITS
    const [products, setProducts] = useState([]);
    const [productLoading, setProductLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '', price: '', image: '', category: ''
    });

    // États BANNER
    const [bannerData, setBannerData] = useState({
        imageSrc: '',
        text: '',
        buttons: [{ label: '', path: '' }]
    });
    const [bannerLoading, setBannerLoading] = useState(false);

    // États AUTH
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });

    // 🔐 Vérif auth au chargement
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            setIsAuthenticated(true);
            fetchProducts();
            fetchBanner();
        }
    }, []);

    // 1. PRODUITS - Lister
    const fetchProducts = async () => {
        try {
            setProductLoading(true);
            const res = await fetch(`${API_BASE}/admin/products`, {
                headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` }
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error('Erreur fetch products:', err);
            setProducts([]);
            if (err.message.includes('401')) {
                localStorage.removeItem('adminToken');
                setIsAuthenticated(false);
            }
        } finally {
            setProductLoading(false);
        }
    };

    // 2. PRODUITS - CREATE/UPDATE
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
                ? `${API_BASE}/admin/products/${editingProduct._id}`
                : `${API_BASE}/admin/products`;

            const method = editingProduct ? 'PUT' : 'POST';

            const res = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ADMIN_TOKEN}`
                },
                body: JSON.stringify(productData),
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            await fetchProducts();
            resetForm();
            alert('✅ Produit sauvegardé !');
        } catch (err) {
            console.error('Erreur save:', err);
            alert(`❌ Erreur: ${err.message}`);
        }
    };

    // 3. PRODUITS - DELETE
    const handleDelete = async (id) => {
        if (!window.confirm('Supprimer ce produit ?')) return;
        try {
            const res = await fetch(`${API_BASE}/admin/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` }
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            await fetchProducts();
            alert('✅ Produit supprimé !');
        } catch (err) {
            alert('❌ Erreur suppression');
        }
    };

    // 4. PRODUITS - EDIT
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

    const resetForm = () => {
        setFormData({ name: '', price: '', image: '', category: '' });
        setEditingProduct(null);
        setShowForm(false);
    };

    // 🔥 BANNER - Fetch
    const fetchBanner = async () => {
        try {
            const res = await fetch(`${API_BASE}/public-banner`);
            const data = await res.json();
            setBannerData({
                imageSrc: data.imageSrc || '',
                text: data.text || '',
                buttons: data.buttons || [{ label: '', path: '' }]
            });
        } catch (err) {
            console.error('Erreur fetch banner:', err);
        }
    };

    // 🔥 BANNER - Save
    const saveBanner = async () => {
        setBannerLoading(true);
        try {
            const res = await fetch(`${API_BASE}/banner`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bannerData)
            });
            if (res.ok) {
                alert('✅ Banner sauvegardé ! Refresh HomePage');
            }
        } catch (err) {
            alert('❌ Erreur sauvegarde banner');
        }
        setBannerLoading(false);
    };

    // 🔐 LOGIN
    const handleLogin = async () => {
        try {
            setLoginError('');
            const res = await fetch(`${API_BASE}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginForm)
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem('adminToken', data.token);
                setIsAuthenticated(true);
                await Promise.all([fetchProducts(), fetchBanner()]);
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            setLoginError('Identifiants incorrects');
            console.error(err);
        }
    };

    // 🔐 LOGOUT
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
        setProducts([]);
    };

    // FORM LOGIN (si pas connecté)
    if (!isAuthenticated) {
        return (
            <div className="admin-login-overlay">
                <div className="admin-login-form">
                    <h2>🔐 Connexion Admin</h2>
                    <p>admin@artdumonde.fr / admin123</p>

                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                            className="admin-input"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                            className="admin-input"
                        />
                    </div>

                    {loginError && <div className="error-message">{loginError}</div>}

                    <button onClick={handleLogin} className="btn-primary full-width">
                        Se connecter
                    </button>
                </div>
            </div>
        );
    }

    if (productLoading) return <div className="loading">Chargement produits...</div>;

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>🛍️ Art du Monde - Admin</h1>
                <div className="admin-actions">
                    <button className="admin-btn secondary" onClick={fetchBanner}>
                        🔄 Refresh Banner
                    </button>
                    <button className="admin-btn primary" onClick={() => setShowForm(true)}>
                        ➕ Nouveau Produit
                    </button>
                    <button className="admin-btn danger" onClick={handleLogout}>
                        🚪 Déconnexion
                    </button>
                </div>
            </div>

            {/* BANNER SECTION */}
            <div className="admin-section">
                <h2>🏠 Banner HomePage</h2>
                <div className="form-group">
                    <label>URL Image</label>
                    <input
                        type="url"
                        value={bannerData.imageSrc}
                        onChange={(e) => setBannerData({ ...bannerData, imageSrc: e.target.value })}
                        placeholder="https://picsum.photos/1200/400"
                        className="admin-input"
                    />
                </div>
                <div className="form-group">
                    <label>Texte principal</label>
                    <textarea
                        value={bannerData.text}
                        onChange={(e) => setBannerData({ ...bannerData, text: e.target.value })}
                        placeholder="Plongez dans la douceur balinaise..."
                        className="admin-textarea"
                        rows="3"
                    />
                </div>
                <div className="form-group">
                    <label>Bouton principal</label>
                    <div className="button-row">
                        <input
                            value={bannerData.buttons[0]?.label || ''}
                            onChange={(e) => {
                                const newButtons = [...bannerData.buttons];
                                newButtons[0] = { ...newButtons[0], label: e.target.value };
                                setBannerData({ ...bannerData, buttons: newButtons });
                            }}
                            placeholder="Femmes"
                            className="admin-input-small"
                        />
                        <input
                            value={bannerData.buttons[0]?.path || ''}
                            onChange={(e) => {
                                const newButtons = [...bannerData.buttons];
                                newButtons[0] = { ...newButtons[0], path: e.target.value };
                                setBannerData({ ...bannerData, buttons: newButtons });
                            }}
                            placeholder="/women"
                            className="admin-input-small"
                        />
                    </div>
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

            {/* FORM PRODUIT */}
            {showForm && (
                <div className="form-container">
                    <h2>{editingProduct ? '✏️ Modifier' : '➕ Ajouter'} Produit</h2>
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
                            placeholder="Catégorie (women/children)"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                        />
                        <div className="form-actions">
                            <button type="submit" className="btn-success">💾 Sauvegarder</button>
                            <button type="button" className="btn-secondary" onClick={resetForm}>
                                ❌ Annuler
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* LISTE PRODUITS */}
            <div className="products-section">
                <h2>📦 {products.length} Produits</h2>
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
        </div>
    );
};

export default AdminPage;