import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaHeart, FaShoppingCart } from 'react-icons/fa';
import './Header.css';

const Header = () => {
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
                    <FaUser className="icon" />
                    <FaHeart className="icon" />
                    <FaShoppingCart className="icon" />
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