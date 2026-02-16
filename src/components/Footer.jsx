import React from 'react';

const Footer = () => {
    return (
        <footer id="contact" className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-logo">MHD <span className="heading-gold">HEAVEN</span></h3>
                        <p className="footer-text">
                            Experience the best dining with us. Perfect ambiance, exceptional food, and great company.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Contact Us</h4>
                        <p className="footer-text">123 Culinary Avenue, Food City, FC 90210</p>
                        <p className="footer-text">Phone: (555) 123-4567</p>
                        <p className="footer-text">Email: MHDHEAVEN@g.com</p>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Opening Hours</h4>
                        <p className="footer-text">Mon-Fri: 11:00 AM - 10:00 PM</p>
                        <p className="footer-text">Sat-Sun: 10:00 AM - 11:00 PM</p>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-heading">Newsletter</h4>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Your Email" className="footer-input" />
                            <button type="submit" className="btn-primary btn-sm">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom text-center">
                    <p>&copy; {new Date().getFullYear()} .MHD HEAVEN All rights reserved.</p>
                </div>
            </div>

            <style>{`
        .footer {
          background-color: #050505;
          padding: 80px 0 20px;
          border-top: 1px solid var(--glass-border);
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-bottom: 60px;
        }

        .footer-logo {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .footer-heading {
          font-family: var(--font-heading);
          color: var(--primary-color);
          margin-bottom: 20px;
          font-size: 1.2rem;
        }

        .footer-text {
          color: var(--text-muted);
          margin-bottom: 10px;
          font-size: 0.95rem;
        }

        .newsletter-form {
          display: flex;
          gap: 10px;
        }

        .footer-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
          padding: 10px;
          color: var(--text-color);
          flex: 1;
        }

        .btn-sm {
          padding: 10px 15px;
          font-size: 0.8rem;
        }

        .footer-bottom {
          padding-top: 20px;
          border-top: 1px solid var(--glass-border);
          color: var(--text-muted);
          font-size: 0.9rem;
        }
      `}</style>
        </footer>
    );
};

export default Footer;
