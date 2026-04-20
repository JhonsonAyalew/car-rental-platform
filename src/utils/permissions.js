import { USER_ROLES } from './constants';

/**
 * Role-based permission helpers.
 */
export const can = {
  viewAdminPanel:    (role) => [USER_ROLES.ADMIN, USER_ROLES.SUPERADMIN].includes(role),
  manageEquipment:   (role) => [USER_ROLES.ADMIN, USER_ROLES.SUPERADMIN].includes(role),
  submitEquipment:   (role) => role === USER_ROLES.OWNER,
  makeBookings:      (role) => role === USER_ROLES.CUSTOMER,
  manageAdmins:      (role) => role === USER_ROLES.SUPERADMIN,
  viewReports:       (role) => [USER_ROLES.ADMIN, USER_ROLES.SUPERADMIN].includes(role),
  approveSubmissions:(role) => [USER_ROLES.ADMIN, USER_ROLES.SUPERADMIN].includes(role),
  editPlatformSettings:(role)=>role === USER_ROLES.SUPERADMIN,
};

/**
 * Get the dashboard path for a given role.
 */
export const getDashboardPath = (role) => {
  const map = {
    [USER_ROLES.SUPERADMIN]: '/superadmin/dashboard',
    [USER_ROLES.ADMIN]:      '/admin/dashboard',
    [USER_ROLES.OWNER]:      '/owner/dashboard',
    [USER_ROLES.CUSTOMER]:   '/customer/dashboard',
  };
  return map[role] || '/';
};
