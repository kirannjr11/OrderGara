import { useState } from 'react';
import { toast } from 'sonner';
import './Membership.css';

const MEMBERS = [
  { id: 1, name: 'Alice Cooper', email: 'alice@email.com', phone: '+1 234 567 1111', tier: 'Platinum', points: 2850, totalSpent: 4200, joinDate: '2025-08-15', orders: 42 },
  { id: 2, name: 'Bob Miller', email: 'bob@email.com', phone: '+1 234 567 2222', tier: 'Gold', points: 1580, totalSpent: 2100, joinDate: '2025-10-20', orders: 28 },
  { id: 3, name: 'Carol White', email: 'carol@email.com', phone: '+1 234 567 3333', tier: 'Silver', points: 450, totalSpent: 890, joinDate: '2026-01-05', orders: 12 },
  { id: 4, name: 'David Lee', email: 'david@email.com', phone: '+1 234 567 4444', tier: 'Gold', points: 1920, totalSpent: 2850, joinDate: '2025-09-12', orders: 35 },
  { id: 5, name: 'Emma Stone', email: 'emma@email.com', phone: '+1 234 567 5555', tier: 'Platinum', points: 3200, totalSpent: 5100, joinDate: '2025-07-08', orders: 58 },
];

const TIER_BADGE = { Platinum: 'badge--specials', Gold: 'badge--warning', Silver: 'badge--inactive' };
const TIER_ICON  = { Platinum: 'fa-crown', Gold: 'fa-star', Silver: 'fa-award' };
const TIERS = ['All', 'Platinum', 'Gold', 'Silver'];

export default function Membership() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('All');

  const filtered = MEMBERS.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTier = selectedTier === 'All' || m.tier === selectedTier;
    return matchSearch && matchTier;
  });

  const totalPoints = MEMBERS.reduce((s, m) => s + m.points, 0);
  const avgPoints = Math.round(totalPoints / MEMBERS.length);
  const initials = (name) => name.split(' ').map((n) => n[0]).join('');

  return (
    <div className="membership">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-header__title">Membership & Loyalty</h2>
          <p className="page-header__subtitle">Manage customer loyalty and reward points</p>
        </div>
        <button className="btn btn--primary" onClick={() => toast.success('Add member — connect to modal')}>
          <i className="fa-solid fa-plus"></i> Add Member
        </button>
      </div>

      {/* Stats */}
      <div className="emp-mgmt__stats">
        <div className="dash-card">
          <div className="dash-card__stat">
            <div className="dash-card__icon-box dash-card__icon-box--blue"><i className="fa-solid fa-award"></i></div>
            <div><p className="dash-card__label">Total Members</p><p className="dash-card__value">{MEMBERS.length}</p></div>
          </div>
        </div>
        <div className="dash-card">
          <div className="dash-card__stat">
            <div className="dash-card__icon-box dash-card__icon-box--purple"><i className="fa-solid fa-crown"></i></div>
            <div><p className="dash-card__label">Platinum Members</p><p className="dash-card__value">{MEMBERS.filter((m) => m.tier === 'Platinum').length}</p></div>
          </div>
        </div>
        <div className="dash-card">
          <div className="dash-card__stat">
            <div className="dash-card__icon-box dash-card__icon-box--orange"><i className="fa-solid fa-gift"></i></div>
            <div><p className="dash-card__label">Total Points</p><p className="dash-card__value">{totalPoints.toLocaleString()}</p></div>
          </div>
        </div>
        <div className="dash-card">
          <div className="dash-card__stat">
            <div className="dash-card__icon-box dash-card__icon-box--green"><i className="fa-solid fa-star"></i></div>
            <div><p className="dash-card__label">Avg Points</p><p className="dash-card__value">{avgPoints}</p></div>
          </div>
        </div>
      </div>

      {/* Tier info cards */}
      <div className="membership__tiers">
        <div className="tier-card tier-card--silver">
          <div className="tier-card__header">
            <div className="tier-card__icon"><i className="fa-solid fa-award"></i></div>
            <div>
              <h3 className="tier-card__name">Silver</h3>
              <p className="tier-card__range">0 - 999 points</p>
            </div>
          </div>
          <ul className="tier-card__perks">
            <li>1 point per $1 spent</li>
            <li>5% discount on orders</li>
            <li>Birthday bonus</li>
          </ul>
        </div>
        <div className="tier-card tier-card--gold">
          <div className="tier-card__header">
            <div className="tier-card__icon"><i className="fa-solid fa-star"></i></div>
            <div>
              <h3 className="tier-card__name">Gold</h3>
              <p className="tier-card__range">1,000 - 2,499 points</p>
            </div>
          </div>
          <ul className="tier-card__perks">
            <li>1.5 points per $1 spent</li>
            <li>10% discount on orders</li>
            <li>Priority support</li>
          </ul>
        </div>
        <div className="tier-card tier-card--platinum">
          <div className="tier-card__header">
            <div className="tier-card__icon"><i className="fa-solid fa-crown"></i></div>
            <div>
              <h3 className="tier-card__name">Platinum</h3>
              <p className="tier-card__range">2,500+ points</p>
            </div>
          </div>
          <ul className="tier-card__perks">
            <li>2 points per $1 spent</li>
            <li>15% discount on orders</li>
            <li>VIP experiences</li>
          </ul>
        </div>
      </div>

      {/* Filters */}
      <div className="menu-mgmt__filters">
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass search-box__icon"></i>
          <input type="text" className="search-box__input" placeholder="Search members..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="filter-pills scrollbar-hide">
          {TIERS.map((t) => (
            <button key={t} className={`filter-pill ${selectedTier === t ? 'filter-pill--active' : ''}`} onClick={() => setSelectedTier(t)}>{t}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="dash-card" style={{ padding: 0 }}>
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Tier</th>
                <th className="text-right">Points</th>
                <th className="text-right">Total Spent</th>
                <th className="text-center">Orders</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id}>
                  <td>
                    <div className="emp-row__name">
                      <div className="emp-avatar">{initials(m.name)}</div>
                      <div>
                        <div className="emp-row__fullname">{m.name}</div>
                        <div className="emp-row__date">{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <i className={`fa-solid ${TIER_ICON[m.tier]}`} style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}></i>
                      <span className={`badge ${TIER_BADGE[m.tier]}`}>{m.tier}</span>
                    </div>
                  </td>
                  <td className="text-right">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                      <i className="fa-solid fa-gem" style={{ color: 'var(--color-primary)', fontSize: '0.75rem' }}></i>
                      <span className="emp-row__fullname">{m.points.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="text-right dash-table__revenue">${m.totalSpent.toLocaleString()}</td>
                  <td className="text-center" style={{ color: 'var(--color-text-secondary)' }}>{m.orders}</td>
                  <td>
                    <div className="table-actions">
                      <button className="icon-btn" onClick={() => toast.info('View member')}>
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      <button className="icon-btn" style={{ color: 'var(--color-primary)' }} onClick={() => toast.success('Points redeemed')}>
                        <i className="fa-solid fa-gem"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
