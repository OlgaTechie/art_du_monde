import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';  // Importation par défaut
import AboutPage from './pages/AboutPage';
import MarketsPage from './pages/MarketsPage';
import WomenPage from './pages/WomenPage';
import ChildrenPage from './pages/ChildrenPage';
import LongDressPage from './pages/LongDressPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/markets" element={<MarketsPage />} />
        <Route path="/women" element={<WomenPage />} />
        <Route path="/children" element={<ChildrenPage />} />
        <Route path="/longDress" element={<LongDressPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
