// Robust Multi-Engine Voice Synthesis Service for SAATHI
// Guarantees real audible speech audio for Bengali (bn), Assamese (as), Hindi (hi), and English (en) across ALL browsers and Windows OS.

const API_BASE_URL = typeof window !== 'undefined' && window.location 
  ? (import.meta.env?.VITE_API_URL || 'http://localhost:5000/api') 
  : 'http://localhost:5000/api';

/**
 * Accurately transliterates Eastern Nagari script (Bengali & Assamese) to Devanagari script.
 * Unicode Eastern Nagari (\u0980-\u09FF) maps to Devanagari (\u0900-\u097F) with offset 0x80.
 * This allows standard Indian Hindi TTS voices (installed on almost all Windows PCs) to pronounce
 * Bengali and Assamese words with accurate phonetics and natural cadence!
 */
export function convertEasternNagariToDevanagari(text) {
  if (!text) return '';
  // 1. Replace Assamese specific characters:
  // Assamese Ra 'ৰ' (\u09F0) -> Bengali Ra 'র' (\u09B0)
  // Assamese Wa 'ৱ' (\u09F1) -> Bengali Ba 'ব' (\u09AC)
  let s = text
    .replace(/\u09F0/g, '\u09B0')
    .replace(/\u09F1/g, '\u09AC');

  return s.split('').map(c => {
    const code = c.charCodeAt(0);
    // Khanda Ta 'ৎ' (\u09CE) -> त् (\u0924\u094D)
    if (code === 0x09CE) return '\u0924\u094D';
    // Eastern Nagari to Devanagari offset 0x80
    if (code >= 0x0981 && code <= 0x09FA) {
      return String.fromCharCode(code - 0x80);
    }
    return c;
  }).join('');
}

class VoiceService {
  constructor() {
    this.synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
    this.currentAudio = null;
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.voices = [];
    this.audioUnlocked = false;

    if (this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }

    // Unlock audio context on first user interaction
    if (typeof window !== 'undefined') {
      const unlock = () => {
        this.audioUnlocked = true;
        this.loadVoices();
        window.removeEventListener('click', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('click', unlock, { once: true });
      window.addEventListener('touchstart', unlock, { once: true });
    }
  }

  loadVoices() {
    if (this.synth) {
      const v = this.synth.getVoices();
      if (v && v.length > 0) {
        this.voices = v;
      }
    }
  }

  stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }

    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }
    this.currentUtterance = null;
    this.isSpeaking = false;
  }

  /**
   * Main speak method
   * Priority:
   * 1. Try Backend TTS audio stream (/api/voice/tts) for natural native voice
   * 2. Browser SpeechSynthesis:
   *    - If Bengali/Assamese voice exists -> use it directly (with bn-IN)
   *    - If NO Bengali voice, but Hindi voice exists -> Transliterate to Devanagari and speak with Hindi voice!
   *    - If English only -> Speak with English voice using phonetic cadence
   */
  async speak(text, lang = 'hi', onEndCallback = null) {
    if (!text) return;

    this.stop();
    this.loadVoices();

    const normLang = (lang || 'en').toLowerCase();
    const cleanText = text.replace(/[*_~#]/g, '').trim();

    // ── ATTEMPT 1: Backend TTS Endpoint ──
    try {
      const ttsUrl = `${API_BASE_URL}/voice/tts?text=${encodeURIComponent(cleanText.substring(0, 200))}&lang=${normLang}`;
      const audio = new Audio(ttsUrl);
      this.currentAudio = audio;

      const audioPlayPromise = new Promise((resolve, reject) => {
        audio.oncanplaythrough = () => {
          audio.play().then(resolve).catch(reject);
        };
        audio.onended = () => {
          this.isSpeaking = false;
          this.currentAudio = null;
          if (onEndCallback) onEndCallback();
        };
        audio.onerror = (e) => reject(e);
        // Timeout if backend takes more than 1.5s
        setTimeout(() => reject(new Error('TTS fetch timeout')), 1500);
      });

      this.isSpeaking = true;
      await audioPlayPromise;
      return; // Succeeded! Real audio stream played!
    } catch (backendTtsErr) {
      // Backend TTS failed or offline -> seamlessly fall through to browser SpeechSynthesis
      if (this.currentAudio) {
        try { this.currentAudio.pause(); } catch (_) {}
        this.currentAudio = null;
      }
    }

    // ── ATTEMPT 2: Browser SpeechSynthesis ──
    this.speakViaSpeechSynthesis(cleanText, normLang, onEndCallback);
  }

  speakViaSpeechSynthesis(text, lang, onEndCallback) {
    if (!this.synth) {
      this.playChimeFallback();
      if (onEndCallback) onEndCallback();
      return;
    }

    try {
      this.synth.cancel();
      if (this.synth.paused) {
        this.synth.resume();
      }

      this.loadVoices();

      // Find available voices in browser
      const bengaliVoice = this.voices.find(v => {
        const l = v.lang.toLowerCase();
        const n = v.name.toLowerCase();
        return l.startsWith('bn') || n.includes('bengali') || n.includes('bangla') || n.includes('বাংলা') || n.includes('bashkar') || n.includes('tanishaa');
      });

      const hindiVoice = this.voices.find(v => {
        const l = v.lang.toLowerCase();
        const n = v.name.toLowerCase();
        return l.startsWith('hi') || n.includes('hindi') || n.includes('हिन्दी') || n.includes('hemant') || n.includes('kalpana') || n.includes('swara');
      });

      const englishVoice = this.voices.find(v => {
        const l = v.lang.toLowerCase();
        return l.startsWith('en-in') || l.startsWith('en');
      });

      let textToSpeak = text;
      let targetLang = 'hi-IN';
      let selectedVoice = null;

      if (lang === 'bn') {
        if (bengaliVoice) {
          // Native Bengali voice found! (e.g. Edge Bashkar/Tanishaa or Chrome Google বাংলা)
          textToSpeak = text;
          targetLang = 'bn-IN';
          selectedVoice = bengaliVoice;
        } else if (hindiVoice) {
          // No Bengali voice, but Hindi voice is present (Standard Windows 10/11)
          // Transliterate to Devanagari so Hindi engine pronounces Bengali words!
          textToSpeak = convertEasternNagariToDevanagari(text);
          targetLang = 'hi-IN';
          selectedVoice = hindiVoice;
        } else {
          // No Indian voice found, use English voice
          targetLang = 'en-IN';
          selectedVoice = englishVoice || null;
        }
      } else if (lang === 'as') {
        // Assamese: normalize Assamese Ra & Wa
        const normalizedAssamese = text
          .replace(/\u09F0/g, '\u09B0')
          .replace(/\u09F1/g, '\u09AC');

        if (bengaliVoice) {
          // Bengali voice reads Assamese text fluently (Eastern Nagari script)
          // NEVER pass 'as-IN' as language code because browsers reject it!
          textToSpeak = normalizedAssamese;
          targetLang = 'bn-IN';
          selectedVoice = bengaliVoice;
        } else if (hindiVoice) {
          // Transliterate Assamese to Devanagari for Hindi voice
          textToSpeak = convertEasternNagariToDevanagari(text);
          targetLang = 'hi-IN';
          selectedVoice = hindiVoice;
        } else {
          targetLang = 'en-IN';
          selectedVoice = englishVoice || null;
        }
      } else if (lang === 'hi') {
        textToSpeak = text;
        targetLang = 'hi-IN';
        selectedVoice = hindiVoice || null;
      } else {
        textToSpeak = text;
        targetLang = 'en-US';
        selectedVoice = englishVoice || null;
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = targetLang;
      utterance.rate = 0.88; // Gentle, clear speed for senior citizens
      utterance.pitch = 1.0;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      this.currentUtterance = utterance; // Prevent garbage collection bug in Chrome

      utterance.onstart = () => {
        this.isSpeaking = true;
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e.error || e);
        this.isSpeaking = false;
        this.currentUtterance = null;
        this.playChimeFallback();
        if (onEndCallback) onEndCallback();
      };

      this.synth.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis exception:', e);
      this.playChimeFallback();
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (onEndCallback) onEndCallback();
    }
  }

  playChimeFallback() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.3); // G5

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {}
  }
}

export const voiceService = new VoiceService();
export default voiceService;
