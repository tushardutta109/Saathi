// Language Detection Module supporting English (en), Hindi (hi), Bengali (bn), and Assamese (as)

export function detectLanguage(text) {
  if (!text || typeof text !== 'string') return 'en';
  const trimmed = text.trim();
  const lowerText = trimmed.toLowerCase();

  // 1. Check Assamese Specific Unicode characters & common words
  // Assamese uses 'ৰ' (\u09AF) and 'ৱ' (\u09F1), and distinct vocabulary
  const hasAssameseChars = /[\u09AF\u09F1]/.test(trimmed);
  const assameseKeywords = [
    'আজিৰ', 'বতৰ', 'নমস্কাৰ', 'কেনেকুৱা', 'ধন্যবাদ', 'পাৰোঁ', 'আছোঁ', 'অসম', 
    'মোৰ', 'কৰক', 'আছোঁ', 'কৰিব', 'সুধিব', 'ঔষধ', 'সহায়', 'পৰিয়াল', 'ৰাতিপুৱা'
  ];
  const isAssameseKeyword = assameseKeywords.some(kw => trimmed.includes(kw));

  if (hasAssameseChars || isAssameseKeyword) {
    return 'as';
  }

  // 2. Check Bengali Script & Keywords
  // Bengali Unicode range: \u0980-\u09FF
  const hasBengaliScript = /[\u0980-\u09FF]/.test(trimmed);
  if (hasBengaliScript) {
    return 'bn';
  }

  // 3. Check Devanagari (Hindi) Script
  // Devanagari Unicode range: \u0900-\u097F
  const hasHindiScript = /[\u0900-\u097F]/.test(trimmed);
  if (hasHindiScript) {
    return 'hi';
  }

  // 4. Romanized / Hinglish detection
  const hinglishKeywords = [
    'namaste', 'kaisa', 'kya', 'dawai', 'mausam', 'aaj', 'kaise', 'batao', 
    'chahiye', 'sharma', 'ramesh', 'kahan', 'doctor', 'sunao', 'hoga'
  ];
  if (hinglishKeywords.some(kw => lowerText.includes(kw))) {
    return 'hi';
  }

  // 5. Default English
  return 'en';
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
