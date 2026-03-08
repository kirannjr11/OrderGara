import { useState } from 'react';
import { toast } from 'sonner';
import './TableManagement.css';

const INITIAL_TABLES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  number: i + 1,
  capacity: [2, 4, 4, 6][i % 4],
  status: ['available', 'occupied', 'reserved', 'available'][i % 4],
  qrUrl: `${window.location.origin}/order/${i + 1}`,
}));

const STATUS_LABEL = { available: 'Available', occupied: 'Occupied', reserved: 'Reserved' };
const STATUS_BADGE = { available: 'badge--active', occupied: 'badge--nonveg', reserved: 'badge--warning' };

export default function TableManagement() {
  const [tables, setTables] = useState(INITIAL_TABLES);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? tables : tables.filter((t) => t.status === filter);

  const deleteTable = (id) => {
    setTables((prev) => prev.filter((t) => t.id !== id));
    toast.error('Table removed');
  };

  const copyQR = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('QR URL copied to clipboard');
  };

  const addTable = () => {
    const next = tables.length + 1;
    setTables((prev) => [
      ...prev,
      { id: Date.now(), number: next, capacity: 4, status: 'available', qrUrl: `${window.location.origin}/order/${next}` },
    ]);
    toast.success('Table added');
  };

  const statsAvailable = tables.filter((t) => t.status === 'available').length;
  const statsOccupied  = tables.filter((t) => t.status === 'occupied').length;
  const statsReserved  = tables.filter((t) => t.status === 'reserved').length;

  return (
    <div className="table-mgmt">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-header__title">Table Management</h2>
          <p className="page-header__subtitle">Manage tables and generate QR codes</p>
        </div>
        <button className="btn btn--primary" onClick={addTable}>
          <i className="fa-solid fa-plus"></i> Add Table
        </button>
      </div>

      {/* Stats */}
      <div className="table-stats">
        <div className="stat-chip stat-chip--total">
          <i className="fa-solid fa-table-cells"></i>
          <span><strong>{tables.length}</strong> Total</span>
        </div>
        <div className="stat-chip stat-chip--available">
          <i className="fa-solid fa-circle-check"></i>
          <span><strong>{statsAvailable}</strong> Available</span>
        </div>
        <div className="stat-chip stat-chip--occupied">
          <i className="fa-solid fa-circle-xmark"></i>
          <span><strong>{statsOccupied}</strong> Occupied</span>
        </div>
        <div className="stat-chip stat-chip--reserved">
          <i className="fa-solid fa-clock"></i>
          <span><strong>{statsReserved}</strong> Reserved</span>
        </div>
      </div>

      {/* Filter */}
      <div className="filter-pills">
        {['all', 'available', 'occupied', 'reserved'].map((f) => (
          <button
            key={f}
            className={`filter-pill ${filter === f ? 'filter-pill--active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Tables Grid */}
      <div className="table-grid">
        {filtered.map((table) => (
          <div key={table.id} className={`table-card table-card--${table.status}`}>
            <div className="table-card__header">
              <div className="table-card__number">
                <i className="fa-solid fa-table-cells"></i>
                <span>Table {table.number}</span>
              </div>
              <span className={`badge ${STATUS_BADGE[table.status]}`}>
                {STATUS_LABEL[table.status]}
              </span>
            </div>

            <div className="table-card__info">
              <div className="table-card__detail">
                <i className="fa-solid fa-users"></i>
                <span>{table.capacity} seats</span>
              </div>
              <div className="table-card__detail">
                <i className="fa-solid fa-qrcode"></i>
                <span>Table #{table.number}</span>
              </div>
            </div>

            <div className="table-card__qr-url" title={table.qrUrl}>
              {table.qrUrl}
            </div>

            <div className="table-card__actions">
              <button className="btn btn--ghost btn--sm" onClick={() => copyQR(table.qrUrl)}>
                <i className="fa-solid fa-qrcode"></i> Copy QR URL
              </button>
              <button className="btn btn--ghost btn--sm" onClick={() => toast.info('Print QR — connect to print logic')}>
                <i className="fa-solid fa-print"></i> Print
              </button>
              <button className="icon-btn icon-btn--danger" onClick={() => deleteTable(table.id)}>
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
