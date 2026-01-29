import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import WomenPage from './pages/WomenPage';
import ChildrenPage from './pages/ChildrenPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import AboutPage from './pages/AboutPage';
import MarketsPage from './pages/MarketsPage';
import LongDressPage from './pages/LongDressPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout commun pour TOUTES les pages (sauf login si tu veux) */}
        <Route path="/" element={<Layout />}> {/* Header + Footer partout */}
          <Route index element={<HomePage />} />  {/* / → HomePage */}
          <Route path="/products" element={<ProductsPage />} />
          {/* <Route path="/cart" element={<CartPage />} /> */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/women" element={<WomenPage />} />
          <Route path="/children" element={<ChildrenPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/account" element={<AccountPage />} /> */}
          {/* <Route path="/about" element={<AboutPage />} /> */}
          <Route path="/markets" element={<MarketsPage />} />
          {/* <Route path="/longdress" element={<LongDressPage />} /> */}
        </Route>

        {/* Login sans layout (optionnel) */}
        <Route path="login" element={<LoginPage />} />  {/* Sans layout */}
        <Route path="*" element={<Navigate to="/" />} />  {/* 404 → home */}
      </Routes>
    </Router>
  );
}

export default App;