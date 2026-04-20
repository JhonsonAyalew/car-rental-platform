// ─── constants.js ───────────────────────────────────
export const APP_NAME = 'EquipRent Ethiopia';
export const CURRENCY = 'ETB';

export const USER_ROLES = {
  SUPERADMIN: 'superadmin',
  ADMIN:      'admin',
  OWNER:      'owner',
  CUSTOMER:   'customer',
};

export const BOOKING_STATUS = {
  PENDING:   'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const SUBMISSION_STATUS = {
  PENDING:  'pending',
  REVIEW:   'review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const EQUIPMENT_CONDITIONS = ['Excellent', 'Good', 'Fair'];

export const ETHIOPIAN_CITIES = [
  'Addis Ababa', 'Dire Dawa', 'Adama', 'Hawassa', 'Bahir Dar',
  'Mekelle', 'Jimma', 'Gondar', 'Dessie', 'Jijiga', 'Shashamane',
];

export const EQUIPMENT_CATEGORIES = [
  'Excavator', 'Bulldozer', 'Loader', 'Crane',
  'Truck', 'Water Truck', 'Grader', 'Compactor', 'Generator', 'Other',
];

export const PAGE_SIZE = 10;
export const MAX_UPLOAD_SIZE_MB = 10;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const ACCEPTED_DOC_TYPES   = ['application/pdf'];
