import React, { useState, useEffect, useRef } from 'react';
import { hospitalsData, emergencyHelplines } from '../data/hospitalsData';
import { doctorSuggestionsData } from '../data/doctorSuggestionsData';

export function GlobalSearchModal({ 
  isOpen, 
  onClose, 
  onNavigate, 
  onOpenDoctorSuggest, 
  onOpenPayment, 
  lang = 'en', 
  t 
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // 1. Search Hospitals & Emergency Numbers
  const matchedHospitals = hospitalsData.filter(h => {
    if (!q) return false;
    const nameEn = h.nameEn.toLowerCase();
    const nameHi = h.nameHi.toLowerCase();
    const locEn = h.locationEn.toLowerCase();
    const locHi = h.locationHi.toLowerCase();
    const specEn = h.specialitiesEn.some(s => s.toLowerCase().includes(q));
    const specHi = h.specialitiesHi.some(s => s.includes(q));
    return nameEn.includes(q) || nameHi.includes(q) || locEn.includes(q) || locHi.includes(q) || specEn || specHi;
  }).slice(0, 4);

  // 2. Search Helplines
  const matchedHelplines = emergencyHelplines.filter(h => {
    if (!q) return false;
    const num = h.number.toLowerCase();
    const titleEn = h.titleEn.toLowerCase();
    const titleHi = h.titleHi.toLowerCase();
    return num.includes(q) || titleEn.includes(q) || titleHi.includes(q);
  });

  // 3. Search Diseases & Doctors
  const matchedDiseases = doctorSuggestionsData.filter(d => {
    if (!q) return false;
    const nameEn = d.diseaseNameEn.toLowerCase();
    const nameHi = d.diseaseNameHi.toLowerCase();
    const specEn = d.specialistTitleEn.toLowerCase();
    const specHi = d.specialistTitleHi.toLowerCase();
    return nameEn.includes(q) || nameHi.includes(q) || specEn.includes(q) || specHi.includes(q);
  }).slice(0, 4);

  // 4. Quick App Features matching query
  const featureList = [
    { 
      id: 'doctor-suggest', 
      title: lang === 'hi' ? '🩺 बीमारी के अनुसार डॉक्टर सुझाव' : '🩺 Doctor Suggestion by Disease', 
      desc: 'Find specialist doctors & medical tests',
      action: () => { onClose(); onOpenDoctorSuggest(); },
      keywords: ['doctor', 'डॉक्टर', 'disease', 'बीमारी', 'specialist', 'विशेषज्ञ', 'hospital', 'अस्पताल']
    },
    { 
      id: 'hospitals', 
      title: lang === 'hi' ? '🏥 भारत के शीर्ष अस्पताल व एम्बुलेंस' : "🏥 India's Top Hospitals & Helplines", 
      desc: 'Hospital contacts, OPD & 24x7 emergency helplines',
      action: () => { onClose(); onNavigate('hospitals'); },
      keywords: ['hospital', 'अस्पताल', 'aiims', 'एम्स', 'fortis', 'apollo', 'ambulance', 'एम्बुलेंस', '108', '112', 'helpline']
    },
    { 
      id: 'medicines', 
      title: lang === 'hi' ? '💊 दवाइयाँ और खुराक का समय' : '💊 Medicine Reminders & Schedule', 
      desc: 'Daily medicine dosage & pill alarm timing',
      action: () => { onClose(); onNavigate('medicines'); },
      keywords: ['medicine', 'दवा', 'tablet', 'गोली', 'dosage', 'खुराक', 'bp', 'sugar', 'pantoprazole', 'telmisartan', 'schedule']
    },
    { 
      id: 'phoneHelp', 
      title: lang === 'hi' ? '📱📄 डॉक्टर पर्चा रीडर व फोन सहायता' : '📱📄 Prescription Reader & Phone Help', 
      desc: 'Upload doctor prescription photo & get instant audio instructions',
      action: () => { onClose(); onNavigate('phoneHelp'); },
      keywords: ['prescription', 'पर्चा', 'doctor prescription', 'photo', 'whatsapp', 'upi', 'reader', 'phone', 'help']
    },
    { 
      id: 'vitals', 
      title: lang === 'hi' ? '👟 मरीज कदम व गतिशीलता काउंटर' : '👟 Patient Footstep Counter', 
      desc: 'Real-time footstep counter & health activity stats',
      action: () => { onClose(); onNavigate('vitals'); },
      keywords: ['step', 'कदम', 'walk', 'चलो', 'footstep', 'vitals', 'health', 'calories', 'distance', 'mobility']
    },
    { 
      id: 'talkToSaathi', 
      title: lang === 'hi' ? '🎙️ साथी से बात करें (Voice Assistant)' : '🎙️ Talk to SAATHI Voice AI', 
      desc: 'Multilingual voice assistant - ask anything in Hindi, Bengali, Assamese',
      action: () => { onClose(); onNavigate('talkToSaathi'); },
      keywords: ['talk', 'बात', 'saathi', 'साथी', 'voice', 'आवाज', 'speak', 'बोलें', 'ai', 'assistant']
    },
    { 
      id: 'payment', 
      title: lang === 'hi' ? '💳 अस्पताल बिल व ऑनलाइन भुगतान' : '💳 Hospital Bill & OPD Payment', 
      desc: 'Pay bills via GPay, PhonePe, Paytm, RuPay, or Ayushman Bharat',
      action: () => { onClose(); onOpenPayment(); },
      keywords: ['pay', 'पेमेंट', 'payment', 'bill', 'बिल', 'upi', 'gpay', 'phonepe', 'ayushman', 'card']
    },
    { 
      id: 'familyDashboard', 
      title: lang === 'hi' ? '👨‍👩‍👧 परिवार व देखभालकर्ता डैशबोर्ड' : '👨‍👩‍👧 Caregiver & Family Dashboard', 
      desc: 'Monitor patient medicine updates & family alerts',
      action: () => { onClose(); onNavigate('familyDashboard'); },
      keywords: ['family', 'परिवार', 'caregiver', 'रमेश', 'dashboard', 'alert', 'संगठित']
    }
  ];

  const matchedFeatures = featureList.filter(f => {
    if (!q) return true; // Show all features if search is empty
    const tLower = f.title.toLowerCase();
    const dLower = f.desc.toLowerCase();
    const kwMatch = f.keywords.some(k => k.toLowerCase().includes(q));
    return tLower.includes(q) || dLower.includes(q) || kwMatch;
  });

  const totalMatches = matchedHospitals.length + matchedHelplines.length + matchedDiseases.length + (q ? matchedFeatures.length : 0);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="modal-card global-search-modal animate-fadeIn" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          width: '95vw',
          maxHeight: '88vh',
          padding: '24px 20px',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
          gap: '16px'
        }}
      >
        {/* Search Bar Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="search-input-wrapper" style={{ flex: 1, margin: 0 }}>
            <span className="search-input-icon" style={{ fontSize: '22px' }}>🔍</span>
            <input 
              ref={inputRef}
              type="text"
              className="hospital-search-input"
              placeholder={
                lang === 'hi'
                  ? 'खोजें: डॉक्टर, अस्पताल, दवाइयां, 108 एम्बुलेंस, कदम, पर्चा...'
                  : lang === 'bn'
                  ? 'খুঁজুন: ডাক্তার, হাসপাতাল, ওষুধ, ১০৮ অ্যাম্বুলেন্স...'
                  : lang === 'as'
                  ? 'সন্ধান কৰক: ডাক্তৰ, হাস্পতাল, ঔষধ, ১০৮ এম্বুলেন্স...'
                  : 'Search: doctor, hospital, medicine, 108 ambulance, steps...'
              }
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ fontSize: '18px', padding: '14px 16px 14px 44px', borderRadius: '16px' }}
            />
            {query && (
              <button 
                className="clear-search-btn" 
                onClick={() => setQuery('')}
                style={{ right: '12px' }}
              >
                ✕
              </button>
            )}
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'var(--bg-secondary)',
              border: '2px solid var(--border-dark)',
              borderRadius: '16px',
              padding: '12px 16px',
              fontWeight: '800',
              fontSize: '16px',
              color: 'var(--primary-forest)',
              cursor: 'pointer'
            }}
          >
            {lang === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>

        {/* Results Body */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '4px' }}>
          {/* 1. Helplines & Emergency Quick Match */}
          {matchedHelplines.length > 0 && (
            <div>
              <div style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--red-alert)', marginBottom: '8px' }}>
                🚨 {lang === 'hi' ? 'आपातकालीन हेल्पलाइन' : 'Emergency Hotlines'}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
                {matchedHelplines.map(h => (
                  <a
                    key={h.id}
                    href={`tel:${h.number}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'var(--red-alert-bg)',
                      border: '1.5px solid var(--red-alert)',
                      padding: '10px 14px',
                      borderRadius: '14px',
                      textDecoration: 'none'
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: '16px', color: 'var(--red-alert)', display: 'block' }}>
                        {h.icon} {lang === 'hi' ? h.titleHi : h.titleEn}
                      </strong>
                      <span style={{ fontSize: '13px', color: 'var(--text-sub)' }}>
                        {lang === 'hi' ? h.descHi : h.descEn}
                      </span>
                    </div>
                    <span style={{ backgroundColor: 'var(--red-alert)', color: '#FFF', fontWeight: '900', padding: '6px 10px', borderRadius: '10px', fontSize: '15px' }}>
                      📞 {h.number}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* 2. Matched Diseases & Recommended Doctor Specialists */}
          {matchedDiseases.length > 0 && (
            <div>
              <div style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--primary-forest)', marginBottom: '8px' }}>
                🩺 {lang === 'hi' ? 'बीमारी व अनुशंसित डॉक्टर' : 'Diagnosed Diseases & Doctor Specialists'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {matchedDiseases.map(d => (
                  <div
                    key={d.id}
                    onClick={() => {
                      onClose();
                      onOpenDoctorSuggest();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'var(--bg-secondary-light)',
                      border: '1.5px solid var(--primary-forest)',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '26px' }}>{d.icon}</span>
                      <div>
                        <strong style={{ fontSize: '16px', color: 'var(--primary-forest)', display: 'block' }}>
                          {lang === 'hi' ? d.diseaseNameHi : d.diseaseNameEn}
                        </strong>
                        <span style={{ fontSize: '13px', color: 'var(--text-sub)' }}>
                          Specialist: <strong>{lang === 'hi' ? d.specialistTitleHi : d.specialistTitleEn}</strong>
                        </span>
                      </div>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary-forest)', backgroundColor: 'var(--bg-card)', padding: '6px 12px', borderRadius: '10px', border: '1px solid var(--border-dark)' }}>
                      View Doctor →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Matched Hospitals */}
          {matchedHospitals.length > 0 && (
            <div>
              <div style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--primary-forest)', marginBottom: '8px' }}>
                🏥 {lang === 'hi' ? 'अस्पताल' : 'Top Hospitals'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {matchedHospitals.map(h => (
                  <div
                    key={h.id}
                    onClick={() => {
                      onClose();
                      onNavigate('hospitals');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-dark)',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: '16px', color: 'var(--primary-forest)', display: 'block' }}>
                        🏥 {lang === 'hi' ? h.nameHi : h.nameEn}
                      </strong>
                      <span style={{ fontSize: '13px', color: 'var(--text-sub)' }}>
                        📍 {lang === 'hi' ? h.locationHi : h.locationEn} • Emergency: <strong style={{ color: 'var(--red-alert)' }}>{h.emergencyNumber}</strong>
                      </span>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary-forest)' }}>
                      Open Directory →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Feature Jump Cards */}
          <div>
            <div style={{ fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-sub)', marginBottom: '8px' }}>
              💡 {q ? (lang === 'hi' ? 'सुझाई गई सुविधाएँ' : 'Matching Features & Pages') : (lang === 'hi' ? 'मुख्य सुविधाएँ' : 'Quick Feature Shortcuts')}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
              {matchedFeatures.map(feat => (
                <div
                  key={feat.id}
                  onClick={feat.action}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1.5px solid var(--border-color)',
                    padding: '14px 16px',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  className="preset-card-btn"
                >
                  <strong style={{ fontSize: '17px', color: 'var(--primary-forest)', display: 'block', marginBottom: '4px' }}>
                    {feat.title}
                  </strong>
                  <span style={{ fontSize: '13px', color: 'var(--text-sub)', fontWeight: '600' }}>
                    {feat.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {q && totalMatches === 0 && (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <span style={{ fontSize: '42px' }}>🔍</span>
              <h4 style={{ fontSize: '20px', color: 'var(--primary-forest)', margin: '8px 0 4px 0' }}>
                {lang === 'hi' ? 'कोई परिणाम नहीं मिला' : 'No matching results'}
              </h4>
              <p style={{ fontSize: '15px', color: 'var(--text-sub)' }}>
                {lang === 'hi' ? 'कृपया अलग शब्द या नाम टाइप करके देखें।' : 'Try searching with another keyword like Doctor, Hospital, BP, or 108.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GlobalSearchModal;
