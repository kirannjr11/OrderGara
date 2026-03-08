import { useState } from 'react';
import { toast } from 'sonner';
import './EmployeeManagement.css';

const EMPLOYEES = [
  { id: 1, name: 'John Smith', role: 'Chef', email: 'john.smith@resto.com', phone: '+1 234 567 8900', salary: 4500, joinDate: '2024-01-15', status: 'Active', attendance: 95 },
  { id: 2, name: 'Sarah Johnson', role: 'Waiter', email: 'sarah.j@resto.com', phone: '+1 234 567 8901', salary: 2800, joinDate: '2024-03-20', status: 'Active', attendance: 98 },
  { id: 3, name: 'Michael Brown', role: 'Manager', email: 'michael.b@resto.com', phone: '+1 234 567 8902', salary: 5500, joinDate: '2023-11-10', status: 'Active', attendance: 100 },
  { id: 4, name: 'Emily Davis', role: 'Cashier', email: 'emily.d@resto.com', phone: '+1 234 567 8903', salary: 3200, joinDate: '2024-02-05', status: 'Active', attendance: 92 },
  { id: 5, name: 'David Wilson', role: 'Waiter', email: 'david.w@resto.com', phone: '+1 234 567 8904', salary: 2800, joinDate: '2024-04-12', status: 'On Leave', attendance: 88 },
];

const ROLE_BADGE = {
  Chef: 'badge--specials',
  Waiter: 'badge--drinks',
  Manager: 'badge--orange',
  Cashier: 'badge--active',
};

const ROLES = ['All', 'Chef', 'Waiter', 'Manager', 'Cashier'];

export default function EmployeeManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  const filtered = EMPLOYEES.filter((emp) => {
    const matchSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = selectedRole === 'All' || emp.role === selectedRole;
    return matchSearch && matchRole;
  });

  const totalSalary = EMPLOYEES.reduce((sum, e) => sum + e.salary, 0);
  const avgAttendance = Math.round(EMPLOYEES.reduce((sum, e) => sum + e.attendance, 0) / EMPLOYEES.length);

  const initials = (name) => name.split(' ').map((n) => n[0]).join('');

  return (
    <div className="emp-mgmt">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-header__title">Employee Management</h2>
          <p className="page-header__subtitle">Manage staff, salaries, and attendance</p>
        </div>
        <button className="btn btn--primary" onClick={() => toast.success('Add employee — connect to modal')}>
          <i className="fa-solid fa-user-plus"></i> Add Employee
        </button>
      </div>

      {/* Summary cards */}
      <div className="emp-mgmt__stats">
        <div className="dash-card">
          <div className="dash-card__stat">
            <div className="dash-card__icon-box dash-card__icon-box--blue">
              <i className="fa-solid fa-users"></i>
            </div>
            <div>
              <p className="dash-card__label">Total Employees</p>
              <p className="dash-card__value">{EMPLOYEES.length}</p>
            </div>
          </div>
        </div>
        <div className="dash-card">
          <div className="dash-card__stat">
            <div className="dash-card__icon-box dash-card__icon-box--green">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <div>
              <p className="dash-card__label">Active</p>
              <p className="dash-card__value">{EMPLOYEES.filter((e) => e.status === 'Active').length}</p>
            </div>
          </div>
        </div>
        <div className="dash-card">
          <div className="dash-card__stat">
            <div className="dash-card__icon-box dash-card__icon-box--orange">
              <i className="fa-solid fa-dollar-sign"></i>
            </div>
            <div>
              <p className="dash-card__label">Monthly Payroll</p>
              <p className="dash-card__value">${totalSalary.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="dash-card">
          <div className="dash-card__stat">
            <div className="dash-card__icon-box dash-card__icon-box--purple">
              <i className="fa-solid fa-calendar"></i>
            </div>
            <div>
              <p className="dash-card__label">Avg Attendance</p>
              <p className="dash-card__value">{avgAttendance}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="menu-mgmt__filters">
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass search-box__icon"></i>
          <input
            type="text"
            className="search-box__input"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-pills scrollbar-hide">
          {ROLES.map((r) => (
            <button
              key={r}
              className={`filter-pill ${selectedRole === r ? 'filter-pill--active' : ''}`}
              onClick={() => setSelectedRole(r)}
            >{r}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="dash-card" style={{ padding: 0 }}>
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Contact</th>
                <th className="text-right">Salary</th>
                <th className="text-center">Attendance</th>
                <th className="text-center">Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <div className="emp-row__name">
                      <div className="emp-avatar">{initials(emp.name)}</div>
                      <div>
                        <div className="emp-row__fullname">{emp.name}</div>
                        <div className="emp-row__date">Joined {new Date(emp.joinDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${ROLE_BADGE[emp.role] || 'badge--specials'}`}>{emp.role}</span>
                  </td>
                  <td>
                    <div className="emp-row__contact">
                      <div>{emp.email}</div>
                      <div className="emp-row__phone">{emp.phone}</div>
                    </div>
                  </td>
                  <td className="text-right">
                    <div className="emp-row__fullname">${emp.salary.toLocaleString()}</div>
                    <div className="emp-row__date">/month</div>
                  </td>
                  <td className="text-center">
                    <div className="emp-attendance">
                      <div className="emp-attendance__bar">
                        <div className="emp-attendance__fill" style={{ width: `${emp.attendance}%` }}></div>
                      </div>
                      <span className="emp-attendance__pct">{emp.attendance}%</span>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className={`badge ${emp.status === 'Active' ? 'badge--active' : 'badge--warning'}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="icon-btn" onClick={() => toast.info('View employee')}>
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      <button className="icon-btn" style={{ color: 'var(--color-primary)' }} onClick={() => toast.success('Edit employee')}>
                        <i className="fa-solid fa-pen"></i>
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
