// Multilingual Voice Assistant Engine
// Understands user intent and returns appropriate responses in the EXACT matching language (en, hi, bn, as).

import { detectLanguage } from './languageDetector';

export async function processVoiceQuery(queryText, forceLang = null) {
  // Simulate natural AI thinking delay
  await new Promise((res) => setTimeout(res, 500));

  const text = queryText ? queryText.trim() : '';
  const detectedLang = forceLang || detectLanguage(text);
  const lowerText = text.toLowerCase();

  // Topic & Intent classification
  let topic = 'general';

  // 1. Identity / Self ("do you know me", "who am i", "my name")
  if (
    lowerText.includes('know me') || lowerText.includes('who am i') || lowerText.includes('my name') ||
    lowerText.includes('mera naam') || lowerText.includes('mujhe jaante') || lowerText.includes('mujhe jante') ||
    text.includes('मेरा नाम') || text.includes('मुझे जानते') || text.includes('আমি কে') || text.includes('আমার নাম') ||
    text.includes('মোক জানা') || text.includes('মই কোন')
  ) {
    topic = 'identity_self';
  }
  // 2. Assistant Identity ("who are you", "what is your name")
  else if (
    lowerText.includes('who are you') || lowerText.includes('your name') || lowerText.includes('what is your name') ||
    lowerText.includes('kaun ho') || lowerText.includes('tumhara naam') || lowerText.includes('aap kaun') ||
    text.includes('कौन हो') || text.includes('आपका नाम') || text.includes('तुम कौन') || text.includes('তুমি কে') ||
    text.includes('তোমার নাম') || text.includes('আপুনি কোন') || text.includes('আপোনাৰ নাম')
  ) {
    topic = 'identity_assistant';
  }
  // 3. Greetings
  else if (
    lowerText.includes('hello') || lowerText.includes('hi ') || lowerText === 'hi' || lowerText.includes('good morning') ||
    lowerText.includes('good afternoon') || lowerText.includes('good evening') || lowerText.includes('namaste') ||
    text.includes('नमस्ते') || text.includes('নমস্কার') || text.includes('নমস্কাৰ') || lowerText.includes('pranam')
  ) {
    topic = 'greetings';
  }
  // 4. How are you
  else if (
    lowerText.includes('how are you') || lowerText.includes('how r u') || lowerText.includes('kaise ho') ||
    lowerText.includes('kese ho') || lowerText.includes('kaisa hai') || text.includes('कैसे हो') ||
    text.includes('कैसी हो') || text.includes('কেমন আছ') || text.includes('কেমন আছেন') || text.includes('কেনে আছে')
  ) {
    topic = 'how_are_you';
  }
  // 5. Medicine / Prescription
  else if (
    lowerText.includes('medicine') || lowerText.includes('dawai') || lowerText.includes('dawa') ||
    lowerText.includes('prescription') || lowerText.includes('parcha') || lowerText.includes('tablet') || lowerText.includes('pill') ||
    text.includes('दवा') || text.includes('पर्चा') || text.includes('ওষুধ') || text.includes('প্রেসক্রিপশন') ||
    text.includes('ঔষধ') || text.includes('প্ৰে ক্ৰিপচন')
  ) {
    topic = 'medicine';
  }
  // 6. Weather
  else if (
    lowerText.includes('weather') || lowerText.includes('mausam') || lowerText.includes('rain') ||
    lowerText.includes('sunny') || lowerText.includes('temperature') || text.includes('मौसम') ||
    text.includes('बारिश') || text.includes('धूप') || text.includes('আবহাওয়া') || text.includes('বৃষ্টি') ||
    text.includes('বতৰ') || text.includes('বৰষুণ')
  ) {
    topic = 'weather';
  }
  // 7. Emergency
  else if (
    lowerText.includes('ambulance') || lowerText.includes('emergency') || lowerText.includes('hospital') ||
    lowerText.includes('help') || lowerText.includes('madad') || lowerText.includes('108') ||
    text.includes('इमरजेंसी') || text.includes('एम्बुलेंस') || text.includes('अस्पताल') || text.includes('मदद') ||
    text.includes('জরুরি') || text.includes('অ্যাম্বুলেন্স') || text.includes('সাহায্য') || text.includes('জৰুৰী') || text.includes('সহায়')
  ) {
    topic = 'emergency';
  }
  // 8. Family / Caregiver
  else if (
    lowerText.includes('family') || lowerText.includes('son') || lowerText.includes('daughter') ||
    lowerText.includes('caregiver') || lowerText.includes('ramesh') || lowerText.includes('parivar') ||
    lowerText.includes('beta') || lowerText.includes('beti') || text.includes('परिवार') || text.includes('बेटा') ||
    text.includes('बेटी') || text.includes('পরিবার') || text.includes('ছেলে') || text.includes('মেয়ে') ||
    text.includes('পৰিয়াল') || text.includes('পুত্ৰ')
  ) {
    topic = 'family';
  }
  // 9. WhatsApp / Phone / Photo Guidance
  else if (
    lowerText.includes('whatsapp') || lowerText.includes('photo') || lowerText.includes('picture') ||
    lowerText.includes('camera') || lowerText.includes('phone') || lowerText.includes('call') ||
    text.includes('व्हाट्सएप') || text.includes('फोटो') || text.includes('कैमरा') || text.includes('व्हाट्सऐप') ||
    text.includes('হোয়াটসঅ্যাপ') || text.includes('ছবি') || text.includes('ফটো') || text.includes('হোৱাটছএপ')
  ) {
    topic = 'phone_help';
  }
  // 10. Time / Date
  else if (
    lowerText.includes('time') || lowerText.includes('clock') || lowerText.includes('date') ||
    lowerText.includes('today') || lowerText.includes('samay') || lowerText.includes('waqt') ||
    text.includes('समय') || text.includes('वक्त') || text.includes('समय') || text.includes('কটা বাজিল')
  ) {
    topic = 'time_clock';
  }
  // 11. Gratitude / Thanks
  else if (
    lowerText.includes('thank') || lowerText.includes('thanks') || lowerText.includes('dhanyawad') ||
    lowerText.includes('shukriya') || text.includes('धन्यवाद') || text.includes('शुक्रिया') || text.includes('ধন্যবাদ')
  ) {
    topic = 'thanks';
  }
  // 12. Capabilities / What can you do
  else if (
    lowerText.includes('what can you do') || lowerText.includes('feature') || lowerText.includes('function') ||
    lowerText.includes('kya kar sakte') || lowerText.includes('kya karte ho') || text.includes('क्या कर सकते') ||
    text.includes('কী করতে পারো') || text.includes('কি কৰিব পাৰা')
  ) {
    topic = 'capabilities';
  }

  let answer = '';

  // 1. ENGLISH RESPONSES
  if (detectedLang === 'en') {
    if (topic === 'identity_self') {
      answer = "Yes! I know you. You are our respected elder user, and I am SAATHI, your personal AI health and daily companion. I remember your daily routines, medicines, and family contact details.";
    } else if (topic === 'identity_assistant') {
      answer = "I am SAATHI, your smart digital assistant! I am here to help you with medicine reminders, doctor prescriptions, emergency alerts, and daily phone guidance.";
    } else if (topic === 'greetings') {
      answer = "Hello! Good day! I am SAATHI, right here to assist you. How are you feeling today?";
    } else if (topic === 'how_are_you') {
      answer = "I am doing great, thank you for asking! How are you doing today? Let me know if you need any help with your medicines or daily schedule.";
    } else if (topic === 'weather') {
      answer = "Today's weather is pleasant and sunny at 28°C. Perfect for a gentle morning walk!";
    } else if (topic === 'medicine') {
      answer = "You have 5 scheduled medicines today. 4 taken and 1 upcoming at 9:00 PM (Diabetes Care - Metformin 500mg). Please take it with water after dinner.";
    } else if (topic === 'emergency') {
      answer = "Free Emergency Ambulance 108 is available 24x7. Press Need Help button to call immediately or alert your caregiver Ramesh Sharma.";
    } else if (topic === 'family') {
      answer = "Your caregiver Ramesh Sharma is connected. All medicine logs and health status updates are synced to your family dashboard.";
    } else if (topic === 'phone_help') {
      answer = "To send a photo on WhatsApp: 1) Open WhatsApp chat, 2) Tap the camera icon 📷 at the bottom, 3) Select your photo and press the green send button!";
    } else if (topic === 'time_clock') {
      answer = "Currently it's daytime. Your next scheduled medicine alert is Diabetes Care (Metformin 500mg) at 9:00 PM tonight.";
    } else if (topic === 'thanks') {
      answer = "You're most welcome! I am always happy to help you. Have a peaceful and healthy day!";
    } else if (topic === 'capabilities') {
      answer = "I can remind you of medicines, read doctor prescriptions, give voice guidance for WhatsApp, trigger emergency alerts, and check the weather!";
    } else {
      answer = `I understood your query: "${text}". I am right here to help! You can ask me about medicine times, doctor prescriptions, family contact, weather, or phone guidance.`;
    }
  }

  // 2. HINDI RESPONSES
  else if (detectedLang === 'hi') {
    if (topic === 'identity_self') {
      answer = "हाँ! मैं आपको जानती हूँ। आप हमारे आदरणीय उपयोगकर्ता हैं और मैं आपकी निजी एआई साथी हूँ। मुझे आपकी दवाइयों और परिवार की पूरी जानकारी याद है।";
    } else if (topic === 'identity_assistant') {
      answer = "मैं साथी हूँ, आपकी स्मार्ट डिजिटल असिस्टेंट! मैं आपकी दवाइयों के समय, डॉक्टर के पर्चे, इमरजेंसी अलर्ट और दिनचर्या में मदद करती हूँ।";
    } else if (topic === 'greetings') {
      answer = "नमस्ते! शुभ दिन! मैं आपकी सहायता के लिए तैयार हूँ। आज आपका स्वास्थ्य कैसा है?";
    } else if (topic === 'how_are_you') {
      answer = "मैं बिलकुल ठीक हूँ, पूछने के लिए धन्यवाद! आज आपकी तबियत कैसी है? अगर आपको दवाइयों या दिनचर्या में मदद चाहिए तो बताइए।";
    } else if (topic === 'weather') {
      answer = "आज का मौसम सुहावना और धूप वाला है, तापमान 28°C है। हल्की सैर के लिए बहुत अच्छा दिन है!";
    } else if (topic === 'medicine') {
      answer = "आपकी आज 5 दवाइयाँ तय हैं। 4 ली जा चुकी हैं और रात 9:00 बजे 1 दवा बाकी है (मधुमेह - मेटफॉर्मिन 500mg)। इसे रात के खाने के बाद लें।";
    } else if (topic === 'emergency') {
      answer = "मुफ़्त आपातकालीन एम्बुलेंस 108 उपलब्ध है। तुरंत कॉल करने के लिए 'मदद चाहिए' बटन दबाएं या अपने बेटे रमेश शर्मा को फ़ोन करें।";
    } else if (topic === 'family') {
      answer = "आपके बेटे रमेश शर्मा का संपर्क एक्टिव है। आज की सभी दवाइयों का विवरण उनके फैमिली डैशबोर्ड पर सहेजा गया है।";
    } else if (topic === 'phone_help') {
      answer = "व्हाट्सएप पर फोटो भेजने के लिए: 1) चैट खोलें, 2) नीचे कैमरा (📷) दबाएं, 3) अपनी फोटो चुनकर हरा बटन दबाएं।";
    } else if (topic === 'time_clock') {
      answer = "अभी दिन का समय है। आपकी अगली दवा (मेटफॉर्मिन 500mg) का समय आज रात 9:00 बजे है।";
    } else if (topic === 'thanks') {
      answer = "आपका बहुत-बहुत धन्यवाद! मैं हमेशा आपकी सहायता के लिए यहाँ हूँ। आपका दिन शुभ हो!";
    } else if (topic === 'capabilities') {
      answer = "मैं आपको दवाइयाँ याद दिला सकती हूँ, डॉक्टर के पर्चे पढ़ सकती हूँ, व्हाट्सएप चलाना सिखा सकती हूँ और आपातकालीन सहायता दे सकती हूँ।";
    } else {
      answer = `मैंने आपका सवाल समझा: "${text}"। आप मुझसे दवाइयों के समय, डॉक्टर के पर्चे, मौसम या फ़ोन चलाने के तरीके पूछ सकते हैं।`;
    }
  }

  // 3. BENGALI RESPONSES
  else if (detectedLang === 'bn') {
    if (topic === 'identity_self') {
      answer = "হ্যাঁ! আমি আপনাকে চিনি। আপনি আমাদের ব্যবহারকারী এবং আমি আপনার নিজস্ব সাথী। আপনার দৈনিক ওষুধ ও পরিবারের বিবরণ আমার জানা আছে।";
    } else if (topic === 'identity_assistant') {
      answer = "আমি সাথী, আপনার স্মার্ট ডিজিটাল অ্যাসিস্ট্যান্ট! ওষুধের রিমাইন্ডার, ডাক্তারির প্রেসক্রিপশন ও দৈনন্দিন কাজে সাহায্য করাই আমার কাজ।";
    } else if (topic === 'greetings') {
      answer = "নমস্কার! শুভ দিন! আমি আপনার সাহায্যের জন্য উপস্থিত। আজ আপনার শরীর কেমন আছে?";
    } else if (topic === 'how_are_you') {
      answer = "আমি খুব ভালো আছি, জিজ্ঞাসা করার জন্য ধন্যবাদ! আজ আপনার কেমন বোধ হচ্ছে? যেকোনো সাহায্য লাগলে বলবেন।";
    } else if (topic === 'weather') {
      answer = "আজকের আবহাওয়া খুব মনোরম এবং রোদঝলমলে, তাপমাত্রা ২৮°সে। সকালে একটু হাঁটার জন্য চমৎকার দিন!";
    } else if (topic === 'medicine') {
      answer = "আপনার আজ ৫টি ওষুধ রয়েছে। ৪টি নেওয়া হয়েছে এবং রাত ৯:০০ টায় ১টি বাকি আছে (মেটফর্মিন ৫০০ মিগ্রা)। রাতের খাবারের পর খাবেন।";
    } else if (topic === 'emergency') {
      answer = "বিনামূল্যে জরুরি অ্যাম্বুলেন্স ১০৮ ২৪ ঘণ্টা উপলব্ধ। এখনই কল করতে 'সাহায্য চাই' বোতাম টিপুন বা রমেশ শর্মাকে জানান।";
    } else if (topic === 'family') {
      answer = "আপনার ছেলে রমেশ শর্মার সাথে যোগাযোগ সক্রিয় রয়েছে। আজকের সমস্ত ওষুধের তথ্য তাঁর পরিবার অ্যাকাউন্টে যুক্ত।";
    } else if (topic === 'phone_help') {
      answer = "হোয়াটসঅ্যাপে ছবি পাঠাতে: ১) চ্যাট খুলুন, ২) নিচে ক্যামেরা (📷) আইকন টিপুন, ৩) ছবি বেছে নিয়ে সবুজ বোতাম টিপুন।";
    } else if (topic === 'time_clock') {
      answer = "এখন দিনের সময়। আপনার পরবর্তী ওষুধ রাত ৯:০০ টায় নির্ধারিত।";
    } else if (topic === 'thanks') {
      answer = "আপনাকে অনেক ধন্যবাদ! আমি সর্বদা সাহায্য করতে তৈরি। ভালো থাকুন!";
    } else if (topic === 'capabilities') {
      answer = "আমি ওষুধের সময় মনে করানো, ডাক্তারির প্রেসক্রিপশন পড়া, হোয়াটসঅ্যাপ চালানো এবং আবহাওয়া জানানোর কাজ করতে পারি।";
    } else {
      answer = `আমি আপনার প্রশ্ন বুঝতে পেরেছি: "${text}"। আপনি ওষুধের সময়, প্রেসক্রিপশন, আবহাওয়া বা ফোন ব্যবহার নিয়ে যা খুশি জিজ্ঞাসা করতে পারেন।`;
    }
  }

  // 4. ASSAMESE RESPONSES
  else if (detectedLang === 'as') {
    if (topic === 'identity_self') {
      answer = "হয়! মই আপোনাক চিনো। আপুনি আমাৰ ব্যৱহাৰকাৰী আৰু মই আপোনাৰ নিজস্ব সাথী। আপোনাৰ দৈনন্দিন ঔষধ আৰু পৰিয়ালৰ তথ্য মোৰ মনত আছে।";
    } else if (topic === 'identity_assistant') {
      answer = "মই সাথী, আপোনাৰ স্মাৰ্ট ডিজিটেল সহকাৰী! ঔষধৰ ৰিমাইণ্ডাৰ, প্ৰে ক্ৰিপচন পঢ়া আৰু দৈনন্দিন কামত সহায় কৰাই মোৰ উদ্দেশ্য।";
    } else if (topic === 'greetings') {
      answer = "নমস্কাৰ! শুভ দিন! মই আপোনাৰ সহায়ৰ বাবে সাজু। আজি আপোনাৰ দিনটো কেনে গৈছে?";
    } else if (topic === 'how_are_you') {
      answer = "মই অতি ভালদৰে আছোঁ, সোধাৰ বাবে ধন্যবাদ! আজি আপোনাৰ স্বাস্থ্য কেনেকুৱা? কোনো সহায়ৰ প্ৰয়োজন হ’লে ক’ব।";
    } else if (topic === 'weather') {
      answer = "আজিৰ বতৰ অতি মনোৰম আৰু ৰ'দঘাই, উত্তাপ ২৮° ছে। ৰাতিপুৱাৰ ভ্ৰমণৰ বাবে বৰ ভাল দিন!";
    } else if (topic === 'medicine') {
      answer = "আপোনাৰ আজি ৫ টা ঔষধ আছে। ৪ টা লোৱা হ'ল আৰু ৰাতি ৯:০০ বজাত ১ টা (মেটফৰমিন ৫০০ মিগ্ৰা) বাকী আছে। ৰাতিৰ আহাৰৰ পিছত খাব।";
    } else if (topic === 'emergency') {
      answer = "বিনামূলীয়া জৰুৰীকালীন এম্বুলেন্স ১০৮ উপলব্ধ। এতিয়াই কল কৰিবলৈ 'সহায় লাগে' বটম টিপক বা ৰমেশ শৰ্মাক জনাওক।";
    } else if (topic === 'family') {
      answer = "আপোনাৰ পুত্ৰ ৰমেশ শৰ্মাৰ সৈতে সংযোগ হৈ আছে। আজিৰ সকলো ঔষধৰ তথ্য সংৰক্ষিত হ'ল।";
    } else if (topic === 'phone_help') {
      answer = "হোৱাটছএপত ফটো পঠিয়াবলৈ: ১) চেট খোলক, ২) তলত কেমেৰা (📷) আইকন টিপক, ৩) ফটো বাছি লৈ সেউজীয়া বটম টিপক।";
    } else if (topic === 'time_clock') {
      answer = "এতিয়া দিনৰ সময়। আপোনাৰ পিছৰ ঔষধৰ সময় ৰাতি ৯:০০ বজাত।";
    } else if (topic === 'thanks') {
      answer = "আপোনাক ধন্যবাদ! মই সদায় আপোনাৰ সহায়ৰ বাবে সংৰক্ষিত। সুস্থ থাকক!";
    } else if (topic === 'capabilities') {
      answer = "মই ঔষধৰ সময় মনত পেলাই দিয়া, প্ৰে ক্ৰিপচন পঢ়া, হোৱাটছএপ চলোৱা আৰু বতৰৰ তথ্য দিয়াৰ কাম কৰিব পাৰোঁ।";
    } else {
      answer = `মই আপোনাৰ প্ৰশ্ন বুজি পালোঁ: "${text}"। আপুনি ঔষধৰ সময়, প্ৰে ক্ৰিপচন, বতৰ বা ফোন চলোৱা সম্পৰ্কে প্ৰশ্ন সুধিব পাৰে।`;
    }
  }

  return {
    queryText: text,
    answer,
    detectedLang,
    topic
  };
}

