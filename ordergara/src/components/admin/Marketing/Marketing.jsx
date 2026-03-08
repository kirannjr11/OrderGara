import { useState } from 'react';
import { toast } from 'sonner';
import './Marketing.css';

const campaigns = [
  { id: 1, name: 'Weekend Special Offer', type: 'SMS', status: 'Active', sent: 850, opened: 680, clicked: 320, date: '2026-02-08' },
  { id: 2, name: 'Valentine Day Promo', type: 'Email', status: 'Scheduled', sent: 0, opened: 0, clicked: 0, date: '2026-02-14' },
  { id: 3, name: 'Loyalty Points Reminder', type: 'Push', status: 'Completed', sent: 1200, opened: 950, clicked: 450, date: '2026-02-01' },
];

const coupons = [
  { id: 1, code: 'WELCOME10', discount: '10%', uses: 245, limit: 500, expiry: '2026-03-31' },
  { id: 2, code: 'VALENTINE20', discount: '20%', uses: 89, limit: 200, expiry: '2026-02-14' },
  { id: 3, code: 'FREEDELIVERY', discount: 'Free Delivery', uses: 567, limit: 1000, expiry: '2026-12-31' },
];

const STATUS_BADGE = { Active: 'badge--active', Scheduled: 'badge--drinks', Completed: 'badge--inactive' };
const TYPE_ICON = { SMS: 'fa-message', Email: 'fa-envelope', Push: 'fa-paper-plane' };

export default function Marketing() {
  const [activeTab, setActiveTab] = useState('campaigns');

  return (
    <div className="marketing">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-header__title">Marketing & Campaigns</h2>
          <p className="page-header__subtitle">Manage promotions, notifications, and customer engagement</p>
        </div>
        <button className="btn btn--primary" onClick={() => toast.success('Create campaign — connect to modal')}>
          <i className="fa-solid fa-plus"></i> New Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="emp-mgmt__stats">
        <div className="dash-card">
          <div className="dash-card__stat">
            <div className="dash-card__icon-box dash-card__icon-box--blue"><i className="fa-solid fa-paper-plane"></i></div>
            <div><p className="dash-card__label">Total Campaigns</p><p className="dash-card__value">{campaigns.length}</p></div>
          </div>
        </div>
        <div className="dash-card">
          <div className="dash-card__stat">
            <div className="dash-card__icon-box dash-card__icon-box--green"><i className="fa-solid fa-envelope"></i></div>
            <div><p className="dash-card__label">Emails Sent</p><p className="dash-card__value">2,050</p></div>
          </div>
        </div>
        <div className="dash-card">
          <div className="dash-card__stat">
            <div className="dash-card__icon-box dash-card__icon-box--purple"><i className="fa-solid fa-tag"></i></div>
            <div><p className="dash-card__label">Active Coupons</p><p className="dash-card__value">{coupons.length}</p></div>
          </div>
        </div>
        <div className="dash-card">
          <div className="dash-card__stat">
            <div className="dash-card__icon-box dash-card__icon-box--orange"><i className="fa-solid fa-arrow-trend-up"></i></div>
            <div><p className="dash-card__label">Engagement Rate</p><p className="dash-card__value">45%</p></div>
          </div>
        </div>
      </div>

      {/* Tab panel */}
      <div className="dash-card" style={{ padding: 0 }}>
        {/* Tabs */}
        <div className="marketing__tabs">
          {['campaigns', 'coupons', 'events'].map((tab) => (
            <button
              key={tab}
              className={`marketing__tab ${activeTab === tab ? 'marketing__tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="marketing__tab-content">
          {/* Campaigns */}
          {activeTab === 'campaigns' && (
            <div className="marketing__campaigns">
              {campaigns.map((c) => (
                <div key={c.id} className="campaign-row">
                  <div className="campaign-row__info">
                    <div className="campaign-row__name-row">
                      <h3 className="campaign-row__name">{c.name}</h3>
                      <span className={`badge ${STATUS_BADGE[c.status]}`}>{c.status}</span>
                    </div>
                    <div className="campaign-row__meta">
                      <span><i className={`fa-solid ${TYPE_ICON[c.type]}`}></i> {c.type}</span>
                      <span>•</span>
                      <span>{new Date(c.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="campaign-row__stats">
                    <div className="campaign-stat"><span>Sent</span><strong>{c.sent}</strong></div>
                    <div className="campaign-stat"><span>Opened</span><strong>{c.opened}</strong></div>
                    <div className="campaign-stat"><span>Clicked</span><strong>{c.clicked}</strong></div>
                  </div>
                  <button className="btn btn--ghost btn--sm" onClick={() => toast.info('View campaign details')}>
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Coupons */}
          {activeTab === 'coupons' && (
            <div>
              <div className="marketing__coupons-header">
                <h3 className="dash-card__title" style={{ margin: 0 }}>Active Coupons</h3>
                <button className="btn btn--primary btn--sm" onClick={() => toast.success('Create coupon')}>
                  <i className="fa-solid fa-plus"></i> New Coupon
                </button>
              </div>
              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Coupon Code</th>
                      <th>Discount</th>
                      <th className="text-right">Uses</th>
                      <th>Expiry</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map((c) => (
                      <tr key={c.id}>
                        <td><code className="coupon-code">{c.code}</code></td>
                        <td className="emp-row__fullname">{c.discount}</td>
                        <td className="text-right">{c.uses} / {c.limit}</td>
                        <td style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                          {new Date(c.expiry).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="table-actions">
                            <button className="icon-btn" onClick={() => toast.success('Edit coupon')}><i className="fa-solid fa-pen"></i></button>
                            <button className="icon-btn icon-btn--danger" onClick={() => toast.error('Delete coupon')}><i className="fa-solid fa-trash"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Events */}
          {activeTab === 'events' && (
            <div className="marketing__empty">
              <i className="fa-solid fa-calendar marketing__empty-icon"></i>
              <h3>Event Management</h3>
              <p>Create and manage special events, promotions, and seasonal campaigns</p>
              <button className="btn btn--primary" onClick={() => toast.success('Create event')}>
                <i className="fa-solid fa-plus"></i> Create Your First Event
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
