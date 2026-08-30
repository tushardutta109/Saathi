import React, { useRef } from 'react';

// Sample SVG Data URLs for 1-click preset testing
const SAMPLE_PRESCRIPTION_SCREEN = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600" style="background:%23FFFDF9;">
  <rect width="400" height="85" fill="%231B4D3E"/>
  <text x="20" y="35" fill="white" font-family="sans-serif" font-size="20" font-weight="bold">Apollo Heart & Health Clinic</text>
  <text x="20" y="62" fill="%23A7F3D0" font-family="sans-serif" font-size="14">Dr. A. K. Sharma (MD, Senior Cardiologist)</text>
  
  <rect x="20" y="105" width="360" height="2" fill="%23CBD5E1"/>
  
  <text x="20" y="140" fill="%231E293B" font-family="sans-serif" font-size="26" font-weight="bold">Rx (Doctor Prescription)</text>
  <text x="250" y="140" fill="%2364748B" font-family="sans-serif" font-size="14">Date: 13/08/2026</text>

  <rect x="20" y="160" width="360" height="380" rx="12" fill="%23F8FAFC" stroke="%23E2E8F0" stroke-width="2"/>
  
  <!-- Prescription lines -->
  <text x="40" y="200" fill="%231B4D3E" font-family="sans-serif" font-size="18" font-weight="bold">1. Telmisartan 40mg</text>
  <text x="60" y="225" fill="%23475569" font-family="sans-serif" font-size="15">➔ 1 Tab Morning (8:00 AM) Before Food</text>
  
  <text x="40" y="270" fill="%231B4D3E" font-family="sans-serif" font-size="18" font-weight="bold">2. Pantoprazole 40mg</text>
  <text x="60" y="295" fill="%23475569" font-family="sans-serif" font-size="15">➔ 1 Tab Empty Stomach (7:30 AM)</text>
  
  <text x="40" y="340" fill="%231B4D3E" font-family="sans-serif" font-size="18" font-weight="bold">3. Metformin 500mg</text>
  <text x="60" y="365" fill="%23475569" font-family="sans-serif" font-size="15">➔ 1 Tab After Lunch (1:30 PM)</text>

  <text x="40" y="410" fill="%231B4D3E" font-family="sans-serif" font-size="18" font-weight="bold">4. Atorvastatin 10mg</text>
  <text x="60" y="435" fill="%23475569" font-family="sans-serif" font-size="15">➔ 1 Tab Night (9:00 PM) Bedtime</text>

  <rect x="40" y="470" width="320" height="50" rx="10" fill="%23FEF3C7" stroke="%23F59E0B"/>
  <text x="55" y="500" fill="%23B45309" font-family="sans-serif" font-size="14" font-weight="bold">⚠️ Note: Drink plenty of water. Follow up in 7 days.</text>
</svg>`;

const SAMPLE_WHATSAPP_SCREEN = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="700" viewBox="0 0 400 700" style="background:%230b141a;">
  <rect width="400" height="60" fill="%231f2c34"/>
  <circle cx="45" cy="30" r="18" fill="%2300a884"/>
  <text x="75" y="35" fill="white" font-family="sans-serif" font-size="18" font-weight="bold">Ramesh (Son)</text>
  <text x="75" y="50" fill="%238696a0" font-family="sans-serif" font-size="12">online</text>
  <rect x="295" y="15" width="40" height="30" rx="6" fill="%2325D366"/>
  <polygon points="310,22 325,30 310,38" fill="white"/>
  <rect x="20" y="90" width="240" height="60" rx="12" fill="%23202c33"/>
  <text x="35" y="125" fill="white" font-family="sans-serif" font-size="16">Papa, video call kijiye!</text>
  <rect x="0" y="630" width="400" height="70" fill="%231f2c34"/>
</svg>`;

const SAMPLE_UPI_SCREEN = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="700" viewBox="0 0 400 700" style="background:%23111827;">
  <rect width="400" height="70" fill="%231F2937"/>
  <text x="20" y="45" fill="white" font-family="sans-serif" font-size="20" font-weight="bold">⚡ Electricity Bill Payment</text>
  <rect x="40" y="540" width="320" height="64" rx="32" fill="%232563EB"/>
  <text x="140" y="580" fill="white" font-family="sans-serif" font-size="22" font-weight="bold">Pay ₹1,250</text>
</svg>`;

export function ScreenshotUploader({ onSelectImage, t }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Automatically check file name or send for prescription/screen analysis
        const isPrescriptionFile = file.name.toLowerCase().includes('presc') || 
          file.name.toLowerCase().includes('doctor') || 
          file.name.toLowerCase().includes('parcha') ||
          file.name.toLowerCase().includes('medicine');

        onSelectImage(event.target.result, isPrescriptionFile ? 'prescription' : 'general');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="upload-dropzone">
      <span className="upload-icon-large" role="img" aria-label="Prescription & Camera">📄📸</span>
      <h3 className="upload-title">{t.uploadBoxTitle || "Upload Screenshot or Prescription"}</h3>
      <p className="upload-desc">{t.uploadBoxSub || "Upload a photo of your phone screen or Doctor Prescription. SAATHI will analyze it for you!"}</p>

      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange} 
        accept="image/*"
        style={{ display: 'none' }}
      />

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button 
          className="btn btn-primary"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          aria-label="Upload Photo or Prescription"
        >
          <span>📸</span>
          <span>{t.btnUploadScreenshot || "Upload Photo / Prescription 📸"}</span>
        </button>
      </div>

      <div style={{ marginTop: '24px', textAlign: 'center', width: '100%' }}>
        <p style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary-forest)', marginBottom: '12px' }}>
          {t.usePresetTitle || "Or try a sample photo:"}
        </p>
        <div className="preset-buttons-group">
          <button 
            className="preset-btn prescription-highlight-btn"
            onClick={() => onSelectImage(SAMPLE_PRESCRIPTION_SCREEN, 'prescription')}
          >
            📄 {t.presetPrescription || "Doctor Prescription (डॉक्टर का पर्चा)"}
          </button>

          <button 
            className="preset-btn"
            onClick={() => onSelectImage(SAMPLE_WHATSAPP_SCREEN, 'whatsapp')}
          >
            📱 {t.presetWhatsapp || "WhatsApp Screen"}
          </button>

          <button 
            className="preset-btn"
            onClick={() => onSelectImage(SAMPLE_UPI_SCREEN, 'upi')}
          >
            💳 {t.presetUpi || "UPI Payment Screen"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScreenshotUploader;
