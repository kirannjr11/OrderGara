import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { logout } from '../../../store/slices/authSlice.js';
import './AdminLayout.css';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/admin', icon: 'fa-gauge-high' },
  { name: 'Menu', path: '/admin/menu', icon: 'fa-utensils' },
  { name: 'Tables', path: '/admin/tables', icon: 'fa-table-cells' },
  { name: 'Employees', path: '/admin/employees', icon: 'fa-users' },
  { name: 'Accounting', path: '/admin/accounting', icon: 'fa-dollar-sign' },
  { name: 'Membership', path: '/admin/membership', icon: 'fa-award' },
  { name: 'Marketing', path: '/admin/marketing', icon: 'fa-bullhorn' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const currentPageName = NAV_ITEMS.find((n) => isActive(n.path))?.name || 'Dashboard';

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div className="overlay" onClick={() => setMobileSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : 'sidebar--collapsed'} ${mobileSidebarOpen ? 'sidebar--mobile-open' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar__header">
          <div className="sidebar__brand">
            <div className="sidebar__brand-icon">
              <i className="fa-solid fa-store"></i>
            </div>
            {sidebarOpen && (
              <div className="sidebar__brand-text">
                <span className="sidebar__brand-name">OrderGara</span>
                <span className="sidebar__brand-role">Admin Panel</span>
              </div>
            )}
          </div>
          <button
            className="sidebar__collapse-btn sidebar__collapse-btn--desktop"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Collapse' : 'Expand'}
          >
            <i className={`fa-solid fa-chevron-left ${!sidebarOpen ? 'fa-rotate-180' : ''}`}></i>
          </button>
          <button
            className="sidebar__collapse-btn sidebar__collapse-btn--mobile"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar__nav">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar__nav-item ${isActive(item.path) ? 'sidebar__nav-item--active' : ''}`}
              onClick={() => setMobileSidebarOpen(false)}
              title={!sidebarOpen ? item.name : ''}
            >
              <i className={`fa-solid ${item.icon} sidebar__nav-icon`}></i>
              {sidebarOpen && <span className="sidebar__nav-label">{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="sidebar__footer">
          <button className="sidebar__logout" onClick={handleLogout} title={!sidebarOpen ? 'Logout' : ''}>
            <i className="fa-solid fa-right-from-bracket sidebar__nav-icon"></i>
            {sidebarOpen && <span className="sidebar__nav-label">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className={`admin-main ${sidebarOpen ? 'admin-main--sidebar-open' : 'admin-main--sidebar-collapsed'}`}>
        {/* Top navbar */}
        <header className="admin-navbar">
          <div className="admin-navbar__left">
            <button
              className="admin-navbar__hamburger"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <div>
              <h1 className="admin-navbar__title">{currentPageName}</h1>
              <p className="admin-navbar__subtitle">Welcome back, {user?.name || 'Admin'}</p>
            </div>
          </div>

          <div className="admin-navbar__right">
            <button className="admin-navbar__icon-btn" title="Notifications">
              <i className="fa-solid fa-bell"></i>
              <span className="admin-navbar__badge"></span>
            </button>
            <button className="admin-navbar__icon-btn" title="Settings">
              <i className="fa-solid fa-gear"></i>
            </button>
            <button className="admin-navbar__profile" onClick={handleLogout} title="Logout">
              <div className="admin-navbar__avatar">
                <i className="fa-solid fa-user"></i>
              </div>
              <span className="admin-navbar__username">{user?.name || 'Admin'}</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
