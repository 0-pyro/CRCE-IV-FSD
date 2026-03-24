import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';

export function CartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);

    const handleQuantityChange = (id, quantity) => {
        if (quantity > 0) {
            dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
            dispatch({ type: 'CALCULATE_TOTAL' });
        }
    };

    const handleRemoveItem = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
        dispatch({ type: 'CALCULATE_TOTAL' });
    };

    const calculateTotal = () => {
        return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="page-container">
            <h1 style={{ color: '#0066cc', marginBottom: '24px', textShadow: '2px 2px 3px rgba(0,0,0,0.2)' }}>
                Shopping Cart
            </h1>

            {cart.items.length === 0 ? (
                <div className="box-2000s" style={{ textAlign: 'center', padding: '40px' }}>
                    <h2>Your cart is empty!</h2>
                    <p style={{ marginTop: '12px' }}>Add some awesome products to get started.</p>
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/products')}
                        style={{ marginTop: '16px' }}
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
                    <div className="box-2000s">
                        <h2 className="box-2000s-title">Cart Items</h2>
                        {cart.items.map((item) => (
                            <div key={item.id} style={{
                                display: 'grid',
                                gridTemplateColumns: '60px 1fr 80px 80px auto',
                                gap: '12px',
                                alignItems: 'center',
                                padding: '12px',
                                borderBottom: '1px solid #ddd',
                            }}>
                                <div style={{ fontSize: '24px' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                                </div>
                                <div>
                                    <h4 style={{ margin: '0 0 4px 0' }}>{item.name}</h4>
                                    {item.specialOffer ? (
                                        <div style={{ margin: 0, fontSize: '11px' }}>
                                            <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '6px' }}>${item.price.toFixed(2)}</span>
                                            <span style={{ color: '#d00', fontWeight: 'bold' }}>${(item.price * (1 - item.discount)).toFixed(2)}</span>
                                            <span style={{ color: '#d00', fontSize: '10px', marginLeft: '4px' }}>({Math.round(item.discount * 100)}% off)</span>
                                        </div>
                                    ) : (
                                        <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>${item.price.toFixed(2)}</p>
                                    )}
                                </div>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                    style={{ width: '60px' }}
                                />
                                <div style={{ textAlign: 'right' }}>
                                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                                </div>
                                <button
                                    className="btn-2000s"
                                    onClick={() => handleRemoveItem(item.id)}
                                    style={{ padding: '4px 8px', fontSize: '12px' }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="box-2000s" style={{ height: 'fit-content' }}>
                        <h2 className="box-2000s-title">Order Summary</h2>
                        <div style={{ padding: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span>Subtotal:</span>
                                <strong>${calculateTotal()}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span>Shipping:</span>
                                <strong className="price-tag" style={{ padding: '2px 6px' }}>FREE</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span>Tax:</span>
                                <strong>${(parseFloat(calculateTotal()) * 0.08).toFixed(2)}</strong>
                            </div>
                            <hr style={{ margin: '12px 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold' }}>
                                <span>Total:</span>
                                <strong style={{ color: '#cc0000' }}>
                                    ${(parseFloat(calculateTotal()) * 1.08).toFixed(2)}
                                </strong>
                            </div>
                            <button
                                className="btn-primary"
                                style={{ width: '100%', marginTop: '16px', padding: '12px' }}
                                onClick={() => navigate('/checkout')}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
