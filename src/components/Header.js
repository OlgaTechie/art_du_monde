import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Heart, ShoppingCart } from 'react-feather';
import './Header.css';

const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Vérifier si un utilisateur est connecté au chargement de la page
    useEffect(() => {
        const loggedUser = localStorage.getItem("user");
        if (loggedUser) {
            setUser(JSON.parse(loggedUser));
        }
    }, []);

    //Fonction pour déconnexion
    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <header className="header">
            <div className="header-top">
                <nav className="nav-left">
                    <Link to="/" className="nav-link home-link">Acheter</Link>
                    <Link to="/about" className="nav-link">À propos</Link>
                    <Link to="/markets" className="nav-link">Marchés</Link>
                </nav>

                <div className="logo">
                    <img src="/images/logo.png" alt="Art du Monde Logo" className="logo-image" />
                </div>

                <div className="icons">
                    {user ? (
                        <>
                            <span className="username">Bonjour, {user.name}</span>
                            <button onClick={handleLogout} className="logout-button">Se déconnecter</button>
                        </>
                    ) : (
                        <Link to="/login">
                            <User className="icon" />
                        </Link>
                    )}
                    <Heart className="icon" />
                    <ShoppingCart className="icon" />
                </div>
            </div>

            <div className="propositions">
                <Link to="/clothes" className="proposition">Vêtements</Link>
                <Link to="/accessories" className="proposition">Accessoires</Link>
                <Link to="/sarongs" className="proposition">Paréos</Link>
                <Link to="/bestsellers" className="proposition">Best Sellers</Link>
            </div>
        </header>
    );
};

export default Header;