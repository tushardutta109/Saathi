import React from 'react';

export function FeatureCard({ icon, title, description, onClick }) {
  return (
    <div 
      className="feature-card" 
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick && onClick()}
    >
      <div className="feature-card-header">
        <div className="feature-card-icon">{icon}</div>
        <h3 className="feature-card-title">{title}</h3>
      </div>
      <p className="feature-card-desc">{description}</p>
    </div>
  );
}

export default FeatureCard;
