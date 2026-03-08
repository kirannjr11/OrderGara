import { useState } from 'react';
import { toast } from 'sonner';
import './MenuManagement.css';

const MENU_ITEMS = [
  { id: 1, name: 'Classic Burger', category: 'Non-Veg', price: 15.0, discountPrice: null, image: 'https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?w=400', available: true, stock: 'In Stock' },
  { id: 2, name: 'Margherita Pizza', category: 'Veg', price: 18.0, discountPrice: 15.0, image: 'https://images.unsplash.com/photo-1588988949118-c86ba9c9c225?w=400', available: true, stock: 'In Stock' },
  { id: 3, name: 'Chicken Pasta', category: 'Non-Veg', price: 16.5, discountPrice: null, image: 'https://images.unsplash.com/photo-1676300184847-4ee4030409c0?w=400', available: true, stock: 'In Stock' },
  { id: 4, name: 'Caesar Salad', category: 'Veg', price: 10.0, discountPrice: null, image: 'https://images.unsplash.com/photo-1677653805080-59c57727c84e?w=400', available: false, stock: 'Out of Stock' },
  { id: 5, name: 'Iced Latte', category: 'Drinks', price: 5.0, discountPrice: 4.5, image: 'https://images.unsplash.com/photo-1618263655794-f2e728e59521?w=400', available: true, stock: 'In Stock' },
  { id: 6, name: 'Grilled Steak', category: 'Specials', price: 28.0, discountPrice: null, image: 'https://images.unsplash.com/photo-1712746785126-e9f28b5b3cc0?w=400', available: true, stock: 'In Stock' },
];

const CATEGORIES = ['All', 'Veg', 'Non-Veg', 'Drinks', 'Specials'];

const CATEGORY_BADGE = {
  Veg: 'badge--veg',
  'Non-Veg': 'badge--nonveg',
  Drinks: 'badge--drinks',
  Specials: 'badge--specials',
};

export default function MenuManagement() {
  const [items, setItems] = useState(MENU_ITEMS);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = items.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const toggleAvailability = (id) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, available: !i.available } : i));
    toast.info('Availability updated');
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.error('Item removed');
  };

  return (
    <div className="menu-mgmt">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-header__title">Menu Management</h2>
          <p className="page-header__subtitle">Manage your restaurant menu items</p>
        </div>
        <button className="btn btn--primary" onClick={() => toast.success('Add item dialog — connect to API')}>
          <i className="fa-solid fa-plus"></i> Add Item
        </button>
      </div>

      {/* Filters */}
      <div className="menu-mgmt__filters">
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass search-box__icon"></i>
          <input
            type="text"
            className="search-box__input"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-pills scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${selectedCategory === cat ? 'filter-pill--active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="view-toggle">
          <button
            className={`view-toggle__btn ${viewMode === 'grid' ? 'view-toggle__btn--active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <i className="fa-solid fa-grip"></i>
          </button>
          <button
            className={`view-toggle__btn ${viewMode === 'table' ? 'view-toggle__btn--active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            <i className="fa-solid fa-list"></i>
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="menu-grid">
          {filtered.map((item) => (
            <div key={item.id} className={`menu-card ${!item.available ? 'menu-card--unavailable' : ''}`}>
              <div className="menu-card__image-wrap">
                <img src={item.image} alt={item.name} className="menu-card__image" loading="lazy" />
                {item.discountPrice && (
                  <span className="menu-card__sale-badge">Sale</span>
                )}
                {!item.available && (
                  <div className="menu-card__unavailable-overlay">
                    <span>Unavailable</span>
                  </div>
                )}
              </div>
              <div className="menu-card__body">
                <div className="menu-card__top">
                  <div>
                    <h3 className="menu-card__name">{item.name}</h3>
                    <span className={`badge ${CATEGORY_BADGE[item.category] || 'badge--specials'}`}>
                      {item.category}
                    </span>
                  </div>
                  <div className="menu-card__price-wrap">
                    {item.discountPrice ? (
                      <>
                        <span className="menu-card__price-original">${item.price.toFixed(2)}</span>
                        <span className="menu-card__price-discounted">${item.discountPrice.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="menu-card__price">${item.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
                <p className="menu-card__stock">{item.stock}</p>
                <div className="menu-card__actions">
                  <button className="btn btn--ghost btn--sm" onClick={() => toast.success('Edit — connect to modal')}>
                    <i className="fa-solid fa-pen"></i> Edit
                  </button>
                  <button className="btn btn--danger-ghost btn--icon" onClick={() => deleteItem(item.id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button className="btn btn--ghost btn--icon" onClick={() => toggleAvailability(item.id)}>
                    <i className={`fa-solid ${item.available ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="dash-card" style={{ padding: 0 }}>
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th className="text-right">Price</th>
                  <th>Stock</th>
                  <th className="text-center">Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="menu-table__item">
                        <img src={item.image} alt={item.name} className="menu-table__thumb" loading="lazy" />
                        <span className="menu-table__name">{item.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${CATEGORY_BADGE[item.category] || 'badge--specials'}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="text-right">
                      {item.discountPrice ? (
                        <div>
                          <div className="menu-card__price-original">${item.price.toFixed(2)}</div>
                          <div className="menu-card__price-discounted">${item.discountPrice.toFixed(2)}</div>
                        </div>
                      ) : (
                        <span>${item.price.toFixed(2)}</span>
                      )}
                    </td>
                    <td>{item.stock}</td>
                    <td className="text-center">
                      <span className={`badge ${item.available ? 'badge--active' : 'badge--inactive'}`}>
                        {item.available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button className="icon-btn" onClick={() => toast.success('Edit')}>
                          <i className="fa-solid fa-pen"></i>
                        </button>
                        <button className="icon-btn icon-btn--danger" onClick={() => deleteItem(item.id)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
