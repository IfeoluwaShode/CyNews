import React, { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const color = type === 'error' ? 'bg-red-600' : type === 'success' ? 'bg-green-600' : 'bg-cyber-blue';

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-3 text-white rounded-md shadow-lg ${color} z-50`}
      role="status" aria-live="polite">
      {message}
    </div>
  );
};

export default Toast;


