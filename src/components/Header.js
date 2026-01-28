import { Link, useNavigate } from "react-router-dom";
import { User, Heart, ShoppingCart } from 'react-feather';
import { useAuth } from '../hooks/useAuth';  // ← NOUVEAU
import './Header.css';

const Header = () => {
    const { user, isAdmin } = useAuth();  // ← SIMPLE
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const handleAdminLogout = () => {
        localStorage.removeItem("adminToken");
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
                    {isAdmin && (
                        <button onClick={handleAdminLogout} className="admin-logout">
                            🚫 Admin
                        </button>
                    )}

                    {user ? (
                        <>
                            <span className="username">Bonjour, {user.name}</span>
                            <button onClick={handleLogout} className="logout-button">Se déconnecter</button>
                        </>
                    ) : !isAdmin ? (
                        <Link to="/login">
                            <User className="icon" />
                        </Link>
                    ) : null}

                    <Heart className="icon" />
                    <ShoppingCart className="icon" />
                </div>
            </div>

            <div className="propositions">
                <Link to="/women" className="proposition">Femmes</Link>
                <Link to="/children" className="proposition">Enfants</Link>
                <Link to="/bestsellers" className="proposition">Best Sellers</Link>

                {isAdmin && (
                    <Link to="/admin" className="proposition admin-link">🔐 Admin</Link>
                )}
            </div>
        </header>
    );
};

export default Header;