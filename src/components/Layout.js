import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';  // ton Header existant
import Footer from './Footer';  // ton Footer existant

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />  {/* Ici s'affichent tes pages */}
            </main>
            <Footer />
        </>
    );
};

export default Layout;