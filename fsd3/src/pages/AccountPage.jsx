import { useSelector } from 'react-redux';
import '../styles/pages.css';

export function AccountPage() {
    const user = useSelector(state => state.user);
    const orders = useSelector(state => state.orders.orders);

    return (
        <div className="page-container">
            <h1 style={{ color: '#0066cc', marginBottom: '24px', textShadow: '2px 2px 3px rgba(0,0,0,0.2)' }}>
                My Account
            </h1>

            {!user.isLoggedIn ? (
                <div className="box-2000s" style={{ maxWidth: '400px' }}>
                    <h2 className="box-2000s-title">Login to Your Account</h2>
                    <div style={{ padding: '16px' }}>
                        <div style={{ marginBottom: '12px' }}>
                            <label>Email:</label>
                            <input type="email" />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label>Password:</label>
                            <input type="password" />
                        </div>
                        <button className="btn-primary" style={{ width: '100%' }}>
                            Login
                        </button>
                        <p style={{ textAlign: 'center', marginTop: '12px', fontSize: '12px' }}>
                            New customer? <a href="#signup" style={{ color: '#0066cc', textDecoration: 'underline' }}>Sign up here</a>
                        </p>
                    </div>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="box-2000s">
                        <h2 className="box-2000s-title">Account Information</h2>
                        <div style={{ padding: '16px' }}>
                            <p><strong>Name:</strong> {user.user}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <button className="btn-primary" style={{ marginTop: '12px' }}>
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    <div className="box-2000s">
                        <h2 className="box-2000s-title">Quick Links</h2>
                        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <a href="#orders" className="sidebar-link">My Orders</a>
                            <a href="#wishlist" className="sidebar-link">My Wishlist</a>
                            <a href="#addresses" className="sidebar-link">Addresses</a>
                            <a href="#payments" className="sidebar-link">Payment Methods</a>
                            <a href="#settings" className="sidebar-link">Settings</a>
                        </div>
                    </div>
                </div>
            )}

            {user.isLoggedIn && (
                <div className="box-2000s" style={{ marginTop: '20px' }}>
                    <h2 className="box-2000s-title">Order History</h2>
                    {orders.length === 0 ? (
                        <div style={{ padding: '16px', textAlign: 'center' }}>
                            <p>No orders yet. <a href="/products" style={{ color: '#0066cc' }}>Start shopping</a></p>
                        </div>
                    ) : (
                        <div style={{ padding: '16px' }}>
                            {orders.map((order) => (
                                <div key={order.id} style={{ borderBottom: '1px solid #ddd', paddingBottom: '12px', marginBottom: '12px' }}>
                                    <p><strong>Order #{order.id}</strong> - {order.date}</p>
                                    <p>Items: {order.items.length} | Total: ${order.total}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
