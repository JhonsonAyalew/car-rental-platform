/**
 * Form validation helpers.
 * Each validator returns an error string or '' (empty = valid).
 */

export const required = (value) =>
  !value || (typeof value === 'string' && !value.trim()) ? 'This field is required' : '';

export const email = (value) => {
  if (!value) return '';
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email address';
};

export const minLength = (min) => (value) => {
  if (!value) return '';
  return value.length >= min ? '' : `Minimum ${min} characters required`;
};

export const maxLength = (max) => (value) => {
  if (!value) return '';
  return value.length <= max ? '' : `Maximum ${max} characters allowed`;
};

export const phone = (value) => {
  if (!value) return '';
  return /^(\+251|0)[79]\d{8}$/.test(value.replace(/\s/g, ''))
    ? '' : 'Enter a valid Ethiopian phone number (e.g. +251 91 234 5678)';
};

export const positiveNumber = (value) => {
  if (!value && value !== 0) return '';
  return Number(value) > 0 ? '' : 'Must be a positive number';
};

export const minValue = (min) => (value) => {
  if (!value && value !== 0) return '';
  return Number(value) >= min ? '' : `Minimum value is ${min}`;
};

export const maxValue = (max) => (value) => {
  if (!value && value !== 0) return '';
  return Number(value) <= max ? '' : `Maximum value is ${max}`;
};

export const password = (value) => {
  if (!value) return '';
  if (value.length < 8) return 'Password must be at least 8 characters';
  return '';
};

export const confirmPassword = (original) => (value) => {
  if (!value) return '';
  return value === original ? '' : 'Passwords do not match';
};

export const fileSize = (maxMB) => (file) => {
  if (!file) return '';
  return file.size <= maxMB * 1024 * 1024 ? '' : `File must be under ${maxMB}MB`;
};

export const fileType = (allowedTypes) => (file) => {
  if (!file) return '';
  return allowedTypes.includes(file.type) ? '' : `Unsupported file type. Allowed: ${allowedTypes.join(', ')}`;
};

/**
 * Compose multiple validators, returns first error found.
 *
 * @example
 * const validateEmail = compose(required, email);
 * validateEmail('bad') → 'Enter a valid email address'
 */
export const compose = (...validators) => (value) => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  return '';
};

/**
 * Validate an entire form object.
 *
 * @param {object} values - Form values
 * @param {object} rules  - { fieldName: validatorFn }
 * @returns {object}       - { fieldName: errorString }
 */
export const validateForm = (values, rules) => {
  const errors = {};
  Object.entries(rules).forEach(([field, validator]) => {
    const error = validator(values[field]);
    if (error) errors[field] = error;
  });
  return errors;
};
