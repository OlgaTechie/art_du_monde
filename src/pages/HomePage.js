import React from "react";
import Banner from "../components/Banner";

const HomePage = () => {
    return (
        <div>
            <Banner 
                imageSrc="/images/banner_1.jpg"
                showText={true}
                text={
                    <>
                        Plongez dans la douceur de chaque tenue,<br />faite de viscose légère
                    </>
                }
                buttons={[
                    { label: "Femmes", path: "/women" },
                    { label: "Enfants", path: "/children" },
                ]}
            />
        </div>
    );
};

export default HomePage;