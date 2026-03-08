import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { createOrder } from '../../../api/api';
import './WaiterMode.css';

const TABLES = [
  { id: 1, number: 1, capacity: 2, status: 'available' },
  { id: 2, number: 2, capacity: 4, status: 'occupied' },
  { id: 3, number: 3, capacity: 4, status: 'available' },
  { id: 4, number: 4, capacity: 6, status: 'reserved' },
  { id: 5, number: 5, capacity: 2, status: 'occupied' },
  { id: 6, number: 6, capacity: 8, status: 'available' },
  { id: 7, number: 7, capacity: 4, status: 'available' },
  { id: 8, number: 8, capacity: 6, status: 'occupied' },
  { id: 9, number: 9, capacity: 2, status: 'reserved' },
];

const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'fa-bowl-food' },
  { id: 'veg', label: 'Veg', icon: 'fa-leaf' },
  { id: 'nonveg', label: 'Non-Veg', icon: 'fa-fire' },
  { id: 'drinks', label: 'Drinks', icon: 'fa-mug-hot' },
  { id: 'specials', label: 'Specials', icon: 'fa-hat-chef' },
];

const MENU = [
  { id: 1, name: 'Classic Burger', category: 'nonveg', price: 15.0, image: 'https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?w=400' },
  { id: 2, name: 'Margherita Pizza', category: 'veg', price: 18.0, image: 'https://images.unsplash.com/photo-1588988949118-c86ba9c9c225?w=400' },
  { id: 3, name: 'Chicken Pasta', category: 'nonveg', price: 16.5, image: 'https://images.unsplash.com/photo-1676300184847-4ee4030409c0?w=400' },
  { id: 4, name: 'Caesar Salad', category: 'veg', price: 10.0, image: 'https://images.unsplash.com/photo-1677653805080-59c57727c84e?w=400' },
  { id: 5, name: 'Iced Latte', category: 'drinks', price: 5.0, image: 'https://images.unsplash.com/photo-1618263655794-f2e728e59521?w=400' },
  { id: 6, name: 'Grilled Steak', category: 'specials', price: 28.0, image: 'https://images.unsplash.com/photo-1712746785126-e9f28b5b3cc0?w=400' },
  { id: 7, name: 'Mango Smoothie', category: 'drinks', price: 6.5, image: 'https://images.unsplash.com/photo-1600718374662-0483d2b9da44?w=400' },
  { id: 8, name: 'Veg Tacos', category: 'veg', price: 12.0, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400' },
];

const STATUS_LABEL = { available: 'Available', occupied: 'Occupied', reserved: 'Reserved' };
const STATUS_ICON = { available: 'fa-circle-check', occupied: 'fa-circle-xmark', reserved: 'fa-clock' };

export default function WaiterMode() {
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState(null);
  const [activeCat, setActiveCat] = useState('all');
  const [cart, setCart] = useState({});
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const filtered = activeCat === 'all' ? MENU : MENU.filter((i) => i.category === activeCat);
  const cartEntries = Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ ...MENU.find((i) => i.id === +id), qty }));
  const subtotal = cartEntries.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  const cartCount = cartEntries.reduce((s, i) => s + i.qty, 0);

  const updateQty = (id, delta) => {
    setCart((prev) => {
      const next = (prev[id] || 0) + delta;
      if (next <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const handleTableSelect = (table) => {
    if (table.status === 'reserved') {
      toast.error('Table is reserved');
      return;
    }
    setSelectedTable(table);
    setCart({});
    setNotes('');
  };

  const handleSubmit = async () => {
    if (cartEntries.length === 0) { toast.error('Add items to order'); return; }
    setSubmitting(true);
    try {
      await createOrder({
        tableId: selectedTable.id,
        items: cartEntries.map((i) => ({ menuItemId: i.id, quantity: i.qty })),
        notes,
      });
      toast.success(`Order placed for Table ${selectedTable.number}!`);
      navigate('/admin/orders');
    } catch {
      toast.error('Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  if (!selectedTable) {
    const available = TABLES.filter((t) => t.status === 'available').length;
    const occupied = TABLES.filter((t) => t.status === 'occupied').length;
    const reserved = TABLES.filter((t) => t.status === 'reserved').length;

    return (
      <div className="waiter">
        <div className="waiter__select-screen">
          <div className="waiter__select-header">
            <div className="waiter__select-icon">
              <i className="fa-solid fa-clipboard-list"></i>
            </div>
            <div>
              <h1 className="waiter__select-title">Waiter Mode</h1>
              <p className="waiter__select-sub">Select a table to start taking order</p>
            </div>
          </div>

          <div className="waiter__table-stats">
            <div className="waiter__table-stat waiter__table-stat--available">
              <i className="fa-solid fa-circle-check"></i>
              <span>{available} Available</span>
            </div>
            <div className="waiter__table-stat waiter__table-stat--occupied">
              <i className="fa-solid fa-circle-xmark"></i>
              <span>{occupied} Occupied</span>
            </div>
            <div className="waiter__table-stat waiter__table-stat--reserved">
              <i className="fa-solid fa-clock"></i>
              <span>{reserved} Reserved</span>
            </div>
          </div>

          <div className="waiter__tables-grid">
            {TABLES.map((table) => (
              <button
                key={table.id}
                className={`waiter-table waiter-table--${table.status}`}
                onClick={() => handleTableSelect(table)}
              >
                <div className="waiter-table__number">T{table.number}</div>
                <i className={`fa-solid ${STATUS_ICON[table.status]} waiter-table__status-icon`}></i>
                <div className="waiter-table__capacity">
                  <i className="fa-solid fa-user-group"></i>
                  <span>{table.capacity} seats</span>
                </div>
                <div className="waiter-table__label">{STATUS_LABEL[table.status]}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="waiter">
      {/* Top bar */}
      <div className="waiter__topbar">
        <button className="waiter__back-btn" onClick={() => setSelectedTable(null)}>
          <i className="fa-solid fa-arrow-left"></i>
          Back to Tables
        </button>
        <div className="waiter__topbar-info">
          <i className="fa-solid fa-table-cells"></i>
          <span>Table {selectedTable.number}</span>
          <span className="waiter__topbar-cap">({selectedTable.capacity} seats)</span>
        </div>
        {cartCount > 0 && (
          <div className="waiter__topbar-badge">
            <i className="fa-solid fa-cart-shopping"></i>
            <span>{cartCount}</span>
          </div>
        )}
      </div>

      <div className="waiter__body">
        {/* Left: Menu */}
        <div className="waiter__menu-panel">
          {/* Category tabs */}
          <div className="waiter__cats">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`waiter__cat ${activeCat === cat.id ? 'waiter__cat--active' : ''}`}
                onClick={() => setActiveCat(cat.id)}
              >
                <i className={`fa-solid ${cat.icon}`}></i>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu grid */}
          <div className="waiter__menu-grid">
            {filtered.map((item) => (
              <div key={item.id} className="waiter-item">
                <div className="waiter-item__img-wrap">
                  <img src={item.image} alt={item.name} className="waiter-item__img" loading="lazy" />
                </div>
                <div className="waiter-item__body">
                  <h4 className="waiter-item__name">{item.name}</h4>
                  <div className="waiter-item__footer">
                    <span className="waiter-item__price">${item.price.toFixed(2)}</span>
                    {cart[item.id] ? (
                      <div className="waiter-item__qty-ctrl">
                        <button onClick={() => updateQty(item.id, -1)} className="waiter-item__qty-btn">
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <span className="waiter-item__qty-num">{cart[item.id]}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="waiter-item__qty-btn">
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                    ) : (
                      <button className="waiter-item__add-btn" onClick={() => updateQty(item.id, 1)}>
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Order summary */}
        <div className="waiter__order-panel">
          <div className="waiter__order-header">
            <i className="fa-solid fa-receipt"></i>
            <div>
              <h2 className="waiter__order-title">Order Summary</h2>
              <p className="waiter__order-sub">Table {selectedTable.number} • {cartCount} items</p>
            </div>
          </div>

          <div className="waiter__order-items">
            {cartEntries.length === 0 ? (
              <div className="waiter__order-empty">
                <i className="fa-solid fa-utensils"></i>
                <p>No items added yet</p>
                <span>Select from the menu on the left</span>
              </div>
            ) : (
              cartEntries.map((item) => (
                <div key={item.id} className="waiter-order-item">
                  <div className="waiter-order-item__qty">{item.qty}×</div>
                  <div className="waiter-order-item__info">
                    <span className="waiter-order-item__name">{item.name}</span>
                    <span className="waiter-order-item__unit">${item.price.toFixed(2)} each</span>
                  </div>
                  <span className="waiter-order-item__total">${(item.price * item.qty).toFixed(2)}</span>
                  <button className="waiter-order-item__remove" onClick={() => setCart((p) => { const { [item.id]: _, ...r } = p; return r; })}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Notes */}
          <div className="waiter__notes">
            <label className="waiter__notes-label">
              <i className="fa-solid fa-pen-to-square"></i> Special Instructions
            </label>
            <textarea
              className="waiter__notes-input"
              placeholder="Allergies, preferences, special requests..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Totals */}
          {cartEntries.length > 0 && (
            <div className="waiter__totals">
              <div className="waiter__total-row">
                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="waiter__total-row">
                <span>Tax (8%)</span><span>${tax.toFixed(2)}</span>
              </div>
              <div className="waiter__total-row waiter__total-row--grand">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          )}

          <button
            className="waiter__submit-btn"
            onClick={handleSubmit}
            disabled={submitting || cartEntries.length === 0}
          >
            {submitting ? (
              <><i className="fa-solid fa-spinner fa-spin"></i> Placing Order...</>
            ) : (
              <><i className="fa-solid fa-paper-plane"></i> Place Order</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
