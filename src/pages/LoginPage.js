import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import ForgotPassword from "../components/ForgotPassword";
import "./LoginPage.css";

const LoginPage = ({ onLogin }) => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    return (
        <div className="login-container">
            {showForgotPassword ? (
                <ForgotPassword setShowForgotPassword={setShowForgotPassword} />
            ) : (
                <LoginForm onLogin={onLogin} setShowForgotPassword={setShowForgotPassword} />            
            )}
        </div>
    ); 
};

export default LoginPage;