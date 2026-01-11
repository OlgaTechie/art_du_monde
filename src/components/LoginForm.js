import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = ({ onLogin, setShowForgotPassword }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("client");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");

        if (!email) setEmailError("Veuillez entrer un email valide.");
        if (!password) setPasswordError("Veuillez entrer un mot de passe valide.");


        if (email && password) {
            if (email === "admin@email.com" && password === "admin123") {
                onLogin("admin");
                navigate("/admin");
            } else {
                onLogin("client");
                navigate("/account");
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