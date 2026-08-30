import React from 'react';

export function MedicineCard({ medicine, onMarkTaken, t }) {
  const isTaken = medicine.status === 'taken';

  return (
    <div className={`medicine-item-card ${isTaken ? 'taken' : ''}`}>
      <div className="medicine-time-badge">
        ⏰ {medicine.time}
      </div>

      <div className="medicine-details">
        <h4 className="medicine-name">
          <span>{medicine.icon || '💊'}</span>
          <span>{medicine.name}</span>
        </h4>
        <span className="medicine-dosage">
          {medicine.dosage} {medicine.purpose ? `• ${medicine.purpose}` : ''}
        </span>
      </div>

      <div className="medicine-status-container">
        {isTaken ? (
          <span className="status-badge-taken">
            {t.btnMarkedTaken || '✓ Taken'}
          </span>
        ) : (
          <button 
            className="btn btn-success"
            onClick={() => onMarkTaken(medicine.id)}
            aria-label={`Mark ${medicine.name} as taken`}
          >
            {t.btnTookIt || 'I Took It ✓'}
          </button>
        )}
      </div>
    </div>
  );
}

export default MedicineCard;
