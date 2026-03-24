import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/layout.css';

export function Sidebar({ onFilterChange, onCategoryChange }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const shouts = useSelector(state => state.shout?.shouts || []);
    const products = useSelector(state => state.products?.products || []);
    const specialOfferProducts = products.filter(p => p.specialOffer) || [];
    const [priceRange, setPriceRange] = useState(500);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [shoutName, setShoutName] = useState('');
    const [shoutText, setShoutText] = useState('');

    const categories = ['All', 'Electronics', 'Office', 'Accessories', 'Furniture'];

    const handlePriceChange = (e) => {
        const value = parseInt(e.target.value);
        setPriceRange(value);
        onFilterChange('priceRange', [0, value]);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        onCategoryChange(category);
        navigate('/products');
    };

    return (
        <aside>
            <div className="sidebar-section">
                <div className="sidebar-title">Browse Categories</div>
                {categories.map((category) => (
                    <div
                        key={category}
                        className="sidebar-link"
                        onClick={() => handleCategoryChange(category)}
                        style={{
                            fontWeight: selectedCategory === category ? 'bold' : 'normal',
                            backgroundColor: selectedCategory === category ? '#e6f2ff' : 'transparent',
                        }}
                    >
                        {category}
                    </div>
                ))}
            </div>

            <div className="sidebar-section">
                <div className="sidebar-title">Price Range</div>
                <div style={{ padding: '8px' }}>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange}
                        onChange={handlePriceChange}
                        style={{ width: '100%' }}
                    />
                    <p style={{ marginTop: '8px', fontSize: '12px' }}>
                        Max: ${priceRange}
                    </p>
                </div>
            </div>

            <div className="sidebar-section">
                <div className="sidebar-title">Shoutbox</div>
                <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #cccccc',
                    padding: '8px',
                    borderRadius: '2px',
                    fontSize: '11px',
                    maxHeight: '150px',
                    overflowY: 'auto'
                }}>
                    {shouts.length === 0 ? (
                        <p>No shouts yet. Be the first!</p>
                    ) : (
                        shouts.map((shout) => (
                            <p key={shout.id}><strong>{shout.name}:</strong> {shout.text}</p>
                        ))
                    )}
                </div>
                <div style={{ marginTop: '8px' }}>
                    <input
                        type="text"
                        value={shoutName}
                        placeholder="Your name"
                        onChange={(e) => setShoutName(e.target.value)}
                        style={{ width: '100%', marginBottom: '4px', fontSize: '11px', padding: '4px' }}
                    />
                    <input
                        type="text"
                        value={shoutText}
                        placeholder="Write a shout"
                        onChange={(e) => setShoutText(e.target.value)}
                        style={{ width: '100%', marginBottom: '4px', fontSize: '11px', padding: '4px' }}
                    />
                    <button
                        className="btn-primary"
                        style={{ width: '100%', fontSize: '11px', padding: '6px' }}
                        onClick={() => {
                            if (!shoutText.trim()) return;
                            dispatch({ type: 'ADD_SHOUT', payload: { name: shoutName.trim() || 'Anonymous', text: shoutText.trim() } });
                            setShoutName('');
                            setShoutText('');
                        }}
                    >
                        Add Shout
                    </button>
                </div>
            </div>

            <div className="sidebar-section">
                <div className="sidebar-title">Special Offers</div>
                {specialOfferProducts.length > 0 ? (
                    <div>
                        {specialOfferProducts.map((product) => (
                            <div key={product.id} style={{ backgroundColor: '#ffe7ce', border: '1px solid #f5b86f', borderRadius: '4px', padding: '8px', marginBottom: '8px' }}>
                                <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>
                                    {product.name}
                                </div>
                                <div style={{ fontSize: '11px', color: '#333', marginBottom: '4px' }}>
                                    {product.description || 'Limited time special offer.'}
                                </div>
                                <div style={{ fontSize: '12px', marginBottom: '6px' }}>
                                    <span style={{ textDecoration: 'line-through', color: '#888', marginRight: '6px' }}>${product.price.toFixed(2)}</span>
                                    <span style={{ color: '#d00', fontWeight: 'bold' }}>${(product.price * (1 - (product.discount || 0))).toFixed(2)}</span>
                                </div>
                                <button
                                    className="btn-primary"
                                    style={{ width: '100%', fontSize: '11px', padding: '4px' }}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    View Offer
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ padding: '8px' }}>No special offers right now.</div>
                )}
            </div>
        </aside>
    );
}
