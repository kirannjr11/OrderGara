# OrderGara — Restaurant Management System
## Full Project Plan

---

## Overview

A complete restaurant management platform with four interfaces:
- **Admin Panel** — full control over restaurant operations
- **QR Ordering** — customer self-ordering via mobile (scan QR at table)
- **Kiosk Mode** — self-service touch screen at the counter
- **Waiter Mode** — tablet interface for staff to take orders tableside

---

## Tech Stack

### Frontend
| Tool | Purpose |
|---|---|
| React 18 + Vite | UI framework & build tool |
| React Router v7 | Client-side routing |
| Redux Toolkit | Global state management |
| Redux Thunk | Async middleware (built into Redux Toolkit) |
| Custom CSS | Hand-written styles per component |
| Axios | HTTP client for API calls |
| Recharts | Charts & graphs for dashboard |
| Sonner | Toast notifications |
| lucide-react | Icon library (npm, no inline SVGs) |

---

## Project Structure

```
OrderGara/
│
├── ordergara/
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   ├── AdminLayout/
│   │   │   │   │   ├── AdminLayout.jsx
│   │   │   │   │   └── AdminLayout.css
│   │   │   │   ├── DashboardOverview/
│   │   │   │   │   ├── DashboardOverview.jsx
│   │   │   │   │   └── DashboardOverview.css
│   │   │   │   ├── MenuManagement/
│   │   │   │   │   ├── MenuManagement.jsx
│   │   │   │   │   └── MenuManagement.css
│   │   │   │   ├── EmployeeManagement/
│   │   │   │   │   ├── EmployeeManagement.jsx
│   │   │   │   │   └── EmployeeManagement.css
│   │   │   │   ├── Accounting/
│   │   │   │   │   ├── Accounting.jsx
│   │   │   │   │   └── Accounting.css
│   │   │   │   ├── Membership/
│   │   │   │   │   ├── Membership.jsx
│   │   │   │   │   └── Membership.css
│   │   │   │   └── Marketing/
│   │   │   │       ├── Marketing.jsx
│   │   │   │       └── Marketing.css
│   │   │   ├── customer/
│   │   │   │   ├── QROrdering/
│   │   │   │   │   ├── QROrdering.jsx
│   │   │   │   │   └── QROrdering.css
│   │   │   │   ├── KioskMode/
│   │   │   │   │   ├── KioskMode.jsx
│   │   │   │   │   └── KioskMode.css
│   │   │   │   ├── WaiterMode/
│   │   │   │   │   ├── WaiterMode.jsx
│   │   │   │   │   └── WaiterMode.css
│   │   │   │   └── PaymentFlow/
│   │   │   │       ├── PaymentFlow.jsx
│   │   │   │       └── PaymentFlow.css
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage/
│   │   │   │   │   ├── LoginPage.jsx
│   │   │   │   │   └── LoginPage.css
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── shared/
│   │   │   │   ├── Sidebar/
│   │   │   │   │   ├── Sidebar.jsx
│   │   │   │   │   └── Sidebar.css
│   │   │   │   ├── Navbar/
│   │   │   │   │   ├── Navbar.jsx
│   │   │   │   │   └── Navbar.css
│   │   │   │   └── LoadingSpinner/
│   │   │   │       ├── LoadingSpinner.jsx
│   │   │   │       └── LoadingSpinner.css
│   │   │   └── LandingPage/
│   │   │       ├── LandingPage.jsx
│   │   │       └── LandingPage.css
│   │   ├── store/                     # Redux
│   │   │   ├── index.js               # configureStore
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js
│   │   │   │   ├── menuSlice.js
│   │   │   │   ├── orderSlice.js
│   │   │   │   └── cartSlice.js
│   │   │   └── middleware/
│   │   │       └── apiMiddleware.js   # custom Redux middleware
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useCart.js
│   │   ├── lib/
│   │   │   └── axios.js               # Axios instance
│   │   ├── styles/
│   │   │   └── global.css             # resets + CSS variables only
│   │   ├── routes.jsx
│   │   └── App.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── PLAN.md
└── README.md
```

---

## Redux Store Structure

```
store/
  authSlice     — user, token, role, login/logout actions
  menuSlice     — menu items, categories, CRUD actions
  orderSlice    — active orders, order status updates
  cartSlice     — cart items, quantities, totals
```

Redux Thunk (included in Redux Toolkit by default) handles all async API calls.

---

## Routes

```
/                  → LandingPage
/login             → LoginPage

/admin             → AdminLayout (protected)
  /admin           → DashboardOverview
  /admin/menu      → MenuManagement
  /admin/employees → EmployeeManagement
  /admin/accounting→ Accounting
  /admin/membership→ Membership
  /admin/marketing → Marketing

/order             → QROrdering    (public)
/kiosk             → KioskMode     (public)
/waiter            → WaiterMode    (protected — waiter role)
/payment           → PaymentFlow
```

---

## Dashboard Charts (Recharts)

| Chart | Data |
|---|---|
| LineChart | Daily revenue over time |
| BarChart | Orders per day / per category |
| PieChart | Payment method breakdown |
| AreaChart | Weekly sales trend |

---

## Phase Plan

### Phase 1 — Basic Setup
- [ ] Initialize frontend (Vite + React)
- [ ] Setup CSS structure (global.css, variables, resets)
- [ ] Setup Redux store + slices
- [ ] Setup React Router with all routes
- [ ] Setup Axios instance
- [ ] Login page + ProtectedRoute

### Phase 2 — Core Features
- [ ] Menu display & management
- [ ] QR Ordering flow
- [ ] Kiosk Mode
- [ ] Waiter Mode
- [ ] Cart & order creation
- [ ] Payment flow

### Phase 3 — Admin Panel
- [ ] Dashboard with Recharts graphs
- [ ] Employee management
- [ ] Accounting reports
- [ ] Membership / loyalty system
- [ ] Marketing module

### Phase 4 — Polish
- [ ] Real-time order updates
- [ ] QR code generation per table
- [ ] Mobile responsive (PWA)
- [ ] Print receipts

---


