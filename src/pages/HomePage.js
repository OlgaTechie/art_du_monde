import { useEffect, useState } from "react";
import { useCart } from '../hooks/useCart';
import Banner from "../components/Banner";
import "./HomePage.css";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch('http://localhost:5001/api/admin/public-products')
            .then(res => res.json())
            .then(setProducts)
            .catch(err => {
                console.error("Erreur:", err);
                setProducts([]);
            });
    }, []);

    return (
        <div>
            <Banner />

            <h2 className="products-title">Nos Produits</h2>

            <div className="products-grid">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="product-image"
                        />
                        <h3 className="product-title">{product.title}</h3>
                        <p className="product-price">{product.price} €</p>

                        {/* BOUTON AJOUTER AU PANIER */}
                        <button
                            className="add-to-cart-btn"
                            onClick={() => addToCart(product)}
                        >
                            ➕ Ajouter au panier
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;