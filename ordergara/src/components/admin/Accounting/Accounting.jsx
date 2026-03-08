import { useState } from 'react';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Accounting.css';

const monthlyData = [
  { month: 'Jan', income: 45000, expense: 28000 },
  { month: 'Feb', income: 52000, expense: 31000 },
  { month: 'Mar', income: 48000, expense: 29000 },
  { month: 'Apr', income: 61000, expense: 35000 },
  { month: 'May', income: 55000, expense: 32000 },
  { month: 'Jun', income: 67000, expense: 38000 },
];

const expenses = [
  { id: 1, category: 'Rent', amount: 3500, date: '2026-02-01', method: 'iBank', status: 'Paid' },
  { id: 2, category: 'Utilities', amount: 850, date: '2026-02-05', method: 'Cash', status: 'Paid' },
  { id: 3, category: 'Supplies', amount: 2400, date: '2026-02-08', method: 'Khalti', status: 'Paid' },
  { id: 4, category: 'Salaries', amount: 18800, date: '2026-02-10', method: 'iBank', status: 'Pending' },
  { id: 5, category: 'Marketing', amount: 1200, date: '2026-02-11', method: 'eSewa', status: 'Paid' },
];

const paymentMethods = [
  { name: 'Cash', amount: 12500, color: '#10b981', percentage: 25 },
  { name: 'POS', amount: 18000, color: '#3b82f6', percentage: 36 },
  { name: 'eSewa', amount: 8500, color: '#8b5cf6', percentage: 17 },
  { name: 'Khalti', amount: 6000, color: '#ec4899', percentage: 12 },
  { name: 'PhonePay', amount: 3000, color: '#6366f1', percentage: 6 },
  { name: 'iBank', amount: 2000, color: '#14b8a6', percentage: 4 },
];

export default function Accounting() {
  const [dateRange, setDateRange] = useState('This Month');
  const totalIncome  = monthlyData.reduce((s, m) => s + m.income, 0);
  const totalExpense = monthlyData.reduce((s, m) => s + m.expense, 0);
  const netProfit    = totalIncome - totalExpense;

  return (
    <div className="accounting">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-header__title">Accounting & Expenses</h2>
          <p className="page-header__subtitle">Track income, expenses, and financial reports</p>
        </div>
        <div className="accounting__header-actions">
          <button className="btn btn--ghost" onClick={() => toast.success('Exporting report...')}>
            <i className="fa-solid fa-download"></i> Export
          </button>
          <button className="btn btn--primary" onClick={() => toast.success('Add expense — connect to modal')}>
            <i className="fa-solid fa-plus"></i> Add Expense
          </button>
        </div>
      </div>

      {/* Summary gradient cards */}
      <div className="accounting__summary">
        <div className="acc-card acc-card--green">
          <div className="acc-card__top">
            <div>
              <p className="acc-card__label">Total Income</p>
              <p className="acc-card__value">${totalIncome.toLocaleString()}</p>
            </div>
            <div className="acc-card__icon"><i className="fa-solid fa-arrow-trend-up"></i></div>
          </div>
          <p className="acc-card__change"><i className="fa-solid fa-arrow-trend-up"></i> +15.3% from last period</p>
        </div>
        <div className="acc-card acc-card--red">
          <div className="acc-card__top">
            <div>
              <p className="acc-card__label">Total Expenses</p>
              <p className="acc-card__value">${totalExpense.toLocaleString()}</p>
            </div>
            <div className="acc-card__icon"><i className="fa-solid fa-arrow-trend-down"></i></div>
          </div>
          <p className="acc-card__change"><i className="fa-solid fa-arrow-trend-up"></i> +8.2% from last period</p>
        </div>
        <div className="acc-card acc-card--blue">
          <div className="acc-card__top">
            <div>
              <p className="acc-card__label">Net Profit</p>
              <p className="acc-card__value">${netProfit.toLocaleString()}</p>
            </div>
            <div className="acc-card__icon"><i className="fa-solid fa-dollar-sign"></i></div>
          </div>
          <p className="acc-card__change"><i className="fa-solid fa-arrow-trend-up"></i> +22.5% from last period</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="dash-card">
        <div className="accounting__chart-header">
          <h3 className="dash-card__title" style={{ margin: 0 }}>Income vs Expense Overview</h3>
          <select
            className="accounting__select"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option>This Month</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>This Year</option>
          </select>
        </div>
        <div style={{ marginTop: '1.25rem' }}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <Legend />
              <Bar dataKey="income" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="dash-card">
        <h3 className="dash-card__title">Payment Method Breakdown</h3>
        <div className="payment-methods">
          {paymentMethods.map((m) => (
            <div key={m.name} className="payment-method">
              <div className="payment-method__info">
                <div className="payment-method__dot" style={{ background: m.color }}></div>
                <span className="payment-method__name">{m.name}</span>
                <span className="payment-method__amount">${m.amount.toLocaleString()}</span>
                <span className="payment-method__pct">({m.percentage}%)</span>
              </div>
              <div className="payment-method__bar">
                <div className="payment-method__fill" style={{ width: `${m.percentage}%`, background: m.color }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expenses Table */}
      <div className="dash-card">
        <h3 className="dash-card__title">Recent Expenses</h3>
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Category</th>
                <th className="text-right">Amount</th>
                <th>Date</th>
                <th>Method</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e) => (
                <tr key={e.id}>
                  <td>
                    <div className="expense__category">
                      <div className="expense__icon">
                        <i className="fa-solid fa-wallet"></i>
                      </div>
                      <span className="emp-row__fullname">{e.category}</span>
                    </div>
                  </td>
                  <td className="text-right dash-table__revenue">${e.amount.toLocaleString()}</td>
                  <td style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                    {new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td>
                    <span className="badge badge--drinks">
                      <i className="fa-solid fa-credit-card" style={{ marginRight: '4px', fontSize: '0.7rem' }}></i>
                      {e.method}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className={`badge ${e.status === 'Paid' ? 'badge--active' : 'badge--warning'}`}>
                      {e.status}
                    </span>
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
