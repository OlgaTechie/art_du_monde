import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './ProductsPage.css';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get("/products")
            .then(res => setProducts(res.data))
            .catch(err => {
                console.error("Erreur récupération produits :", err);
                setProducts([]);
            });
    }, []);

    return (
        <div>
            <h2>Nos Produits</h2>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={product.imageUrl} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>{product.price} €</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;