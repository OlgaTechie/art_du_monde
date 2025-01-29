import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from './pages/HomePage';  // Importation par défaut
import AboutPage from './pages/AboutPage';
import MarketsPage from './pages/MarketsPage';
import WomenPage from './pages/WomenPage';
import ChildrenPage from './pages/ChildrenPage';
import LongDressPage from './pages/LongDressPage';
import CartPage from './pages/CartPage';
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/markets" element={<MarketsPage />} />
        <Route path="/women" element={<WomenPage />} />
        <Route path="/children" element={<ChildrenPage />} />
        <Route path="/longDress" element={<LongDressPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
