import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import axios from "axios";
import "./HomePage.css";

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // API admin avec les 2 produits de test
        axios.get("http://localhost:5001/api/admin/products")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Erreur récupération produits :", error);
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