import { useState } from 'react';
import { Link } from 'react-router';
import { toast } from 'sonner';
import './KioskMode.css';

const CATEGORIES = [
  { id: 'all', name: 'All Items', icon: 'fa-bowl-food', color: '#3b82f6' },
  { id: 'veg', name: 'Vegetarian', icon: 'fa-leaf', color: '#10b981' },
  { id: 'nonveg', name: 'Non-Veg', icon: 'fa-fire', color: '#ef4444' },
  { id: 'drinks', name: 'Drinks', icon: 'fa-mug-hot', color: '#8b5cf6' },
  { id: 'specials', name: 'Chef Specials', icon: 'fa-hat-chef', color: '#f97316' },
];

const MENU = [
  { id: 1, name: 'Classic Burger', category: 'nonveg', price: 15.0, image: 'https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?w=600' },
  { id: 2, name: 'Margherita Pizza', category: 'veg', price: 18.0, image: 'https://images.unsplash.com/photo-1588988949118-c86ba9c9c225?w=600' },
  { id: 3, name: 'Chicken Pasta', category: 'nonveg', price: 16.5, image: 'https://images.unsplash.com/photo-1676300184847-4ee4030409c0?w=600' },
  { id: 4, name: 'Caesar Salad', category: 'veg', price: 10.0, image: 'https://images.unsplash.com/photo-1677653805080-59c57727c84e?w=600' },
  { id: 5, name: 'Iced Latte', category: 'drinks', price: 5.0, image: 'https://images.unsplash.com/photo-1618263655794-f2e728e59521?w=600' },
  { id: 6, name: 'Grilled Steak', category: 'specials', price: 28.0, image: 'https://images.unsplash.com/photo-1712746785126-e9f28b5b3cc0?w=600' },
];

export default function KioskMode() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState({});

  const addToCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    toast.success('Item added!', { duration: 1000 });
  };

  const filteredItems = selectedCategory === 'all' ? MENU : MENU.filter((i) => i.category === selectedCategory);
  const cartItems = Object.entries(cart).map(([id, qty]) => ({ ...MENU.find((i) => i.id === +id), quantity: qty }));
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartCount = Object.values(cart).reduce((s, q) => s + q, 0);

  return (
    <div className="kiosk">
      {/* Header */}
      <header className="kiosk-header">
        <div className="kiosk-header__inner">
          <div>
            <h1 className="kiosk-header__title">Welcome to OrderGara</h1>
            <p className="kiosk-header__sub">Touch to order • Quick &amp; Easy</p>
          </div>
          <select className="kiosk-lang" defaultValue="English" onChange={(e) => toast.success(`Language: ${e.target.value}`)}>
            <option>English</option>
            <option>Español</option>
            <option>中文</option>
          </select>
        </div>
      </header>

      <div className="kiosk-body">
        {/* Left: Categories + Menu */}
        <div className="kiosk-left">
          {/* Categories */}
          <div className="kiosk-cats">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`kiosk-cat ${selectedCategory === cat.id ? 'kiosk-cat--active' : ''}`}
                style={{ '--cat-color': cat.color }}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <i className={`fa-solid ${cat.icon}`}></i>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Menu grid */}
          <div className="kiosk-menu-grid">
            {filteredItems.map((item) => (
              <button key={item.id} className="kiosk-item" onClick={() => addToCart(item.id)}>
                <div className="kiosk-item__image-wrap">
                  <img src={item.image} alt={item.name} className="kiosk-item__image" loading="lazy" />
                  {cart[item.id] && (
                    <div className="kiosk-item__qty">{cart[item.id]}</div>
                  )}
                </div>
                <div className="kiosk-item__body">
                  <h3 className="kiosk-item__name">{item.name}</h3>
                  <div className="kiosk-item__footer">
                    <span className="kiosk-item__price">${item.price.toFixed(2)}</span>
                    <i className="fa-solid fa-plus kiosk-item__plus"></i>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Cart */}
        <div className="kiosk-cart">
          <div className="kiosk-cart__header">
            <div className="kiosk-cart__header-icon">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <div>
              <h2 className="kiosk-cart__title">Your Order</h2>
              <p className="kiosk-cart__count">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
            </div>
          </div>

          <div className="kiosk-cart__items">
            {cartItems.length === 0 ? (
              <div className="kiosk-cart__empty">
                <i className="fa-solid fa-cart-shopping"></i>
                <p>Tap items to add to cart</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="kiosk-cart-item">
                  <img src={item.image} alt={item.name} className="kiosk-cart-item__img" loading="lazy" />
                  <div className="kiosk-cart-item__info">
                    <h3 className="kiosk-cart-item__name">{item.name}</h3>
                    <p className="kiosk-cart-item__unit">${item.price.toFixed(2)} × {item.quantity}</p>
                  </div>
                  <span className="kiosk-cart-item__total">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="kiosk-cart__footer">
              <div className="kiosk-cart__summary">
                <div className="kiosk-cart__row">
                  <span>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="kiosk-cart__row">
                  <span>Tax (8%)</span><span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="kiosk-cart__total-row">
                  <span>Total</span><span>${(cartTotal * 1.08).toFixed(2)}</span>
                </div>
              </div>
              <Link to="/payment" className="kiosk-pay-btn">
                Proceed to Payment
              </Link>
              <button className="kiosk-clear-btn" onClick={() => { setCart({}); toast.error('Cart cleared'); }}>
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
