import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = ({ setShowForgotPassword }) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handlePasswordReset = (e) => {
        e.preventDefault();
        if(email) {
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

            <p className="back-to-login" onClick={() =>setShowForgotPassword(false)}>
                Retour à la connexion
            </p>
        </div>
    );
};

export default ForgotPassword;