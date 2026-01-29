import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Heart, ShoppingCart } from 'react-feather';
import { useAuth } from '../hooks/useAuth';
import './Header.css';

const Header = () => {
    const { user, isAdmin } = useAuth();
    const location = useLocation(); // Pour active link

    // COMPTEUR PANIER DYNAMIQUE
    const [cartCount, setCartCount] = useState(0);

    // 🔥 ÉCoute localStorage (se met à jour partout !)
    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
            setCartCount(total);
        };

        updateCartCount();

        // 🔥 INTERVALLE 1 seconde (100% fiable)
        const interval = setInterval(updateCartCount, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    const handleAdminLogout = () => {
        localStorage.removeItem("adminToken");
        window.location.href = "/";
    };

    return (
        <header className="header">
            <div className="header-top">
                <nav className="nav-left">
                    <Link
                        to="/"
                        className={`nav-link home-link ${location.pathname === '/' ? 'active' : ''}`}
                    >
                        🏠 Acheter
                    </Link>
                    <Link
                        to="/about"
                        className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                    >
                        ℹ️ À propos
                    </Link>
                    <Link
                        to="/markets"
                        className={`nav-link ${location.pathname === '/markets' ? 'active' : ''}`}
                    >
                        🛒 Marchés
                    </Link>
                </nav>

                <div className="logo">
                    <Link to="/">
                        <img
                            src="/images/logo.png"
                            alt="Art du Monde Logo"
                            className="logo-image"
                        />
                    </Link>
                </div>

                <div className="icons">
                    {isAdmin && (
                        <button onClick={handleAdminLogout} className="admin-logout">
                            🚫 Admin
                        </button>
                    )}

                    {user ? (
                        <>
                            <span className="username">Bonjour, {user.name}</span>
                            <button onClick={handleLogout} className="logout-button">
                                Se déconnecter
                            </button>
                        </>
                    ) : !isAdmin ? (
                        <Link to="/login" className="login-link">
                            <User className="icon" />
                        </Link>
                    ) : null}

                    <Link to="/favorites" className="icon-link">
                        <Heart className="icon" />
                    </Link>

                    <Link to="/cart" className="cart-link">
                        <ShoppingCart className="icon" />
                        <span className="cart-badge">{cartCount}</span>
                    </Link>
                </div>
            </div>

            <div className="propositions">
                <Link
                    to="/women"
                    className={`proposition ${location.pathname === '/women' ? 'active' : ''}`}
                >
                    👗 Femmes
                </Link>
                <Link
                    to="/children"
                    className={`proposition ${location.pathname === '/children' ? 'active' : ''}`}
                >
                    👶 Enfants
                </Link>
                <Link
                    to="/bestsellers"
                    className={`proposition ${location.pathname === '/bestsellers' ? 'active' : ''}`}
                >
                    ⭐ Best Sellers
                </Link>

                {isAdmin && (
                    <Link
                        to="/admin"
                        className="proposition admin-link"
                    >
                        🔐 Admin
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;