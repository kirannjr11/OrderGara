import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { toast } from 'sonner';
import './QROrdering.css';

const MENU_ITEMS = [
  { id: 1, name: 'Classic Burger', category: 'Non-Veg', price: 15.0, image: 'https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?w=400', description: 'Juicy beef patty with fresh vegetables' },
  { id: 2, name: 'Margherita Pizza', category: 'Veg', price: 18.0, image: 'https://images.unsplash.com/photo-1588988949118-c86ba9c9c225?w=400', description: 'Classic pizza with fresh mozzarella' },
  { id: 3, name: 'Chicken Pasta', category: 'Non-Veg', price: 16.5, image: 'https://images.unsplash.com/photo-1676300184847-4ee4030409c0?w=400', description: 'Creamy pasta with grilled chicken' },
  { id: 4, name: 'Caesar Salad', category: 'Veg', price: 10.0, image: 'https://images.unsplash.com/photo-1677653805080-59c57727c84e?w=400', description: 'Fresh salad with Caesar dressing' },
  { id: 5, name: 'Iced Latte', category: 'Drinks', price: 5.0, image: 'https://images.unsplash.com/photo-1618263655794-f2e728e59521?w=400', description: 'Smooth coffee with ice' },
  { id: 6, name: 'Grilled Steak', category: 'Specials', price: 28.0, image: 'https://images.unsplash.com/photo-1712746785126-e9f28b5b3cc0?w=400', description: 'Premium steak with sides' },
];

const CATEGORIES = ['All', 'Veg', 'Non-Veg', 'Drinks', 'Specials'];
const CATEGORY_BADGE = { Veg: 'badge--veg', 'Non-Veg': 'badge--nonveg', Drinks: 'badge--drinks', Specials: 'badge--specials' };
const CAT_ICON = { Veg: 'fa-leaf', 'Non-Veg': 'fa-fire', Drinks: 'fa-mug-hot' };

export default function QROrdering() {
  const { tableId } = useParams();
  const [cart, setCart] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);

  const addToCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    toast.success('Added to cart');
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) next[id]--;
      else delete next[id];
      return next;
    });
  };

  const filtered = MENU_ITEMS.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const cartItems = Object.entries(cart).map(([id, qty]) => ({ ...MENU_ITEMS.find((i) => i.id === +id), quantity: qty }));
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartCount = Object.values(cart).reduce((s, q) => s + q, 0);

  return (
    <div className="qr-ordering">
      {/* Header */}
      <header className="qr-header">
        <div className="qr-header__inner">
          <div className="qr-header__top">
            <div>
              <h1 className="qr-header__title">OrderGara</h1>
              <p className="qr-header__sub">Table {tableId || '1'} • Order Online</p>
            </div>
            <button className="qr-cart-btn" onClick={() => setShowCart(true)}>
              <i className="fa-solid fa-cart-shopping"></i>
              {cartCount > 0 && <span className="qr-cart-btn__badge">{cartCount}</span>}
            </button>
          </div>

          {/* Search */}
          <div className="search-box" style={{ marginBottom: '0.75rem' }}>
            <i className="fa-solid fa-magnifying-glass search-box__icon"></i>
            <input type="text" className="search-box__input" placeholder="Search menu..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          {/* Category filter */}
          <div className="qr-cats scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`qr-cat-pill ${selectedCategory === cat ? 'qr-cat-pill--active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {CAT_ICON[cat] && <i className={`fa-solid ${CAT_ICON[cat]}`}></i>}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Menu grid */}
      <main className="qr-main">
        <div className="qr-menu-grid">
          {filtered.map((item) => (
            <div key={item.id} className="qr-item-card">
              <div className="qr-item-card__image-wrap">
                <img src={item.image} alt={item.name} className="qr-item-card__image" loading="lazy" />
                <span className={`badge qr-item-card__cat-badge ${CATEGORY_BADGE[item.category] || ''}`}>
                  {item.category}
                </span>
              </div>
              <div className="qr-item-card__body">
                <h3 className="qr-item-card__name">{item.name}</h3>
                <p className="qr-item-card__desc">{item.description}</p>
                <div className="qr-item-card__footer">
                  <span className="qr-item-card__price">${item.price.toFixed(2)}</span>
                  {cart[item.id] ? (
                    <div className="qty-control">
                      <button className="qty-control__btn" onClick={() => removeFromCart(item.id)}><i className="fa-solid fa-minus"></i></button>
                      <span className="qty-control__num">{cart[item.id]}</span>
                      <button className="qty-control__btn" onClick={() => addToCart(item.id)}><i className="fa-solid fa-plus"></i></button>
                    </div>
                  ) : (
                    <button className="btn btn--primary btn--sm" onClick={() => addToCart(item.id)}>
                      <i className="fa-solid fa-plus"></i> Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      {showCart && (
        <>
          <div className="overlay" onClick={() => setShowCart(false)} />
          <div className="qr-cart">
            <div className="qr-cart__header">
              <h2 className="qr-cart__title">Your Cart</h2>
              <button className="icon-btn" onClick={() => setShowCart(false)}><i className="fa-solid fa-xmark"></i></button>
            </div>

            <div className="qr-cart__items">
              {cartItems.length === 0 ? (
                <div className="qr-cart__empty">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="qr-cart-item">
                    <img src={item.image} alt={item.name} className="qr-cart-item__img" loading="lazy" />
                    <div className="qr-cart-item__info">
                      <h3 className="qr-cart-item__name">{item.name}</h3>
                      <p className="qr-cart-item__unit">${item.price.toFixed(2)} each</p>
                      <div className="qty-control qty-control--sm">
                        <button className="qty-control__btn" onClick={() => removeFromCart(item.id)}><i className="fa-solid fa-minus"></i></button>
                        <span className="qty-control__num">{item.quantity}</span>
                        <button className="qty-control__btn" onClick={() => addToCart(item.id)}><i className="fa-solid fa-plus"></i></button>
                      </div>
                    </div>
                    <span className="qr-cart-item__total">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="qr-cart__footer">
                <div className="qr-cart__total">
                  <span>Total</span>
                  <span className="qr-cart__total-value">${cartTotal.toFixed(2)}</span>
                </div>
                <Link
                  to="/payment"
                  className="btn btn--primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '0.875rem' }}
                  onClick={() => setShowCart(false)}
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
