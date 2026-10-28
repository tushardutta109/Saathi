import React, { useState } from 'react';

export function Home({ 
  onNavigate, 
  onVoiceCommand, 
  onOpenDoctorSuggest, 
  onOpenSearch, 
  onOpenPayment,
  onAddNotification,
  lang = 'en', 
  t 
}) {
  // Family overview members state
  const [selectedMember, setSelectedMember] = useState('priya');
  const members = [
    { id: 'ravi', name: 'Ravi', score: '92/100', avatar: '👦', hasAlert: false, role: 'Son' },
    { id: 'priya', name: 'Priya', score: '92/100', avatar: '👩', hasAlert: false, role: 'Daughter-in-law' },
    { id: 'amit', name: 'Amit', score: '92/100', avatar: '👦', hasAlert: true, role: 'Grandson' },
    { id: 'sunita', name: 'Sunita', score: '95/100', avatar: '👩‍🦰', hasAlert: false, role: 'Daughter' },
  ];

  // Upcoming actions state
  const [actions, setActions] = useState([
    { id: 1, title: 'Dr. Sharma - Teleconsult', time: '10:00 AM', completed: true, icon: '📅' },
    { id: 2, title: 'Dr. Sharma - Teleconsult', time: '10:00 AM', completed: true, icon: '📅' },
    { id: 3, title: 'Refill due: Metformin', time: '10:00 AM', completed: false, tag: '0:00', icon: '📋' },
  ]);

  // Daily pill box checkbox matrix state
  const [pillStatus, setPillStatus] = useState({
    row1: [true, true, true],
    row2: [true, false, true],
  });

  const toggleAction = (id) => {
    setActions(prev => prev.map(a => {
      if (a.id === id) {
        const nextState = !a.completed;
        onAddNotification?.({
          title: nextState ? 'Action Completed ✓' : 'Action Reopened',
          message: `${a.title} marked as ${nextState ? 'done' : 'pending'}.`,
          icon: '✅',
          type: 'info'
        });
        return { ...a, completed: nextState };
      }
      return a;
    }));
  };

  const togglePill = (rowIndex, colIndex) => {
    setPillStatus(prev => {
      const nextRow = [...prev[rowIndex]];
      nextRow[colIndex] = !nextRow[colIndex];
      const slotName = colIndex === 0 ? 'Morning' : colIndex === 1 ? 'Afternoon' : 'Evening';
      onAddNotification?.({
        title: nextRow[colIndex] ? `${slotName} Medicine Taken 💊` : `${slotName} Medicine Marked Pending`,
        message: nextRow[colIndex] ? 'Recorded on your daily schedule.' : 'Updated medicine checklist.',
        icon: '💊',
        type: 'info'
      });
      return { ...prev, [rowIndex]: nextRow };
    });
  };

  const handleMemberSelect = (member) => {
    setSelectedMember(member.id);
    onAddNotification?.({
      title: `${member.name}'s Profile Active 👤`,
      message: `Health score: ${member.score}. Role: ${member.role}.`,
      icon: '👨‍👩‍👧',
      type: 'info'
    });
  };

  return (
    <div className="new-dashboard-container animate-fadeIn">

      {/* ══════════════════════════════════════════════════════════════
          ROW 1: TOP 3 METRICS & ACTIONS CARDS
      ══════════════════════════════════════════════════════════════ */}
      <section className="dashboard-top-row">

        {/* ── CARD 1: Personal Health Metric ── */}
        <div className="dash-card metric-card">
          <h3 className="dash-card-title">Personal Health Metric</h3>
          
          <div className="metric-content">
            {/* Circular Gauge */}
            <div className="metric-gauge-wrapper">
              <svg className="metric-gauge-svg" viewBox="0 0 110 110">
                <circle
                  className="metric-gauge-bg"
                  cx="55"
                  cy="55"
                  r="45"
                  strokeWidth="8"
                />
                <circle
                  className="metric-gauge-fill"
                  cx="55"
                  cy="55"
                  r="45"
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset="42"
                />
              </svg>
              <div className="metric-gauge-text">
                <span className="metric-gauge-percent">85%</span>
                <span className="metric-gauge-label">Healthy</span>
              </div>
            </div>

            {/* Right side stats + ECG Pulse line */}
            <div className="metric-stats-column">
              <div className="metric-stat-item">
                <span className="metric-stat-text">HR: 72 bpm</span>
              </div>
              <div className="metric-stat-item">
                <span className="metric-stat-text">BP: 120/80</span>
              </div>

              {/* Glowing Heartbeat Waveform */}
              <div className="metric-wave-container">
                <svg className="metric-wave-svg" viewBox="0 0 140 40" fill="none">
                  <path
                    d="M 5 24 Q 25 24 35 24 Q 45 22 55 12 Q 65 34 75 14 Q 85 24 95 24 Q 115 24 135 24"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="75" cy="14" r="4.5" fill="#34D399" className="pulse-dot" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ── CARD 2: Family Overview ── */}
        <div className="dash-card family-overview-card">
          <h3 className="dash-card-title">Family Overview</h3>
          
          <div className="family-members-row">
            {members.map((m) => {
              const isSelected = selectedMember === m.id;
              return (
                <div
                  key={m.id}
                  className={`family-member-item ${isSelected ? 'active-member' : ''}`}
                  onClick={() => handleMemberSelect(m)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleMemberSelect(m)}
                >
                  <div className="member-avatar-wrap">
                    <span className="member-avatar-emoji">{m.avatar}</span>
                    {m.hasAlert && (
                      <span className="member-alert-badge" title="Attention needed">⚠️</span>
                    )}
                  </div>
                  <span className="member-name">{m.name}</span>
                  <span className="member-score-badge">{m.score}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CARD 3: Upcoming Actions ── */}
        <div className="dash-card upcoming-actions-card">
          <div className="dash-card-header-row">
            <h3 className="dash-card-title">Upcoming Actions</h3>
            <button className="dash-card-menu-btn" aria-label="More options">···</button>
          </div>

          <div className="upcoming-actions-list">
            {actions.map((act) => (
              <div key={act.id} className="upcoming-action-item">
                <div className="action-item-left">
                  <span className="action-item-icon">{act.icon}</span>
                  <span className="action-item-title">
                    {act.title} - {act.time}
                  </span>
                </div>

                <div className="action-item-right">
                  {act.tag ? (
                    <span className="action-pill-tag">{act.tag}</span>
                  ) : (
                    <button
                      className={`action-check-btn ${act.completed ? 'checked' : ''}`}
                      onClick={() => toggleAction(act.id)}
                      aria-label={`Toggle ${act.title}`}
                      title={act.completed ? "Mark incomplete" : "Mark completed"}
                    >
                      ✓
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>


      {/* ══════════════════════════════════════════════════════════════
          ROW 2: CENTRAL GLOWING "TALK TO SAATHI" BUTTON
      ══════════════════════════════════════════════════════════════ */}
      <section className="dashboard-mic-center">
        <button
          className="talk-saathi-pill-btn"
          onClick={() => {
            onVoiceCommand?.('talk');
            onNavigate('talkToSaathi');
          }}
          aria-label="Talk to Saathi Voice Assistant"
        >
          <span className="talk-saathi-mic-icon">🎙️</span>
          <span className="talk-saathi-text">TALK TO SAATHI</span>
        </button>
      </section>


      {/* ══════════════════════════════════════════════════════════════
          ROW 3: 5 BOTTOM FEATURE CARDS
      ══════════════════════════════════════════════════════════════ */}
      <section className="dashboard-bottom-grid">

        {/* ── FEATURE 1: Suggest Doctor by Disease ── */}
        <div className="dash-feature-card feat-doc-card">
          <h4 className="feat-title">Suggest Doctor by Disease</h4>

          {/* Body Anatomy Interactive Graphic */}
          <div className="anatomy-visual-container" onClick={onOpenDoctorSuggest}>
            <div className="anatomy-body-wrap">
              {/* Stylized Futuristic Neon Body Silhouette */}
              <svg className="anatomy-svg" viewBox="0 0 100 160">
                {/* Head */}
                <circle cx="50" cy="20" r="12" fill="none" stroke="#22C55E" strokeWidth="2.5" opacity="0.85" />
                {/* Neck & Shoulders */}
                <path d="M 44 32 L 44 38 L 22 48 L 18 85 L 24 85 L 28 56 L 36 56 L 36 95 L 42 150 L 48 150 L 48 100 L 52 100 L 52 150 L 58 150 L 64 95 L 64 56 L 72 56 L 76 85 L 82 85 L 78 48 L 56 38 L 56 32" 
                      fill="none" stroke="#22C55E" strokeWidth="2" opacity="0.85" />
                {/* Glowing Pulse Ring on Chest/Heart Region */}
                <circle cx="50" cy="54" r="8" fill="rgba(16, 185, 129, 0.4)" stroke="#10B981" strokeWidth="2" className="heart-target-pulse" />
                <circle cx="50" cy="54" r="3" fill="#FFFFFF" />
              </svg>

              <div className="anatomy-side-notes">
                <span className="anatomy-tooltip">Click the region by regions</span>
                <span className="anatomy-metric">HR: 72 bpm</span>
                <span className="anatomy-metric">BP: 120/80</span>
              </div>
            </div>
          </div>

          <div className="feat-doc-footer">
            <div className="feat-doc-header-row">
              <span className="feat-stat-bold">12+ Specialists</span>
              <button className="feat-link-btn" onClick={onOpenDoctorSuggest}>Open →</button>
            </div>
            <div className="feat-doc-items">
              <div className="doc-item-row" onClick={onOpenDoctorSuggest}>
                <span>🩺</span> <span>12+ Specialists by Disease</span>
              </div>
              <div className="doc-item-row" onClick={onOpenDoctorSuggest}>
                <span>🩺</span> <span>My Specialists</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── FEATURE 2: India's Best Hospitals ── */}
        <div className="dash-feature-card feat-hospital-card">
          <h4 className="feat-title">India's Best Hospitals</h4>

          {/* Interactive Map Visual */}
          <div className="hospital-map-container" onClick={() => onNavigate('hospitals')}>
            <div className="hospital-map-art">
              {/* Simulated Map Grid & Streets */}
              <svg className="map-vector-svg" viewBox="0 0 200 120">
                <rect width="200" height="120" fill="#0C1B24" />
                {/* River */}
                <path d="M 0 30 Q 70 60 140 35 T 200 50" fill="none" stroke="#0F384C" strokeWidth="14" opacity="0.7" />
                {/* Grid roads */}
                <path d="M 20 0 L 20 120 M 70 0 L 70 120 M 130 0 L 130 120 M 180 0 L 180 120" stroke="#162D3B" strokeWidth="2" />
                <path d="M 0 35 L 200 35 M 0 75 L 200 75 M 0 100 L 200 100" stroke="#162D3B" strokeWidth="2" />
                {/* Main highway */}
                <path d="M 0 60 Q 90 80 200 20" fill="none" stroke="#254B5E" strokeWidth="4" />
                
                {/* Red Pin 1: Nearby Top Hospital */}
                <g transform="translate(68, 42)">
                  <circle cx="0" cy="0" r="10" fill="rgba(239, 68, 68, 0.25)" />
                  <circle cx="0" cy="0" r="5" fill="#EF4444" />
                  <text x="7" y="3" fill="#FFFFFF" fontSize="7" fontWeight="bold">0.8 km</text>
                </g>

                {/* Orange/Yellow Pin 2: Apollo Hospital */}
                <g transform="translate(135, 75)">
                  <circle cx="0" cy="0" r="9" fill="rgba(245, 158, 11, 0.25)" />
                  <circle cx="0" cy="0" r="4.5" fill="#F59E0B" />
                  <text x="7" y="3" fill="#FDE68A" fontSize="7" fontWeight="bold">1.4 km</text>
                </g>
              </svg>

              <div className="map-badge-tag top-left">Nearby Top Hospitals</div>
              <div className="map-badge-tag top-right">📍 32m away</div>
              <span className="google-watermark">Google</span>
            </div>
          </div>

          <div className="hospital-card-info">
            <h5 className="hospital-sub-name">Nearby Top Hospitals</h5>
            <p className="hospital-desc-text">Nearby Top, Top Hospitals</p>
            <button className="book-appointment-btn" onClick={() => onNavigate('hospitals')}>
              Book Appointment
            </button>
          </div>
        </div>

        {/* ── FEATURE 3: My Medicines ── */}
        <div className="dash-feature-card feat-medicines-card">
          <div className="feat-header-with-badge">
            <h4 className="feat-title">My Medicines</h4>
            <span className="feat-count-badge">3 Today</span>
          </div>

          <div className="daily-pill-box-header">
            <span className="pill-box-title">Daily Pill Box</span>
            <span className="pill-box-taken-tag">Taken</span>
          </div>

          {/* 3 Day Slots Header: Morning, Afternoon, Evening */}
          <div className="pill-slots-grid">
            <div className="pill-slot-item">
              <span className="slot-name">Morning</span>
              <div className="pill-icon-block morning-pill">
                <span>💊</span>
              </div>
            </div>

            <div className="pill-slot-item">
              <span className="slot-name">Afternoon</span>
              <div className="pill-icon-block afternoon-pill">
                <span>💊</span>
              </div>
            </div>

            <div className="pill-slot-item">
              <span className="slot-name">Evening</span>
              <div className="pill-icon-block evening-pill">
                <span>💊</span>
              </div>
            </div>
          </div>

          {/* Interactive Checkbox Checklist Matrix */}
          <div className="pill-checklist-matrix">
            <div className="checklist-row">
              {pillStatus.row1.map((isChecked, i) => (
                <button
                  key={`r1-${i}`}
                  className={`pill-check-tag ${isChecked ? 'is-taken' : ''}`}
                  onClick={() => togglePill('row1', i)}
                  aria-label="Toggle morning pill taken"
                >
                  <span className="check-mark">{isChecked ? '✓' : '□'}</span>
                  <span>Taken</span>
                </button>
              ))}
            </div>

            <div className="checklist-row">
              {pillStatus.row2.map((isChecked, i) => (
                <button
                  key={`r2-${i}`}
                  className={`pill-check-tag ${isChecked ? 'is-taken' : ''}`}
                  onClick={() => togglePill('row2', i)}
                  aria-label="Toggle evening pill taken"
                >
                  <span className="check-mark">{isChecked ? '✓' : '□'}</span>
                  <span>Taken</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── FEATURE 4: Phone & Prescription Help ── */}
        <div className="dash-feature-card feat-phonehelp-card">
          <h4 className="feat-title">Phone & Prescription Help</h4>

          <div className="saathi-call-action-block">
            <div className="saathi-brand-badge">
              <span className="saathi-call-logo">📞</span>
              <span className="saathi-call-brandname">SAATHI</span>
            </div>

            <button
              className="start-call-pill-btn"
              onClick={() => onNavigate('talkToSaathi')}
            >
              Start Call
            </button>
          </div>

          <div
            className="scan-prescription-block"
            onClick={() => onNavigate('phoneHelp')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('phoneHelp')}
          >
            <div className="scan-icon-wrap">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                <path d="M3 7V5a2 2 0 0 1 2-2h2 M17 3h2a2 2 0 0 1 2 2v2 M21 17v2a2 2 0 0 1-2 2h-2 M7 21H5a2 2 0 0 1-2-2v-2" />
                <line x1="7" y1="12" x2="17" y2="12" />
              </svg>
            </div>
            <span className="scan-presc-label">Scan Prescription</span>
          </div>
        </div>

        {/* ── FEATURE 5: My Family ── */}
        <div className="dash-feature-card feat-family-card">
          <div className="feat-header-with-badge">
            <h4 className="feat-title">My Family</h4>
            <span className="feat-count-badge green-badge">Connected</span>
          </div>

          {/* Family Tree Graphic with Parent & Child Nodes */}
          <div className="family-tree-visual">
            <div className="tree-parent-node">
              <div className="tree-avatar-circle">
                <span>👨‍⚕️</span>
              </div>
              <span className="tree-parent-label">Dr. Sharma</span>
            </div>

            {/* Connecting Tree Lines */}
            <div className="tree-connectors">
              <div className="tree-vertical-stem"></div>
              <div className="tree-horizontal-bar"></div>
            </div>

            {/* 4 Child Member Nodes */}
            <div className="tree-children-row">
              <div className="tree-child-node">
                <span className="tree-child-avatar">👧</span>
                <span className="tree-child-name">Priya</span>
              </div>
              <div className="tree-child-node">
                <span className="tree-child-avatar">👦</span>
                <span className="tree-child-name">Ravi</span>
              </div>
              <div className="tree-child-node">
                <span className="tree-child-avatar">👦</span>
                <span className="tree-child-name">Amit</span>
              </div>
              <div className="tree-child-node">
                <span className="tree-child-avatar">👩</span>
                <span className="tree-child-name">Sunita</span>
              </div>
            </div>
          </div>

          {/* Bottom Family Quick Action Links */}
          <div className="family-card-action-links">
            <div className="family-mini-link" onClick={() => onNavigate('familyDashboard')}>
              <span className="mini-link-icon">👨‍⚕️</span>
              <span className="mini-link-text">Dr. Sharma - Teleconsult - 10:00 AM</span>
            </div>
            <div className="family-mini-link highlight-link" onClick={() => onNavigate('familyDashboard')}>
              <span className="mini-link-icon">📑</span>
              <span className="mini-link-text">Quick access to their Health Records →</span>
            </div>
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════════════════════════════
          BOTTOM BAR: SECONDARY TALK TO SAATHI + FLOATING HELP
      ══════════════════════════════════════════════════════════════ */}
      <section className="dashboard-mic-center bottom-mic">
        <button
          className="talk-saathi-pill-btn"
          onClick={() => {
            onVoiceCommand?.('talk');
            onNavigate('talkToSaathi');
          }}
          aria-label="Talk to Saathi Voice Assistant"
        >
          <span className="talk-saathi-mic-icon">🎙️</span>
          <span className="talk-saathi-text">TALK TO SAATHI</span>
        </button>
      </section>

      {/* Floating Talk to Us Pill Badge */}
      <div 
        className="talk-to-us-floating-bubble"
        onClick={() => onNavigate('talkToSaathi')}
        role="button"
        tabIndex={0}
        title="Chat with Saathi Care Assistant"
      >
        <span>💬</span>
        <span>Talk to Us</span>
      </div>

    </div>
  );
}

export default Home;
