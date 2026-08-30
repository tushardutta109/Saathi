import React from 'react';
import VoiceButton from '../components/VoiceButton';
import FeatureCard from '../components/FeatureCard';

export function Home({ onNavigate, onVoiceCommand, onOpenDoctorSuggest, onOpenSearch, lang = 'en', t }) {
  return (
    <div className="home-page-container animate-fadeIn">
      {/* Top Greeting & Voice Assistance Hero */}
      <section className="home-hero">
        <h2 className="greeting-text">{t.greetingHeader}</h2>
        <p className="sub-greeting">{t.greetingSub}</p>
        
        {/* Global Quick Search Input Trigger Bar */}
        <div 
          onClick={onOpenSearch}
          className="search-input-wrapper"
          style={{
            maxWidth: '540px',
            margin: '20px auto 24px auto',
            cursor: 'pointer'
          }}
        >
          <span className="search-input-icon" style={{ fontSize: '22px' }}>🔍</span>
          <input 
            type="text"
            readOnly
            className="hospital-search-input"
            placeholder={
              lang === 'hi' 
                ? 'खोजें: डॉक्टर, अस्पताल, दवाइयाँ, 108 एम्बुलेंस...'
                : lang === 'bn'
                ? 'খুঁজুন: ডাক্তার, হাসপাতাল, ওষুধ, ১০৮ অ্যাম্বুলেন্স...'
                : lang === 'as'
                ? 'সন্ধান কৰক: ডাক্তৰ, হাস্পতাল, ঔষধ, ১০৮ এম্বুলেন্স...'
                : 'Search: doctor, hospital, medicine, 108 ambulance...'
            }
            style={{ cursor: 'pointer', backgroundColor: 'var(--bg-card)', fontSize: '18px', padding: '14px 16px 14px 44px', borderRadius: '16px' }}
          />
        </div>

        {/* Central Large Microphone Voice Button */}
        <VoiceButton 
          onVoiceInput={(query) => {
            onVoiceCommand(query);
            onNavigate('talkToSaathi');
          }}
          t={t}
        />
      </section>

      {/* HEALTH & WELLNESS BANNER IMAGE CARD */}
      <section className="health-banner-card animate-fadeIn">
        <div className="health-banner-image-wrapper">
          <img 
            src="/images/health_hero.jpg" 
            alt="Elderly Indian Grandmother with Family and Caring Doctor" 
            className="health-banner-img"
          />
          <div className="health-banner-overlay-tag">
            <span>❤️ {t.appName} Health & Senior Care</span>
          </div>
        </div>
        <div className="health-banner-content">
          <h3 className="health-banner-title">
            {t.appName === 'SAATHI' ? 'Compassionate Senior Health & Care Companion' : 'आपका स्वास्थ्य और परिवार का साथी'}
          </h3>
          <p className="health-banner-desc">
            Built for easy daily health care: doctor prescription reader, medicine timing reminders, 24x7 hospital hotlines, and instant family alerts.
          </p>
        </div>
      </section>

      {/* Today's Reminder Card */}
      <section className="reminder-card">
        <div className="reminder-icon">☀️</div>
        <div className="reminder-content">
          <h3 className="reminder-title">{t.reminderTitle}</h3>
          <p className="reminder-text">{t.reminderNextText}</p>
        </div>
      </section>

      {/* Main Feature Cards Grid */}
      <section className="home-cards-grid">
        <FeatureCard 
          icon="🩺"
          title={t.btnDoctorSuggest || "Suggest Doctor by Disease"}
          description="Find recommended doctor specialists, tests, and top hospitals for your diagnosed condition."
          onClick={onOpenDoctorSuggest}
        />

        <FeatureCard 
          icon="🏥"
          title={t.cardHospitalsTitle || "India's Best Hospitals"}
          description={t.cardHospitalsDesc || "Top hospital directory & emergency numbers."}
          onClick={() => onNavigate('hospitals')}
        />

        <FeatureCard 
          icon="💊"
          title={t.cardMedicinesTitle}
          description={t.cardMedicinesDesc}
          onClick={() => onNavigate('medicines')}
        />

        <FeatureCard 
          icon="👟"
          title={t.navVitals || "Patient Footstep Counter"}
          description="Count daily footsteps, walking distance, calories burned, and active mobility stats."
          onClick={() => onNavigate('vitals')}
        />

        <FeatureCard 
          icon="📱"
          title={t.cardPhoneHelpTitle}
          description={t.cardPhoneHelpDesc}
          onClick={() => onNavigate('phoneHelp')}
        />

        <FeatureCard 
          icon="👨‍👩‍👧"
          title={t.cardFamilyTitle}
          description={t.cardFamilyDesc}
          onClick={() => onNavigate('familyDashboard')}
        />
      </section>
    </div>
  );
}

export default Home;
