import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Alert = ({ 
  type = 'info', 
  message, 
  title, 
  onClose, 
  className = '' 
}) => {
  const variants = {
    info: { icon: Info, bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', iconColor: 'text-blue-500' },
    success: { icon: CheckCircle, bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', iconColor: 'text-green-500' },
    warning: { icon: AlertCircle, bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', iconColor: 'text-yellow-500' },
    error: { icon: XCircle, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', iconColor: 'text-red-500' }
  };

  const Icon = variants[type].icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`${variants[type].bg} ${variants[type].border} border rounded-lg p-4 ${className}`}
        role="alert"
      >
        <div className="flex items-start gap-3">
          <Icon className={`w-5 h-5 ${variants[type].iconColor} mt-0.5`} />
          <div className="flex-1">
            {title && <h4 className={`font-semibold ${variants[type].text} mb-1`}>{title}</h4>}
            <p className={`text-sm ${variants[type].text}`}>{message}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className={`${variants[type].text} hover:opacity-70 transition`}
            >
              ×
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert;
