/**
 * OrderGara — API Service
 * All API calls are centralized here.
 * Replace placeholder comments with real endpoint logic when backend is ready.
 */

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach auth token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('og_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── AUTH ─────────────────────────────────────────────────────────────────────

/**
 * POST /auth/login
 * Body: { email, password }
 * Returns: { token, user }
 */
export const loginAdmin = (credentials) =>
  // PLACEHOLDER: replace with api.post('/auth/login', credentials)
  Promise.resolve({
    data: { token: 'mock_token_123', user: { id: 1, name: 'Admin', email: credentials.email, role: 'admin' } },
  });

/**
 * POST /auth/logout
 */
export const logoutAdmin = () =>
  // PLACEHOLDER: replace with api.post('/auth/logout')
  Promise.resolve({ data: { message: 'Logged out' } });

// ─── MENU ─────────────────────────────────────────────────────────────────────

/**
 * GET /menu
 * Returns: [{ id, name, category, price, discountPrice, image, available, stock }]
 */
export const getMenuItems = () =>
  // PLACEHOLDER: replace with api.get('/menu')
  Promise.resolve({ data: [] });

/**
 * POST /menu
 * Body: { name, category, price, discountPrice, image, available }
 */
export const createMenuItem = (item) =>
  // PLACEHOLDER: replace with api.post('/menu', item)
  Promise.resolve({ data: { ...item, id: Date.now() } });

/**
 * PUT /menu/:id
 */
export const updateMenuItem = (id, item) =>
  // PLACEHOLDER: replace with api.put(`/menu/${id}`, item)
  Promise.resolve({ data: { ...item, id } });

/**
 * DELETE /menu/:id
 */
export const deleteMenuItem = (id) =>
  // PLACEHOLDER: replace with api.delete(`/menu/${id}`)
  Promise.resolve({ data: { message: 'Deleted' } });

// ─── TABLES ───────────────────────────────────────────────────────────────────

/**
 * GET /tables
 * Returns: [{ id, number, capacity, status, qrCode }]
 */
export const getTables = () =>
  // PLACEHOLDER: replace with api.get('/tables')
  Promise.resolve({ data: [] });

/**
 * POST /tables
 * Body: { number, capacity }
 */
export const createTable = (table) =>
  // PLACEHOLDER: replace with api.post('/tables', table)
  Promise.resolve({ data: { ...table, id: Date.now(), status: 'available' } });

/**
 * DELETE /tables/:id
 */
export const deleteTable = (id) =>
  // PLACEHOLDER: replace with api.delete(`/tables/${id}`)
  Promise.resolve({ data: { message: 'Deleted' } });

/**
 * GET /tables/:id/qr
 * Returns QR code URL for a table
 */
export const getTableQR = (id) =>
  // PLACEHOLDER: replace with api.get(`/tables/${id}/qr`)
  Promise.resolve({ data: { qrUrl: `http://localhost:5173/order/${id}` } });

// ─── ORDERS ───────────────────────────────────────────────────────────────────

/**
 * GET /orders
 * Returns: [{ id, tableId, items, status, total, createdAt }]
 */
export const getOrders = () =>
  // PLACEHOLDER: replace with api.get('/orders')
  Promise.resolve({ data: [] });

/**
 * POST /orders
 * Body: { tableId, items: [{ menuItemId, quantity }], notes }
 */
export const createOrder = (order) =>
  // PLACEHOLDER: replace with api.post('/orders', order)
  Promise.resolve({ data: { ...order, id: Date.now(), status: 'pending' } });

/**
 * PATCH /orders/:id/status
 * Body: { status } → 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled'
 */
export const updateOrderStatus = (id, status) =>
  // PLACEHOLDER: replace with api.patch(`/orders/${id}/status`, { status })
  Promise.resolve({ data: { id, status } });

// ─── EMPLOYEES ────────────────────────────────────────────────────────────────

/**
 * GET /employees
 * Returns: [{ id, name, role, email, phone, salary, joinDate, status, attendance }]
 */
export const getEmployees = () =>
  // PLACEHOLDER: replace with api.get('/employees')
  Promise.resolve({ data: [] });

/**
 * POST /employees
 */
export const createEmployee = (employee) =>
  // PLACEHOLDER: replace with api.post('/employees', employee)
  Promise.resolve({ data: { ...employee, id: Date.now() } });

/**
 * PUT /employees/:id
 */
export const updateEmployee = (id, employee) =>
  // PLACEHOLDER: replace with api.put(`/employees/${id}`, employee)
  Promise.resolve({ data: { ...employee, id } });

/**
 * DELETE /employees/:id
 */
export const deleteEmployee = (id) =>
  // PLACEHOLDER: replace with api.delete(`/employees/${id}`)
  Promise.resolve({ data: { message: 'Deleted' } });

// ─── ACCOUNTING ───────────────────────────────────────────────────────────────

/**
 * GET /accounting/summary?range=month
 * Returns: { totalIncome, totalExpense, netProfit }
 */
export const getAccountingSummary = (range = 'month') =>
  // PLACEHOLDER: replace with api.get(`/accounting/summary?range=${range}`)
  Promise.resolve({ data: { totalIncome: 0, totalExpense: 0, netProfit: 0 } });

/**
 * GET /accounting/expenses
 */
export const getExpenses = () =>
  // PLACEHOLDER: replace with api.get('/accounting/expenses')
  Promise.resolve({ data: [] });

/**
 * POST /accounting/expenses
 */
export const createExpense = (expense) =>
  // PLACEHOLDER: replace with api.post('/accounting/expenses', expense)
  Promise.resolve({ data: { ...expense, id: Date.now() } });

// ─── MEMBERSHIP ───────────────────────────────────────────────────────────────

/**
 * GET /members
 * Returns: [{ id, name, email, phone, tier, points, totalSpent, joinDate, orders }]
 */
export const getMembers = () =>
  // PLACEHOLDER: replace with api.get('/members')
  Promise.resolve({ data: [] });

/**
 * POST /members
 */
export const createMember = (member) =>
  // PLACEHOLDER: replace with api.post('/members', member)
  Promise.resolve({ data: { ...member, id: Date.now() } });

/**
 * PATCH /members/:id/redeem
 * Body: { points }
 */
export const redeemPoints = (id, points) =>
  // PLACEHOLDER: replace with api.patch(`/members/${id}/redeem`, { points })
  Promise.resolve({ data: { id, points } });

// ─── MARKETING ────────────────────────────────────────────────────────────────

/**
 * GET /marketing/campaigns
 */
export const getCampaigns = () =>
  // PLACEHOLDER: replace with api.get('/marketing/campaigns')
  Promise.resolve({ data: [] });

/**
 * POST /marketing/campaigns
 */
export const createCampaign = (campaign) =>
  // PLACEHOLDER: replace with api.post('/marketing/campaigns', campaign)
  Promise.resolve({ data: { ...campaign, id: Date.now() } });

/**
 * GET /marketing/coupons
 */
export const getCoupons = () =>
  // PLACEHOLDER: replace with api.get('/marketing/coupons')
  Promise.resolve({ data: [] });

/**
 * POST /marketing/coupons
 */
export const createCoupon = (coupon) =>
  // PLACEHOLDER: replace with api.post('/marketing/coupons', coupon)
  Promise.resolve({ data: { ...coupon, id: Date.now() } });

/**
 * DELETE /marketing/coupons/:id
 */
export const deleteCoupon = (id) =>
  // PLACEHOLDER: replace with api.delete(`/marketing/coupons/${id}`)
  Promise.resolve({ data: { message: 'Deleted' } });

// ─── DASHBOARD ────────────────────────────────────────────────────────────────

/**
 * GET /dashboard/stats
 * Returns: { totalSales, totalExpenses, netProfit, activeOrders, totalMembers, totalEmployees, avgOrderValue }
 */
export const getDashboardStats = () =>
  // PLACEHOLDER: replace with api.get('/dashboard/stats')
  Promise.resolve({
    data: {
      totalSales: 45231,
      totalExpenses: 22560,
      netProfit: 22671,
      activeOrders: 24,
      totalMembers: 1248,
      totalEmployees: 32,
      avgOrderValue: 45.8,
    },
  });

/**
 * GET /dashboard/revenue-chart
 * Returns: [{ name, revenue, expense }]
 */
export const getRevenueChart = () =>
  // PLACEHOLDER: replace with api.get('/dashboard/revenue-chart')
  Promise.resolve({ data: [] });

export default api;
