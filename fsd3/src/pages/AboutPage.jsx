import '../styles/pages.css';

export function AboutPage() {
    return (
        <div className="page-container">
            <h1 style={{ color: '#316ac5', marginBottom: '24px' }}>About NostalgiaBait E-Commerce</h1>

            <div className="box-2000s" style={{ marginBottom: '24px' }}>
                <h2 className="box-2000s-title">Our Mission</h2>
                <p>
                    At NostalgiaBait E-Commerce, we believe that great products deserve a nostalgic, retro shopping experience. 
                    We're dedicated to bringing back the charm of early 2000s e-commerce while delivering modern quality and service.
                </p>
                <p>
                    Our mission is to provide customers with authentic, high-quality products packaged in a delightfully vintage interface 
                    that celebrates the golden age of the internet.
                </p>
            </div>

            <div className="box-2000s" style={{ marginBottom: '24px' }}>
                <h2 className="box-2000s-title">Why Choose Us?</h2>
                <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                    <li>Authentic Windows XP Luna Blue design</li>
                    <li>Premium quality electronics and office supplies</li>
                    <li>Fast and reliable shipping</li>
                    <li>Exceptional customer support</li>
                    <li>Secure checkout and payment processing</li>
                    <li>Special offers and discounts on select items</li>
                    <li>Easy returns within 30 days</li>
                </ul>
            </div>

            <div className="box-2000s">
                <h2 className="box-2000s-title">Our Story</h2>
                <p>
                    Founded in the spirit of early 2000s nostalgia, NostalgiaBait E-Commerce combines the aesthetic charm of classic web design 
                    with the convenience of modern online shopping. We understand that sometimes you want to experience the internet as it was, 
                    and that's exactly what we deliver.
                </p>
                <p>
                    Every product, every feature, and every design choice celebrates the golden age of Windows XP and the early web. 
                    Join us on this trip down memory lane!
                </p>
            </div>
        </div>
    );
}
