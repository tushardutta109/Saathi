import { processVoiceQuery } from './voiceAssistantEngine';

export const api = {
  // GET /api/medicines
  async getMedicines() {
    await new Promise((res) => setTimeout(res, 300));
    return [
      {
        id: "med-1",
        time: "8:00 AM",
        name: "Medicine A",
        dosage: "1 tablet",
        purpose: "Blood Pressure / BP",
        status: "taken", // "taken" | "upcoming" | "missed"
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
    ];
  },

  // POST /api/medicine/taken
  async markMedicineTaken(medicineId) {
    await new Promise((res) => setTimeout(res, 200));
    return { success: true, medicineId, status: "taken" };
  },

  // POST /api/ask
  async askSaathi(query, lang = "en") {
    const result = await processVoiceQuery(query, lang);
    return {
      answer: result.answer,
      audioText: result.answer,
    };
  },

  // POST /api/analyze-prescription (Doctor Prescription Reader)
  async analyzePrescription(imageSource) {
    await new Promise((res) => setTimeout(res, 1800));

    return {
      isPrescription: true,
      titleEn: "Doctor Prescription Analysis & Breakdown",
      titleHi: "डॉक्टर के पर्चे (Prescription) का विवरण",
      titleBn: "ডাক্তারের প্রেসক্রিপশন বিশ্লেষণ",
      titleAs: "ডাক্তৰৰ প্ৰে ক্ৰিপচন বিশ্লেষণ",
      doctorName: "Dr. A. K. Sharma (MD, Senior Cardiologist)",
      clinicName: "Apollo Heart & Health Clinic",
      patientName: "Patient Care Record",
      date: "13 Aug 2026",
      medicines: [
        {
          id: "presc-med-1",
          name: "Telmisartan 40mg",
          dosage: "1 tablet",
          time: "8:00 AM",
          timingDetailEn: "Before Breakfast",
          timingDetailHi: "नाश्ते से पहले",
          timingDetailBn: "প্রাতরাশের আগে",
          timingDetailAs: "ৰাতিপুৱাৰ আহাৰৰ আগতে",
          purpose: "Blood Pressure / BP",
          status: "upcoming",
          icon: "💊"
        },
        {
          id: "presc-med-2",
          name: "Pantoprazole 40mg",
          dosage: "1 tablet",
          time: "7:30 AM",
          timingDetailEn: "Empty Stomach",
          timingDetailHi: "खाली पेट (सुबह)",
          timingDetailBn: "খালি পেটে (সকালে)",
          timingDetailAs: "খালি পেটত (ৰাতিপুৱা)",
          purpose: "Acidity & Stomach Protection",
          status: "upcoming",
          icon: "💊"
        },
        {
          id: "presc-med-3",
          name: "Metformin 500mg",
          dosage: "1 tablet",
          time: "1:30 PM",
          timingDetailEn: "After Lunch",
          timingDetailHi: "दोपहर के खाने के बाद",
          timingDetailBn: "দুপুরের খাবারের পর",
          timingDetailAs: "দুপৰীয়াৰ আহাৰৰ পিছত",
          purpose: "Diabetes & Blood Sugar",
          status: "upcoming",
          icon: "💊"
        },
        {
          id: "presc-med-4",
          name: "Atorvastatin 10mg",
          dosage: "1 tablet",
          time: "9:00 PM",
          timingDetailEn: "After Dinner (At Bedtime)",
          timingDetailHi: "रात के खाने के बाद",
          timingDetailBn: "রাতের খাবারের পর",
          timingDetailAs: "ৰাতিৰ আহাৰৰ পিছত",
          purpose: "Cholesterol & Heart Care",
          status: "upcoming",
          icon: "💊"
        }
      ],
      instructionsEn: "Take Pantoprazole with warm water on empty stomach. Avoid oily foods and salt intake. Follow up after 7 days.",
      instructionsHi: "पेंटोप्राजोल सुबह गुनगुने पानी के साथ खाली पेट लें। ज्यादा तला-भुना और नमक कम खाएं। 7 दिनों के बाद दोबारा दिखाएं।",
      instructionsBn: "প্যান্টোপ্রাজল সকালে হালকা গরম জলের সাথে খালি পেটে খাবেন। তেল-ঝাল ও অতিরিক্ত লবণ এড়িয়ে চলুন। ৭ দিন পর ডাক্তার দেখান।",
      instructionsAs: "পেন্টোপ্ৰাজল ৰাতিপুৱা ঈষদুষ্ণ পানীৰ সৈতে খালি পেটত খাব। তেলযুক্ত খাদ্য আৰু অতিৰিক্ত নিমখ পৰিহাৰ কৰিব। ৭ দিনৰ পিছত পুনৰ দেখুৱাব।",
      audioSummaryEn: "Doctor Sharma prescribed 4 medicines: Pantoprazole at 7:30 AM, Telmisartan at 8:00 AM, Metformin at 1:30 PM, and Atorvastatin at 9:00 PM.",
      audioSummaryHi: "डॉक्टर शर्मा के पर्चे में 4 दवाइयाँ हैं: सुबह 7:30 बजे पेंटोप्राजोल खाली पेट, 8:00 बजे टेल्मीसार्टन नाश्ते से पहले, दोपहर 1:30 बजे मेटफॉर्मिन और रात 9:00 बजे एटोरवास्टेटिन।",
      audioSummaryBn: "ডাক্তার শর্মার প্রেসক্রিপশনে ৪টি ওষুধ রয়েছে: সকালে ৭:৩০ টায় প্যান্টোপ্রাজল খালি পেটে, ৮:০০ টায় টেলমিসারটান, দুপুরে ১:৩০ টায় মেটফর্মিন এবং রাতে ৯:০০ টায় অ্যাটরভাস্ট্যাটিন।",
      audioSummaryAs: "ডাক্তৰ শৰ্মাৰ প্ৰে ক্ৰিপচনত ৪ টা ঔষধ আছে: ৰাতিপুৱা ৭:৩০ বজাত পেন্টোপ্ৰাজল খালি পেটত, ৮:০০ বজাত টেলমিচাৰটান, দুপৰীয়া ১:৩০ বজাত মেটফৰমিন আৰু ৰাতি ৯:০০ বজাত এটৰভাষ্টেটিন।"
    };
  },

  // POST /api/analyze-screen
  async analyzeScreen(imageSource, promptType = "general") {
    await new Promise((res) => setTimeout(res, 1800));

    if (promptType === "prescription" || imageSource.includes("prescription") || imageSource.includes("parcha")) {
      return this.analyzePrescription(imageSource);
    }

    return {
      title: "Screen Guidance",
      steps: [
        {
          stepNumber: 1,
          totalSteps: 3,
          instruction: "Tap the green highlighted button in the top right corner.",
          instructionHi: "ऊपर दाएं कोने में हरे रंग से हाइलाइट किए गए बटन पर टैप करें।",
          instructionBn: "উপরে ডান কোণায় সবুজ রঙের বোতামে আলতো চাপুন।",
          instructionAs: "ওপৰৰ সোঁ ফালৰ সেউজীয়া ৰঙৰ বটমত টিপক।",
          targetBox: { x: 70, y: 12, width: 20, height: 10 },
          pointerDirection: "top-right",
        },
        {
          stepNumber: 2,
          totalSteps: 3,
          instruction: "Select your recipient or contact from the list shown.",
          instructionHi: "सूची में से अपने संपर्क या व्यक्ति का नाम चुनें।",
          instructionBn: "তালিকা থেকে আপনার যোগাযোগের নাম নির্বাচন করুন।",
          instructionAs: "তালিকাৰ পৰা আপোনাৰ যোগাযোগ বাছক।",
          targetBox: { x: 15, y: 35, width: 70, height: 25 },
          pointerDirection: "center",
        },
        {
          stepNumber: 3,
          totalSteps: 3,
          instruction: "Press the paper plane or Send button (📤) to finish.",
          instructionHi: "भेजने के लिए कागज़ के विमान या Send बटन (📤) को दबाएं।",
          instructionBn: "পাঠাতে সেন্ড বোতাম (📤) চাপুন।",
          instructionAs: "পঠিয়াবলৈ চেন্দ বটম (📤) টিপক।",
          targetBox: { x: 75, y: 80, width: 15, height: 10 },
          pointerDirection: "bottom-right",
        },
      ],
    };
  },

  async getFamilyDashboard() {
    await new Promise((res) => setTimeout(res, 300));
    return {
      medicinesTakenCount: 4,
      medicinesTotalCount: 5,
      techHelpRequestsCount: 2,
      urgentAlertsCount: 0,
      todayActivity: [
        { time: "8:00 AM", medicine: "Medicine A (1 tablet)", status: "taken", label: "✓ Taken" },
        { time: "2:00 PM", medicine: "Medicine B (1 tablet)", status: "missed", label: "✕ Missed" },
        { time: "9:00 PM", medicine: "Medicine C (1 tablet)", status: "upcoming", label: "⏳ Upcoming" },
      ],
    };
  },
};
