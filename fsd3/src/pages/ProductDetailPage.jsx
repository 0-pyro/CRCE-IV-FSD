import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/pages.css';

export function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);

    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="page-container">
                <h1>Product Not Found</h1>
                <button className="btn-primary" onClick={() => navigate('/products')}>
                    Back to Products
                </button>
            </div>
        );
    }

    const handleAddToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        dispatch({ type: 'CALCULATE_TOTAL' });
    };

    return (
        <div className="page-container">
            <button className="btn-2000s" onClick={() => navigate('/products')} style={{ marginBottom: '16px' }}>
                ← Back to Products
            </button>

            <div className="product-detail">
                <div className="detail-image">
                    <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }} />
                </div>

                <div className="detail-info">
                    <h1>{product.name}</h1>

                    <div style={{ margin: '16px 0' }}>
                        <span className="product-category">{product.category}</span>
                    </div>

                    <div style={{ margin: '16px 0' }}>
                        <div className="rating" style={{ fontSize: '18px' }}>
                            {'★'.repeat(Math.floor(product.rating))} {product.rating}/5
                        </div>
                    </div>

                    {product.specialOffer ? (
                        <div style={{ margin: '16px 0' }}>
                            <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Original Price:</div>
                            <div style={{ fontSize: '18px', textDecoration: 'line-through', color: '#999', marginBottom: '8px' }}>
                                ${product.price.toFixed(2)}
                            </div>
                            <div style={{ fontSize: '12px', color: '#d00', fontWeight: 'bold', marginBottom: '4px' }}>
                                SPECIAL OFFER - SAVE {Math.round(product.discount * 100)}%
                            </div>
                            <div className="price-tag" style={{ fontSize: '24px', padding: '12px', backgroundColor: '#ffe7ce', border: '2px solid #f5b86f' }}>
                                ${(product.price * (1 - product.discount)).toFixed(2)}
                            </div>
                        </div>
                    ) : (
                        <div className="price-tag" style={{ fontSize: '24px', padding: '12px' }}>
                            ${product.price.toFixed(2)}
                        </div>
                    )}

                    <div style={{ margin: '24px 0' }} className="box-2000s">
                        <h3 style={{ marginBottom: '12px' }}>Product Description</h3>
                        <p>
                            This is a high-quality {product.name.toLowerCase()} perfect for your needs.
                            It features excellent durability and performance. Customer satisfaction is our priority!
                        </p>
                        <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
                            <li>Premium quality materials</li>
                            <li>Excellent customer reviews</li>
                            <li>30-day money back guarantee</li>
                            <li>Free shipping on orders $50+</li>
                        </ul>
                    </div>

                    <div style={{ margin: '24px 0' }}>
                        <h3 style={{ marginBottom: '12px' }}>Quantity:</h3>
                        <input
                            type="number"
                            min="1"
                            defaultValue="1"
                            style={{ width: '80px', padding: '6px' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '12px', margin: '24px 0' }}>
                        <button className="btn-primary" onClick={handleAddToCart} style={{ flex: 1, padding: '12px' }}>
                            Add to Shopping Cart
                        </button>
                        <button className="btn-2000s" style={{ padding: '12px' }}>
                            Save to Wishlist
                        </button>
                    </div>

                    <div className="box-2000s" style={{ marginTop: '24px' }}>
                        <h3 className="box-2000s-title">Security & Shipping</h3>
                        <p>Secure checkout</p>
                        <p>Fast shipping worldwide</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
