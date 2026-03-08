import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import './DashboardOverview.css';

const revenueData = [
  { name: 'Mon', revenue: 4200, expense: 2400 },
  { name: 'Tue', revenue: 5100, expense: 2800 },
  { name: 'Wed', revenue: 4800, expense: 2600 },
  { name: 'Thu', revenue: 6200, expense: 3200 },
  { name: 'Fri', revenue: 7500, expense: 3800 },
  { name: 'Sat', revenue: 9200, expense: 4200 },
  { name: 'Sun', revenue: 8400, expense: 3900 },
];

const popularItems = [
  { name: 'Burger', value: 450, color: '#f97316' },
  { name: 'Pizza', value: 380, color: '#3b82f6' },
  { name: 'Pasta', value: 320, color: '#8b5cf6' },
  { name: 'Salad', value: 280, color: '#10b981' },
  { name: 'Drinks', value: 520, color: '#f59e0b' },
];

const topSellingItems = [
  { name: 'Classic Burger', category: 'Non-Veg', sales: 145, revenue: '$2,175', trend: 'up' },
  { name: 'Margherita Pizza', category: 'Veg', sales: 132, revenue: '$1,980', trend: 'up' },
  { name: 'Caesar Salad', category: 'Veg', sales: 98, revenue: '$980', trend: 'down' },
  { name: 'Chicken Pasta', category: 'Non-Veg', sales: 87, revenue: '$1,305', trend: 'up' },
  { name: 'Iced Latte', category: 'Drinks', sales: 156, revenue: '$780', trend: 'up' },
];

const CATEGORY_COLORS = {
  Veg: 'badge--veg',
  'Non-Veg': 'badge--nonveg',
  Drinks: 'badge--drinks',
};

export default function DashboardOverview() {
  return (
    <div className="dashboard">
      {/* Summary Cards */}
      <div className="dashboard__grid-4">
        <SummaryCard title="Total Sales" value="$45,231" change="+12.5%" trend="up" icon="fa-dollar-sign" color="orange" />
        <SummaryCard title="Total Expenses" value="$22,560" change="+8.2%" trend="up" icon="fa-cart-shopping" color="blue" />
        <SummaryCard title="Net Profit" value="$22,671" change="+18.3%" trend="up" icon="fa-arrow-trend-up" color="green" />
        <SummaryCard title="Active Orders" value="24" change="-5" trend="down" icon="fa-hat-chef" color="purple" />
      </div>

      {/* Stat Cards */}
      <div className="dashboard__grid-3">
        <StatCard title="Total Members" value="1,248" icon="fa-award" color="pink" />
        <StatCard title="Total Employees" value="32" icon="fa-users" color="indigo" />
        <StatCard title="Avg Order Value" value="$45.80" icon="fa-dollar-sign" color="teal" />
      </div>

      {/* Charts Row */}
      <div className="dashboard__grid-2">
        {/* Revenue vs Expense */}
        <div className="dash-card">
          <h3 className="dash-card__title">Revenue vs Expense</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: '#fff', border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2.5} dot={{ fill: '#f97316', r: 4 }} />
              <Line type="monotone" dataKey="expense" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: '#3b82f6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Popular Items */}
        <div className="dash-card">
          <h3 className="dash-card__title">Popular Menu Items</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={popularItems}
                cx="50%" cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={95}
                dataKey="value"
              >
                {popularItems.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Selling Table */}
      <div className="dash-card">
        <h3 className="dash-card__title">Top Selling Items Today</h3>
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th className="text-right">Sales</th>
                <th className="text-right">Revenue</th>
                <th className="text-center">Trend</th>
              </tr>
            </thead>
            <tbody>
              {topSellingItems.map((item, i) => (
                <tr key={i}>
                  <td className="dash-table__name">{item.name}</td>
                  <td>
                    <span className={`badge ${CATEGORY_COLORS[item.category] || 'badge--specials'}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="text-right">{item.sales}</td>
                  <td className="text-right dash-table__revenue">{item.revenue}</td>
                  <td className="text-center">
                    {item.trend === 'up' ? (
                      <i className="fa-solid fa-arrow-trend-up trend--up"></i>
                    ) : (
                      <i className="fa-solid fa-arrow-trend-down trend--down"></i>
                    )}
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

function SummaryCard({ title, value, change, trend, icon, color }) {
  return (
    <div className="dash-card dash-card--summary">
      <div className="dash-card__body">
        <div>
          <p className="dash-card__label">{title}</p>
          <p className="dash-card__value">{value}</p>
          <div className="dash-card__change">
            <i className={`fa-solid ${trend === 'up' ? 'fa-arrow-trend-up trend--up' : 'fa-arrow-trend-down trend--down'}`}></i>
            <span className={trend === 'up' ? 'trend--up' : 'trend--down'}>{change}</span>
            <span className="dash-card__change-label">vs last week</span>
          </div>
        </div>
        <div className={`dash-card__icon-box dash-card__icon-box--${color}`}>
          <i className={`fa-solid ${icon}`}></i>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="dash-card">
      <div className="dash-card__stat">
        <div className={`dash-card__icon-box dash-card__icon-box--${color}`}>
          <i className={`fa-solid ${icon}`}></i>
        </div>
        <div>
          <p className="dash-card__label">{title}</p>
          <p className="dash-card__value">{value}</p>
        </div>
      </div>
    </div>
  );
}
