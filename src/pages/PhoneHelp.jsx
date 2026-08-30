import React, { useState } from 'react';
import ScreenshotUploader from '../components/ScreenshotUploader';
import { api } from '../services/api';
import { voiceService } from '../services/voiceService';

export function PhoneHelp({ lang, t, onAddNotification, onAddMedicinesToSchedule }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [medicinesAdded, setMedicinesAdded] = useState(false);

  const handleSelectImage = async (imageSrc, promptType = 'general') => {
    setSelectedImage(imageSrc);
    setAnalyzing(true);
    setAnalysisResult(null);
    setCurrentStepIndex(0);
    setMedicinesAdded(false);

    let result;
    if (promptType === 'prescription' || imageSrc.includes('prescription')) {
      result = await api.analyzePrescription(imageSrc);
    } else {
      result = await api.analyzeScreen(imageSrc, promptType);
    }

    setAnalysisResult(result);
    setAnalyzing(false);

    // Speak aloud step 1 or prescription audio summary
    if (result.isPrescription) {
      const textToSpeak = lang === 'hi' ? result.audioSummaryHi 
        : lang === 'bn' ? result.audioSummaryBn 
        : lang === 'as' ? result.audioSummaryAs 
        : result.audioSummaryEn;
      speakText(textToSpeak, lang);
    } else if (result.steps && result.steps[0]) {
      const textToSpeak = lang === 'hi' ? result.steps[0].instructionHi 
        : lang === 'bn' ? (result.steps[0].instructionBn || result.steps[0].instruction)
        : lang === 'as' ? (result.steps[0].instructionAs || result.steps[0].instruction)
        : result.steps[0].instruction;
      speakText(textToSpeak, lang);
    }
  };

  const speakText = (text, language) => {
    voiceService.speak(text, language);
  };

  const handleAddAllMedicines = () => {
    if (analysisResult && analysisResult.medicines) {
      if (onAddMedicinesToSchedule) {
        onAddMedicinesToSchedule(analysisResult.medicines);
      }
      setMedicinesAdded(true);

      if (onAddNotification) {
        onAddNotification({
          title: lang === 'hi' ? 'पर्चे की दवाइयाँ सहेजी गईं 💊' 
            : lang === 'bn' ? 'প্রেসক্রিপশনের ওষুধ সংরক্ষিত 💊'
            : lang === 'as' ? 'প্ৰে ক্ৰিপচনৰ ঔষধ সংৰক্ষিত 💊'
            : 'Prescription Medicines Saved 💊',
          message: lang === 'hi' 
            ? `${analysisResult.medicines.length} दवाइयाँ आपकी दैनिक खुराक सूची में जोड़ दी गई हैं।`
            : lang === 'bn'
            ? `${analysisResult.medicines.length}টি ওষুধ আপনার দৈনিক তালিকায় যোগ করা হয়েছে।`
            : lang === 'as'
            ? `${analysisResult.medicines.length} টা ঔষধ আপোনাৰ দৈনিক তালিকাত যোগ কৰা হ’ল।`
            : `${analysisResult.medicines.length} medicines added to your daily schedule!`,
          icon: '💊',
          type: 'medicine'
        });
      }
    }
  };

  const currentStep = analysisResult?.steps?.[currentStepIndex];

  return (
    <div className="phone-help-page animate-fadeIn">
      {/* Page Header */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '32px', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--primary-forest)' }}>
          <span>📱📄</span>
          <span>{t.phoneHelpTitle}</span>
        </h2>
        <p style={{ fontSize: '20px', color: 'var(--text-sub)', fontWeight: '600' }}>
          {t.phoneHelpSub}
        </p>
      </div>

      {/* Upload Screenshot & Prescription Dropzone */}
      <ScreenshotUploader onSelectImage={handleSelectImage} t={t} />

      {/* Quick Option Buttons */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '22px', color: 'var(--primary-forest)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>💡</span>
          <span>{t.tellMeSectionTitle}</span>
        </h3>
        <div className="quick-chips-group">
          <button 
            className="chip-btn prescription-chip"
            onClick={() => handleSelectImage(SAMPLE_PRESCRIPTION_SCREEN, 'prescription')}
          >
            📄 {t.chipPrescription}
          </button>
          <button 
            className="chip-btn"
            onClick={() => handleSelectImage(SAMPLE_WHATSAPP_SCREEN, 'whatsapp')}
          >
            📞 {t.chipWhatsapp}
          </button>
          <button 
            className="chip-btn"
            onClick={() => handleSelectImage(SAMPLE_WHATSAPP_SCREEN, 'whatsapp')}
          >
            📸 {t.chipPhoto}
          </button>
          <button 
            className="chip-btn"
            onClick={() => handleSelectImage(SAMPLE_UPI_SCREEN, 'upi')}
          >
            💳 {t.chipUpi}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {analyzing && (
        <div className="saathi-card loading-box">
          <div className="spinner"></div>
          <span>{t.analyzingState}</span>
        </div>
      )}

      {/* RESULT 1: DOCTOR PRESCRIPTION ANALYSIS DISPLAY */}
      {selectedImage && !analyzing && analysisResult?.isPrescription && (
        <div className="saathi-card prescription-result-card animate-fadeIn">
          <div className="prescription-card-header">
            <span className="prescription-badge-tag">
              📄 {lang === 'hi' ? 'डॉक्टर का पर्चा (Prescription Analysis)' 
                 : lang === 'bn' ? 'ডাক্তারের প্রেসক্রিপশন বিশ্লেষণ'
                 : lang === 'as' ? 'ডাক্তৰৰ প্ৰে ক্ৰিপচন বিশ্লেষণ'
                 : 'Doctor Prescription Analysis'}
            </span>
            <button 
              className="btn-listen-speech-large"
              onClick={() => {
                const textToSpeak = lang === 'hi' ? analysisResult.audioSummaryHi 
                  : lang === 'bn' ? analysisResult.audioSummaryBn 
                  : lang === 'as' ? analysisResult.audioSummaryAs 
                  : analysisResult.audioSummaryEn;
                speakText(textToSpeak, lang);
              }}
            >
              🔊 {t.btnListenStep}
            </button>
          </div>

          {/* Doctor & Clinic Header Details */}
          <div className="doctor-info-banner">
            <div className="doc-main-text">
              <h3>{analysisResult.doctorName}</h3>
              <p>{analysisResult.clinicName}</p>
            </div>
            <div className="doc-meta">
              <span>📅 Date: {analysisResult.date}</span>
              <span>👤 {analysisResult.patientName}</span>
            </div>
          </div>

          {/* Image & Medicines Grid */}
          <div className="prescription-content-grid">
            {/* Thumbnail preview */}
            <div className="presc-image-preview">
              <img src={selectedImage} alt="Uploaded Prescription" />
            </div>

            {/* Extracted Medicines List */}
            <div className="presc-medicines-list">
              <h4 className="meds-list-heading">
                💊 {lang === 'hi' ? 'पहचानी गई दवाइयाँ और समय' 
                   : lang === 'bn' ? 'চিহ্নিত ওষুধ ও সময়সূচী'
                   : lang === 'as' ? 'চিহ্নিত ঔষধ আৰু সময়সূচী'
                   : 'Identified Medicines & Schedule'}
              </h4>

              <div className="med-items-column">
                {analysisResult.medicines.map((med) => (
                  <div key={med.id} className="presc-med-item-card">
                    <div className="presc-med-badge">
                      <span>{med.time}</span>
                    </div>

                    <div className="presc-med-details">
                      <div className="med-title-row">
                        <strong className="med-name-text">{med.name}</strong>
                        <span className="med-dosage-text">({med.dosage})</span>
                      </div>

                      <p className="med-timing-text">
                        ⏰ {lang === 'hi' ? med.timingDetailHi 
                            : lang === 'bn' ? med.timingDetailBn 
                            : lang === 'as' ? med.timingDetailAs 
                            : med.timingDetailEn}
                      </p>
                      <p className="med-purpose-text">
                        🎯 {lang === 'hi' ? `उपयोग: ${med.purpose}` 
                            : lang === 'bn' ? `ব্যবহার: ${med.purpose}`
                            : lang === 'as' ? `ব্যৱহাৰ: ${med.purpose}`
                            : `For: ${med.purpose}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Doctor's Special Instructions */}
          <div className="doctor-instructions-card">
            <div className="instr-title">
              ⚠️ {lang === 'hi' ? 'डॉक्टर की विशेष सलाह:' 
                 : lang === 'bn' ? 'ডাক্তারের বিশেষ পরামর্শ:'
                 : lang === 'as' ? 'ডাক্তৰৰ বিশেষ পৰামৰ্শ:'
                 : "Doctor's Special Instructions:"}
            </div>
            <p className="instr-body">
              {lang === 'hi' ? analysisResult.instructionsHi 
               : lang === 'bn' ? analysisResult.instructionsBn 
               : lang === 'as' ? analysisResult.instructionsAs 
               : analysisResult.instructionsEn}
            </p>
          </div>

          {/* Save to Medicines Action Bar */}
          <div className="presc-actions-bar">
            <button 
              className={`btn-add-all-meds ${medicinesAdded ? 'added' : ''}`}
              onClick={handleAddAllMedicines}
              disabled={medicinesAdded}
            >
              {medicinesAdded 
                ? (lang === 'hi' ? '✓ सभी दवाइयाँ दैनिक सूची में जोड़ी गईं!' 
                   : lang === 'bn' ? '✓ সব ওষুধ তালিকায় যোগ করা হয়েছে!'
                   : lang === 'as' ? '✓ সকলো ঔষধ তালিকাত যোগ কৰা হ’ল!'
                   : '✓ Added to Medicines Schedule!') 
                : (lang === 'hi' ? '➕ इन सभी दवाइयों को मेरी शेड्यूल में जोड़ें' 
                   : lang === 'bn' ? '➕ এই ওষুধগুলি আমার তালিকায় যোগ করুন'
                   : lang === 'as' ? '➕ এই ঔষধসমূহ মোৰ তালিকাত যোগ কৰক'
                   : '➕ Add All Medicines to My Schedule')}
            </button>
          </div>
        </div>
      )}

      {/* RESULT 2: PHONE SCREEN GUIDANCE DISPLAY */}
      {selectedImage && !analyzing && currentStep && !analysisResult?.isPrescription && (
        <div className="saathi-card">
          <h3 style={{ fontSize: '26px', color: 'var(--primary-forest)', marginBottom: '18px', textAlign: 'center' }}>
            {analysisResult.title || 'Screen Guidance'}
          </h3>

          {/* Screenshot Preview with Visual Pointer Highlight Overlay */}
          <div className="screenshot-preview-container">
            <img src={selectedImage} alt="Phone Screenshot Preview" className="screenshot-img" />

            {/* Visual Pointer Overlay Ring */}
            {currentStep.targetBox && (
              <div 
                className="pointer-overlay"
                style={{
                  left: `${currentStep.targetBox.x}%`,
                  top: `${currentStep.targetBox.y}%`,
                  width: `${currentStep.targetBox.width}%`,
                  height: `${currentStep.targetBox.height}%`,
                }}
              >
                <div className="pointer-arrow" style={{ top: '-45px', left: '50%', transform: 'translateX(-50%)' }}>
                  👇
                </div>
              </div>
            )}
          </div>

          {/* Step Instruction Card */}
          <div className="step-card">
            <span className="step-badge">
              {t.stepCounter.replace('{step}', currentStep.stepNumber).replace('{total}', currentStep.totalSteps)}
            </span>
            <p className="step-instruction">
              {lang === 'hi' ? currentStep.instructionHi 
               : lang === 'bn' ? (currentStep.instructionBn || currentStep.instruction)
               : lang === 'as' ? (currentStep.instructionAs || currentStep.instruction)
               : currentStep.instruction}
            </p>

            <div className="step-controls">
              <button 
                className="btn btn-secondary"
                disabled={currentStepIndex === 0}
                onClick={() => {
                  const newIdx = Math.max(0, currentStepIndex - 1);
                  setCurrentStepIndex(newIdx);
                  const step = analysisResult.steps[newIdx];
                  const txt = lang === 'hi' ? step.instructionHi : lang === 'bn' ? (step.instructionBn || step.instruction) : lang === 'as' ? (step.instructionAs || step.instruction) : step.instruction;
                  speakText(txt, lang);
                }}
              >
                {t.btnPrevStep}
              </button>

              <button 
                className="btn btn-outline"
                onClick={() => {
                  const txt = lang === 'hi' ? currentStep.instructionHi : lang === 'bn' ? (currentStep.instructionBn || currentStep.instruction) : lang === 'as' ? (currentStep.instructionAs || currentStep.instruction) : currentStep.instruction;
                  speakText(txt, lang);
                }}
              >
                {t.btnListenStep}
              </button>

              <button 
                className="btn btn-primary"
                disabled={currentStepIndex === analysisResult.steps.length - 1}
                onClick={() => {
                  const newIdx = Math.min(analysisResult.steps.length - 1, currentStepIndex + 1);
                  setCurrentStepIndex(newIdx);
                  const step = analysisResult.steps[newIdx];
                  const txt = lang === 'hi' ? step.instructionHi : lang === 'bn' ? (step.instructionBn || step.instruction) : lang === 'as' ? (step.instructionAs || step.instruction) : step.instruction;
                  speakText(txt, lang);
                }}
              >
                {t.btnNextStep}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Fallback constant SVG images for scope safety
const SAMPLE_PRESCRIPTION_SCREEN = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600" style="background:%23FFFDF9;">
  <rect width="400" height="85" fill="%231B4D3E"/>
  <text x="20" y="35" fill="white" font-family="sans-serif" font-size="20" font-weight="bold">Apollo Heart & Health Clinic</text>
  <text x="20" y="62" fill="%23A7F3D0" font-family="sans-serif" font-size="14">Dr. A. K. Sharma (MD, Senior Cardiologist)</text>
  <rect x="20" y="105" width="360" height="2" fill="%23CBD5E1"/>
  <text x="20" y="140" fill="%231E293B" font-family="sans-serif" font-size="26" font-weight="bold">Rx (Doctor Prescription)</text>
  <text x="250" y="140" fill="%2364748B" font-family="sans-serif" font-size="14">Date: 13/08/2026</text>
  <rect x="20" y="160" width="360" height="380" rx="12" fill="%23F8FAFC" stroke="%23E2E8F0" stroke-width="2"/>
  <text x="40" y="200" fill="%231B4D3E" font-family="sans-serif" font-size="18" font-weight="bold">1. Telmisartan 40mg</text>
  <text x="60" y="225" fill="%23475569" font-family="sans-serif" font-size="15">➔ 1 Tab Morning (8:00 AM)</text>
  <text x="40" y="270" fill="%231B4D3E" font-family="sans-serif" font-size="18" font-weight="bold">2. Pantoprazole 40mg</text>
  <text x="60" y="295" fill="%23475569" font-family="sans-serif" font-size="15">➔ 1 Tab Empty Stomach (7:30 AM)</text>
  <text x="40" y="340" fill="%231B4D3E" font-family="sans-serif" font-size="18" font-weight="bold">3. Metformin 500mg</text>
  <text x="60" y="365" fill="%23475569" font-family="sans-serif" font-size="15">➔ 1 Tab After Lunch (1:30 PM)</text>
  <text x="40" y="410" fill="%231B4D3E" font-family="sans-serif" font-size="18" font-weight="bold">4. Atorvastatin 10mg</text>
  <text x="60" y="435" fill="%23475569" font-family="sans-serif" font-size="15">➔ 1 Tab Night (9:00 PM)</text>
</svg>`;

const SAMPLE_WHATSAPP_SCREEN = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="700" viewBox="0 0 400 700" style="background:%230b141a;">
  <rect width="400" height="60" fill="%231f2c34"/>
  <circle cx="45" cy="30" r="18" fill="%2300a884"/>
  <text x="75" y="35" fill="white" font-family="sans-serif" font-size="18" font-weight="bold">Ramesh (Son)</text>
  <rect x="295" y="15" width="40" height="30" rx="6" fill="%2325D366"/>
  <polygon points="310,22 325,30 310,38" fill="white"/>
  <rect x="20" y="90" width="240" height="60" rx="12" fill="%23202c33"/>
  <text x="35" y="125" fill="white" font-family="sans-serif" font-size="16">Papa, video call kijiye!</text>
</svg>`;

const SAMPLE_UPI_SCREEN = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="700" viewBox="0 0 400 700" style="background:%23111827;">
  <rect width="400" height="70" fill="%231F2937"/>
  <text x="20" y="45" fill="white" font-family="sans-serif" font-size="20" font-weight="bold">⚡ Electricity Bill Payment</text>
  <rect x="40" y="540" width="320" height="64" rx="32" fill="%232563EB"/>
  <text x="140" y="580" fill="white" font-family="sans-serif" font-size="22" font-weight="bold">Pay ₹1,250</text>
</svg>`;

export default PhoneHelp;
