import React, { useState } from 'react';
import { hospitalsData, emergencyHelplines, citiesList } from '../data/hospitalsData';

export function Hospitals({ lang, t, onAddNotification, onOpenDoctorSuggest, onOpenPayment }) {
  const [selectedCity, setSelectedCity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  // Toggle favorite hospital
  const toggleFavorite = (hospital) => {
    const isFav = favorites.includes(hospital.id);
    if (isFav) {
      setFavorites(prev => prev.filter(id => id !== hospital.id));
      onAddNotification({
        title: lang === 'hi' ? 'हटाया गया' : 'Favorite Removed',
        message: `${hospital.nameEn} ${lang === 'hi' ? 'पसंदीदा सूची से हटाया गया' : 'removed from favorites'}`,
        icon: '🗑️',
        type: 'info'
      });
    } else {
      setFavorites(prev => [...prev, hospital.id]);
      onAddNotification({
        title: lang === 'hi' ? 'पसंदीदा अस्पताल सहेजा गया 🌟' : 'Hospital Saved 🌟',
        message: `${hospital.nameEn} ${lang === 'hi' ? 'आपकी पसंदीदा सूची में जोड़ दिया गया है।' : 'saved to your quick contacts list.'}`,
        icon: '🏥',
        type: 'hospital'
      });
    }
  };

  // Copy hospital number
  const copyHospitalContact = (hospital) => {
    const text = `${hospital.nameEn}\nHelpline: ${hospital.helplineNumber}\nEmergency: ${hospital.emergencyNumber}\nLocation: ${hospital.locationEn}`;
    navigator.clipboard.writeText(text);
    setCopiedId(hospital.id);
    setTimeout(() => setCopiedId(null), 2500);

    onAddNotification({
      title: lang === 'hi' ? 'संपर्क कॉपी किया गया 📋' : 'Contact Copied 📋',
      message: `${hospital.nameEn} - ${hospital.emergencyNumber}`,
      icon: '📋',
      type: 'info'
    });
  };

  // Filter logic
  const filteredHospitals = hospitalsData.filter(hospital => {
    const matchesCity = selectedCity === 'all' || hospital.city === selectedCity;
    
    const query = searchQuery.toLowerCase().trim();
    const nameMatch = hospital.nameEn.toLowerCase().includes(query) || hospital.nameHi.includes(query);
    const locMatch = hospital.locationEn.toLowerCase().includes(query) || hospital.locationHi.includes(query);
    const specMatchEn = hospital.specialitiesEn.some(s => s.toLowerCase().includes(query));
    const specMatchHi = hospital.specialitiesHi.some(s => s.includes(query));
    const matchesSearch = !query || nameMatch || locMatch || specMatchEn || specMatchHi;

    const matchesSpec = selectedSpeciality === 'all' || 
      hospital.specialitiesEn.some(s => s.toLowerCase().includes(selectedSpeciality.toLowerCase()));

    return matchesCity && matchesSearch && matchesSpec;
  });

  return (
    <div className="hospitals-page-container animate-fadeIn">
      {/* Top Banner & Header */}
      <section className="hospitals-hero-header">
        <div className="hospitals-hero-text">
          <div className="badge-india-top">
            🇮🇳 {lang === 'hi' ? 'भारत के सर्वश्रेष्ठ अस्पताल व हेल्पलाइन' : "India's Best Hospitals & Emergency Helpline"}
          </div>
          <h2>{lang === 'hi' ? 'भारत के शीर्ष अस्पताल और आपातकालीन हेल्पलाइन' : "India's Top Hospitals & Emergency Directory"}</h2>
          <p className="hero-subtext">
            {lang === 'hi' 
              ? 'आपातकालीन नंबर, 24x7 एम्बुलेंस सेवा, अस्पताल हेल्पलाइन नंबर और विशेषज्ञ डॉक्टरों की सीधी जानकारी।'
              : 'Direct hotline numbers, 24x7 ambulance services, emergency helplines, and top hospital details across India.'}
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '14px' }}>
            <button 
              className="btn-hero-doctor-suggest"
              onClick={onOpenDoctorSuggest}
              style={{
                backgroundColor: '#FFFFFF',
                color: 'var(--primary-forest)',
                border: '2px solid var(--gold-accent)',
                borderRadius: '16px',
                padding: '12px 20px',
                fontWeight: '800',
                fontSize: '17px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              <span>🩺</span>
              <span>{t.btnDoctorSuggest || "Suggest Doctor by Diagnosed Disease"}</span>
            </button>

            <button 
              className="btn-hero-pay"
              onClick={onOpenPayment}
              style={{
                backgroundColor: 'var(--gold-accent)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '16px',
                padding: '12px 20px',
                fontWeight: '800',
                fontSize: '17px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            >
              <span>💳</span>
              <span>{t.btnPayHospital || "Pay Bill / Book OPD"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Emergency Helplines SOS Grid */}
      <section className="emergency-helpline-grid-section">
        <h3 className="section-title-label">
          🚨 {lang === 'hi' ? 'राष्ट्रीय आपातकालीन हेल्पलाइन नंबर (24x7 Free)' : 'National Emergency Hotlines (24x7)'}
        </h3>

        <div className="helpline-cards-grid">
          {emergencyHelplines.map((helpline) => (
            <div key={helpline.id} className="helpline-card">
              <div className="helpline-card-top">
                <span className="helpline-icon">{helpline.icon}</span>
                <span className="helpline-number-tag">{helpline.number}</span>
              </div>
              <h4 className="helpline-title">
                {lang === 'hi' ? helpline.titleHi : helpline.titleEn}
              </h4>
              <p className="helpline-desc">
                {lang === 'hi' ? helpline.descHi : helpline.descEn}
              </p>
              <a 
                href={`tel:${helpline.number}`} 
                className="btn-call-emergency-direct"
                onClick={() => {
                  onAddNotification({
                    title: lang === 'hi' ? 'आपातकालीन कॉल डायल की गई 📞' : 'Calling Emergency Helpline 📞',
                    message: `${lang === 'hi' ? helpline.titleHi : helpline.titleEn} - ${helpline.number}`,
                    icon: '🚨',
                    type: 'emergency'
                  });
                }}
              >
                📞 {lang === 'hi' ? `कॉल करें (${helpline.number})` : `Call Now (${helpline.number})`}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="hospitals-search-section">
        <div className="search-input-wrapper">
          <span className="search-input-icon">🔍</span>
          <input 
            type="text"
            className="hospital-search-input"
            placeholder={
              lang === 'hi' 
                ? 'अस्पताल का नाम, शहर या बीमारी खोजें (जैसे एम्स, दिल्ली, कैंसर, हृदय)...' 
                : 'Search hospital name, city, or speciality (e.g. AIIMS, Delhi, Heart, Cancer)...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>

        {/* City Filter Tabs */}
        <div className="city-filter-container">
          <span className="filter-label-text">📍 {lang === 'hi' ? 'शहर चुनें:' : 'Select City:'}</span>
          <div className="city-chips-scroll">
            {citiesList.map((city) => (
              <button 
                key={city.id}
                className={`city-chip ${selectedCity === city.id ? 'active' : ''}`}
                onClick={() => setSelectedCity(city.id)}
              >
                {lang === 'hi' ? city.labelHi : city.labelEn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hospital Directory Results */}
      <section className="hospitals-list-section">
        <div className="results-header-row">
          <h3>
            🏥 {lang === 'hi' ? 'अस्पतालों की सूची' : 'Hospital Directory'} ({filteredHospitals.length})
          </h3>
          {favorites.length > 0 && (
            <span className="fav-count-badge">
              ⭐ {favorites.length} {lang === 'hi' ? 'पसंदीदा' : 'Saved'}
            </span>
          )}
        </div>

        {filteredHospitals.length === 0 ? (
          <div className="no-results-card">
            <span style={{ fontSize: '48px' }}>🏥</span>
            <h4>{lang === 'hi' ? 'कोई अस्पताल नहीं मिला' : 'No hospitals match your search'}</h4>
            <p>{lang === 'hi' ? 'कृपया अलग शब्द या शहर चुनकर प्रयास करें।' : 'Try searching with another city or key term.'}</p>
            <button 
              className="btn btn-secondary"
              onClick={() => { setSelectedCity('all'); setSearchQuery(''); setSelectedSpeciality('all'); }}
            >
              🔄 {lang === 'hi' ? 'सभी फ़िल्टर हटाएं' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="hospitals-cards-grid">
            {filteredHospitals.map((hospital) => {
              const isFav = favorites.includes(hospital.id);

              return (
                <div key={hospital.id} className={`hospital-detail-card ${isFav ? 'favorite-border' : ''}`}>
                  {/* Top Bar: Badges */}
                  <div className="hospital-card-top-bar">
                    <span className="hospital-rating-badge">{hospital.rating}</span>
                    <span className="hospital-accred-badge">{hospital.accreditation}</span>
                    <button 
                      className={`star-fav-btn ${isFav ? 'active' : ''}`}
                      onClick={() => toggleFavorite(hospital)}
                      title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                    >
                      {isFav ? '⭐' : '☆'}
                    </button>
                  </div>

                  {/* Hospital Main Info */}
                  <h3 className="hospital-name-heading">
                    {lang === 'hi' ? hospital.nameHi : hospital.nameEn}
                  </h3>

                  <div className="hospital-location-row">
                    <span className="location-icon">📍</span>
                    <span>{lang === 'hi' ? hospital.locationHi : hospital.locationEn}</span>
                  </div>

                  <p className="hospital-description-text">
                    {lang === 'hi' ? hospital.descriptionHi : hospital.descriptionEn}
                  </p>

                  {/* Specialities Chips */}
                  <div className="specialities-wrapper">
                    <strong style={{ fontSize: '15px', color: 'var(--text-sub)' }}>
                      {lang === 'hi' ? 'विशेषज्ञता:' : 'Specialities:'}
                    </strong>
                    <div className="spec-tags-container">
                      {(lang === 'hi' ? hospital.specialitiesHi : hospital.specialitiesEn).map((spec, i) => (
                        <span key={i} className="spec-tag-chip">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Numbers Box */}
                  <div className="hospital-contacts-box">
                    <div className="contact-item-row emergency">
                      <span className="contact-label">🚨 {lang === 'hi' ? 'आपातकालीन (24x7):' : 'Emergency Hotline:'}</span>
                      <strong className="contact-val red">{hospital.emergencyNumber}</strong>
                    </div>

                    <div className="contact-item-row">
                      <span className="contact-label">📞 {lang === 'hi' ? 'हेल्पलाइन / पूछताछ:' : 'General Helpline:'}</span>
                      <span className="contact-val">{hospital.helplineNumber}</span>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="hospital-card-actions">
                    <a 
                      href={`tel:${hospital.emergencyNumber}`} 
                      className="btn-call-primary"
                      onClick={() => {
                        onAddNotification({
                          title: lang === 'hi' ? 'अस्पताल आपातकालीन कॉल 🚨' : 'Emergency Hospital Call 🚨',
                          message: `${hospital.nameEn} - ${hospital.emergencyNumber}`,
                          icon: '🚑',
                          type: 'emergency'
                        });
                      }}
                    >
                      🚨 {lang === 'hi' ? 'इमरजेंसी कॉल' : 'Emergency Call'}
                    </a>

                    <a 
                      href={`tel:${hospital.helplineNumber}`} 
                      className="btn-call-secondary"
                    >
                      📞 {lang === 'hi' ? 'हेल्पलाइन' : 'Helpline'}
                    </a>

                    <button 
                      className="btn-copy-info"
                      onClick={() => copyHospitalContact(hospital)}
                    >
                      {copiedId === hospital.id 
                        ? (lang === 'hi' ? '✓ कॉपी हुआ' : '✓ Copied!') 
                        : (lang === 'hi' ? '📋 नंबर कॉपी करें' : '📋 Copy Contact')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default Hospitals;
