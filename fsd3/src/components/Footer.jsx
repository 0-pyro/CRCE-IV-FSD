import '../styles/layout.css';

export function Footer() {
    return (
        <footer>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '16px' }}>
                <div>
                    <h4>Customer Service</h4>
                    <a href="#help">Help Center</a><br />
                    <a href="#returns">Returns</a><br />
                    <a href="#shipping">Shipping Info</a>
                </div>
                <div>
                    <h4>Company</h4>
                    <a href="#about">About Us</a><br />
                    <a href="#careers">Careers</a><br />
                    <a href="#contact">Contact</a>
                </div>
                <div>
                    <h4>Legal</h4>
                    <a href="#privacy">Privacy Policy</a><br />
                    <a href="#terms">Terms of Service</a><br />
                    <a href="#cookies">Cookies</a>
                </div>
            </div>
            <hr style={{ borderColor: 'rgba(255, 255, 255, 0.3)', margin: '12px 0' }} />
            <p>&copy; 2024 NostalgiaBait E-Commerce. All rights reserved. | Nostalgic Shopping Experience</p>
        </footer>
    );
}
