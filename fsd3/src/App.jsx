import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import './styles/theme.css';
import './styles/layout.css';
import './styles/pages.css';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';

function App() {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  const handleFilterChange = (filterType, value) => {
    dispatch({ type: 'SET_PRICE_RANGE', payload: value });
  };

  const handleCategoryChange = (category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  };

  return (
    <Router>
      <div className="app-container">
        <Header onSearch={handleSearch} />

        <Sidebar
          onFilterChange={handleFilterChange}
          onCategoryChange={handleCategoryChange}
        />

        <main>
          <Routes>
            <Route path="/" element={<HomePage filters={filters} />} />
            <Route path="/products" element={<ProductsPage filters={filters} />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
