// Complete English, Hindi, Bengali and Assamese translations dictionary for SAATHI

export const translations = {
  en: {
    appName: "SAATHI",
    tagline: "Technology that speaks your language.",
    greetingHeader: "Namaste 🙏",
    greetingSub: "How can I help you today?",
    
    // Navigation
    navHome: "Home",
    navHospitals: "Best Hospitals",
    navMedicines: "My Medicines",
    navPhoneHelp: "Phone Help & Prescription",
    navTalk: "Talk to Saathi",
    navVitals: "Patient Footstep Counter",
    navFamily: "Family Dashboard",
    
    // Voice Button / Hero
    talkToSaathiBtn: "TALK TO SAATHI",
    pressAndSpeak: "Press and speak",
    listening: "I'm listening...",
    processing: "Thinking...",
    
    // Home Cards
    cardHospitalsTitle: "India's Best Hospitals",
    cardHospitalsDesc: "Top hospital directory & 24x7 emergency helplines.",
    cardMedicinesTitle: "My Medicines",
    cardMedicinesDesc: "Check today's medicines and reminders.",
    cardPhoneHelpTitle: "Phone & Prescription Help",
    cardPhoneHelpDesc: "Upload phone screenshots or doctor prescriptions for instant guidance.",
    cardFamilyTitle: "My Family",
    cardFamilyDesc: "Stay connected with your family.",
    
    // Today's Reminder
    reminderTitle: "Today's Reminder",
    reminderNextText: "Your next medicine is at 9:00 PM.",
    reminderMedicineName: "Medicine C (1 tablet)",
    
    // Emergency Button & Modal
    needHelpBtn: "Need Help",
    emergencyModalTitle: "Emergency Help & Ambulance 🆘",
    emergencyModalQuestion: "Direct 24x7 Ambulance & Emergency Helplines:",
    emergencyAmbulanceTitle: "24x7 Free Ambulance & Emergency Hotlines:",
    btnCallAmbulance108: "Call Free Ambulance (108) 🚑",
    btnCallEmergency112: "Call Emergency Hotline (112) 🚨",
    btnCallElderline14567: "Call Senior Helpline (14567) 👴",
    emergencyConfirm: "Notify Family Contact (Ramesh)",
    emergencyCancel: "Close / Back",
    emergencySentTitle: "Family Notified!",
    emergencySentMsg: "We have sent an urgent alert message and called your primary family contact.",
    
    // Notifications & Theme
    notificationsTitle: "Notifications",
    unreadTag: "new",
    notifFilterAll: "All",
    notifFilterUnread: "Unread",
    notifMarkAllRead: "Mark Read",
    notifClearAll: "Clear",
    btnTestNotification: "Send Demo Notification",
    noNotifications: "No notifications right now.",
    themeLight: "Light",
    themeDark: "Dark",

    // My Medicines Page
    medicinesTitle: "My Medicines",
    medicinesSub: "Today's medicine schedule",
    statusTaken: "Taken",
    statusUpcoming: "Upcoming",
    statusMissed: "Missed",
    btnTookIt: "I Took It ✓",
    btnMarkedTaken: "✓ Taken",
    addMedicineBtn: "+ Add New Medicine",
    addMedTitle: "Add New Medicine",
    medNameLabel: "Medicine Name",
    medTimeLabel: "Time (e.g. 8:00 AM)",
    medDosageLabel: "Dosage (e.g. 1 tablet)",
    saveMedBtn: "Save Medicine",
    
    // Medicine Warning
    medWarningTitle: "Important",
    medWarningText: "SAATHI only reminds you about medicines saved by you or your family. Always follow your doctor's prescription.",
    
    // Phone Help & Prescription Page
    phoneHelpTitle: "Phone Help & Doctor Prescription Reader",
    phoneHelpSub: "Upload a phone screenshot or Doctor Prescription. SAATHI will explain it step-by-step.",
    uploadBoxTitle: "Upload Photo, Screenshot or Doctor Prescription",
    uploadBoxSub: "I will read the doctor handwriting, identify medicine timings, and guide you clearly.",
    btnUploadScreenshot: "Upload Photo / Prescription 📸",
    usePresetTitle: "Or choose a sample document to try:",
    presetPrescription: "Doctor Prescription",
    presetWhatsapp: "WhatsApp Video Call Screen",
    presetGallery: "Sending Photos in Gallery",
    presetUpi: "Paying Bill via UPI",
    
    tellMeSectionTitle: "Tap a quick sample to analyze",
    chipPrescription: "Doctor Prescription",
    chipWhatsapp: "Make a WhatsApp call",
    chipPhoto: "Send a photo",
    chipVideoCall: "Join a video call",
    chipUpi: "Pay bill on UPI",
    
    analyzingState: "Saathi is reading your document...",
    stepCounter: "STEP {step} OF {total}",
    btnNextStep: "Next Step ➔",
    btnPrevStep: "Previous Step ⬅",
    btnListenStep: "Listen Aloud 🔊",
    
    // Talk to Saathi Page
    talkTitle: "Talk to Saathi",
    talkSub: "Press the button and speak. I can answer questions in English, Hindi, Bengali or Assamese.",
    sampleQuestionsTitle: "Or tap a quick question:",
    q1: "Doctor ke parche ki dawai batao",
    q2: "Meri aaj ki dawai ka time kya hai?",
    q3: "Beti ko phone call lagao",
    q4: "Weather kaisa hai aaj?",
    userPromptLabel: "You asked:",
    saathiReplyLabel: "SAATHI says:",
    typePlaceholder: "Or type your question here...",
    btnSend: "Send",
    deleteChat: "Clear Chat History 🗑️",
    deleteMessage: "Delete message",
    confirmDeleteAll: "Are you sure you want to clear all chat messages?",
    speakSpeechSupported: "Voice recognition ready! Click mic to speak.",
    speakSpeechNotSupported: "Voice input simulated below. (Web Speech API available on supported browsers).",
    
    // Family Dashboard Page
    familyTitle: "Family Dashboard",
    familySub: "Keeping your loved one connected & healthy.",
    familyBadge: "Caregiver Portal",
    statMedicines: "Medicines Taken",
    statMedicinesSub: "4 / 5 medicines taken today",
    statTechHelp: "Technology Help",
    statTechHelpSub: "2 help requests today",
    statAlerts: "Urgent Alerts",
    statAlertsSub: "0 urgent alerts",
    
    activityTitle: "Today's Medicine Activity",
    colTime: "Time",
    colMedicine: "Medicine",
    colStatus: "Status",
    colAction: "Action / Notes",
    
    recentHelpTitle: "Recent Tech & Prescription Guidance",
    help1Title: "Doctor Prescription Analysis",
    help1Time: "Today, 11:30 AM",
    help1Status: "Completed (4 medicines extracted)",
    help2Title: "WhatsApp Video Call Assistance",
    help2Time: "Yesterday, 4:15 PM",
    help2Status: "Completed (3 steps)",
    
    familyContactName: "Ramesh Sharma (Son)",
    familyContactPhone: "+91 98765 43210",
    btnCallNow: "Call Now 📞",
    btnSendReminder: "Send Voice Note 🎙️",
    
    // Low Pulse Emergency Alarm
    lowPulseAlarmTitle: "🚨 CRITICAL WARNING: Dangerously Low Pulse Detected (< 50 BPM)!",
    lowPulseAlarmMsg: "Your heart rate has dropped to a critical low level. Sit down immediately, drink water, and press Call 108 Emergency Ambulance or alert your family.",
    lowPulseVoiceText: "Attention! Dangerously low pulse rate detected. Your heart rate is below 50 beats per minute. Please sit down immediately, rest, and call for emergency medical help or notify your family.",
    btnTestLowPulse: "🚨 Test Low Pulse Emergency (45 BPM)",
    // Doctor Suggestion & Payment Feature
    btnDoctorSuggest: "🩺 Suggest Doctor by Disease",
    doctorSuggestModalTitle: "🩺 Suggest Doctor Specialist by Diagnosed Disease",
    btnPayHospital: "💳 Pay Hospital Bill / Book",
    
    // General
    languageToggle: "Language / भाषा / भाषा",
    langEn: "English",
    langHi: "हिंदी",
    langBn: "বাংলা",
    langAs: "অসমীয়া",
  },
  
  hi: {
    appName: "SAATHI",
    tagline: "प्रौद्योगिकी जो आपकी भाषा बोलती है।",
    greetingHeader: "नमस्ते 🙏",
    greetingSub: "आज मैं आपकी कैसे मदद कर सकती हूँ?",
    
    // Navigation
    navHome: "होम",
    navHospitals: "अस्पताल व हेल्पलाइन",
    navMedicines: "मेरी दवाइयाँ",
    navPhoneHelp: "फ़ोन सहायता व पर्चा वाचक",
    navTalk: "साथी से बात करें",
    navVitals: "मरीज़ के कदम Tracker",
    navFamily: "परिवार का डैशबोर्ड",
    
    // Voice Button / Hero
    talkToSaathiBtn: "साथी से बात करें",
    pressAndSpeak: "बटन दबाएं और बोलें",
    listening: "मैं सुन रही हूँ...",
    processing: "सोच रही हूँ...",
    
    // Home Cards
    cardHospitalsTitle: "भारत के सर्वश्रेष्ठ अस्पताल",
    cardHospitalsDesc: "शीर्ष अस्पताल सूची और 24x7 आपातकालीन नंबर।",
    cardMedicinesTitle: "मेरी दवाइयाँ",
    cardMedicinesDesc: "आज की दवाइयाँ और रिमाइंडर देखें।",
    cardPhoneHelpTitle: "फ़ोन सहायता व पर्चा वाचक",
    cardPhoneHelpDesc: "फोन स्क्रीनशॉट या डॉक्टर का पर्चा अपलोड करें और आसान जवाब पाएं।",
    cardFamilyTitle: "मेरा परिवार",
    cardFamilyDesc: "अपने परिवार से जुड़े रहें।",
    
    // Today's Reminder
    reminderTitle: "आज का रिमाइंडर",
    reminderNextText: "आपकी अगली दवा रात 9:00 बजे है।",
    reminderMedicineName: "Medicine C (1 गोली)",
    
    // Emergency Button & Modal
    needHelpBtn: "मदद चाहिए",
    emergencyModalTitle: "आपातकालीन सहायता व एम्बुलेंस 🆘",
    emergencyModalQuestion: "24x7 एम्बुलेंस व आपातकालीन हेल्पलाइन नंबर:",
    emergencyAmbulanceTitle: "24x7 मुफ़्त एम्बुलेंस व आपातकालीन नंबर:",
    btnCallAmbulance108: "मुफ़्त एम्बुलेंस कॉल करें (108) 🚑",
    btnCallEmergency112: "आपातकालीन हेल्पलाइन कॉल करें (112) 🚨",
    btnCallElderline14567: "वरिष्ठ नागरिक हेल्पलाइन (14567) 👴",
    emergencyConfirm: "परिवार (रमेश) को सूचित करें",
    emergencyCancel: "बंद करें / वापस",
    emergencySentTitle: "परिवार को संदेश भेजा गया!",
    emergencySentMsg: "हमने आपके मुख्य पारिवारिक संपर्क को एक जरूरी अलर्ट संदेश भेज दिया है।",
    
    // Notifications & Theme
    notificationsTitle: "सूचनाएँ (Notifications)",
    unreadTag: "नई",
    notifFilterAll: "सभी",
    notifFilterUnread: "बिना पढ़ी",
    notifMarkAllRead: "सभी पढ़ी गईं मार्क करें",
    notifClearAll: "साफ़ करें",
    btnTestNotification: "डेमो नोटिफिकेशन भेजें",
    noNotifications: "अभी कोई नई सूचना नहीं है।",
    themeLight: "लाइट",
    themeDark: "डार्क",

    // My Medicines Page
    medicinesTitle: "मेरी दवाइयाँ",
    medicinesSub: "आज की दवाइयों का समय",
    statusTaken: "ली गई ✓",
    statusUpcoming: "बाकी है",
    statusMissed: "छूट गई ✕",
    btnTookIt: "मैंने ले ली ✓",
    btnMarkedTaken: "✓ ली गई",
    addMedicineBtn: "+ नई दवा जोड़ें",
    addMedTitle: "नई दवा जोड़ें",
    medNameLabel: "दवा का नाम",
    medTimeLabel: "समय (जैसे रात 9:00 बजे)",
    medDosageLabel: "खुराक (जैसे 1 गोली)",
    saveMedBtn: "दवा सुरक्षित करें",
    
    // Medicine Warning
    medWarningTitle: "महत्वपूर्ण सूचना",
    medWarningText: "साथी केवल आपके या आपके परिवार द्वारा सहेजी गई दवाइयों के बारे में याद दिलाता है। हमेशा अपने डॉक्टर के पर्चे का पालन करें।",
    
    // Phone Help & Prescription Page
    phoneHelpTitle: "फ़ोन सहायता एवं डॉक्टर पर्चा वाचक",
    phoneHelpSub: "अपने फोन का स्क्रीनशॉट या डॉक्टर का पर्चा अपलोड करें। मैं आपको आसानी से समझाऊंगी।",
    uploadBoxTitle: "फोटो, स्क्रीनशॉट या डॉक्टर का पर्चा अपलोड करें",
    uploadBoxSub: "मैं डॉक्टर की लिखावट पढ़कर दवाइयों का समय और खुराक बोलकर समझाऊंगी।",
    btnUploadScreenshot: "फोटो / पर्चा अपलोड करें 📸",
    usePresetTitle: "या उदाहरण के लिए दस्तावेज चुनें:",
    presetPrescription: "डॉक्टर का पर्चा (Doctor Prescription)",
    presetWhatsapp: "व्हाट्सएप वीडियो कॉल स्क्रीन",
    presetGallery: "गैलरी से फोटो भेजना",
    presetUpi: "यूपीआई से बिल भरना",
    
    tellMeSectionTitle: "उदाहरण पर्चा या स्क्रीन चुनकर जांचें",
    chipPrescription: "डॉक्टर का पर्चा (Doctor Prescription)",
    chipWhatsapp: "व्हाट्सएप कॉल करें",
    chipPhoto: "फोटो भेजें",
    chipVideoCall: "वीडियो कॉल में जुड़ें",
    chipUpi: "यूपीआई से बिल दें",
    
    analyzingState: "साथी आपके पर्चे/दस्तावेज को समझ रही है...",
    stepCounter: "स्टेप {step} / {total}",
    btnNextStep: "अगला स्टेप ➔",
    btnPrevStep: "पिछला स्टेप ⬅",
    btnListenStep: "बोलकर सुनो 🔊",
    
    // Talk to Saathi Page
    talkTitle: "साथी से बात करें",
    talkSub: "बटन दबाएं और बोलें। मैं हिंदी, अंग्रेजी, बांग्ला या असमिया में जवाब दे सकती हूँ।",
    sampleQuestionsTitle: "या इनमें से किसी सवाल पर क्लिक करें:",
    q1: "Doctor ke parche ki dawai batao",
    q2: "मेरी आज की दवाई का टाइम क्या है?",
    q3: "बेटी को फोन कॉल लगाओ",
    q4: "मौसम कैसा है आज?",
    userPromptLabel: "आपने पूछा:",
    saathiReplyLabel: "साथी का जवाब:",
    typePlaceholder: "या अपना सवाल यहाँ लिखें...",
    btnSend: "भेजें",
    deleteChat: "चैट इतिहास साफ़ करें 🗑️",
    deleteMessage: "संदेश हटाएं",
    confirmDeleteAll: "क्या आप वाकई सभी चैट संदेश हटाना चाहते हैं?",
    speakSpeechSupported: "आवाज़ पहचान तैयार है! बोलने के लिए माइक दबाएं।",
    speakSpeechNotSupported: "नीचे दी गई बटन से बात करें। (वेब स्पीच समर्थन उपलब्ध है)",
    
    // Family Dashboard Page
    familyTitle: "परिवार का डैशबोर्ड",
    familySub: "अपनों को सुरक्षित और कनेक्टेड रखें।",
    familyBadge: "केयरगिवर पोर्टल",
    statMedicines: "दवाइयाँ ली गईं",
    statMedicinesSub: "आज 5 में से 4 दवाइयाँ ली गईं",
    statTechHelp: "तकनीकी मदद",
    statTechHelpSub: "आज 2 सहायता अनुरोध",
    statAlerts: "जरूरी अलर्ट",
    statAlertsSub: "0 आपातकालीन अलर्ट",
    
    activityTitle: "आज की दवाइयों की स्थिति",
    colTime: "समय",
    colMedicine: "दवा",
    colStatus: "स्थिति",
    colAction: "कार्रवाई / टिप्पणी",
    
    recentHelpTitle: "हाल के पर्चे और मार्गदर्शन अनुरोध",
    help1Title: "डॉक्टर पर्चा विश्लेषण (Prescription Reader)",
    help1Time: "आज, 11:30 बजे",
    help1Status: "पूरा हुआ (4 दवाइयाँ निकाली गईं)",
    help2Title: "व्हाट्सएप वीडियो कॉल सहायता",
    help2Time: "कल, 4:15 बजे",
    help2Status: "पूरा हुआ (3 स्टेप्स)",
    
    familyContactName: "रमेश शर्मा (बेटा)",
    familyContactPhone: "+91 98765 43210",
    btnCallNow: "कॉल करें 📞",
    btnSendReminder: "वॉयस नोट भेजें 🎙️",
    
    // Low Pulse Emergency Alarm
    lowPulseAlarmTitle: "🚨 गंभीर चेतावनी: आपकी नाब्ज़/पल्स बहुत कम है (< 50 BPM)!",
    lowPulseAlarmMsg: "आपकी दिल की धड़कन खतरनाक रूप से कम हो गई है। तुरंत बैठ जाएं, पानी पिएं और 108 फ्री एम्बुलेंस या परिवार को तुरंत कॉल करें।",
    lowPulseVoiceText: "सावधान! आपकी दिल की धड़कन बहुत कम हो गई है। पल्स रेट 50 से नीचे है। कृपया तुरंत बैठ जाएं, आराम करें और 108 एम्बुलेंस या परिवार को तुरंत सूचित करें।",
    btnTestLowPulse: "🚨 लो पल्स अलार्म टेस्ट करें (45 BPM)",
    // Doctor Suggestion & Payment Feature
    btnDoctorSuggest: "🩺 बीमारी के अनुसार डॉक्टर सुझाव",
    doctorSuggestModalTitle: "🩺 बीमारी के अनुसार विशेषज्ञ डॉक्टर का सुझाव",
    btnPayHospital: "💳 इलाज व अस्पताल बिल भुगतान",
    
    // General
    languageToggle: "भाषा / Language",
    langEn: "English",
    langHi: "हिंदी",
    langBn: "বাংলা",
    langAs: "অসমীয়া",
  },

  bn: {
    appName: "SAATHI",
    tagline: "প্রযুক্তি যা আপনার ভাষায় কথা বলে।",
    greetingHeader: "নমস্কার 🙏",
    greetingSub: "আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
    
    // Navigation
    navHome: "হোম",
    navHospitals: "সেরা হাসপাতাল",
    navMedicines: "আমার ওষুধ",
    navPhoneHelp: "ফোন সাহায্য ও প্রেসক্রিপশন",
    navTalk: "সাথীর সাথে কথা বলুন",
    navVitals: "পদক্ষেপ ট্র্যাকার",
    navFamily: "পরিবার ড্যাশবোর্ড",
    
    // Voice Button / Hero
    talkToSaathiBtn: "সাথীর সাথে কথা বলুন",
    pressAndSpeak: "বোতাম টিপে কথা বলুন",
    listening: "আমি শুনছি...",
    processing: "ভাবছি...",
    
    // Home Cards
    cardHospitalsTitle: "ভারতের সেরা হাসপাতাল",
    cardHospitalsDesc: "শীর্ষ হাসপাতাল তালিকা ও ২৪x৭ জরুরি হেল্পলাইন।",
    cardMedicinesTitle: "আমার ওষুধ",
    cardMedicinesDesc: "আজকের ওষুধ ও রিমাইন্ডার দেখুন।",
    cardPhoneHelpTitle: "ফোন সাহায্য ও প্রেসক্রিপশন",
    cardPhoneHelpDesc: "ফোনের স্ক্রিনশট বা ডাক্তারের প্রেসক্রিপশন আপলোড করুন।",
    cardFamilyTitle: "আমার পরিবার",
    cardFamilyDesc: "আপনার পরিবারের সাথে যুক্ত থাকুন।",
    
    // Today's Reminder
    reminderTitle: "আজকের রিমাইন্ডার",
    reminderNextText: "আপনার পরবর্তী ওষুধ রাত ৯:০০ টায়।",
    reminderMedicineName: "Medicine C (১টি ট্যাবলেট)",
    
    // Emergency Button & Modal
    needHelpBtn: "সাহায্য চাই",
    emergencyModalTitle: "জরুরি সহায়তা ও অ্যাম্বুলেন্স 🆘",
    emergencyModalQuestion: "২৪x৭ অ্যাম্বুলেন্স ও জরুরি হেল্পলাইন নম্বর:",
    emergencyAmbulanceTitle: "২৪x৭ বিনামূল্যে অ্যাম্বুলেন্স ও জরুরি নম্বর:",
    btnCallAmbulance108: "বিনামূল্যে অ্যাম্বুলেন্স ডাকুন (108) 🚑",
    btnCallEmergency112: "জরুরি হেল্পলাইনে কল করুন (112) 🚨",
    btnCallElderline14567: "বয়স্ক হেল্পলাইন (14567) 👴",
    emergencyConfirm: "পরিবারকে (রমেশ) জানান",
    emergencyCancel: "বন্ধ করুন / পিছন",
    emergencySentTitle: "পরিবারকে জানানো হয়েছে!",
    emergencySentMsg: "আমরা আপনার প্রধান পারিবারিক পরিচিতিকে একটি জরুরি বার্তা পাঠিয়েছি।",
    
    // Notifications & Theme
    notificationsTitle: "বিজ্ঞপ্তি (Notifications)",
    unreadTag: "নতুন",
    notifFilterAll: "সব",
    notifFilterUnread: "অপঠিত",
    notifMarkAllRead: "সব পঠিত চিহ্নিত করুন",
    notifClearAll: "মুছে ফেলুন",
    btnTestNotification: "ডেমো বিজ্ঞপ্তি পাঠান",
    noNotifications: "এখনও কোনো বিজ্ঞপ্তি নেই।",
    themeLight: "লাইটিং",
    themeDark: "ডার্ক",

    // My Medicines Page
    medicinesTitle: "আমার ওষুধ",
    medicinesSub: "আজকের ওষুধের সময়সূচী",
    statusTaken: "নেওয়া হয়েছে ✓",
    statusUpcoming: "বাকি আছে",
    statusMissed: "মিস হয়েছে ✕",
    btnTookIt: "আমি খেয়েছি ✓",
    btnMarkedTaken: "✓ নেওয়া হয়েছে",
    addMedicineBtn: "+ নতুন ওষুধ যোগ করুন",
    addMedTitle: "নতুন ওষুধ যোগ করুন",
    medNameLabel: "ওষুধের নাম",
    medTimeLabel: "সময় (যেমন সকাল ৮:০০)",
    medDosageLabel: "মাত্রা (যেমন ১টি ট্যাবলেট)",
    saveMedBtn: "ওষুধ সংরক্ষণ করুন",
    
    // Medicine Warning
    medWarningTitle: "গুরুত্বপূর্ণ তথ্য",
    medWarningText: "সাথী কেবল আপনার বা আপনার পরিবারের সংরক্ষিত ওষুধ স্মরণ করায়। সবসময় ডাক্তারের পরামর্শ মানুন।",
    
    // Phone Help & Prescription Page
    phoneHelpTitle: "ফোন সাহায্য ও ডাক্তার প্রেসক্রিপশন রিডার",
    phoneHelpSub: "ফোনের স্ক্রিনশট বা ডাক্তারের প্রেসক্রিপশন আপলোড করুন। আমি ধাপে ধাপে বুঝিয়ে দেব।",
    uploadBoxTitle: "ছবি, স্ক্রিনশট বা ডাক্তারের প্রেসক্রিপশন আপলোড করুন",
    uploadBoxSub: "আমি ডাক্তারের হাতের লেখা পড়ে ওষুধের সময় ও নিয়ম বুঝিয়ে দেব।",
    btnUploadScreenshot: "ছবি / প্রেসক্রিপশন আপলোড করুন 📸",
    usePresetTitle: "অথবা উদাহরণের জন্য নথি নির্বাচন করুন:",
    presetPrescription: "ডাক্তারের প্রেসক্রিপশন (Prescription)",
    presetWhatsapp: "হোয়াটসঅ্যাপ ভিডিও কল স্ক্রিন",
    presetGallery: "গ্যালারি থেকে ছবি পাঠানো",
    presetUpi: "ইউপিআই বিল দেওয়া",
    
    tellMeSectionTitle: "উদাহরণ প্রেসক্রিপশন বা স্ক্রিন বেছে পরীক্ষা করুন",
    chipPrescription: "ডাক্তারের প্রেসক্রিপশন (Prescription)",
    chipWhatsapp: "হোয়াটসঅ্যাপ কল করুন",
    chipPhoto: "ছবি পাঠান",
    chipVideoCall: "ভিডিও কলে যুক্ত হন",
    chipUpi: "ইউপিআই বিল দিন",
    
    analyzingState: "সাথী আপনার প্রেসক্রিপশন/নথি বিশ্লেষণ করছে...",
    stepCounter: "ধাপ {step} / {total}",
    btnNextStep: "পরবর্তী ধাপ ➔",
    btnPrevStep: "আগের ধাপ ⬅",
    btnListenStep: "পড়ে শুনুন 🔊",
    
    // Talk to Saathi Page
    talkTitle: "সাথীর সাথে কথা বলুন",
    talkSub: "বোতাম টিপে কথা বলুন। আমি বাংলা, অসমীয়া, হিন্দি ও ইংরেজিতে উত্তর দিতে পারি।",
    sampleQuestionsTitle: "অথবা এই প্রশ্নগুলির যেকোনো একটিতে ক্লিক করুন:",
    q1: "ডাক্তারের প্রেসক্রিপশনের ওষুধ দেখাও",
    q2: "আমার আজকের ওষুধের সময় কখন?",
    q3: "মেয়েকে ফোন কল করো",
    q4: "আজকের আবহাওয়া কেমন?",
    userPromptLabel: "আপনি জিজ্ঞাসা করেছেন:",
    saathiReplyLabel: "সাথীর উত্তর:",
    typePlaceholder: "অথবা আপনার প্রশ্ন লিখুন...",
    btnSend: "পাঠান",
    deleteChat: "চ্যাট ইতিহাস মুছে ফেলুন 🗑️",
    deleteMessage: "বার্তা মুছুন",
    confirmDeleteAll: "আপনি কি সমস্ত চ্যাট বার্তা মুছে ফেলতে চান?",
    speakSpeechSupported: "ভয়েস সার্চ প্রস্তুত! কথা বলতে মাইক বোতাম টিপুন।",
    speakSpeechNotSupported: "নিচে দেওয়া বোতামে কথা বলুন।",
    
    // Family Dashboard Page
    familyTitle: "পরিবার ড্যাশবোর্ড",
    familySub: "প্রিয়জনকে সুরক্ষিত ও যুক্ত রাখুন।",
    familyBadge: "কেয়ারগিভার পোর্টাল",
    statMedicines: "ওষুধ গ্রহণ করা হয়েছে",
    statMedicinesSub: "আজ ৫টির মধ্যে ৪টি ওষুধ নেওয়া হয়েছে",
    statTechHelp: "প্রযুক্তিগত সাহায্য",
    statTechHelpSub: "আজ ২টি সাহায্যের অনুরোধ",
    statAlerts: "জরুরি সতর্কতা",
    statAlertsSub: "০টি জরুরি সতর্কতা",
    
    activityTitle: "আজকের ওষুধের বিবরণ",
    colTime: "সময়",
    colMedicine: "ওষুধ",
    colStatus: "অবস্থা",
    colAction: "পদক্ষেপ / মন্তব্য",
    
    recentHelpTitle: "সাম্প্রতিক প্রেসক্রিপশন ও নির্দেশনা অনুরোধ",
    help1Title: "ডাক্তার প্রেসক্রিপশন বিশ্লেষণ",
    help1Time: "আজ, সকাল ১১:৩০",
    help1Status: "সম্পন্ন (৪টি ওষুধ পাওয়া গেছে)",
    help2Title: "হোয়াটসঅ্যাপ ভিডিও কল সহায়তা",
    help2Time: "গতকাল, বিকেল ৪:১৫",
    help2Status: "সম্পন্ন (৩টি ধাপ)",
    
    familyContactName: "রমেশ শর্মা (ছেলে)",
    familyContactPhone: "+91 98765 43210",
    btnCallNow: "এখনই কল করুন 📞",
    btnSendReminder: "ভয়েস নোট পাঠান 🎙️",
    
    // Low Pulse Emergency Alarm
    lowPulseAlarmTitle: "🚨 আশঙ্কাজনক সতর্কবার্তা: পালস স্পন্দন অত্যন্ত কম (< 50 BPM)!",
    lowPulseAlarmMsg: "আপনার হৃদস্পন্দন মারাত্মকভাবে কমে গেছে। অবিলম্বে বসে পড়ুন, জল পান করুন এবং ১০৮ ফ্রি অ্যাম্বুলেন্স বা পরিবারকে কল করুন।",
    lowPulseVoiceText: "সাবধান! আপনার হৃদস্পন্দন অত্যন্ত কমে গেছে। পালস হার মিনিটে ৫০ এর নিচে। অবিলম্বে বসে পড়ুন, বিশ্রাম নিন এবং ১০৮ অ্যাম্বুলেন্স বা পরিবারকে জরুরি খবর দিন।",
    btnTestLowPulse: "🚨 কম পালস অ্যালার্ম টেস্ট (45 BPM)",
    bpmStatusVeryLow: "🚨 আশঙ্কাজনক কম পালস (< 50 BPM) - ইমার্জেন্সি অ্যালার্ম!",
    // Doctor Suggestion & Payment Feature
    btnDoctorSuggest: "🩺 রোগ অনুযায়ী ডাক্তার পরামর্শ",
    doctorSuggestModalTitle: "🩺 রোগ অনুযায়ী বিশেষজ্ঞ ডাক্তার পরামর্শ",
    btnPayHospital: "💳 হাসপাতাল বিল ও চিকিৎসা পেমেন্ট",
    
    // General
    languageToggle: "ভাষা / Language",
    langEn: "English",
    langHi: "हिंदी",
    langBn: "বাংলা",
    langAs: "অসমীয়া",
  },

  as: {
    appName: "SAATHI",
    tagline: "প্রযুক্তি যিয়ে আপোনাৰ ভাষা কয়।",
    greetingHeader: "নমস্কাৰ 🙏",
    greetingSub: "আজি মই আপোনাক কেনেকৈ সহায় কৰিব পাৰোঁ?",
    
    // Navigation
    navHome: "হোম",
    navHospitals: "শ্ৰেষ্ঠ চিকিৎসালয়",
    navMedicines: "মোৰ ঔষধ",
    navPhoneHelp: "ফোন সহায় আৰু প্ৰে ক্ৰিপচন",
    navTalk: "সাথীৰ সৈতে কথা পাতক",
    navVitals: "খোজ কাঢ়া ট্রকাৰ",
    navFamily: "পৰিয়াল ডেশ্ববৰ্ড",
    
    // Voice Button / Hero
    talkToSaathiBtn: "সাথীৰ সৈতে কথা পাতক",
    pressAndSpeak: "বটম টিপি কথা পাতক",
    listening: "মই শুনি আছোঁ...",
    processing: "ভাবি আছোঁ...",
    
    // Home Cards
    cardHospitalsTitle: "ভাৰতৰ শ্ৰেষ্ঠ চিকিৎসালয়",
    cardHospitalsDesc: "শীৰ্ষ চিকিৎসালয়ৰ তালিকা আৰু ২৪x৭ জৰুৰীকালীন হেল্পলাইন।",
    cardMedicinesTitle: "মোৰ ঔষধ",
    cardMedicinesDesc: "আজিৰ ঔষধ আৰু ৰিমাইণ্ডাৰ চাওক।",
    cardPhoneHelpTitle: "ফোন সহায় আৰু প্ৰে ক্ৰিপচন",
    cardPhoneHelpDesc: "ফোনৰ স্ক্ৰীনশ্বট বা ডাক্তৰৰ প্ৰে ক্ৰিপচন আপলোড কৰক।",
    cardFamilyTitle: "মোৰ পৰিয়াল",
    cardFamilyDesc: "আপোনাৰ পৰিয়ালৰ সৈতে সংলগ্ন থাকক।",
    
    // Today's Reminder
    reminderTitle: "আজিৰ ৰিমাইণ্ডাৰ",
    reminderNextText: "আপোনাৰ পৰৱৰ্তী ঔষধ ৰাতি ৯:০০ বজাত।",
    reminderMedicineName: "Medicine C (১ টা টেবলেট)",
    
    // Emergency Button & Modal
    needHelpBtn: "সহায় লাগে",
    emergencyModalTitle: "জৰুৰীকালীন সহায় আৰু এম্বুলেন্স 🆘",
    emergencyModalQuestion: "২৪x৭ এম্বুলেন্স আৰু জৰুৰীকালীন হেল্পলাইন নম্বৰ:",
    emergencyAmbulanceTitle: "২৪x৭ বিনামূলীয়া এম্বুলেন্স আৰু জৰুৰীকালীন নম্বৰ:",
    btnCallAmbulance108: "বিনামূলীয়া এম্বুলেন্স কাল কৰক (108) 🚑",
    btnCallEmergency112: "জৰুৰীকালীন হেল্পলাইন কাল কৰক (112) 🚨",
    btnCallElderline14567: "জ্যেষ্ঠ নাগৰিক হেল্পলাইন (14567) 👴",
    emergencyConfirm: "পৰিয়ালক (ৰমেশ) জনাওক",
    emergencyCancel: "বন্ধ কৰক / পিছলৈ",
    emergencySentTitle: "পৰিয়াললৈ বাৰ্তা প্ৰেৰণ কৰা হ'ল!",
    emergencySentMsg: "আমি আপোনাৰ মুখ্য পাৰিবাৰিক সম্পৰ্কলৈ এটা জৰুৰী সতৰ্কতা বাৰ্তা প্ৰেৰণ কৰিছোঁ।",
    
    // Notifications & Theme
    notificationsTitle: "অধিসূচনা (Notifications)",
    unreadTag: "নতুন",
    notifFilterAll: "সকলো",
    notifFilterUnread: "নপঢ়া",
    notifMarkAllRead: "সকলো পঢ়া বুলি চিহ্ন দিয়ক",
    notifClearAll: "মচি পেলাওক",
    btnTestNotification: "ডেমো অধিসূচনা পঠিয়াওক",
    noNotifications: "এতিয়ালৈকে কোনো অধিসূচনা নাই।",
    themeLight: "লাইট",
    themeDark: "ডাৰ্ক",

    // My Medicines Page
    medicinesTitle: "মোৰ ঔষধ",
    medicinesSub: "আজিৰ ঔষধৰ সময়সূচী",
    statusTaken: "লোৱা হ'ল ✓",
    statusUpcoming: "বাকী আছে",
    statusMissed: "মিছ হ'ল ✕",
    btnTookIt: "মই খালোঁ ✓",
    btnMarkedTaken: "✓ লোৱা হ'ল",
    addMedicineBtn: "+ নতুন ঔষধ যোগ কৰক",
    addMedTitle: "নতুন ঔষধ যোগ কৰক",
    medNameLabel: "ঔষধৰ নাম",
    medTimeLabel: "সময় (যেনে ৰাতিপুৱা ৮:০০)",
    medDosageLabel: "পৰিমাণ (যেনে ১ টা টেবলেট)",
    saveMedBtn: "ঔষধ সংৰক্ষণ কৰক",
    
    // Medicine Warning
    medWarningTitle: "গুৰুত্বপূৰ্ণ তথ্য",
    medWarningText: "সাথীয়ে কেৱল আপুনি বা আপোনাৰ পৰিয়ালে সংৰক্ষণ কৰা ঔষধৰ কথা মনত পেলাই দিয়ে। সদায় ডাক্তৰৰ পৰামৰ্শ মানি চলিব।",
    
    // Phone Help & Prescription Page
    phoneHelpTitle: "ফোন সহায় আৰু ডাক্তৰৰ প্ৰে ক্ৰিপচন ৰিডাৰ",
    phoneHelpSub: "ফোনৰ স্ক্ৰীনশ্বট বা ডাক্তৰৰ প্ৰে ক্ৰিপচন আপলোড কৰক। মই খোজ ক্ৰমে বুজাই দিম।",
    uploadBoxTitle: "ফটো, স্ক্ৰীনশ্বট বা ডাক্তৰৰ প্ৰে ক্ৰিপচন আপলোড কৰক",
    uploadBoxSub: "মই ডাক্তৰৰ হাতৰ লেখা পঢ়ি ঔষধৰ সময় আৰু নিয়ম বুজাই দিম।",
    btnUploadScreenshot: "ফটো / প্ৰে ক্ৰিপচন আপলোড কৰক 📸",
    usePresetTitle: "অথবা উদাহৰণৰ বাবে নথি বাছক:",
    presetPrescription: "ডাক্তৰৰ প্ৰে ক্ৰিপচন (Prescription)",
    presetWhatsapp: "হোৱাটছএপ ভিডিঅ' কল স্ক্ৰীন",
    presetGallery: "গেলাৰীৰ পৰা ফটো প্ৰেৰণ",
    presetUpi: "ইউপিআই বিল পৰিশোধ",
    
    tellMeSectionTitle: "উদাহৰণ প্ৰে ক্ৰিপচন বা স্ক্ৰীন বাছি পৰীক্ষা কৰক",
    chipPrescription: "ডাক্তৰৰ প্ৰে ক্ৰিপচন (Prescription)",
    chipWhatsapp: "হোৱাটছএপ কল কৰক",
    chipPhoto: "ফটো পঠিয়াওক",
    chipVideoCall: "ভিডিঅ' কলত যোগ দিয়ক",
    chipUpi: "ইউপিআই বিল দিয়ক",
    
    analyzingState: "সাথীয়ে আপোনাৰ নথিপত্ৰ পৰীক্ষা কৰি আছে...",
    stepCounter: "খোজ {step} / {total}",
    btnNextStep: "পরৱৰ্তী খোজ ➔",
    btnPrevStep: "পূৰ্বৱৰ্তী খোজ ⬅",
    btnListenStep: "শুনি লওক 🔊",
    
    // Talk to Saathi Page
    talkTitle: "সাথীৰ সৈতে কথা পাতক",
    talkSub: "বটম টিপি কথা পাতক। মই অসমীয়া, বাংলা, হিন্দী আৰু ইংৰাজীত উত্তৰ দিব পাৰোঁ।",
    sampleQuestionsTitle: "অথবা এই প্ৰশ্নসমূহৰ যিকোনো এটাত ক্লিক কৰক:",
    q1: "ডাক্তৰৰ প্ৰে ক্ৰিপচনৰ ঔষধ দেখুওৱা",
    q2: "মোৰ আজিৰ ঔষধৰ সময় কেতিয়া?",
    q3: "জীয়ৰীলৈ ফোন কল কৰক",
    q4: "আজি বতৰ কেনেকুৱা?",
    userPromptLabel: "আপুনি সুধিলে:",
    saathiReplyLabel: "সাথীয়ে ক'লে:",
    typePlaceholder: "অথবা আপোনাৰ প্ৰশ্ন লিখক...",
    btnSend: "পঠিয়াওক",
    deleteChat: "চেট ইতিবৃত্ত মচি পেলাওক 🗑️",
    deleteMessage: "বাৰ্তা মচক",
    confirmDeleteAll: "আপুনি সঁচাকৈয়ে সকলো চেট বাৰ্তা মচি পেলাব বিচাৰে নেকি?",
    speakSpeechSupported: "ভয়েছ চিনাক্তকৰণ প্ৰস্তুত! কথা কবলৈ মাইক টিপক।",
    speakSpeechNotSupported: "তলৰ বটমত কথা পাতক।",
    
    // Family Dashboard Page
    familyTitle: "পৰিয়াল ডেশ্ববৰ্ড",
    familySub: "আপোনজনক সুৰক্ষিত আৰু সংযুক্ত ৰাখক।",
    familyBadge: "কেয়াৰগিভাৰ প'ৰ্টেল",
    statMedicines: "ঔষধ গ্ৰহণ কৰা হ'ল",
    statMedicinesSub: "আজি ৫ টাৰ ভিতৰত ৪ টা ঔষধ লোৱা হ'ল",
    statTechHelp: "প্ৰযুক্তিগত সহায়",
    statTechHelpSub: "আজি ২ টা সহায়ৰ অনুৰোধ",
    statAlerts: "জৰুৰী সতৰ্কতা",
    statAlertsSub: "০ টা জৰুৰী সতৰ্কতা",
    
    activityTitle: "আজিৰ ঔষধৰ কাৰ্য্যকলাপ",
    colTime: "সময়",
    colMedicine: "ঔষধ",
    colStatus: "অৱস্থা",
    colAction: "পদক্ষেপ / মন্তব্য",
    
    recentHelpTitle: "শেহতীয়া প্ৰে ক্ৰিপচন আৰু নিৰ্দেশনা অনুৰোধ",
    help1Title: "ডাক্তৰৰ প্ৰে ক্ৰিপচন বিশ্লেষণ",
    help1Time: "আজি, ৰাতিপুৱা ১১:৩০",
    help1Status: "সম্পূৰ্ণ হ'ল (৪ টা ঔষধ উদ্ধাৰ হ'ল)",
    help2Title: "হোৱাটছএপ ভিডিঅ' কল সহায়",
    help2Time: "গতকালি, বিয়লি ৪:১৫",
    help2Status: "সম্পূৰ্ণ হ'ল (৩ টা খোজ)",
    
    familyContactName: "ৰমেশ শৰ্মা (পুত্ৰ)",
    familyContactPhone: "+91 98765 43210",
    btnCallNow: "এতিয়াই কল কৰক 📞",
    btnSendReminder: "ভয়েছ নোট পঠিয়াওক 🎙️",
    
    // Low Pulse Emergency Alarm
    lowPulseAlarmTitle: "🚨 গুৰুতৰ সতৰ্কবাৰ্তা: নাড়ীৰ স্পন্দন অতি কম (< 50 BPM)!",
    lowPulseAlarmMsg: "আপোনাৰ হৃদস্পন্দন বিপজ্জনকভাৱে হ্ৰাস পাইছে। লগে লগে বহক, পানী খাওক আৰু ১০৮ বিনামূলীয়া এম্বুলেন্স বা পৰিয়ালক কল কৰক।",
    lowPulseVoiceText: "সাৱধান! আপোনাৰ নাড়ীৰ স্পন্দন অতি হ্ৰাস পাইছে। হৃদস্পন্দন ৫০ তকৈ কম। অনুগ্ৰহ কৰি লগে লগে বহক, বিশ্ৰাম লওক আৰু ১০৮ এম্বুলেন্স বা পৰিয়ালক খবৰ দিয়ক।",
    btnTestLowPulse: "🚨 কম পালছ এলাৰ্ম পৰীক্ষা কৰক (45 BPM)",
    // Doctor Suggestion & Payment Feature
    btnDoctorSuggest: "🩺 ৰোগ অনুসৰি চিকিৎসক পৰামৰ্শ",
    doctorSuggestModalTitle: "🩺 ৰোগ অনুসৰি বিশেষজ্ঞ চিকিৎসকৰ পৰামৰ্শ",
    btnPayHospital: "💳 চিকিৎসালয়ৰ বিল আৰু পেমেন্ট",
    
    // General
    languageToggle: "ভাষা / Language",
    langEn: "English",
    langHi: "हिंदी",
    langBn: "বাংলা",
    langAs: "অসমীয়া",
  }
};
