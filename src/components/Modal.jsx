import React from 'react';

export function Modal({ isOpen, title, icon, children, onClose, confirmText, cancelText, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {icon && <div className="modal-icon">{icon}</div>}
        {title && <h3 className="modal-title">{title}</h3>}
        
        <div className="modal-body">
          {children}
        </div>

        <div className="modal-actions">
          {onConfirm && (
            <button className="btn btn-danger" onClick={onConfirm}>
              {confirmText || 'Confirm'}
            </button>
          )}
          {onClose && (
            <button className="btn btn-secondary" onClick={onClose}>
              {cancelText || 'Cancel'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
