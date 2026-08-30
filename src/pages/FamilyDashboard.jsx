import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import MultilingualVoiceAssistant from '../components/MultilingualVoiceAssistant';

export function FamilyDashboard({ lang, t, onAddNotification }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await api.getFamilyDashboard();
    setDashboardData(data);
    setLoading(false);
  };

  return (
    <div className="family-dashboard-page animate-fadeIn">
      {/* Header with Professional Badge */}
      <div className="family-dashboard-header">
        <div>
          <h2 style={{ fontSize: '32px', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--primary-forest)' }}>
            <span>👨‍👩‍👧</span>
            <span>{t.familyTitle}</span>
          </h2>
          <p style={{ fontSize: '20px', color: 'var(--text-sub)', fontWeight: '600' }}>
            {t.familySub}
          </p>
        </div>

        <span className="family-badge">
          🛡️ {t.familyBadge}
        </span>
      </div>

      {/* EMBEDDED MULTILINGUAL VOICE ASSISTANT COMPONENT */}
      <MultilingualVoiceAssistant 
        currentLang={lang} 
        t={t} 
        onAddNotification={onAddNotification} 
      />

      {loading || !dashboardData ? (
        <div className="loading-box">
          <div className="spinner"></div>
          <span>Loading caregiver metrics...</span>
        </div>
      ) : (
        <>
          {/* 3 Statistics Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-card-title">💊 {t.statMedicines}</span>
              <span className="stat-card-value">
                {dashboardData.medicinesTakenCount} / {dashboardData.medicinesTotalCount}
              </span>
              <span className="stat-card-sub">{t.statMedicinesSub}</span>
            </div>

            <div className="stat-card">
              <span className="stat-card-title">📱 {t.statTechHelp}</span>
              <span className="stat-card-value">{dashboardData.techHelpRequestsCount}</span>
              <span className="stat-card-sub">{t.statTechHelpSub}</span>
            </div>

            <div className="stat-card">
              <span className="stat-card-title">🆘 {t.statAlerts}</span>
              <span className="stat-card-value" style={{ color: dashboardData.urgentAlertsCount > 0 ? 'var(--red-alert)' : 'var(--primary-forest)' }}>
                {dashboardData.urgentAlertsCount}
              </span>
              <span className="stat-card-sub">{t.statAlertsSub}</span>
            </div>
          </div>

          {/* Today's Medicine Activity Table */}
          <div className="activity-table-card">
            <h3 style={{ fontSize: '24px', color: 'var(--primary-forest)', marginBottom: '8px' }}>
              📋 {t.activityTitle}
            </h3>

            <div className="table-responsive-wrapper">
              <table className="activity-table">
                <thead>
                  <tr>
                    <th>{t.colTime}</th>
                    <th>{t.colMedicine}</th>
                    <th>{t.colStatus}</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.todayActivity.map((row, idx) => (
                    <tr key={idx}>
                      <td><strong>{row.time}</strong></td>
                      <td>{row.medicine}</td>
                      <td>
                        <span style={{ 
                          fontWeight: '800',
                          color: row.status === 'taken' ? 'var(--green-success)' : row.status === 'missed' ? 'var(--red-alert)' : 'var(--gold-accent)'
                        }}>
                          {row.label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Caregiver Actions & Recent Help Requests */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div className="saathi-card">
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--primary-forest)' }}>
                👤 Registered Caregiver Contact
              </h3>
              <p style={{ fontSize: '20px', fontWeight: '800' }}>{t.familyContactName}</p>
              <p style={{ fontSize: '18px', color: 'var(--text-sub)', marginBottom: '18px' }}>{t.familyContactPhone}</p>
              
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href={`tel:${t.familyContactPhone}`} className="btn btn-primary" style={{ minHeight: '48px', fontSize: '17px', textDecoration: 'none' }}>
                  {t.btnCallNow}
                </a>
                <button className="btn btn-secondary" style={{ minHeight: '48px', fontSize: '17px' }}>
                  {t.btnSendReminder}
                </button>
              </div>
            </div>

            <div className="saathi-card">
              <h3 style={{ fontSize: '22px', marginBottom: '14px', color: 'var(--primary-forest)' }}>
                🔍 {t.recentHelpTitle}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'var(--bg-secondary-light)', border: '1px solid var(--border-color)' }}>
                  <p style={{ fontWeight: '800', fontSize: '18px' }}>{t.help1Title}</p>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>{t.help1Time} • <span style={{ color: 'var(--green-success)', fontWeight: '700' }}>{t.help1Status}</span></p>
                </div>

                <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'var(--bg-secondary-light)', border: '1px solid var(--border-color)' }}>
                  <p style={{ fontWeight: '800', fontSize: '18px' }}>{t.help2Title}</p>
                  <p style={{ fontSize: '15px', color: 'var(--text-muted)' }}>{t.help2Time} • <span style={{ color: 'var(--green-success)', fontWeight: '700' }}>{t.help2Status}</span></p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FamilyDashboard;
