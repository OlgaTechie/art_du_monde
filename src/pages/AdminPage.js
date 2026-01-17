import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newProduct, setNewProduct] = useState({
        title: "",
        price: "",
        imageUrl: "",
        category: "women"
    });
    const navigate = useNavigate();

    // Vérifier token admin
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/login");
            return;
        }
        fetchProducts();
    }, [navigate]);

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:5001/api/admin/products");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Erreur produits:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            // API POST (simulée pour l'instant)
            const fakeId = Date.now().toString();
            const productToAdd = { ...newProduct, _id: fakeId };
            setProducts([productToAdd, ...products]);
            setNewProduct({ title: "", price: "", imageUrl: "", category: "women" });
        } catch (error) {
            console.error("Erreur ajout:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer ce produit ?")) {
            setProducts(products.filter(p => p._id !== id));
        }
    };

    if (loading) return <div style={{ padding: "4rem", textAlign: "center", fontSize: "24px" }}>Chargement...</div>;

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>🎨 Admin Art du Monde</h1>
                <button
                    onClick={() => {
                        localStorage.removeItem("adminToken");
                        navigate("/login");
                    }}
                    className="logout-btn"
                >
                    Déconnexion
                </button>
            </header>

            {/* Ajout Produit */}
            <section className="admin-section">
                <h2>Ajouter un produit</h2>
                <form onSubmit={handleAddProduct} className="product-form">
                    <input
                        placeholder="Titre (ex: Robe viscose)"
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Prix (ex: 89)"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                        required
                    />
                    <input
                        placeholder="URL image"
                        value={newProduct.imageUrl}
                        onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                    />
                    <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    >
                        <option value="women">Femmes</option>
                        <option value="children">Enfants</option>
                    </select>
                    <button type="submit">✅ Ajouter produit</button>
                </form>
            </section>

            {/* Liste Produits */}
            <section className="admin-section">
                <h2>Produits ({products.length})</h2>
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product._id} className="product-card-admin">
                            <img src={product.imageUrl || "https://via.placeholder.com/300x200/E6CCB2/333?text=Image"} alt={product.title} />
                            <h3>{product.title}</h3>
                            <p className="price">{product.price}€</p>
                            <span className="category">{product.category}</span>
                            <button
                                onClick={() => handleDelete(product._id)}
                                className="delete-btn"
                            >
                                🗑️ Supprimer
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminPage;