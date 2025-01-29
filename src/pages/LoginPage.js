import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("client");
    const [error, setError] = useState("");
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (role === "admin") {
            if (email === "admin@email.com" && password === "admin123") {
                onLogin("admin");
                navigate("/admin");
            } else {
                setError("Identifiants administrateur incorrects");
            }
        } else {
            if (email && password) {
                onLogin("client");
                navigate("/account");
            } else {
                setError("Veuillez entrer des identifiants valides !");
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Connexion</h2>

            {/* Sélecteur pour choisir entre Client et Admin */}
            <div className="login-role">
                <button className={role === "client" ? "active" : ""} onClick={() =>setRole("client")}>
                    Client
                </button>
                <button className={role === "admin" ? "active" : ""} onClick={() =>setRole("admin")}>
                    Administrateur
                </button>
            </div>

            {!showForgotPassword ? (
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Se connecter</button>

                    <p className="forgot-password" onClick={() => setShowForgotPassword(true)}>
                        Mot de passe oublié ?
                    </p>

                    {error && <p className="error-message">{error}</p>}
                </form>
            ) : (
                <ForgotPassword setShowForgotPassword={setShowForgotPassword} /> 
            )}
        </div>
    );
};

const ForgotPassword = ({ setShowForgotPassword }) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handlePasswordReset = (e) => {
        e.preventDefault();
        if (email) {
            setMessage("Un email de réinitialisation a été envoyé.");
        } else {
            setMessage("Veuillez entrer un email valide.");
        }
    };

    return (
        <div className="forgot-password-container">
            <h3>Réinitialisation du mot de passe</h3>
            <form onSubmit={handlePasswordReset}>
                <input
                    type="email"
                    placeholder="Entrez votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Envoyer</button>
            </form>
            {message && <p className="reset-message">{message}</p>}
            <p className="back-to-login" onClick={() => setShowForgotPassword(false)}>
                Retour à la connexion
            </p>
        </div>
    );
};

export default LoginPage;