import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="conditions">
                    <div className="footer-title">Conditions</div>
                    <Link to="/sellingConditions" className="footer-link">Conditions générales de vente</Link>
                    <Link to="/cookies" className="footer-link">Gestion de cookies</Link>
                </div>
                
                <div className="help-contact">
                    <div className="footer-title">Aide et contact</div>
                    <Link to="/cookies" className="footer-link">Contactez-nous</Link>
                    <Link to="/cookies" className="footer-link">Livraison</Link>
                </div>
            </div>
            
        </footer>
    );
};

export default Footer;