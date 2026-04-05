import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import CustomerLayout from '../layouts/CustomerLayout';
import CarOwnerLayout from '../layouts/CarOwnerLayout';
import SuperAdminLayout from '../layouts/SuperAdminLayout';

// Public Pages
import HomePage from '../pages/public/HomePage';
import SearchPage from '../pages/public/SearchPage';
import CarDetailPage from '../pages/public/CarDetailPage';
import AboutPage from '../pages/public/AboutPage';
import ContactPage from '../pages/public/ContactPage';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';

// Customer Pages
import CustomerDashboard from '../pages/customer/DashboardPage';
import MyBookingsPage from '../pages/customer/MyBookingsPage';
import BookingDetailPage from '../pages/customer/BookingDetailPage';
import BookingFormPage from '../pages/customer/BookingFormPage';
import CustomerProfilePage from '../pages/customer/ProfilePage';

// Car Owner Pages
import OwnerDashboardPage from '../pages/carOwner/OwnerDashboardPage';
import SubmitCarPage from '../pages/carOwner/SubmitCarPage';
import MySubmissionsPage from '../pages/carOwner/MySubmissionsPage';
import SubmissionDetailPage from '../pages/carOwner/SubmissionDetailPage';
import OwnerProfilePage from '../pages/carOwner/OwnerProfilePage';

// Admin Pages
import AdminDashboard from '../pages/admin/DashboardPage';
import PendingSubmissions from '../pages/admin/PendingSubmissionsPage';
import CarListingsPage from '../pages/admin/CarListingsPage';
import BookingsPage from '../pages/admin/BookingsPage';
import CarOwnersPage from '../pages/admin/CarOwnersPage';
import AdminProfilePage from '../pages/admin/ProfilePage';

// Super Admin Pages
import SuperAdminDashboard from '../pages/superAdmin/DashboardPage';
import AdminsPage from '../pages/superAdmin/AdminsPage';
import PlatformSettingsPage from '../pages/superAdmin/PlatformSettingsPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes - No auth required */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/car/:id" element={<CarDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
          
          {/* Auth Routes - Public access */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Customer Routes - Only customers */}
          <Route element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerLayout />
            </ProtectedRoute>
          }>
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/customer/bookings" element={<MyBookingsPage />} />
            <Route path="/customer/booking/:id" element={<BookingDetailPage />} />
            <Route path="/customer/booking/new/:carId" element={<BookingFormPage />} />
            <Route path="/customer/profile" element={<CustomerProfilePage />} />
          </Route>
          
          {/* Car Owner Routes - Only car owners */}
          <Route element={
            <ProtectedRoute allowedRoles={['car_owner']}>
              <CarOwnerLayout />
            </ProtectedRoute>
          }>
            <Route path="/owner/dashboard" element={<OwnerDashboardPage />} />
            <Route path="/owner/submit-car" element={<SubmitCarPage />} />
            <Route path="/owner/submissions" element={<MySubmissionsPage />} />
            <Route path="/owner/submission/:id" element={<SubmissionDetailPage />} />
            <Route path="/owner/profile" element={<OwnerProfilePage />} />
          </Route>
          
          {/* Admin Routes - Only admins */}
          <Route element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/submissions" element={<PendingSubmissions />} />
            <Route path="/admin/cars" element={<CarListingsPage />} />
            <Route path="/admin/bookings" element={<BookingsPage />} />
            <Route path="/admin/owners" element={<CarOwnersPage />} />
            <Route path="/admin/profile" element={<AdminProfilePage />} />
          </Route>
          
          {/* Super Admin Routes - Only super admins */}
          <Route element={
            <ProtectedRoute allowedRoles={['super_admin']}>
              <SuperAdminLayout />
            </ProtectedRoute>
          }>
            <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
            <Route path="/super-admin/admins" element={<AdminsPage />} />
            <Route path="/super-admin/settings" element={<PlatformSettingsPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
