import React from 'react';

export function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container-wrapper">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-card toast-${toast.type || 'info'} animate-slideInDown`}>
          <span className="toast-icon">{toast.icon || '🔔'}</span>
          <div className="toast-body">
            <h4 className="toast-title">{toast.title}</h4>
            <p className="toast-message">{toast.message}</p>
          </div>
          <button 
            className="toast-close-btn"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss toast"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;
