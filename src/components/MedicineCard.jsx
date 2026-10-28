import React from 'react';
import { voiceService } from '../services/voiceService';

export function MedicineCard({ medicine, onMarkTaken, t }) {
  const status = medicine.status; // 'taken' | 'upcoming' | 'missed'

  const handleReadAloud = () => {
    const lang = t._lang || 'en';
    let text = '';
    if (lang === 'hi') {
      text = `${medicine.name}, ${medicine.dosage}, ${medicine.time} पर लेनी है।`;
    } else if (lang === 'bn') {
      text = `${medicine.name}, ${medicine.dosage}, ${medicine.time} তে নিন।`;
    } else {
      text = `${medicine.name}, ${medicine.dosage} at ${medicine.time}.`;
    }
    voiceService.speak(text, lang);
  };

  return (
    <div className={`med-card-v2 med-card-${status}`}>
      {/* Status Badge at top-left */}
      <div className={`med-status-chip med-chip-${status}`}>
        {status === 'taken'    ? '✅ TAKEN'
        : status === 'missed'  ? '✕ MISSED'
        :                        '⏳ UPCOMING'}
      </div>

      {/* Main content row */}
      <div className="med-card-body">
        <div className="med-card-info">
          <h4 className="med-card-name">
            <span>{medicine.icon || '💊'}</span>
            <span>{medicine.name}</span>
          </h4>
          <div className="med-card-meta">
            <span className="med-card-dosage">{medicine.dosage}</span>
            {medicine.purpose && (
              <span className="med-card-purpose">• {medicine.purpose}</span>
            )}
          </div>
        </div>

        <div className="med-card-time-badge">
          ⏰ {medicine.time}
        </div>
      </div>

      {/* Action buttons row */}
      <div className="med-card-actions">
        {status === 'taken' ? (
          <span className="med-done-label">✓ {t.btnMarkedTaken || 'Medicine Taken'}</span>
        ) : (
          <>
            <button
              className="btn-med-take"
              onClick={() => onMarkTaken(medicine.id)}
            >
              ✓ {t.btnTookIt || 'Mark as Taken'}
            </button>
            <button
              className="btn-med-aloud"
              onClick={handleReadAloud}
            >
              🔊 {t.remindAloud || 'Remind Aloud'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MedicineCard;
