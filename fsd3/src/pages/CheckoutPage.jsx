import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/pages.css';

export function CheckoutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckout = () => {
        if (Object.values(formData).some(v => v === '')) {
            alert('Please fill out all fields');
            return;
        }

        dispatch({
            type: 'ADD_ORDER',
            payload: {
                items: cart.items,
                total: cart.total,
                customer: formData,
            }
        });

        dispatch({ type: 'CLEAR_CART' });
        alert('Order placed successfully!');
        navigate('/');
    };

    const calculateTotal = () => {
        return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    };

    if (cart.items.length === 0) {
        return (
            <div className="page-container">
                <div className="box-2000s" style={{ textAlign: 'center', padding: '40px' }}>
                    <h2>No items in cart</h2>
                    <button
                        className="btn-primary"
                        onClick={() => navigate('/products')}
                        style={{ marginTop: '16px' }}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <h1 style={{ color: '#0066cc', marginBottom: '24px', textShadow: '2px 2px 3px rgba(0,0,0,0.2)' }}>
                Checkout
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                <div className="box-2000s">
                    <h2 className="box-2000s-title">Shipping Information</h2>
                    <div style={{ padding: '16px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                                <label>First Name:</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>Last Name:</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: '12px' }}>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div style={{ marginTop: '12px' }}>
                            <label>Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                            <div>
                                <label>City:</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>ZIP Code:</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <h2 className="box-2000s-title" style={{ marginTop: '24px' }}>Payment Information</h2>
                    <div style={{ padding: '16px' }}>
                        <label>Card Number:</label>
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                        />
                        <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                            Your payment information is secure and encrypted.
                        </p>
                    </div>
                </div>

                <div className="box-2000s" style={{ height: 'fit-content' }}>
                    <h2 className="box-2000s-title">Order Summary</h2>
                    <div style={{ padding: '12px' }}>
                        {cart.items.map((item) => (
                            <div key={item.id} style={{ marginBottom: '8px', fontSize: '12px' }}>
                                <div>{item.name} x{item.quantity}</div>
                                <div style={{ color: '#666' }}>${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        ))}
                        <hr style={{ margin: '12px 0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span>Subtotal:</span>
                            <strong>${calculateTotal()}</strong>
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
                            onClick={handleCheckout}
                        >
                            Complete Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
