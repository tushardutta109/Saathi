import React from 'react';

export function EmergencyButton({ onClick, t }) {
  return (
    <div className="emergency-fixed-container">
      <button 
        className="emergency-btn"
        onClick={onClick}
        aria-label={t.needHelpBtn}
      >
        <span>🆘</span>
        <span>{t.needHelpBtn}</span>
      </button>
    </div>
  );
}

export default EmergencyButton;
