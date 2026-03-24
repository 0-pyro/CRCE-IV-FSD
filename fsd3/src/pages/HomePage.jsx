import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/pages.css';

export function HomePage({ filters }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector(state => state.products.products);
    const cart = useSelector(state => state.cart);

    const handleAddToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        dispatch({ type: 'CALCULATE_TOTAL' });
    };

    // Featured products
    const featuredProducts = products.slice(0, 3);

    return (
        <div className="page-container">
            <div className="banner starburst">
                <h2>WELCOME TO NOSTALGIABAIT E-COMMERCE!</h2>
                <p>Your #1 Destination for Nostalgia-Driven Shopping!</p>
            </div>

            <div className="promotions-grid">
                <div className="promo-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/products')}>
                    <h3>HOT DEALS</h3>
                    <p className="badge-hot">SAVE 40%</p>
                    <p>On selected electronics this week!</p>
                </div>
                <div className="promo-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/products')}>
                    <h3>FREE SHIPPING</h3>
                    <p>On orders over $50</p>
                    <p style={{ fontSize: '12px', marginTop: '8px' }}>Use code: SHIP50</p>
                </div>
                <div className="promo-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/products')}>
                    <h3>NEW ARRIVALS</h3>
                    <p className="badge-new">NEW</p>
                    <p>Check out our latest products!</p>
                </div>
            </div>

            <div className="featured-section">
                <h2 style={{ marginBottom: '16px', textShadow: '2px 2px 3px rgba(0,0,0,0.2)' }}>
                    Featured Products
                </h2>
                <div className="products-grid">
                    {featuredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-image">
                                <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }} />
                            </div>
                            <h3>{product.name}</h3>
                            <p className="product-category">{product.category}</p>
                            <div className="rating">
                                {'★'.repeat(Math.floor(product.rating))} ({product.rating})
                            </div>
                            {product.specialOffer ? (
                                <div>
                                    <div style={{ fontSize: '11px', color: '#d00', fontWeight: 'bold', marginBottom: '4px' }}>
                                        SAVE {Math.round(product.discount * 100)}%
                                    </div>
                                    <div style={{ fontSize: '12px', textDecoration: 'line-through', color: '#999', marginBottom: '4px' }}>
                                        ${product.price.toFixed(2)}
                                    </div>
                                    <div className="price-tag" style={{ backgroundColor: '#ffe7ce', border: '1px solid #f5b86f' }}>
                                        ${(product.price * (1 - product.discount)).toFixed(2)}
                                    </div>
                                </div>
                            ) : (
                                <div className="price-tag">${product.price.toFixed(2)}</div>
                            )}
                            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                <Link to={`/product/${product.id}`} className="btn-2000s" style={{ flex: 1, textAlign: 'center' }}>
                                    View
                                </Link>
                                <button className="btn-primary" onClick={() => handleAddToCart(product)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="view-all-section">
                <Link to="/products" className="btn-primary">
                    👉 View All Products →
                </Link>
            </div>
        </div>
    );
}
