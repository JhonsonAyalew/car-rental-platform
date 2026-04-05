// Design system color tokens
export const colors = {
  // Primary brand
  primary: '#D97706',
  primaryHover: '#B45309',
  primaryLight: '#FEF3C7',
  primaryText: '#92400E',
  
  // Backgrounds
  bgBase: '#F9F8F6',
  bgSurface: '#FFFFFF',
  bgSubtle: '#F3F2EE',
  
  // Text
  textPrimary: '#1A1A1A',
  textSecondary: '#52525B',
  textMuted: '#A1A1AA',
  
  // Borders
  border: '#E4E4E7',
  borderFocus: '#D97706',
  
  // Status
  status: {
    pending: { bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' },
    approved: { bg: '#DCFCE7', text: '#166534', border: '#BBF7D0' },
    rejected: { bg: '#FEE2E2', text: '#991B1B', border: '#FECACA' },
    completed: { bg: '#DBEAFE', text: '#1E40AF', border: '#BFDBFE' },
    cancelled: { bg: '#F4F4F5', text: '#71717A', border: '#E4E4E7' },
    review: { bg: '#F3E8FF', text: '#6B21A8', border: '#E9D5FF' },
  },
  
  // Semantic
  danger: '#DC2626',
  dangerHover: '#B91C1C',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
};

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '32px',
  8: '40px',
  9: '48px',
  10: '64px',
  11: '80px',
};

export const borderRadius = {
  button: '8px',
  input: '8px',
  card: '12px',
  modal: '16px',
  badge: '999px',
  image: '10px',
};

export const shadows = {
  soft: '0 1px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
  medium: '0 4px 16px rgba(0,0,0,0.10)',
  strong: '0 8px 32px rgba(0,0,0,0.14)',
};

export const typography = {
  fontFamily: "'Inter', system-ui, sans-serif",
  pageTitle: { size: '28px', weight: '700', lineHeight: '1.3' },
  sectionTitle: { size: '20px', weight: '600', lineHeight: '1.3' },
  cardTitle: { size: '16px', weight: '600', lineHeight: '1.3' },
  body: { size: '15px', weight: '400', lineHeight: '1.6' },
  label: { size: '13px', weight: '500', lineHeight: '1.4' },
  caption: { size: '12px', weight: '500', lineHeight: '1.4' },
};
