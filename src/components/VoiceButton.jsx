import React, { useState, useEffect } from 'react';

export function VoiceButton({ onVoiceInput, isListening: externalListening, lang = 'en', t }) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Check if browser supports Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      
      let speechLang = 'hi-IN';
      if (lang === 'bn') speechLang = 'bn-IN';
      else if (lang === 'as') speechLang = 'as-IN';
      else if (lang === 'en') speechLang = 'en-IN';

      rec.lang = speechLang;

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        if (onVoiceInput) {
          onVoiceInput(transcript);
        }
      };

      rec.onerror = () => {
        setIsListening(false);
        // Fallback demo prompt if mic blocked
        if (onVoiceInput) {
          const demoPrompt = lang === 'bn' ? "ডাক্তারের প্রেসক্রিপশন দেখাও" 
            : lang === 'as' ? "ডাক্তাৰৰ প্ৰে ক্ৰিপচন দেখুওৱা"
            : lang === 'hi' ? "डॉक्टर के पर्चे की दवाइयाँ बताओ"
            : "Show doctor prescription medicines";
          onVoiceInput(demoPrompt);
        }
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    }
  }, [onVoiceInput, lang]);

  const handleClick = () => {
    if (isListening) {
      if (recognition) recognition.stop();
      setIsListening(false);
    } else {
      if (recognition) {
        try {
          recognition.start();
        } catch (e) {
          setIsListening(true);
          setTimeout(() => {
            setIsListening(false);
            if (onVoiceInput) {
              const demoPrompt = lang === 'bn' ? "ডাক্তারের প্রেসক্রিপশন দেখাও" 
                : lang === 'as' ? "ডাক্তাৰৰ প্ৰে ক্ৰিপচন দেখুওৱা"
                : lang === 'hi' ? "डॉक्टर के पर्चे की दवाइयाँ बताओ"
                : "Show doctor prescription medicines";
              onVoiceInput(demoPrompt);
            }
          }, 1500);
        }
      } else {
        // Fallback for browsers without speech recognition
        setIsListening(true);
        setTimeout(() => {
          setIsListening(false);
          if (onVoiceInput) {
            const demoPrompt = lang === 'bn' ? "ডাক্তারের প্রেসক্রিপশন দেখাও" 
              : lang === 'as' ? "ডাক্তাৰৰ প্ৰে ক্ৰিপচন দেখুওৱা"
              : lang === 'hi' ? "डॉक्टर के पर्चे की दवाइयाँ बताओ"
              : "Show doctor prescription medicines";
            onVoiceInput(demoPrompt);
          }
        }, 1500);
      }
    }
  };

  const activeListening = isListening || externalListening;

  return (
    <div className="mic-button-wrapper">
      <button 
        className={`large-mic-btn ${activeListening ? 'listening' : ''}`}
        onClick={handleClick}
        aria-label={activeListening ? t.listening : t.talkToSaathiBtn}
      >
        <span className="mic-icon-lg">{activeListening ? '🔊' : '🎙️'}</span>
        <span className="mic-btn-title">
          {activeListening ? t.listening : t.talkToSaathiBtn}
        </span>
      </button>
      <span className="mic-btn-sub">
        {activeListening ? t.listening : t.pressAndSpeak}
      </span>
    </div>
  );
}

export default VoiceButton;
