import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import ProductForm from '../components/ProductForm';
import BannerManager from '../components/BannerManager';
import ProductList from '../components/ProductList';
import AdminHeader from '../components/AdminHeader';

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
        name: '',
        price: '',
        image: '',
        category: ''
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

        // ✅ SÉCURITÉ : Toujours des strings définies
        const name = (formData.name || '').trim();
        const category = (formData.category || '').trim();
        const priceValue = parseFloat(formData.price);

        // VALIDATION PLUS INTELLIGENTE
        if (!name) {
            alert('❌ Nom du produit requis !');
            return;
        }
        if (isNaN(priceValue) || priceValue <= 0) {
            alert('❌ Prix valide requis (> 0) !');
            return;
        }

        const productData = {
            title: name,
            price: priceValue,
            imageUrl: formData.image || '',
            category: category || 'women'  // ✅ Fallback par défaut
        };

        try {
            const endpoint = editingProduct
                ? `${API_BASE}/admin/products/${editingProduct._id}`
                : `${API_BASE}/admin/products`;

            const res = await fetch(endpoint, {
                method: editingProduct ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ADMIN_TOKEN}`
                },
                body: JSON.stringify(productData),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`HTTP ${res.status}: ${errorText}`);
            }

            await fetchProducts();
            resetForm();
            alert('✅ Produit sauvegardé !');
        } catch (err) {
            console.error('❌ Erreur:', err);
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

        const newFormData = {
            name: product.title || '',
            price: product.price ? product.price.toString() : '',
            image: product.imageUrl || '',
            category: product.category || ''
        };

        setEditingProduct(product);
        setFormData(newFormData);
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
            <AdminHeader
                onNewProduct={() => setShowForm(true)}
                onRefreshBanner={fetchBanner}
                onLogout={handleLogout}
                fetchBanner={fetchBanner}
            />

            {/* FORM BANNER */}
            <BannerManager
                bannerData={bannerData}
                setBannerData={setBannerData}
                bannerLoading={bannerLoading}
                API_BASE={API_BASE}
                ADMIN_TOKEN={ADMIN_TOKEN}
                fetchBanner={fetchBanner}
                saveBanner={saveBanner}
            />

            {/* FORM PRODUIT */}
            {showForm && (
                <ProductForm
                    formData={formData}
                    setFormData={setFormData}
                    editingProduct={editingProduct}
                    API_BASE={API_BASE}
                    ADMIN_TOKEN={ADMIN_TOKEN}
                    onCancel={resetForm}
                    onSubmit={handleSubmit}
                />
            )}

            {/* LISTE PRODUITS */}
            <ProductList
                products={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default AdminPage;