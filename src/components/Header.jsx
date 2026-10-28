import React, { useState, useEffect } from 'react';
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
  const [langSearchQuery, setLangSearchQuery] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch((err) => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      document.exitFullscreen?.().catch((err) => {
        console.warn('Exit fullscreen failed:', err);
      });
    }
  };

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

  const filteredLanguages = languages.filter(l => 
    l.name.toLowerCase().includes(langSearchQuery.toLowerCase()) || 
    l.code.toLowerCase().includes(langSearchQuery.toLowerCase())
  );

  return (
    <header className="header-container">
      <div className="header-inner">
        <div className="brand-section" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Flower sprout logo from screenshot */}
          <svg width="34" height="40" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path d="M12 11V26" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M12 21C9 20 7 22 7 24C9 24 11 23 12 21Z" fill="#16a34a" />
            <path d="M12 21C15 20 17 22 17 24C15 24 13 23 12 21Z" fill="#16a34a" />
            <ellipse cx="12" cy="7" rx="3.5" ry="5" fill="#a78bfa" />
            <ellipse cx="12" cy="15" rx="3.5" ry="5" fill="#a78bfa" />
            <ellipse cx="8" cy="11" rx="5" ry="3.5" fill="#c084fc" />
            <ellipse cx="16" cy="11" rx="5" ry="3.5" fill="#c084fc" />
            <circle cx="12" cy="11" r="2.5" fill="#facc15" />
          </svg>
          <div className="brand-text-container" style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 className="brand-title" style={{ color: '#10b981', fontSize: '26px', fontWeight: '800', letterSpacing: '0.8px', margin: 0, lineHeight: 1.2 }}>SAATHI</h1>
            <span className="brand-tagline" style={{ color: '#8899a6', fontSize: '14px', fontWeight: '500', lineHeight: 1.2 }}>Technology that speaks your language.</span>
          </div>
        </div>

        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Global Search Button */}
          <button 
            className="btn-search-header"
            onClick={onOpenSearch}
            title={lang === 'hi' ? 'खोजें (Search)' : 'Search Doctor, Hospital, Medicine'}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              color: '#f1f5f9',
              border: '1px solid #1e293b',
              borderRadius: '9999px',
              padding: '6px 16px',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontSize: '13px' }}>🔍</span>
            <span className="btn-search-text" style={{ fontWeight: '600' }}>Search</span>
          </button>

          {/* Pay Bill Button */}
          <button 
            className="btn-pay-header"
            onClick={onOpenPayment}
            title="Pay Bill"
            style={{
              backgroundColor: 'rgba(16, 185, 129, 0.08)',
              color: '#10b981',
              border: '1px solid #0d5f47',
              borderRadius: '9999px',
              padding: '6px 16px',
              fontWeight: '600',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontSize: '14px' }}>💳</span>
            <span className="btn-pay-text" style={{ fontWeight: '600' }}>Pay Bill</span>
          </button>

          {/* Find a Doctor Button */}
          <button 
            className="btn-doctor-suggest-header"
            onClick={onOpenDoctorSuggest}
            title="Find a Doctor"
            style={{
              backgroundColor: '#10b981',
              color: '#032314',
              border: 'none',
              borderRadius: '9999px',
              padding: '6px 18px',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 10px rgba(16, 185, 129, 0.25)',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontSize: '13px' }}>💡</span>
            <span className="btn-doc-text" style={{ fontWeight: '700' }}>Find a Doctor</span>
          </button>

          {/* Dark / Light Mode Toggle Button */}
          <button 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid #1e293b',
              color: '#94a3b8',
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              cursor: 'pointer',
              fontSize: '15px',
              transition: 'all 0.2s ease'
            }}
          >
            <span>{theme === 'light' ? '🌙' : '☀️'}</span>
          </button>
 
          {/* Fullscreen Toggle Button */}
          <button 
            className="fullscreen-toggle-btn"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
            title={isFullscreen ? 'Exit Full Screen (Esc)' : 'Enter Full Screen (F11)'}
            style={{
              backgroundColor: isFullscreen ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
              border: isFullscreen ? '1px solid #10b981' : '1px solid #1e293b',
              color: isFullscreen ? '#10b981' : '#94a3b8',
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              cursor: 'pointer',
              fontSize: '15px',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontSize: '15px' }}>{isFullscreen ? '🗗' : '⛶'}</span>
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
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid #0d5f47',
                color: '#10b981',
                borderRadius: '9999px',
                padding: '6px 14px',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '14px' }}>🌐</span>
              <span className="lang-toggle-label">{currentLangObj.name.split(' ')[0]}</span>
              <span style={{ fontSize: '10px', marginLeft: '2px', opacity: 0.8 }}>▼</span>
            </button>

            {isLangMenuOpen && (
              <>
                <div 
                  className="notification-backdrop" 
                  onClick={() => {
                    setIsLangMenuOpen(false);
                    setLangSearchQuery('');
                  }} 
                />

                <div className="lang-dropdown-menu animate-fadeIn">
                  <div className="lang-menu-title">
                    🌐 {t.languageToggle || 'Select Language'}
                  </div>

                  <div style={{ padding: '0 12px 8px 12px' }}>
                    <input 
                      type="text" 
                      placeholder={lang === 'hi' ? 'भाषा खोजें...' : 'Search language...'}
                      value={langSearchQuery}
                      onChange={(e) => setLangSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-color, #ccc)',
                        backgroundColor: 'var(--bg-main, #fff)',
                        color: 'var(--text-main, #333)',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                      autoFocus
                    />
                  </div>

                  {filteredLanguages.length > 0 ? filteredLanguages.map((item) => (
                    <button
                      key={item.code}
                      className={`lang-option-btn ${lang === item.code ? 'active' : ''}`}
                      onClick={() => {
                        setLang(item.code);
                        setIsLangMenuOpen(false);
                        setLangSearchQuery('');
                      }}
                    >
                      <span className="lang-flag">{item.flag}</span>
                      <span className="lang-name-text">{item.name}</span>
                      {lang === item.code && <span className="lang-check-mark">✓</span>}
                    </button>
                  )) : (
                    <div style={{ padding: '12px', textAlign: 'center', fontSize: '14px', color: 'var(--text-muted, #666)' }}>
                      No language found
                    </div>
                  )}
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
