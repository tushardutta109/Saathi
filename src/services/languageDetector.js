// Language Detection Module supporting English (en), Hindi (hi), Bengali (bn), and Assamese (as)

export function detectLanguage(text, preferredLang = null) {
  if (!text || typeof text !== 'string') return preferredLang || 'en';
  const trimmed = text.trim();
  const lowerText = trimmed.toLowerCase();

  // 1. Check Devanagari (Hindi) Script
  // Devanagari Unicode range: \u0900-\u097F
  const hasHindiScript = /[\u0900-\u097F]/.test(trimmed);
  if (hasHindiScript) {
    return 'hi';
  }

  // 2. Check Bengali & Assamese (Eastern Nagari) Script: \u0980-\u09FF
  const hasEasternNagari = /[\u0980-\u09FF]/.test(trimmed);
  if (hasEasternNagari) {
    // Distinct Assamese Unicode characters: 'ৰ' (\u09F0) and 'ৱ' (\u09F1)
    const hasAssameseChars = /[\u09F0\u09F1]/.test(trimmed);
    const assameseKeywords = [
      'আজিৰ', 'বতৰ', 'নমস্কাৰ', 'কেনেকুৱা', 'পাৰোঁ', 'আছোঁ', 'অসম', 
      'মোৰ', 'কৰক', 'কৰিব', 'সুধিব', 'পৰিয়াল', 'ৰাতিপুৱা', 'পুত্ৰ', 'মোক', 'আপোনাৰ', 'কেনে'
    ];
    const isAssameseKeyword = assameseKeywords.some(kw => trimmed.includes(kw));

    if (hasAssameseChars || isAssameseKeyword) {
      return 'as';
    }

    // Distinct Bengali Unicode characters: 'র' (\u09B0)
    const hasBengaliChars = /[\u09B0]/.test(trimmed);
    const bengaliKeywords = [
      'আজকের', 'আবহাওয়া', 'নমস্কার', 'কেমন', 'আছেন', 'ভালো', 'হ্যালো',
      'আমার', 'আপনার', 'ওষুধ', 'সাহায্য', 'পরিবার', 'ছেলে', 'মেয়ে', 'ধন্যবাদ',
      'করুন', 'করবেন', 'বলুন', 'প্রেসক্রিপশন', 'ডাক্তার'
    ];
    const isBengaliKeyword = bengaliKeywords.some(kw => trimmed.includes(kw));

    if (hasBengaliChars || isBengaliKeyword) {
      return 'bn';
    }

    // If both scripts share characters (like "হ্যালো", "ঔষধ") and user has a preference
    if (preferredLang === 'bn' || preferredLang === 'as') {
      return preferredLang;
    }

    // Default to Bengali for Eastern Nagari script
    return 'bn';
  }

  // 3. Romanized / Hinglish detection
  const hinglishKeywords = [
    'namaste', 'kaisa', 'kya', 'dawai', 'mausam', 'aaj', 'kaise', 'batao', 
    'chahiye', 'sharma', 'ramesh', 'tushar', 'kahan', 'doctor', 'sunao', 'hoga'
  ];
  if (hinglishKeywords.some(kw => lowerText.includes(kw))) {
    return 'hi';
  }

  // 4. Romanized Bengali keywords
  const bengaliPhonetic = ['kemon', 'achen', 'bhalo', 'aajker', 'abohawa', 'osudh', 'daktar', 'dhonnobad', 'hyalo'];
  if (bengaliPhonetic.some(kw => lowerText.includes(kw))) {
    return 'bn';
  }

  // 5. Default
  return preferredLang || 'en';
}

export const getLanguageMeta = (langCode) => {
  switch (langCode) {
    case 'hi':
      return { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳' };
    case 'bn':
      return { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇮🇳' };
    case 'as':
      return { code: 'as', name: 'অসমীয়া (Assamese)', flag: '🇮🇳' };
    default:
      return { code: 'en', name: 'English', flag: '🇬🇧' };
  }
};
