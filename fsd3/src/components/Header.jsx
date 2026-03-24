import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/layout.css';

export function Header({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const cart = useSelector(state => state.cart);
    const navigate = useNavigate();

    const handleSearch = () => {
        onSearch(searchTerm);
        navigate('/products');
    };

    return (
        <header>
            <h1>NostalgiaBait E-Commerce</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="/cart">Cart ({cart.items.length})</Link>
                <Link to="/account">Account</Link>
            </nav>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button onClick={handleSearch} className="btn-primary">Search</button>
            </div>
        </header>
    );
}
