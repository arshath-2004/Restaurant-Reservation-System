import React from 'react';

const menuItems = [
  {
    id: 1,
    name: 'Roasted Bone Marrow',
    price: '$24',
    description: 'Herbed sourdough, caper parsley salad, sea salt.',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Heirloom Tomato & Burrata',
    price: '$22',
    description: 'Creamy burrata, balsamic pearls, basil oil, pine nuts.',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1592417817098-8fd3dce5b027?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Beef Carpaccio',
    price: '$26',
    description: 'Thinly sliced wagyu beef, rocket, parmesan shavings, truffle oil.',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1513135557534-682d53ef7046?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Crispy Calamari',
    price: '$20',
    description: 'Togarashi spice, lime aioli, charred lemon.',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1599487488170-d119c367ed9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    name: 'Truffle Tagliatelle',
    price: '$38',
    description: 'Handmade pasta, fresh winter truffle, butter emulsion.',
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5855?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    name: 'Chilean Sea Bass',
    price: '$45',
    description: 'Miso glaze, baby bok choy, ginger soy reduction.',
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    name: 'Herb-Crusted Lamb',
    price: '$42',
    description: 'Pistachio crust, minted pea purée, red wine jus.',
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 8,
    name: 'Wagyu Ribeye',
    price: '$85',
    description: 'Miyazaki A5 Wagyu, smoked garlic butter, bone marrow jus.',
    category: 'Mains',
    image: 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 9,
    name: 'Pistachio Tiramisu',
    price: '$18',
    description: 'Espresso-soaked savoiardi, pistachio mascarpone.',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 10,
    name: 'Dark Chocolate Soufflé',
    price: '$22',
    description: '70% Valrhona chocolate, grand marnier crème anglaise.',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28be0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 11,
    name: 'Hibiscus Poached Pear',
    price: '$16',
    description: 'Spiced red wine, vanilla bean mascarpone, honeycomb.',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 12,
    name: 'Gold Leaf Crème Brûlée',
    price: '$24',
    description: 'Madagascan vanilla, edible 24k gold leaf, berry compote.',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1501959181532-7d2a3c064642?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const categories = ['All', 'Starters', 'Mains', 'Desserts'];

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);
  return (
    <section id="menu" className="section-padding">
      <div className="container">
        <div className="text-center mb-50">
          <h3 className="section-subtitle">Discover</h3>
          <h2 className="section-title">Our <span className="heading-gold">Menu</span></h2>
          <p className="section-text">Culinary masterpieces crafted with passion and precision.</p>
        </div>

        <div className="category-filter text-center mb-50">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="menu-card glass">
              <div className="card-img-container">
                <img src={item.image} alt={item.name} className="card-img" />
                <div className="card-overlay">
                  <span className="category-tag">{item.category}</span>
                </div>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <h3 className="card-title">{item.name}</h3>
                  <span className="card-price heading-gold">{item.price}</span>
                </div>
                <p className="card-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .mb-50 {
          margin-bottom: 50px;
        }

        .category-filter {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .filter-btn {
          background: transparent;
          color: var(--text-muted);
          border: 1px solid var(--glass-border);
          padding: 8px 25px;
          border-radius: 30px;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }

        .filter-btn:hover, .filter-btn.active {
          border-color: var(--primary-color);
          color: var(--primary-color);
          background: rgba(212, 175, 55, 0.05);
        }

        .section-subtitle {
          font-family: var(--font-body);
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--primary-color);
          margin-bottom: 10px;
        }

        .section-title {
          font-size: 3.5rem;
          margin-bottom: 15px;
        }

        .section-text {
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 auto;
          font-size: 1.1rem;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 40px;
        }

        .menu-card {
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid var(--glass-border);
        }

        .menu-card:hover {
          transform: translateY(-15px);
          border-color: rgba(224, 179, 34, 0.4);
          box-shadow: 0 30px 60px rgba(0,0,0,0.8);
        }

        .card-img-container {
          height: 240px;
          overflow: hidden;
          position: relative;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
        }

        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.8));
          display: flex;
          align-items: flex-end;
          padding: 20px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .menu-card:hover .card-overlay {
          opacity: 1;
        }

        .menu-card:hover .card-img {
          transform: scale(1.15);
        }

        .card-content {
          padding: 30px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .card-title {
          font-size: 1.4rem;
          margin-bottom: 0;
          color: var(--text-color);
          font-weight: 600;
        }

        .card-price {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
        }

        .card-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 0;
          height: 2.8em;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .category-tag {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #fff;
          background: rgba(224, 179, 34, 0.8);
          padding: 4px 12px;
          border-radius: 4px;
          backdrop-filter: blur(5px);
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2.5rem;
          }
          .menu-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Menu;
