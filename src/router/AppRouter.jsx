import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Spinner } from '../components/ui/index.jsx';
import { useAuth } from '../context/AuthContext';

/* ── Layouts ─────────────────────────────── */
const PublicLayout      = lazy(() => import('../layouts/PublicLayout'));
const AdminLayout       = lazy(() => import('../layouts/AdminLayout'));
const CarOwnerLayout    = lazy(() => import('../layouts/CarOwnerLayout'));
const CustomerLayout    = lazy(() => import('../layouts/CustomerLayout'));
const SuperAdminLayout  = lazy(() => import('../layouts/SuperAdminLayout'));

/* ── Auth Pages ─────────────────────────── */
const LoginPage         = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage      = lazy(() => import('../pages/auth/RegisterPage'));
const ForgotPasswordPage= lazy(() => import('../pages/auth/ForgotPasswordPage'));

/* ── Public Pages ───────────────────────── */
const HomePage          = lazy(() => import('../pages/public/HomePage'));
const SearchPage        = lazy(() => import('../pages/public/SearchPage'));
const CarDetailPage     = lazy(() => import('../pages/public/CarDetailPage'));
const AboutPage         = lazy(() => import('../pages/public/AboutPage'));
const ContactPage       = lazy(() => import('../pages/public/ContactPage'));

/* ── Admin Pages ────────────────────────── */
const AdminDashboard       = lazy(() => import('../pages/admin/DashboardPage'));
const AdminEquipment       = lazy(() => import('../pages/admin/EquipmentPage'));
const AdminBookings        = lazy(() => import('../pages/admin/BookingsPage'));
const AdminPendingSubmissions = lazy(() => import('../pages/admin/PendingSubmissionsPage'));
const AdminCustomers       = lazy(() => import('../pages/admin/CustomersPage'));
const AdminCarOwners       = lazy(() => import('../pages/admin/CarOwnersPage'));
const AdminCategories      = lazy(() => import('../pages/admin/CategoriesPage'));
const AdminReports         = lazy(() => import('../pages/admin/ReportsPage'));
const AdminSettings        = lazy(() => import('../pages/admin/SettingsPage'));
const AdminProfile         = lazy(() => import('../pages/admin/ProfilePage'));
const AdminTimeController  = lazy(() => import('../pages/admin/TimeControllerPage'));
const SubmissionReview     = lazy(() => import('../pages/admin/SubmissionReviewPage'));

/* ── Car Owner Pages ────────────────────── */
const OwnerDashboard       = lazy(() => import('../pages/carOwner/OwnerDashboardPage'));
const OwnerSubmitCar       = lazy(() => import('../pages/carOwner/SubmitCarPage'));
const OwnerMySubmissions   = lazy(() => import('../pages/carOwner/MySubmissionsPage'));
const OwnerSubmissionDetail= lazy(() => import('../pages/carOwner/SubmissionDetailPage'));
const OwnerAnalytics       = lazy(() => import('../pages/carOwner/AnalyticsPage'));
const OwnerCalendar        = lazy(() => import('../pages/carOwner/CalendarPage'));
const OwnerProfile         = lazy(() => import('../pages/carOwner/OwnerProfilePage'));
const OwnerSettings        = lazy(() => import('../pages/carOwner/SettingsPage'));

/* ── Customer Pages ─────────────────────── */
const CustomerDashboard    = lazy(() => import('../pages/customer/DashboardPage'));
const CustomerBookingForm  = lazy(() => import('../pages/customer/BookingFormPage'));
const CustomerMyBookings   = lazy(() => import('../pages/customer/MyBookingsPage'));
const CustomerProfile      = lazy(() => import('../pages/customer/ProfilePage'));

/* ── Super Admin Pages ──────────────────── */
const SuperAdminDashboard  = lazy(() => import('../pages/superAdmin/DashboardPage'));
const SuperAdminAdmins     = lazy(() => import('../pages/superAdmin/AdminsPage'));

/* ── Fallback ───────────────────────────── */
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Spinner size="lg" />
  </div>
);

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
    <h1 className="text-6xl font-black" style={{ color: 'var(--brand)' }}>404</h1>
    <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Page not found</p>
    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>The page you're looking for doesn't exist.</p>
    <a href="/" className="px-4 py-2 rounded font-semibold text-sm"
      style={{ background: 'var(--brand)', color: '#fff', borderRadius: 'var(--r-md)' }}>
      Go Home
    </a>
  </div>
);

const Unauthorized = () => (
  <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
    <h1 className="text-5xl font-black" style={{ color: 'var(--danger)' }}>403</h1>
    <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Access Denied</p>
    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>You don't have permission to view this page.</p>
    <a href="/" className="px-4 py-2 rounded font-semibold text-sm"
      style={{ background: 'var(--brand)', color: '#fff', borderRadius: 'var(--r-md)' }}>
      Go Home
    </a>
  </div>
);

/* ─── Root redirect based on role ─── */
const RootRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  const map = {
    superadmin: '/superadmin/dashboard',
    admin:      '/admin/dashboard',
    owner:      '/owner/dashboard',
    customer:   '/customer/dashboard',
  };
  return <Navigate to={map[user?.role] ?? '/'} replace />;
};

const AppRouter = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      {/* ── Public ── */}
      <Route element={<PublicLayout />}>
        <Route path="/"          element={<HomePage />} />
        <Route path="/search"    element={<SearchPage />} />
        <Route path="/equipment/:id" element={<CarDetailPage />} />
        <Route path="/about"     element={<AboutPage />} />
        <Route path="/contact"   element={<ContactPage />} />
      </Route>

      {/* ── Auth ── */}
      <Route path="/login"           element={<LoginPage />} />
      <Route path="/register"        element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* ── Admin ── */}
      <Route path="/admin" element={
  <ProtectedRoute roles={['admin', 'superadmin']}>  // ← Pass roles as prop
    <AdminLayout />
  </ProtectedRoute>
}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard"         element={<AdminDashboard />} />
        <Route path="equipment"         element={<AdminEquipment />} />
        <Route path="bookings"          element={<AdminBookings />} />
        <Route path="submissions"       element={<AdminPendingSubmissions />} />
        <Route path="submissions/:id"   element={<SubmissionReview />} />
        <Route path="customers"         element={<AdminCustomers />} />
        <Route path="owners"            element={<AdminCarOwners />} />
        <Route path="categories"        element={<AdminCategories />} />
        <Route path="reports"           element={<AdminReports />} />
        <Route path="settings"          element={<AdminSettings />} />
        <Route path="profile"           element={<AdminProfile />} />
        <Route path="time-controller"   element={<AdminTimeController />} />
      </Route>

      {/* ── Car Owner ── */}
      <Route path="/owner" element={
        <ProtectedRoute roles={['owner']}>
          <CarOwnerLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard"         element={<OwnerDashboard />} />
        <Route path="submit"            element={<OwnerSubmitCar />} />
        <Route path="submissions"       element={<OwnerMySubmissions />} />
        <Route path="submissions/:id"   element={<OwnerSubmissionDetail />} />
        <Route path="analytics"         element={<OwnerAnalytics />} />
        <Route path="calendar"          element={<OwnerCalendar />} />
        <Route path="profile"           element={<OwnerProfile />} />
        <Route path="settings"          element={<OwnerSettings />} />
      </Route>

      {/* ── Customer ── */}
      <Route path="/customer" element={
        <ProtectedRoute roles={['customer']}>
          <CustomerLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard"         element={<CustomerDashboard />} />
        <Route path="book/:id"          element={<CustomerBookingForm />} />
        <Route path="bookings"          element={<CustomerMyBookings />} />
        <Route path="profile"           element={<CustomerProfile />} />
      </Route>

      {/* ── Super Admin ── */}
      <Route path="/superadmin" element={
        <ProtectedRoute roles={['superadmin']}>
          <SuperAdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="admins"    element={<SuperAdminAdmins />} />
      </Route>

      {/* ── Misc ── */}
      <Route path="/dashboard"    element={<RootRedirect />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*"             element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRouter;
