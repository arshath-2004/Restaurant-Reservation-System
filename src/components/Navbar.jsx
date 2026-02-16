import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/#menu' },
    { name: 'About', href: '/#about' },
    { name: 'Reservations', href: '/#reservations' },
    { name: 'Admin', href: '/admin' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          Gourmet <span className="heading-gold">Haven</span>
        </Link>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            link.href.startsWith('/#') ? (
              <a
                key={link.name}
                href={link.href}
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            )
          ))}
          <a href="/#reservations" className="btn-primary mobile-btn">Book Table</a>
        </div>

        <button className="hamburger" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 20px 0;
          transition: all 0.4s ease;
        }

        .navbar.scrolled {
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
          padding: 15px 0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text-color);
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .nav-links {
          display: flex;
          gap: 30px;
          align-items: center;
        }

        .nav-link {
          font-family: var(--font-body);
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 0;
          background-color: var(--primary-color);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: transparent;
        }

        .bar {
          width: 25px;
          height: 2px;
          background-color: var(--text-color);
          transition: all 0.3s ease;
        }

        .mobile-btn {
          display: none;
        }

        @media (max-width: 768px) {
          .hamburger {
            display: flex;
          }

          .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(10, 10, 10, 0.98);
            flex-direction: column;
            padding: 30px 0;
            height: 0;
            overflow: hidden;
            transition: height 0.4s ease;
          }

          .nav-links.active {
            height: 350px;
            border-bottom: 1px solid var(--glass-border);
          }

          .mobile-btn {
            display: inline-block;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
