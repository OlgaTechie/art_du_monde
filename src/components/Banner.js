import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Banner.css";

const Banner = ({ imageSrc, showText = true, text = "", buttons = [] }) => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Si pas de props → charge API
        if (!imageSrc && !text && buttons.length === 0) {
            fetch("http://localhost:5001/api/public-banner")
                .then(res => res.json())
                .then(data => {
                    setData(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Erreur banner:", err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [imageSrc, text, buttons.length]);

    const finalImage = imageSrc || data?.imageSrc;
    const finalText = text || data?.text;
    const finalButtons = buttons.length > 0 ? buttons : (data?.buttons || []);

    if (loading) return <div className="banner-container"><p>Chargement...</p></div>;

    return (
        <div className="banner-container">
            {finalImage && (
                <img src={finalImage} alt="Banner" className="banner-image" />
            )}
            {showText && finalText && (
                <div className="banner-text">
                    <h1>{finalText}</h1>
                    <div className="banner-buttons">
                        {finalButtons.map((button, index) => (
                            <button
                                key={index}
                                className="banner-button"
                                onClick={() => navigate(button.path)}
                            >
                                {button.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Banner;