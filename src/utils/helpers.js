/**
 * General-purpose helper utilities.
 */

/** Sleep for N milliseconds (useful in dev/testing). */
export const sleep = (ms) => new Promise(r => setTimeout(r, ms));

/** Deep clone a plain object/array. */
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

/** Generate a simple UUID v4. */
export const uuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });

/** Group array by a key. */
export const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    const k = typeof key === 'function' ? key(item) : item[key];
    (acc[k] = acc[k] || []).push(item);
    return acc;
  }, {});

/** Sort array of objects by a key. */
export const sortBy = (arr, key, dir = 'asc') =>
  [...arr].sort((a, b) => {
    const va = a[key], vb = b[key];
    if (va < vb) return dir === 'asc' ? -1 : 1;
    if (va > vb) return dir === 'asc' ? 1 : -1;
    return 0;
  });

/** Check if a file is an image. */
export const isImage = (file) => file?.type?.startsWith('image/');

/** Check if a file is a PDF. */
export const isPDF = (file) => file?.type === 'application/pdf';

/** Build a URL query string from an object. */
export const buildQuery = (params) =>
  Object.entries(params)
    .filter(([, v]) => v !== null && v !== undefined && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

/** Clamp a number between min and max. */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/** Capitalize first letter. */
export const capitalize = (str = '') => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

/** Convert a string to a URL-safe slug. */
export const slugify = (str = '') =>
  str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

/** Safely parse JSON with a fallback. */
export const safeJSON = (str, fallback = null) => {
  try { return JSON.parse(str); } catch { return fallback; }
};
