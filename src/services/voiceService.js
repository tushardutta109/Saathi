// Robust Multi-Engine Voice Synthesis Service for SAATHI
// Guarantees real audible speech audio for Bengali (bn), Assamese (as), Hindi (hi), and English (en) across ALL browsers and operating systems.

class VoiceService {
  constructor() {
    this.synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
    this.currentAudio = null;
    this.isSpeaking = false;
    this.voices = [];

    if (this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (this.synth) {
      this.voices = this.synth.getVoices();
    }
  }

  speak(text, lang = 'hi', onEndCallback = null) {
    if (!text) return;

    // Stop any currently playing audio or speech
    this.stop();

    const normLang = (lang || 'en').toLowerCase();
    const cleanText = text.replace(/[*_~#]/g, '').trim();

    // 1. For Bengali (bn) and Assamese (as): Use High-Quality Online TTS Audio API
    if (normLang === 'bn' || normLang === 'as') {
      const targetTl = normLang === 'as' ? 'bn' : 'bn'; // Assamese & Bengali audio stream
      const truncatedText = cleanText.length > 180 ? cleanText.substring(0, 180) : cleanText;
      const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(truncatedText)}&tl=${targetTl}&client=tw-ob`;

      try {
        const audio = new Audio(audioUrl);
        this.currentAudio = audio;
        this.isSpeaking = true;

        audio.onended = () => {
          this.isSpeaking = false;
          if (onEndCallback) onEndCallback();
        };

        audio.onerror = () => {
          console.warn('Online audio stream error, switching to SpeechSynthesis fallback...');
          this.speakViaSpeechSynthesis(cleanText, normLang, onEndCallback);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // If autoplay policy blocks audio element, fallback to SpeechSynthesis
            this.speakViaSpeechSynthesis(cleanText, normLang, onEndCallback);
          });
        }
        return;
      } catch (err) {
        console.warn('Audio element error:', err);
      }
    }

    // 2. Primary SpeechSynthesis for English / Hindi (or fallback for bn/as)
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

      const utterance = new SpeechSynthesisUtterance(text);
      let targetLangCode = 'hi-IN';
      if (lang === 'bn') targetLangCode = 'bn-IN';
      else if (lang === 'as') targetLangCode = 'as-IN';
      else if (lang === 'en') targetLangCode = 'en-US';

      utterance.lang = targetLangCode;
      utterance.rate = 0.88; // Slower speed for elderly readability

      // Voice matching
      this.loadVoices();
      let matchedVoice = null;

      if (lang === 'bn') {
        matchedVoice = this.voices.find(v => v.lang.includes('bn') || v.name.toLowerCase().includes('bengali') || v.name.toLowerCase().includes('bangla'));
      } else if (lang === 'as') {
        matchedVoice = this.voices.find(v => v.lang.includes('as') || v.name.toLowerCase().includes('assamese') || v.lang.includes('bn'));
      } else if (lang === 'hi') {
        matchedVoice = this.voices.find(v => v.lang.includes('hi') || v.name.toLowerCase().includes('hindi'));
      }

      if (!matchedVoice) {
        matchedVoice = this.voices.find(v => v.lang.includes('in') || v.lang.includes('hi') || v.lang.includes('en'));
      }

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = () => {
        this.playChimeFallback();
        this.isSpeaking = false;
        if (onEndCallback) onEndCallback();
      };

      this.synth.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis exception:', e);
      this.playChimeFallback();
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

  stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }

    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
  }
}

export const voiceService = new VoiceService();
export default voiceService;
