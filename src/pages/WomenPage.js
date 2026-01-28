import { useEffect, useState } from "react";
import axios from "axios";
import "./WomenPage.css";

const WomenPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5001/api/admin/public-products?category=women")
            .then(response => setProducts(response.data))
            .catch(error => {
                console.error("Erreur produits femmes:", error);
                setProducts([]);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="products-title">Chargement...</div>;
    }

    return (
        <div>
            <section className="women-hero">
                <h1 className="women-title">Collection Femmes</h1>
                <p className="women-subtitle">
                    Vêtements en viscose légère et élégante pour toutes les occasions
                </p>
            </section>

            <div className="products-grid">
                {products.length === 0 ? (
                    <p>Aucun produit femme disponible pour le moment.</p>
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

export default WomenPage;