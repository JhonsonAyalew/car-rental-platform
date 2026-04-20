import { useState, useCallback } from 'react';

/**
 * Generic form state manager with validation support.
 *
 * @param {object} initialValues  - Initial form field values
 * @param {function} validate     - Optional validation function: (values) => errors object
 *
 * @example
 * const { values, errors, touched, handleChange, handleBlur, handleSubmit, reset } = useForm(
 *   { email: '', password: '' },
 *   (v) => { const e = {}; if (!v.email) e.email = 'Required'; return e; }
 * );
 */
const useForm = (initialValues = {}, validate) => {
  const [values,  setValues]  = useState(initialValues);
  const [errors,  setErrors]  = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === 'checkbox' ? checked : value;
    setValues(v => ({ ...v, [name]: newVal }));
    // Clear error on change
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    if (validate) {
      const result = validate(values);
      setErrors(er => ({ ...er, [name]: result[name] || '' }));
    }
  }, [validate, values]);

  const setField = useCallback((name, value) => {
    setValues(v => ({ ...v, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  }, [errors]);

  const handleSubmit = useCallback((onSubmit) => async (e) => {
    e?.preventDefault();
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);

    if (validate) {
      const result = validate(values);
      setErrors(result);
      if (Object.keys(result).some(k => result[k])) return;
    }

    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  }, [values, validate]);

  const reset = useCallback((newValues) => {
    setValues(newValues ?? initialValues);
    setErrors({});
    setTouched({});
    setSubmitting(false);
  }, [initialValues]);

  const isValid = !Object.values(errors).some(Boolean);

  return {
    values, errors, touched, submitting, isValid,
    handleChange, handleBlur, handleSubmit, setField, reset,
    // Shorthand: register a field by name
    register: (name) => ({
      name,
      value: values[name] ?? '',
      onChange: handleChange,
      onBlur: handleBlur,
    }),
  };
};

export default useForm;
