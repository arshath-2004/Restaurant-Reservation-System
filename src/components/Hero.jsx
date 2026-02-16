import React from 'react';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="hero-content text-center">
                <h2 className="hero-subtitle">Welcome to MHD HEAVEN</h2>
                <h1 className="hero-title">Experience the <br /><span className="heading-gold">Taste of Functionality</span></h1>
                <p className="hero-text">
                    Where culinary art meets premium ambiance. Indulge in an unforgettable dining experience.
                </p>
                <div className="hero-btns">
                    <a href="#menu" className="btn-primary">View Menu</a>
                    <a href="#reservations" className="btn-outline">Book a Table</a>
                </div>
            </div>

            <style>{`
        .hero {
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)),
                      url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') center/cover no-repeat;
          margin-top: -80px; /* Offset navbar height */
          padding-top: 80px;
        }

        .hero-content {
          max-width: 800px;
          padding: 0 20px;
          animation: fadeInUp 1s ease-out;
        }

        .hero-subtitle {
          font-family: var(--font-body);
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 1rem;
          color: var(--text-muted);
        }

        .hero-title {
          font-size: 3.5rem;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .hero-text {
          font-size: 1.1rem;
          color: #ddd;
          margin-bottom: 2.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-btns {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .btn-outline {
          padding: 12px 30px;
          border: 1px solid var(--primary-color);
          color: var(--primary-color);
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s;
        }

        .btn-outline:hover {
          background-color: var(--primary-color);
          color: var(--background-color);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-btns {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>
        </section>
    );
};

export default Hero;
