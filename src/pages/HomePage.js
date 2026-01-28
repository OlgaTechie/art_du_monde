import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import api from "../services/api"; // utilise ton api.js
import "./HomePage.css";

const HomePage = () => {
    const [products, setProducts] = useState([]);

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
            <Banner
                imageSrc="/images/banner_1.jpg"
                showText={true}
                text={
                    <>
                        Plongez dans la douceur de chaque tenue,<br />faite de viscose légère
                    </>
                }
                buttons={[
                    { label: "Femmes", path: "/women" },
                    { label: "Enfants", path: "/children" },
                    { label: "Admin", path: "/admin" } // <-- bouton admin corrigé
                ]}
            />

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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;