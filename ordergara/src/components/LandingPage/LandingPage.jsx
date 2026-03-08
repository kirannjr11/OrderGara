import { Link } from 'react-router';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="landing__container">
        <div className="landing__hero">
          <div className="landing__logo">
            <i className="fa-solid fa-store"></i>
          </div>
          <h1 className="landing__title">OrderGara</h1>
          <p className="landing__subtitle">
            Complete restaurant management — menu, tables, QR ordering, staff & reports.
            All in one place.
          </p>
        </div>

        <div className="landing__cards">
          <Link to="/admin" className="landing__card landing__card--orange">
            <div className="landing__card-icon">
              <i className="fa-solid fa-gauge-high"></i>
            </div>
            <h3 className="landing__card-title">Admin Dashboard</h3>
            <p className="landing__card-desc">
              Manage menu, employees, accounting & analytics
            </p>
            <span className="landing__card-arrow">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </Link>

          <Link to="/order" className="landing__card landing__card--blue">
            <div className="landing__card-icon">
              <i className="fa-solid fa-mobile-screen-button"></i>
            </div>
            <h3 className="landing__card-title">QR Ordering</h3>
            <p className="landing__card-desc">
              Mobile-friendly ordering interface for customers
            </p>
            <span className="landing__card-arrow">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </Link>

          <Link to="/kiosk" className="landing__card landing__card--purple">
            <div className="landing__card-icon">
              <i className="fa-solid fa-desktop"></i>
            </div>
            <h3 className="landing__card-title">Kiosk Mode</h3>
            <p className="landing__card-desc">
              Large touch screen interface for self-service
            </p>
            <span className="landing__card-arrow">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </Link>

          <Link to="/waiter" className="landing__card landing__card--green">
            <div className="landing__card-icon">
              <i className="fa-solid fa-clipboard-list"></i>
            </div>
            <h3 className="landing__card-title">Waiter Mode</h3>
            <p className="landing__card-desc">
              Tablet interface for waiters to take orders
            </p>
            <span className="landing__card-arrow">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </Link>
        </div>

        <p className="landing__footer">
          A modern, scalable restaurant management solution
        </p>
      </div>
    </div>
  );
}
