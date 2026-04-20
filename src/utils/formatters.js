import { CURRENCY } from './constants';

/**
 * Format a number as ETB currency.
 * formatCurrency(8500) → "ETB 8,500"
 */
export const formatCurrency = (amount, compact = false) => {
  if (amount == null) return `${CURRENCY} 0`;
  if (compact && amount >= 1000000) return `${CURRENCY} ${(amount / 1000000).toFixed(1)}M`;
  if (compact && amount >= 1000)    return `${CURRENCY} ${(amount / 1000).toFixed(0)}k`;
  return `${CURRENCY} ${Number(amount).toLocaleString()}`;
};

/**
 * Format a date string to readable format.
 * formatDate('2024-01-15') → "Jan 15, 2024"
 */
export const formatDate = (dateStr, locale = 'en-US') => {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
};

/**
 * Format a date range.
 * formatDateRange('2024-01-15', '2024-01-20') → "Jan 15 – Jan 20, 2024"
 */
export const formatDateRange = (start, end) => {
  if (!start || !end) return '—';
  const s = new Date(start);
  const e = new Date(end);
  const opts = { month: 'short', day: 'numeric' };
  return `${s.toLocaleDateString('en-US', opts)} – ${e.toLocaleDateString('en-US', { ...opts, year: 'numeric' })}`;
};

/**
 * Calculate number of days between two dates.
 */
export const daysBetween = (start, end) => {
  if (!start || !end) return 0;
  return Math.max(0, Math.round((new Date(end) - new Date(start)) / 86400000));
};

/**
 * Calculate total booking price.
 */
export const calcBookingTotal = (pricePerDay, start, end) => {
  const days = daysBetween(start, end);
  return days * (pricePerDay || 0);
};

/**
 * Truncate text to a max length with ellipsis.
 */
export const truncate = (text, maxLen = 80) => {
  if (!text) return '';
  return text.length > maxLen ? `${text.slice(0, maxLen)}…` : text;
};

/**
 * Get initials from a full name.
 * getInitials('Abebe Bekele') → "AB"
 */
export const getInitials = (name = '') =>
  name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

/**
 * Relative time string.
 * timeAgo(new Date(Date.now() - 60000)) → "1 minute ago"
 */
export const timeAgo = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 1)   return 'Just now';
  if (mins < 60)  return `${mins} minute${mins !== 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  if (days < 7)   return `${days} day${days !== 1 ? 's' : ''} ago`;
  return formatDate(date);
};

/**
 * Format file size.
 * formatFileSize(1048576) → "1.0 MB"
 */
export const formatFileSize = (bytes) => {
  if (bytes < 1024)       return `${bytes} B`;
  if (bytes < 1048576)    return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
};
