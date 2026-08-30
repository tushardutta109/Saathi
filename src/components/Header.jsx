import React, { useState } from 'react';
import NotificationCenter from './NotificationCenter';

export function Header({ 
  lang, 
  setLang, 
  theme, 
  setTheme, 
  notifications, 
  setNotifications,
  isNotifOpen,
  setIsNotifOpen,
  onAddTestNotification,
  onOpenDoctorSuggest,
  onOpenPayment,
  onOpenSearch,
  t 
}) {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇮🇳' },
    { code: 'as', name: 'অসমীয়া (Assamese)', flag: '🇮🇳' },
  ];

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('saathi_theme', newTheme);
  };

  const currentLangObj = languages.find(l => l.code === lang) || languages[0];

  return (
    <header className="header-container">
      <div className="header-inner">
        <div className="brand-section">
          <span className="brand-logo" role="img" aria-label="Saathi Flower Logo">🌼</span>
          <div className="brand-text-container">
            <h1 className="brand-title">{t.appName}</h1>
            <span className="brand-tagline">{t.tagline}</span>
          </div>
        </div>

        <div className="header-actions">
          {/* Global Search Button */}
          <button 
            className="btn-search-header"
            onClick={onOpenSearch}
            title={lang === 'hi' ? 'खोजें (Search)' : 'Search Doctor, Hospital, Medicine'}
            style={{
              backgroundColor: 'var(--bg-card)',
              color: 'var(--primary-forest)',
              border: '2px solid var(--primary-forest)',
              borderRadius: '16px',
              padding: '8px 14px',
              fontWeight: '800',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 3px 10px rgba(0,0,0,0.08)'
            }}
          >
            <span>🔍</span>
            <span className="btn-search-text">{lang === 'hi' ? 'खोजें' : 'Search'}</span>
          </button>
          {/* Pay Bill / Book Button */}
          <button 
            className="btn-pay-header"
            onClick={onOpenPayment}
            title={t.btnPayHospital || "Pay Bill / Book"}
            style={{
              backgroundColor: 'var(--gold-accent)',
              color: '#332200',
              border: 'none',
              borderRadius: '16px',
              padding: '8px 14px',
              fontWeight: '800',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 3px 10px rgba(0,0,0,0.12)'
            }}
          >
            <span>💳</span>
            <span className="btn-pay-text">{t.btnPayHospital || "Pay Bill"}</span>
          </button>

          {/* Doctor Suggestion Button */}
          <button 
            className="btn-doctor-suggest-header"
            onClick={onOpenDoctorSuggest}
            title={t.btnDoctorSuggest || "Suggest Doctor by Disease"}
            style={{
              backgroundColor: 'var(--primary-forest)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '16px',
              padding: '8px 14px',
              fontWeight: '800',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 3px 10px rgba(0,0,0,0.12)'
            }}
          >
            <span>🩺</span>
            <span className="btn-doc-text">{t.btnDoctorSuggest || "Doctor Suggestion"}</span>
          </button>

          {/* Dark / Light Mode Toggle Button */}
          <button 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          >
            <span style={{ fontSize: '20px' }}>{theme === 'light' ? '🌙' : '☀️'}</span>
            <span className="theme-toggle-label">
              {theme === 'light' 
                ? (lang === 'hi' ? 'डार्क' : lang === 'bn' ? 'ডার্ক' : lang === 'as' ? 'ডাৰ্ক' : 'Dark') 
                : (lang === 'hi' ? 'लाइट' : lang === 'bn' ? 'লাইটিং' : lang === 'as' ? 'লাইট' : 'Light')}
            </span>
          </button>

          {/* Notifications Center Bell */}
          <NotificationCenter 
            notifications={notifications}
            setNotifications={setNotifications}
            isOpen={isNotifOpen}
            setIsOpen={setIsNotifOpen}
            onAddTestNotification={onAddTestNotification}
            t={t}
          />

          {/* Multi-Language Selector Menu */}
          <div className="lang-menu-wrapper" style={{ position: 'relative' }}>
            <button 
              className="lang-toggle-btn"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              aria-label="Switch Language / भाषा নির্বাচন করুন"
              title="Select Language"
            >
              <span>🌐</span>
              <span className="lang-toggle-label">{currentLangObj.name.split(' ')[0]}</span>
              <span style={{ fontSize: '12px', marginLeft: '2px' }}>▼</span>
            </button>

            {isLangMenuOpen && (
              <>
                <div 
                  className="notification-backdrop" 
                  onClick={() => setIsLangMenuOpen(false)} 
                />

                <div className="lang-dropdown-menu animate-fadeIn">
                  <div className="lang-menu-title">
                    🌐 {t.languageToggle || 'Select Language'}
                  </div>

                  {languages.map((item) => (
                    <button
                      key={item.code}
                      className={`lang-option-btn ${lang === item.code ? 'active' : ''}`}
                      onClick={() => {
                        setLang(item.code);
                        setIsLangMenuOpen(false);
                      }}
                    >
                      <span className="lang-flag">{item.flag}</span>
                      <span className="lang-name-text">{item.name}</span>
                      {lang === item.code && <span className="lang-check-mark">✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
