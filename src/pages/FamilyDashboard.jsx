import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import MultilingualVoiceAssistant from '../components/MultilingualVoiceAssistant';

export function FamilyDashboard({ lang, t, onAddNotification }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await api.getFamilyDashboard();
    setDashboardData(data);
    setLoading(false);
  };

  const medPct = dashboardData
    ? Math.round((dashboardData.medicinesTakenCount / dashboardData.medicinesTotalCount) * 100)
    : 0;

  return (
    <div className="family-dashboard-page animate-fadeIn">

      {/* ── Header ── */}
      <div className="family-dashboard-header">
        <div>
          <h2 style={{ fontSize: '30px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary-forest)' }}>
            <span>👨‍👩‍👧</span>
            <span>{t.familyTitle}</span>
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-sub)', fontWeight: '600', marginTop: '4px' }}>
            {t.familySub}
          </p>
        </div>
        <span className="family-badge">🛡️ {t.familyBadge}</span>
      </div>

      {/* ── Embedded Voice Assistant ── */}
      <MultilingualVoiceAssistant currentLang={lang} t={t} onAddNotification={onAddNotification} />

      {loading || !dashboardData ? (
        <div className="loading-box">
          <div className="spinner" />
          <span>Loading caregiver metrics...</span>
        </div>
      ) : (
        <>
          {/* ── Stats Grid ── */}
          <div className="fam-stats-grid">
            {/* Medicine stat */}
            <div className="fam-stat-card">
              <div className="fam-stat-icon-wrap fam-icon-green">💊</div>
              <div className="fam-stat-body">
                <span className="fam-stat-label">{t.statMedicines}</span>
                <span className="fam-stat-value" style={{ color: 'var(--primary-forest)' }}>
                  {dashboardData.medicinesTakenCount}
                  <span className="fam-stat-denom">/{dashboardData.medicinesTotalCount}</span>
                </span>
                <span className="fam-stat-sub">{t.statMedicinesSub}</span>
                {/* mini progress bar */}
                <div className="fam-progress-bar-track">
                  <div
                    className="fam-progress-bar-fill"
                    style={{ width: `${medPct}%`, backgroundColor: medPct === 100 ? '#27AE60' : 'var(--primary-forest)' }}
                  />
                </div>
                <span className="fam-stat-pct">{medPct}%</span>
              </div>
            </div>

            {/* Tech Help stat */}
            <div className="fam-stat-card">
              <div className="fam-stat-icon-wrap fam-icon-gold">📱</div>
              <div className="fam-stat-body">
                <span className="fam-stat-label">{t.statTechHelp}</span>
                <span className="fam-stat-value" style={{ color: 'var(--gold-accent)' }}>
                  {dashboardData.techHelpRequestsCount}
                </span>
                <span className="fam-stat-sub">{t.statTechHelpSub}</span>
              </div>
            </div>

            {/* Alerts stat */}
            <div className="fam-stat-card">
              <div className="fam-stat-icon-wrap fam-icon-red">🆘</div>
              <div className="fam-stat-body">
                <span className="fam-stat-label">{t.statAlerts}</span>
                <span className="fam-stat-value" style={{ color: dashboardData.urgentAlertsCount > 0 ? 'var(--red-alert)' : 'var(--green-success)' }}>
                  {dashboardData.urgentAlertsCount}
                </span>
                <span className="fam-stat-sub">{t.statAlertsSub}</span>
                {dashboardData.urgentAlertsCount === 0 && (
                  <span className="fam-ok-badge">✓ All Clear</span>
                )}
              </div>
            </div>
          </div>

          {/* ── Medicine Activity Table ── */}
          <div className="fam-activity-card">
            <h3 style={{ fontSize: '22px', color: 'var(--primary-forest)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                        <span className={`fam-status-badge fam-badge-${row.status}`}>
                          {row.status === 'taken'    ? '✓ Taken'
                          : row.status === 'missed'  ? '✕ Missed'
                          :                            '⏳ Upcoming'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Contact Patient Card ── */}
          <div className="fam-contact-card">
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-forest)', marginBottom: '4px' }}>
              📞 {lang === 'hi' ? 'मरीज से संपर्क करें' : 'Contact Patient'}
            </h3>
            <p style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-sub)', marginBottom: '14px' }}>
              👤 Tushar Dutta &nbsp;|&nbsp; 📱 +91 60032 46031
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="tel:+916003246031"
                className="btn-fam-contact btn-fam-call"
                onClick={() => onAddNotification?.({
                  title: '📞 Calling Patient',
                  message: 'Initiating call to Tushar Dutta',
                  icon: '📞', type: 'info'
                })}
              >
                📞 {lang === 'hi' ? 'अभी कॉल करें' : 'Call Now'}
              </a>
              <a
                href="https://wa.me/916003246031"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fam-contact btn-fam-whatsapp"
                onClick={() => onAddNotification?.({
                  title: '💬 WhatsApp Opened',
                  message: 'Opening WhatsApp for Tushar Dutta',
                  icon: '💬', type: 'info'
                })}
              >
                💬 Send WhatsApp
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FamilyDashboard;
