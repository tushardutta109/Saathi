import React, { useEffect } from 'react';

export function Modal({ 
  isOpen, 
  title, 
  icon, 
  children, 
  onClose, 
  confirmText, 
  cancelText, 
  onConfirm,
  size = 'default',
  maxWidth,
  className = ''
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className={`modal-card ${size === 'large' ? 'modal-card-large' : ''} ${className}`} 
        onClick={(e) => e.stopPropagation()}
        style={maxWidth ? { maxWidth } : undefined}
      >
        {(title || icon || onClose) && (
          <div className="modal-header">
            <div className="modal-header-title-group">
              {icon && <span className="modal-icon">{icon}</span>}
              {title && <h3 className="modal-title">{title}</h3>}
            </div>
            {onClose && (
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={onClose} 
                aria-label="Close"
              >
                ✕
              </button>
            )}
          </div>
        )}
        
        <div className="modal-body">
          {children}
        </div>

        {(onConfirm || (onClose && cancelText)) && (
          <div className="modal-actions">
            {onConfirm && (
              <button className="btn btn-danger" onClick={onConfirm}>
                {confirmText || 'Confirm'}
              </button>
            )}
            {onClose && cancelText && (
              <button className="btn btn-secondary" onClick={onClose}>
                {cancelText || 'Cancel'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
