import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = ({ onLogin, setShowForgotPassword }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");

        if (!email) setEmailError("Veuillez entrer un email valide.");
        if (!password) setPasswordError("Veuillez entrer un mot de passe valide.");

        if (email && password) {
            try {
                // ✅ API REELLE backend
                const endpoint = email === "admin@artdumonde.fr" ?
                    "http://localhost:5001/api/admin/login" :
                    "http://localhost:5001/api/auth/login";

                const response = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (data.success || data.token) {
                    if (email === "admin@artdumonde.fr") {
                        localStorage.setItem("adminToken", data.token || "admin-token-123");
                        navigate("/admin/dashboard");
                    } else {
                        onLogin("client");
                        navigate("/account");
                    }
                } else {
                    setEmailError(data.message || "Identifiants incorrects");
                }
            } catch (error) {
                setEmailError("Erreur serveur");
            }
        }
    };

    return (
        <div className="login-form-container">
            <h2>Connexion</h2>

            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className="error-message">{emailError}</p>}
                </div>

                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && <p className="error-message">{passwordError}</p>}
                </div>

                <p className="forgot-password" onClick={() => setShowForgotPassword(true)}>
                    Mot de passe oublié ?
                </p>

                <div className="input-group">
                    <button type="submit">Se connecter</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;