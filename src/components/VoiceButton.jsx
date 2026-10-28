import React, { useState, useEffect } from 'react';

export function VoiceButton({ onVoiceInput, isListening: externalListening, lang = 'en', t, compact = false }) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
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

      rec.onstart  = () => setIsListening(true);
      rec.onresult = (e) => { setIsListening(false); onVoiceInput?.(e.results[0][0].transcript); };
      rec.onerror  = () => { setIsListening(false); onVoiceInput?.(getFallback(lang)); };
      rec.onend    = () => setIsListening(false);

      setRecognition(rec);
    }
  }, [onVoiceInput, lang]);

  const getFallback = (l) => l === 'bn' ? 'ডাক্তারের প্রেসক্রিপশন দেখাও'
    : l === 'as' ? 'ডাক্তাৰৰ প্ৰে ক্ৰিপচন দেখুওৱা'
    : l === 'hi' ? 'डॉक्टर के पर्चे की दवाइयाँ बताओ'
    : 'Show doctor prescription medicines';

  const handleClick = () => {
    if (isListening) { recognition?.stop(); setIsListening(false); return; }
    if (recognition) {
      try { recognition.start(); }
      catch { simulateListen(); }
    } else { simulateListen(); }
  };

  const simulateListen = () => {
    setIsListening(true);
    setTimeout(() => { setIsListening(false); onVoiceInput?.(getFallback(lang)); }, 1500);
  };

  const active = isListening || externalListening;

  // ── COMPACT mode for Home hero strip ──
  if (compact) {
    return (
      <button
        className={`mic-compact-btn ${active ? 'mic-compact-active' : ''}`}
        onClick={handleClick}
        aria-label={active ? t.listening : t.talkToSaathiBtn}
      >
        <span className="mic-compact-icon">{active ? '🔊' : '🎙️'}</span>
        <span className="mic-compact-label">
          {active ? (t.listening || 'Listening...') : (t.talkToSaathiBtn || 'Tap to Speak')}
        </span>
        {active && <span className="mic-compact-wave" />}
      </button>
    );
  }

  // ── FULL mode for Talk to SAATHI page ──
  return (
    <div className="mic-button-wrapper">
      <div className={`mic-glow-ring ${active ? 'mic-ring-active' : ''}`}>
        <div className={`mic-glow-ring-2 ${active ? 'mic-ring-active' : ''}`}>
          <button
            className={`large-mic-btn ${active ? 'listening' : ''}`}
            onClick={handleClick}
            aria-label={active ? t.listening : t.talkToSaathiBtn}
          >
            <span className="mic-icon-lg">{active ? '🔊' : '🎙️'}</span>
            <span className="mic-btn-title">
              {active ? (t.listening || 'Listening...') : (t.talkToSaathiBtn || 'Tap to Speak')}
            </span>
          </button>
        </div>
      </div>
      <span className="mic-btn-sub">
        {active ? (t.listening || 'Listening...') : (t.pressAndSpeak || 'Hold to Speak')}
      </span>
    </div>
  );
}

export default VoiceButton;
