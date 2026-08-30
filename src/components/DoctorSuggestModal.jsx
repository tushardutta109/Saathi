import React, { useState } from 'react';
import { doctorSuggestionsData } from '../data/doctorSuggestionsData';
import { voiceService } from '../services/voiceService';
import Modal from './Modal';

export function DoctorSuggestModal({ isOpen, onClose, lang = 'en', t, onAddNotification }) {
  const [selectedDiseaseId, setSelectedDiseaseId] = useState('heart-disease');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // Filter diseases by search input across all titles, specialists, descriptions in all languages
  const filteredDiseases = doctorSuggestionsData.filter(item => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    const nameEn = (item.diseaseNameEn || '').toLowerCase();
    const nameHi = (item.diseaseNameHi || '').toLowerCase();
    const nameBn = (item.diseaseNameBn || '').toLowerCase();
    const nameAs = (item.diseaseNameAs || '').toLowerCase();
    const specEn = (item.specialistTitleEn || '').toLowerCase();
    const specHi = (item.specialistTitleHi || '').toLowerCase();
    const specBn = (item.specialistTitleBn || '').toLowerCase();
    const specAs = (item.specialistTitleAs || '').toLowerCase();
    const descEn = (item.descEn || '').toLowerCase();
    const descHi = (item.descHi || '').toLowerCase();
    return nameEn.includes(term) || nameHi.includes(term) || nameBn.includes(term) || nameAs.includes(term) ||
           specEn.includes(term) || specHi.includes(term) || specBn.includes(term) || specAs.includes(term) ||
           descEn.includes(term) || descHi.includes(term);
  });

  // Ensure selected disease dynamically matches filtered search results
  const selectedDisease = filteredDiseases.find(item => item.id === selectedDiseaseId) || filteredDiseases[0] || null;

  // H elper for localized strings
  const getLocalizedName = (item) => {
    if (lang === 'hi') return item.diseaseNameHi;
    if (lang === 'bn') return item.diseaseNameBn;
    if (lang === 'as') return item.diseaseNameAs;
    return item.diseaseNameEn;
  };

  const getLocalizedSpecialist = (item) => {
    if (lang === 'hi') return item.specialistTitleHi;
    if (lang === 'bn') return item.specialistTitleBn;
    if (lang === 'as') return item.specialistTitleAs;
    return item.specialistTitleEn;
  };

  const getLocalizedDesc = (item) => {
    if (lang === 'hi') return item.descHi;
    if (lang === 'bn') return item.descBn;
    if (lang === 'as') return item.descAs;
    return item.descEn;
  };

  const getLocalizedTests = (item) => {
    if (lang === 'hi') return item.recommendedTestsHi;
    if (lang === 'bn') return item.recommendedTestsBn;
    if (lang === 'as') return item.recommendedTestsAs;
    return item.recommendedTestsEn;
  };

  // Voice Speech Readout of Doctor Suggestion
  const handleSpeakRecommendation = () => {
    const diseaseName = getLocalizedName(selectedDisease);
    const doctorTitle = getLocalizedSpecialist(selectedDisease);
    const desc = getLocalizedDesc(selectedDisease);

    let text = '';
    if (lang === 'hi') {
      text = `बीमारी: ${diseaseName}। अनुशंसित डॉक्टर विशेषज्ञ: ${doctorTitle}। ${desc}`;
    } else if (lang === 'bn') {
      text = `রোগ: ${diseaseName}। প্রস্তাবিত ডাক্তার বিশেষজ্ঞ: ${doctorTitle}। ${desc}`;
    } else if (lang === 'as') {
      text = `ৰোগ: ${diseaseName}। পৰামৰ্শিত চিকিৎসক বিশেষজ্ঞ: ${doctorTitle}। ${desc}`;
    } else {
      text = `Diagnosed Condition: ${diseaseName}. Recommended Specialist Doctor: ${doctorTitle}. ${desc}`;
    }

    voiceService.speak(text, lang);
  };

  // Explicit search button handler
  const handlePerformSearch = () => {
    const term = searchTerm.toLowerCase().trim();
    if (term) {
      const match = doctorSuggestionsData.find(item => {
        const nameEn = (item.diseaseNameEn || '').toLowerCase();
        const nameHi = (item.diseaseNameHi || '').toLowerCase();
        const nameBn = (item.diseaseNameBn || '').toLowerCase();
        const nameAs = (item.diseaseNameAs || '').toLowerCase();
        const specEn = (item.specialistTitleEn || '').toLowerCase();
        const specHi = (item.specialistTitleHi || '').toLowerCase();
        const specBn = (item.specialistTitleBn || '').toLowerCase();
        const specAs = (item.specialistTitleAs || '').toLowerCase();
        const descEn = (item.descEn || '').toLowerCase();
        const descHi = (item.descHi || '').toLowerCase();
        return nameEn.includes(term) || nameHi.includes(term) || nameBn.includes(term) || nameAs.includes(term) ||
               specEn.includes(term) || specHi.includes(term) || specBn.includes(term) || specAs.includes(term) ||
               descEn.includes(term) || descHi.includes(term);
      });
      if (match) setSelectedDiseaseId(match.id);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={lang === 'hi' ? '🩺 बीमारी के अनुसार डॉक्टर सुझाव' : (t.doctorSuggestModalTitle || '🩺 Suggest Doctor by Diagnosed Disease')}
      icon="🩺"
      cancelText={lang === 'hi' ? 'बंद करें' : 'Close'}
    >
      <div className="doctor-suggest-modal-body">
        {/* Prominent Search Bar for Disease & Specialist with Search Button */}
        <div className="search-disease-wrapper" style={{ marginBottom: '14px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px' }}>🔍</span>
            <input
              type="text"
              className="search-disease-input"
              placeholder={
                lang === 'hi'
                  ? 'बीमारी या लक्षण खोजें (उदा. हृदय, शुगर, घुटने का दर्द)...'
                  : lang === 'bn'
                  ? 'রোগ বা লক্ষণ খুঁজুন (যেমন হৃদরোগ, সুগার, হাঁটু ব্যথা)...'
                  : lang === 'as'
                  ? 'ৰোগ বা লক্ষণ সন্ধান কৰক (যেনে হৃদৰোগ, চুগাৰ, আঁঠুৰ বিষ)...'
                  : 'Search disease, symptom or specialist (e.g. Heart, BP, Eye)...'
              }
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                const term = e.target.value.toLowerCase().trim();
                if (term) {
                  const match = doctorSuggestionsData.find(item => {
                    return item.diseaseNameEn.toLowerCase().includes(term) ||
                           item.diseaseNameHi.toLowerCase().includes(term) ||
                           item.specialistTitleEn.toLowerCase().includes(term) ||
                           item.specialistTitleHi.toLowerCase().includes(term);
                  });
                  if (match) setSelectedDiseaseId(match.id);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handlePerformSearch();
                }
              }}
              style={{
                width: '100%',
                padding: '12px 40px 12px 44px',
                borderRadius: '16px',
                border: '2px solid var(--primary-forest)',
                fontSize: '16px',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-primary)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
              }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  fontWeight: '800',
                  color: 'var(--text-sub)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Dedicated Search Button */}
          <button
            type="button"
            className="btn-search-action-submit"
            onClick={handlePerformSearch}
            style={{
              backgroundColor: 'var(--primary-forest)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '16px',
              padding: '12px 18px',
              fontWeight: '800',
              fontSize: '15px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(27, 77, 62, 0.25)'
            }}
          >
            <span>🔍</span>
            <span>{lang === 'hi' ? 'खोजें' : lang === 'bn' ? 'খুঁজুন' : lang === 'as' ? 'সন্ধান' : 'Search'}</span>
          </button>
        </div>

        {/* Disease Selection Chips */}
        <div className="disease-chips-grid" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '16px' }}>
          {filteredDiseases.map((item) => (
            <button
              key={item.id}
              className={`disease-chip ${selectedDiseaseId === item.id ? 'active' : ''}`}
              onClick={() => setSelectedDiseaseId(item.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '20px',
                border: selectedDiseaseId === item.id ? '2px solid var(--primary-forest)' : '1px solid var(--border-dark)',
                backgroundColor: selectedDiseaseId === item.id ? 'var(--primary-forest)' : 'var(--bg-secondary)',
                color: selectedDiseaseId === item.id ? '#FFFFFF' : 'var(--text-primary)',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{item.icon}</span>
              <span>{getLocalizedName(item).split('/')[0]}</span>
            </button>
          ))}
        </div>

        {/* Selected Disease Recommendation Card */}
        {selectedDisease ? (
          <div className="doctor-recommendation-card" style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '2px solid var(--primary-forest)',
            borderRadius: '18px',
            padding: '20px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {/* Top row: Disease badge & Listen button */}
            <div className="doctor-rec-top-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '32px' }}>{selectedDisease.icon}</span>
                <div>
                  <h4 style={{ fontSize: '19px', fontWeight: '800', margin: 0, color: 'var(--primary-forest)' }}>
                    {getLocalizedName(selectedDisease)}
                  </h4>
                  <span style={{ fontSize: '13px', color: 'var(--text-sub)' }}>
                    {lang === 'hi' ? 'निदान की गई बीमारी' : 'Diagnosed Condition'}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSpeakRecommendation}
                style={{
                  backgroundColor: 'var(--gold-accent)',
                  color: '#332200',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  fontWeight: '800',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                🔊 {lang === 'hi' ? 'सुझाव सुनें' : 'Listen Suggestion'}
              </button>
            </div>

            {/* Recommended Doctor Specialist Banner */}
            <div className="doctor-rec-banner" style={{
              backgroundColor: 'var(--bg-card)',
              borderLeft: '5px solid var(--primary-forest)',
              padding: '14px 18px',
              borderRadius: '12px',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary-forest)' }}>
                👨‍⚕️ {lang === 'hi' ? 'अनुशंसित डॉक्टर विशेषज्ञ:' : 'RECOMMENDED DOCTOR SPECIALIST:'}
              </span>
              <h3 className="doctor-rec-title" style={{ fontSize: '21px', fontWeight: '800', margin: '4px 0 6px 0', color: 'var(--text-primary)' }}>
                {getLocalizedSpecialist(selectedDisease)}
              </h3>
              <p style={{ fontSize: '14px', margin: 0, color: 'var(--text-sub)', lineHeight: '1.4' }}>
                {getLocalizedDesc(selectedDisease)}
              </p>
            </div>

            {/* Recommended Tests Section */}
            <div style={{ marginBottom: '16px' }}>
              <h5 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
                🧪 {lang === 'hi' ? 'डॉक्टर परामर्श हेतु आवश्यक जांचें (Recommended Tests):' : 'Key Medical Tests to Ask Your Doctor:'}
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {getLocalizedTests(selectedDisease).map((test, idx) => (
                  <span key={idx} style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-dark)',
                    padding: '4px 10px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: 'var(--primary-forest)'
                  }}>
                    ✓ {test}
                  </span>
                ))}
              </div>
            </div>

            {/* Top Specialized Hospitals & Helpline */}
            <div>
              <h5 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)' }}>
                🏥 {lang === 'hi' ? 'इस बीमारी के प्रमुख अस्पताल व हेल्पलाइन:' : 'Top Specialized Hospitals for this Condition:'}
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedDisease.topHospitals.map((hosp, idx) => (
                  <div key={idx} className="doctor-hosp-item" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'var(--bg-card)',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)'
                  }}>
                    <div>
                      <strong style={{ fontSize: '14px', display: 'block', color: 'var(--text-primary)' }}>
                        {hosp.name}
                      </strong>
                      <span style={{ fontSize: '12px', color: 'var(--text-sub)' }}>
                        📍 {hosp.city}
                      </span>
                    </div>

                    <a
                      href={`tel:${hosp.phone}`}
                      style={{
                        backgroundColor: 'var(--green-success-bg)',
                        color: 'var(--primary-forest)',
                        border: '1.5px solid var(--primary-forest)',
                        borderRadius: '10px',
                        padding: '6px 12px',
                        fontSize: '13px',
                        fontWeight: '800',
                        textDecoration: 'none'
                      }}
                      onClick={() => {
                        if (onAddNotification) {
                          onAddNotification({
                            title: `📞 Calling ${hosp.name}`,
                            message: `Consultation Helpline: ${hosp.phone}`,
                            icon: '👨‍⚕️',
                            type: 'hospital'
                          });
                        }
                      }}
                    >
                      📞 {hosp.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '30px 16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '18px', border: '1px dashed var(--primary-forest)' }}>
            <span style={{ fontSize: '40px' }}>🔍</span>
            <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary-forest)', margin: '10px 0 6px 0' }}>
              {lang === 'hi' ? 'कोई बीमारी या विशेषज्ञ नहीं मिला' : 'No matching disease or specialist found'}
            </h4>
            <p style={{ fontSize: '14px', color: 'var(--text-sub)', marginBottom: '14px' }}>
              {lang === 'hi' ? 'कृपया अलग शब्द टाइप करें या नीचे सुझाई गई बीमारियों पर टैप करें:' : 'Try searching for Heart, Diabetes, Eye, BP, Kidney, or Joint Pain:'}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Heart', 'Diabetes', 'Eye', 'Joint Pain', 'Kidney', 'Acidity'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSearchTerm(preset)}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--primary-forest)',
                    color: 'var(--primary-forest)',
                    padding: '6px 14px',
                    borderRadius: '16px',
                    fontWeight: '700',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  🔍 {preset}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default DoctorSuggestModal;
