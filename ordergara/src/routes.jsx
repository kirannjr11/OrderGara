import { createBrowserRouter } from 'react-router';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import AdminLayout from './components/admin/AdminLayout/AdminLayout.jsx';
import DashboardOverview from './components/admin/DashboardOverview/DashboardOverview.jsx';
import MenuManagement from './components/admin/MenuManagement/MenuManagement.jsx';
import TableManagement from './components/admin/TableManagement/TableManagement.jsx';
import EmployeeManagement from './components/admin/EmployeeManagement/EmployeeManagement.jsx';
import Accounting from './components/admin/Accounting/Accounting.jsx';
import Membership from './components/admin/Membership/Membership.jsx';
import Marketing from './components/admin/Marketing/Marketing.jsx';
import QROrdering from './components/ordering/QROrdering/QROrdering.jsx';
import KioskMode from './components/ordering/KioskMode/KioskMode.jsx';
import WaiterMode from './components/ordering/WaiterMode/WaiterMode.jsx';
import PaymentFlow from './components/ordering/PaymentFlow/PaymentFlow.jsx';
import LoginPage from './components/auth/LoginPage/LoginPage.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: 'menu', element: <MenuManagement /> },
      { path: 'tables', element: <TableManagement /> },
      { path: 'employees', element: <EmployeeManagement /> },
      { path: 'accounting', element: <Accounting /> },
      { path: 'membership', element: <Membership /> },
      { path: 'marketing', element: <Marketing /> },
    ],
  },
  { path: '/order/:tableId', element: <QROrdering /> },
  { path: '/order', element: <QROrdering /> },
  { path: '/kiosk/:stationId', element: <KioskMode /> },
  { path: '/kiosk', element: <KioskMode /> },
  { path: '/waiter/:tableId', element: <WaiterMode /> },
  { path: '/waiter', element: <WaiterMode /> },
  { path: '/payment', element: <PaymentFlow /> },
]);
