import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import axios from "axios";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        // Appel au backend pour récupérer les produits
        axios.get("http://localhost:5001/api/products")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Erreur récupération produits :", error);
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

            <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Nos Produits</h2>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", margin: "2rem" }}>
                {products.map((product) => (
                    <div key={product._id} style={{ border: "1px solid #ddd", padding: "1rem", width: "200px" }}>
                        <img src={product.imageUrl} alt={product.title} style={{ width: "100%", height: "auto"}} />
                        <h3>{product.title}</h3>
                        <p>{product.price} €</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;