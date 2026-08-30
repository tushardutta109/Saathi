import React from 'react';

export function Navigation({ activeTab, setActiveTab, t }) {
  const navItems = [
    { id: 'home', label: t.navHome, icon: '🏠' },
    { id: 'hospitals', label: t.navHospitals || 'Best Hospitals', icon: '🏥' },
    { id: 'medicines', label: t.navMedicines, icon: '💊' },
    { id: 'vitals', label: t.navVitals || 'Footstep Counter', icon: '👟' },
    { id: 'phoneHelp', label: t.navPhoneHelp, icon: '📱' },
    { id: 'talkToSaathi', label: t.navTalk, icon: '🎙️' },
    { id: 'familyDashboard', label: t.navFamily, icon: '👨‍👩‍👧' },
  ];

  return (
    <nav className="nav-container" aria-label="Main Navigation">
      <div className="nav-inner">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
            aria-current={activeTab === item.id ? 'page' : undefined}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
