import React from 'react';

const About = () => {
    return (
        <section id="about" className="section-padding">
            <div className="container">
                <div className="about-content">
                    <div className="about-img-container">
                        <img
                            src="https://images.unsplash.com/photo-1550966871-3ed3c6227685?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                            alt="Restaurant Interior"
                            className="about-img"
                        />
                        <div className="img-overlay"></div>
                    </div>

                    <div className="about-text-content">
                        <h3 className="section-subtitle">Our Story</h3>
                        <h2 className="section-title">A Symphony of <span className="heading-gold">Flavors</span></h2>
                        <p className="about-desc">
                            Established in 1995, Gourmet Haven was born from a passion for exceptional cuisine and creating memories.
                            Our chefs meticulously select the finest locally-sourced ingredients to craft dishes that are not only
                            visually stunning but an explosion of taste.
                        </p>
                        <p className="about-desc">
                            We believe dining is an art form. From the moment you step through our doors, you are transported into
                            a world of elegance and culinary excellence.
                        </p>
                        <a href="#reservations" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
                            Read More
                        </a>
                    </div>
                </div>
            </div>

            <style>{`
        .about-content {
          display: flex;
          align-items: center;
          gap: 60px;
          flex-wrap: wrap;
        }

        .about-img-container {
          flex: 1;
          min-width: 300px;
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .about-img {
          width: 100%;
          display: block;
          transition: transform 0.5s ease;
        }

        .about-img-container:hover .about-img {
          transform: scale(1.05);
        }

        .about-text-content {
          flex: 1;
          min-width: 300px;
        }

        .about-desc {
          margin-bottom: 20px;
          color: #ccc;
          line-height: 1.8;
        }

        @media (max-width: 768px) {
          .about-content {
            flex-direction: column;
            gap: 40px;
          }
        }
      `}</style>
        </section>
    );
};

export default About;
