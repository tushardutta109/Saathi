import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import EmergencyButton from './components/EmergencyButton';
import Modal from './components/Modal';
import ToastContainer from './components/ToastContainer';

import Home from './pages/Home';
import Hospitals from './pages/Hospitals';
import Medicines from './pages/Medicines';
import PhoneHelp from './pages/PhoneHelp';
import TalkToSaathi from './pages/TalkToSaathi';
import FamilyDashboard from './pages/FamilyDashboard';
import VitalsMonitor from './pages/VitalsMonitor';

import { translations } from './translations';
import './styles/app.css';

import DoctorSuggestModal from './components/DoctorSuggestModal';
import PaymentOptionsModal from './components/PaymentOptionsModal';
import GlobalSearchModal from './components/GlobalSearchModal';
import { initGlobalButtonSoundListener } from './services/soundEffects';

export function App() {
  const [lang, setLangState] = useState(() => {
    try {
      const savedLang = localStorage.getItem('saathi_lang');
      return savedLang && ['en', 'hi', 'bn', 'as'].includes(savedLang) ? savedLang : 'en';
    } catch (e) {
      return 'en';
    }
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    try {
      localStorage.setItem('saathi_lang', newLang);
    } catch (e) {
      console.warn('Unable to persist language preference:', e);
    }
  };

  const [theme, setTheme] = useState(() => localStorage.getItem('saathi_theme') || 'light');
  const [activeTab, setActiveTab] = useState('home');
  const [voiceQuery, setVoiceQuery] = useState('');
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [emergencyAlertSent, setEmergencyAlertSent] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isDoctorSuggestOpen, setIsDoctorSuggestOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Initialize tactile audio sound feedback on button press & keyboard shortcut for search
  useEffect(() => {
    initGlobalButtonSoundListener();

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Centralized medicines list
  const [medicines, setMedicines] = useState([
    {
      id: "med-1",
      time: "8:00 AM",
      name: "Medicine A",
      dosage: "1 tablet",
      purpose: "Blood Pressure / BP",
      status: "taken",
      icon: "💊",
    },
    {
      id: "med-2",
      time: "2:00 PM",
      name: "Medicine B",
      dosage: "1 tablet",
      purpose: "Multivitamin",
      status: "upcoming",
      icon: "💊",
    },
    {
      id: "med-3",
      time: "9:00 PM",
      name: "Medicine C",
      dosage: "1 tablet",
      purpose: "Diabetes Care",
      status: "upcoming",
      icon: "💊",
    },
  ]);

  // Initial rich notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: '💊 Medicine Reminder',
      message: 'Take Medicine A (1 tablet) after breakfast.',
      time: '8:00 AM',
      read: false,
      type: 'medicine',
      icon: '💊'
    },
    {
      id: 'notif-2',
      title: '📄 Doctor Prescription Reader',
      message: 'Upload Doctor Prescription photos in Phone & Prescription Help for instant guidance.',
      time: '10:15 AM',
      read: false,
      type: 'info',
      icon: '📄'
    },
    {
      id: 'notif-3',
      title: '🚑 Free Emergency Ambulance 108',
      message: 'Need Help button includes direct 24x7 Free Ambulance 108 & 112 dialing.',
      time: 'Yesterday',
      read: true,
      type: 'emergency',
      icon: '🚑'
    }
  ]);

  // Floating toast state
  const [toasts, setToasts] = useState([]);

  // Apply theme to container / body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Helper to add notification and show floating toast
  const addNotification = (notifData) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: notifData.title,
      message: notifData.message,
      time: 'Just now',
      read: false,
      type: notifData.type || 'info',
      icon: notifData.icon || '🔔'
    };

    setNotifications(prev => [newNotif, ...prev]);

    // Show toast for 4.5 seconds
    const toastId = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { ...newNotif, id: toastId }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toastId));
    }, 4500);
  };

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleAddTestNotification = () => {
    addNotification({
      title: lang === 'hi' ? '☀️ सुबह का स्वास्थ्य टिप' : lang === 'bn' ? '☀️ সকালের স্বাস্থ্য টিপস' : lang === 'as' ? '☀️ ৰাতিপুৱাৰ স্বাস্থ্য পৰামৰ্শ' : '☀️ Morning Health Tip',
      message: lang === 'hi' 
        ? 'गुनगुना पानी पिएं और 15 मिनट धूप में टहलें।' 
        : lang === 'bn'
        ? 'হালকা গরম জল পান করুন এবং ১৫ মিনিট রোদে হাঁটুন।'
        : lang === 'as'
        ? "ঈষদুষ্ণ পানী খাওক আৰু ১৫ মিনিট ৰ'দত খোজ কাঢ়ক।"
        : 'Drink warm water and get 15 minutes of gentle sunlight.',
      icon: '☀️',
      type: 'tip'
    });
  };

  const t = translations[lang] || translations.en;

  const handleVoiceCommand = (query) => {
    setVoiceQuery(query);
    setActiveTab('talkToSaathi');
  };

  const handleConfirmEmergency = () => {
    setIsEmergencyModalOpen(false);
    setEmergencyAlertSent(true);

    addNotification({
      title: lang === 'hi' ? '🚨 आपातकालीन अलर्ट भेजा गया!' : lang === 'bn' ? '🚨 জরুরি সতর্কতা পাঠানো হয়েছে!' : lang === 'as' ? "🚨 জৰুৰী সতৰ্কতা প্ৰেৰণ কৰা হ'ল!" : '🚨 Emergency Alert Triggered!',
      message: lang === 'hi' ? 'आपके परिवार (रमेश शर्मा) को संदेश व कॉल किया गया।' : 'Urgent alert sent & family contact dialed.',
      icon: '🚨',
      type: 'emergency'
    });

    setTimeout(() => {
      setEmergencyAlertSent(false);
    }, 8000);
  };

  return (
    <div className={`app-container theme-${theme}`}>
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Accessible Header */}
      <Header 
        lang={lang} 
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        notifications={notifications}
        setNotifications={setNotifications}
        isNotifOpen={isNotifOpen}
        setIsNotifOpen={setIsNotifOpen}
        onAddTestNotification={handleAddTestNotification}
        onOpenDoctorSuggest={() => setIsDoctorSuggestOpen(true)}
        onOpenPayment={() => setIsPaymentOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        t={t} 
      />

      {/* Main Navigation Bar */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} t={t} />

      {/* Emergency Alert Toast Banner */}
      {emergencyAlertSent && (
        <div style={{
          backgroundColor: 'var(--red-alert-bg)',
          border: '3px solid var(--red-alert)',
          color: 'var(--red-alert-hover)',
          padding: '20px',
          margin: '16px auto 0 auto',
          maxWidth: '960px',
          width: '90%',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-md)',
          animation: 'fadeIn 0.3s ease-out',
        }}>
          <h3 style={{ fontSize: '24px', marginBottom: '6px', color: 'var(--red-alert)' }}>
            🚨 {t.emergencySentTitle}
          </h3>
          <p style={{ fontSize: '19px', fontWeight: '700' }}>
            {t.emergencySentMsg}
          </p>
        </div>
      )}

      {/* Main Active Page Content */}
      <main className="main-content">
        {activeTab === 'home' && (
          <Home 
            onNavigate={setActiveTab} 
            onVoiceCommand={handleVoiceCommand}
            onOpenDoctorSuggest={() => setIsDoctorSuggestOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            lang={lang}
            t={t} 
          />
        )}

        {activeTab === 'hospitals' && (
          <Hospitals 
            lang={lang} 
            t={t} 
            onAddNotification={addNotification}
            onOpenDoctorSuggest={() => setIsDoctorSuggestOpen(true)}
            onOpenPayment={() => setIsPaymentOpen(true)}
          />
        )}

        {activeTab === 'medicines' && (
          <Medicines 
            medicines={medicines}
            setMedicines={setMedicines}
            t={t} 
          />
        )}

        {activeTab === 'phoneHelp' && (
          <PhoneHelp 
            lang={lang} 
            t={t} 
            onAddNotification={addNotification}
            onAddMedicinesToSchedule={(newMeds) => {
              setMedicines((prev) => {
                const existingIds = new Set(prev.map(m => m.id));
                const filtered = newMeds.filter(m => !existingIds.has(m.id));
                return [...prev, ...filtered];
              });
            }}
          />
        )}

        {activeTab === 'talkToSaathi' && (
          <TalkToSaathi 
            lang={lang} 
            initialQuery={voiceQuery} 
            t={t} 
          />
        )}

        {activeTab === 'vitals' && (
          <VitalsMonitor lang={lang} t={t} onAddNotification={addNotification} />
        )}

        {activeTab === 'familyDashboard' && (
          <FamilyDashboard lang={lang} t={t} onAddNotification={addNotification} />
        )}
      </main>

      {/* Fixed Bottom-Right Emergency Button */}
      <EmergencyButton 
        onClick={() => setIsEmergencyModalOpen(true)} 
        t={t} 
      />

      {/* Emergency Confirmation Modal with 24x7 Ambulance Helplines */}
      <Modal
        isOpen={isEmergencyModalOpen}
        title={t.emergencyModalTitle || "Emergency Help & Ambulance 🆘"}
        icon="🆘"
        onClose={() => setIsEmergencyModalOpen(false)}
        confirmText={t.emergencyConfirm || "Notify Family Contact"}
        cancelText={t.emergencyCancel || "Close"}
        onConfirm={handleConfirmEmergency}
      >
        <div className="modal-emergency-container" style={{ textAlign: 'center', marginTop: '10px' }}>
          <p className="modal-question" style={{ fontSize: '20px', fontWeight: '800', color: 'var(--red-alert)', marginBottom: '16px' }}>
            {t.emergencyAmbulanceTitle || "24x7 Free Ambulance & Emergency Hotlines:"}
          </p>

          <div className="emergency-modal-ambulance-grid">
            <a 
              href="tel:108" 
              className="btn-modal-ambulance-call primary"
              onClick={() => {
                addNotification({
                  title: lang === 'hi' ? 'एम्बुलेंस (108) कॉल की गई 🚑' : 'Calling Ambulance (108) 🚑',
                  message: 'National Free Ambulance Helpline 108',
                  icon: '🚑',
                  type: 'emergency'
                });
              }}
            >
              {t.btnCallAmbulance108 || "Call Free Ambulance (108) 🚑"}
            </a>

            <a 
              href="tel:112" 
              className="btn-modal-ambulance-call secondary"
              onClick={() => {
                addNotification({
                  title: lang === 'hi' ? 'आपातकालीन हेल्पलाइन (112) 🚨' : 'Emergency Helpline (112) 🚨',
                  message: 'National All-in-One Emergency 112',
                  icon: '🚨',
                  type: 'emergency'
                });
              }}
            >
              {t.btnCallEmergency112 || "Call Emergency Helpline (112) 🚨"}
            </a>

            <a 
              href="tel:14567" 
              className="btn-modal-ambulance-call secondary"
            >
              {t.btnCallElderline14567 || "Call Senior Elderline (14567) 👴"}
            </a>
          </div>
        </div>
      </Modal>

      {/* Doctor Specialist Suggestion Modal */}
      <DoctorSuggestModal 
        isOpen={isDoctorSuggestOpen}
        onClose={() => setIsDoctorSuggestOpen(false)}
        lang={lang}
        t={t}
        onAddNotification={addNotification}
      />

      {/* Senior Payment Options Modal */}
      <PaymentOptionsModal 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        lang={lang}
        t={t}
        onAddNotification={addNotification}
      />

      {/* Global Universal Search Modal */}
      <GlobalSearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={setActiveTab}
        onOpenDoctorSuggest={() => setIsDoctorSuggestOpen(true)}
        onOpenPayment={() => setIsPaymentOpen(true)}
        lang={lang}
        t={t}
      />
    </div>
  );
}

export default App;
