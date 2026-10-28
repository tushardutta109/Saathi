import React from 'react';

export function VitalsMonitor({ onBack, lang = 'en', t = {} }) {
  return (
    <div className="vitals-monitor-page animate-fadeIn">
      <div className="vitals-hero-header">
        <div>
          <h2>🩺 {lang === 'hi' ? 'स्वास्थ्य और वाइटल्स मॉनिटर' : 'Personal Health & Vitals Monitor'}</h2>
          <p style={{ color: 'var(--text-sub)', marginTop: '6px' }}>
            {lang === 'hi' ? 'हार्ट रेट, ब्लड प्रेशर और स्वास्थ्य स्कोर' : 'Live ECG, Heart Rate, Blood Pressure & Health Score'}
          </p>
        </div>
        {onBack && (
          <button className="btn-secondary" onClick={onBack}>
            ← {lang === 'hi' ? 'वापस जाएँ' : 'Back to Dashboard'}
          </button>
        )}
      </div>

      <div className="dashboard-top-row" style={{ marginTop: '20px' }}>
        <div className="dash-card metric-card">
          <h3 className="dash-card-title">Heart Rate & Vitals</h3>
          <div className="metric-content">
            <div className="metric-stat-item">
              <span className="metric-stat-text">HR: 72 bpm (Normal)</span>
            </div>
            <div className="metric-stat-item">
              <span className="metric-stat-text">BP: 120/80 mmHg</span>
            </div>
            <div className="metric-stat-item">
              <span className="metric-stat-text">Oxygen (SpO2): 98%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VitalsMonitor;
