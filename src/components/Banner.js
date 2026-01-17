import { useNavigate } from "react-router-dom";
import "./Banner.css";

const Banner = ({ imageSrc, showText = true, text = "", buttons = [] }) => {
    const navigate = useNavigate();

    return (
        <div className="banner-container">
            <img
                src={imageSrc}
                alt="Banner"
                className="banner-image"
            />

            {showText && (
                <div className="banner-text">
                    <h1>{text}</h1>
                    <div className="banner-buttons">
                        {buttons.map((button, index) => (
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