import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const NotificationContext = createContext(null);

let idCounter = 0;

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    clearTimeout(timers.current[id]);
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const notify = useCallback(({ type = 'info', title, message, duration = 4000 }) => {
    const id = ++idCounter;
    setNotifications(prev => [...prev, { id, type, title, message }]);
    if (duration > 0) {
      timers.current[id] = setTimeout(() => dismiss(id), duration);
    }
    return id;
  }, [dismiss]);

  const success = useCallback((title, message, opts = {}) => notify({ type: 'success', title, message, ...opts }), [notify]);
  const error   = useCallback((title, message, opts = {}) => notify({ type: 'error',   title, message, ...opts }), [notify]);
  const warning = useCallback((title, message, opts = {}) => notify({ type: 'warning', title, message, ...opts }), [notify]);
  const info    = useCallback((title, message, opts = {}) => notify({ type: 'info',    title, message, ...opts }), [notify]);

  return (
    <NotificationContext.Provider value={{ notifications, notify, success, error, warning, info, dismiss }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be inside NotificationProvider');
  return ctx;
};
