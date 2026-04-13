import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from './locales/en/common.js';
import enHome from './locales/en/Home.js';
import enSearch from './locales/en/public/search.js';
import enEquipment from './locales/en/public/equipment.js';
import enContact from './locales/en/public/contact.js';
import enAbout from './locales/en/public/about.js';
import enAdminDashboard from './locales/en/admin/adminDashboard.js';
import enSettings from './locales/en/admin/settings.js';
import enCustomers from './locales/en/admin/customers.js';
import enCarListings from './locales/en/admin/carListings.js';
import enCarOwners from './locales/en/admin/carOwners.js';
import enBookings from './locales/en/admin/bookings.js';
import enCategories from './locales/en/admin/categories.js';
import enReports from './locales/en/admin/reports.js';
import enEquipmentPage from './locales/en/admin/equipment.js';
import enTimeController from './locales/en/admin/timeController.js';
import enMySubmissions from './locales/en/owner/mySubmissions.js';
import enSubmissionDetail from './locales/en/owner/submissionDetail.js';
import enOwnerDashboard from './locales/en/owner/ownerDashboard.js';
import enOwnerSettings from './locales/en/owner/settings.js';
import enCalendar from './locales/en/owner/calendar.js';
import enAnalytics from './locales/en/owner/analytics.js';
import enOwnerProfile from './locales/en/owner/ownerProfile.js';
import enPublicLayout from './locales/en/layout/publicLayout.js';
import enCustomerLayout from './locales/en/layout/customerLayout.js';
import enAdminLayout from './locales/en/layout/adminLayout.js';
import enCarOwnerLayout from './locales/en/layout/carOwnerLayout.js';
import enCustomerDashboard from './locales/en/customerDashboard.js';
import enBookingForm from './locales/en/bookingForm.js';
import enMyBookings from './locales/en/myBookings.js';
import enProfile from './locales/en/profile.js';


import amCommon from './locales/am/common.js';
import amHome from './locales/am/Home.js';
import amSearch from './locales/am/public/search.js';
import amEquipment from './locales/am/public/equipment.js';
import amContact from './locales/am/public/contact.js';
import amAbout from './locales/am/public/about.js';
import amAdminDashboard from './locales/am/admin/adminDashboard.js';
import amSettings from './locales/am/admin/settings.js';
import amCustomers from './locales/am/admin/customers.js';
import amCarListings from './locales/am/admin/carListings.js';
import amCarOwners from './locales/am/admin/carOwners.js';
import amBookings from './locales/am/admin/bookings.js';
import amCategories from './locales/am/admin/categories.js';
import amReports from './locales/am/admin/reports.js';
import amEquipmentPage from './locales/am/admin/equipment.js';
import amTimeController from './locales/am/admin/timeController.js';
import amMySubmissions from './locales/am/owner/mySubmissions.js';
import amSubmissionDetail from './locales/am/owner/submissionDetail.js';
import amOwnerDashboard from './locales/am/owner/ownerDashboard.js';
import amOwnerSettings from './locales/am/owner/settings.js';
import amCalendar from './locales/am/owner/calendar.js';
import amAnalytics from './locales/am/owner/analytics.js';
import amOwnerProfile from './locales/am/owner/ownerProfile.js';
import amPublicLayout from './locales/am/layout/publicLayout.js';
import amCustomerLayout from './locales/am/layout/customerLayout.js';
import amAdminLayout from './locales/am/layout/adminLayout.js';
import amCarOwnerLayout from './locales/am/layout/carOwnerLayout.js';
import amCustomerDashboard from './locales/am/customerDashboard.js';
import amBookingForm from './locales/am/bookingForm.js';
import amMyBookings from './locales/am/myBookings.js';
import amProfile from './locales/am/profile.js';

const resources = {
  en: {
    common: enCommon,
    home: enHome,
    search: enSearch,
    equipment: enEquipment,
    contact: enContact,
    about: enAbout,
    adminDashboard: enAdminDashboard,
    settings: enSettings,
    customers: enCustomers,
    carListings: enCarListings,
    carOwners: enCarOwners,
    bookings: enBookings,
    categories: enCategories,
    reports: enReports,
    equipmentPage: enEquipmentPage,
    timeController: enTimeController,
    mySubmissions: enMySubmissions,
    submissionDetail: enSubmissionDetail,
    ownerDashboard: enOwnerDashboard,
    ownerSettings: enOwnerSettings,
    calendar: enCalendar,
    analytics: enAnalytics,
    ownerProfile: enOwnerProfile,
    publicLayout: enPublicLayout,
    customerLayout: enCustomerLayout,
    adminLayout: enAdminLayout,
    carOwnerLayout: enCarOwnerLayout,
    customerDashboard: enCustomerDashboard,
    bookingForm: enBookingForm,
    myBookings: enMyBookings,
    profile: enProfile
  },
  am: {
    common: amCommon,
    home: amHome,
    search: amSearch,
    equipment: amEquipment,
    contact: amContact,
    about: amAbout,
    adminDashboard: amAdminDashboard,
    settings: amSettings,
    customers: amCustomers,
    carListings: amCarListings,
    carOwners: amCarOwners,
    bookings: amBookings,
    categories: amCategories,
    reports: amReports,
    equipmentPage: amEquipmentPage,
    timeController: amTimeController,
    mySubmissions: amMySubmissions,
    submissionDetail: amSubmissionDetail,
    ownerDashboard: amOwnerDashboard,
    ownerSettings: amOwnerSettings,
    calendar: amCalendar,
    analytics: amAnalytics,
    ownerProfile: amOwnerProfile,
    publicLayout: amPublicLayout,
    customerLayout: amCustomerLayout,
    adminLayout: amAdminLayout,
    carOwnerLayout: amCarOwnerLayout,
    customerDashboard: amCustomerDashboard,
    bookingForm: amBookingForm,
    myBookings: amMyBookings,
    profile: amProfile
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    ns: ['common', 'home', 'search', 'equipment', 'contact', 'about', 'adminDashboard', 'settings', 'customers', 'carListings', 'carOwners', 'bookings', 'categories', 'reports', 'equipmentPage', 'timeController', 'mySubmissions', 'submissionDetail', 'ownerDashboard', 'ownerSettings', 'calendar', 'analytics', 'ownerProfile', 'publicLayout', 'customerLayout', 'adminLayout', 'carOwnerLayout', 'customerDashboard', 'bookingForm', 'myBookings', 'profile'],
    defaultNS: 'common',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;
