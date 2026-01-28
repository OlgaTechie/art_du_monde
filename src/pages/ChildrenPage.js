import { useEffect, useState } from "react";
import axios from "axios";
import "./ChildrenPage.css";

const ChildrenPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5001/api/admin/public-products?category=children")
            .then(response => setProducts(response.data))
            .catch(error => {
                console.error("Erreur produits enfants:", error);
                setProducts([]);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="children-title">Chargement...</div>;
    }

    return (
        <div>
            <section className="children-hero">
                <h1 className="children-title">Collection Enfants</h1>
                <p className="children-subtitle">
                    Vêtements confortables en coton bio pour les petits
                </p>
            </section>

            <div className="products-grid">
                {products.length === 0 ? (
                    <p>Aucun produit enfant disponible pour le moment.</p>
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={product.imageUrl} alt={product.title} className="product-image" />
                            <h3 className="product-title">{product.title}</h3>
                            <p className="product-price">{product.price} €</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ChildrenPage;