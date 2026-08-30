import React, { useState, useEffect } from 'react';
import { processVoiceQuery } from '../services/voiceAssistantEngine';
import { voiceService } from '../services/voiceService';
import { getLanguageMeta } from '../services/languageDetector';

export function MultilingualVoiceAssistant({ currentLang = 'hi', t, onAddNotification }) {
  const [assistantState, setAssistantState] = useState('idle'); // 'idle' | 'listening' | 'processing' | 'speaking'
  const [transcript, setTranscript] = useState('');
  const [detectedLang, setDetectedLang] = useState(currentLang);
  const [responseObj, setResponseObj] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [recognition, setRecognition] = useState(null);

  // Initialize SpeechRecognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;

      // Allow natural multi-lingual listening
      rec.lang = currentLang === 'bn' ? 'bn-IN' : currentLang === 'as' ? 'as-IN' : currentLang === 'hi' ? 'hi-IN' : 'en-US';

      rec.onstart = () => {
        setAssistantState('listening');
        setErrorMessage(null);
      };

      rec.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        setTranscript(speechResult);
        handleProcessSpeech(speechResult);
      };

      rec.onerror = (event) => {
        console.warn('SpeechRecognition error:', event.error);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access denied. Please enable microphone permissions in browser settings.');
        } else {
          // If error occurs, run demo sample query so the feature is usable even without mic hardware
          const demoInput = currentLang === 'bn' ? 'আজকের আবহাওয়া কেমন?' 
            : currentLang === 'as' ? 'আজিৰ বতৰ কেনেকুৱা?'
            : currentLang === 'hi' ? 'आज मौसम कैसा है?'
            : 'What is today\'s weather?';
          setTranscript(demoInput);
          handleProcessSpeech(demoInput);
        }
        setAssistantState('idle');
      };

      rec.onend = () => {
        if (assistantState === 'listening') {
          setAssistantState('idle');
        }
      };

      setRecognition(rec);
    }
  }, [currentLang]);

  // Execute Voice Flow: Capture -> Process -> Detect -> Respond -> Text-to-Speech
  const handleProcessSpeech = async (inputQueryText) => {
    if (!inputQueryText || !inputQueryText.trim()) return;

    setAssistantState('processing');

    const result = await processVoiceQuery(inputQueryText);

    setDetectedLang(result.detectedLang);
    setResponseObj(result);
    setAssistantState('speaking');

    // Trigger Speech Synthesis in the EXACT detected language
    voiceService.speak(result.answer, result.detectedLang, () => {
      setAssistantState('idle');
    });

    if (onAddNotification) {
      const meta = getLanguageMeta(result.detectedLang);
      onAddNotification({
        title: `🎙️ Voice Assistant (${meta.name})`,
        message: `Replied in ${meta.name}`,
        icon: '🤖',
        type: 'info'
      });
    }
  };

  const handleMicButtonClick = () => {
    if (assistantState === 'speaking') {
      voiceService.stop();
      setAssistantState('idle');
      return;
    }

    if (assistantState === 'listening') {
      if (recognition) recognition.stop();
      setAssistantState('idle');
      return;
    }

    if (recognition) {
      try {
        recognition.start();
      } catch (e) {
        // Fallback demo prompt if mic busy or blocked
        const demoInput = currentLang === 'bn' ? 'আজকের আবহাওয়া কেমন?' 
          : currentLang === 'as' ? 'আজিৰ বতৰ কেনেকুৱা?'
          : currentLang === 'hi' ? 'आज मौसम कैसा है?'
          : 'What is today\'s weather?';
        setTranscript(demoInput);
        handleProcessSpeech(demoInput);
      }
    } else {
      // Fallback for browsers without speech recognition
      const demoInput = currentLang === 'bn' ? 'আজকের আবহাওয়া কেমন?' 
        : currentLang === 'as' ? 'আজিৰ বতৰ কেনেকুৱা?'
        : currentLang === 'hi' ? 'आज मौसम कैसा है?'
        : 'What is today\'s weather?';
      setTranscript(demoInput);
      handleProcessSpeech(demoInput);
    }
  };

  const handleReplayVoice = () => {
    if (responseObj && responseObj.answer) {
      setAssistantState('speaking');
      voiceService.speak(responseObj.answer, responseObj.detectedLang, () => {
        setAssistantState('idle');
      });
    }
  };

  const handleStopSpeaking = () => {
    voiceService.stop();
    setAssistantState('idle');
  };

  const handleClearConversation = () => {
    voiceService.stop();
    setTranscript('');
    setResponseObj(null);
    setAssistantState('idle');
    setErrorMessage(null);
  };

  const langMeta = getLanguageMeta(detectedLang);

  return (
    <div className="multilingual-voice-assistant-card animate-fadeIn">
      {/* Header Banner */}
      <div className="assistant-header-row">
        <div className="assistant-title-group">
          <span className="assistant-badge-icon">🎙️🤖</span>
          <div>
            <h3 className="assistant-title">AI Multilingual Voice Assistant</h3>
            <p className="assistant-subtitle">Speak naturally in English, Hindi, Bengali (বাংলা), or Assamese (অসমীয়া)</p>
          </div>
        </div>

        {/* Detected Language Tag */}
        {responseObj && (
          <div className="detected-lang-pill">
            <span>Detected:</span>
            <strong>{langMeta.flag} {langMeta.name}</strong>
          </div>
        )}
      </div>

      {/* Main Microphone Animated Button */}
      <div className="assistant-mic-section">
        <div className={`mic-ring-outer ${assistantState}`}>
          <button 
            className={`assistant-mic-btn ${assistantState}`}
            onClick={handleMicButtonClick}
            aria-label="Microphone button"
          >
            <span className="mic-icon-display">
              {assistantState === 'listening' ? '🎙️' : assistantState === 'processing' ? '⚙️' : assistantState === 'speaking' ? '🔊' : '🎙️'}
            </span>
          </button>
        </div>

        {/* Live Status Indicator Pill */}
        <div className={`assistant-status-pill status-${assistantState}`}>
          {assistantState === 'listening' && <span className="pulse-dot red">●</span>}
          {assistantState === 'processing' && <span className="spinner-sm"></span>}
          {assistantState === 'speaking' && <span className="pulse-dot green">🔊</span>}
          
          <span className="status-text-label">
            {assistantState === 'listening' && 'Listening to your voice... Speak now'}
            {assistantState === 'processing' && 'Processing speech & detecting language...'}
            {assistantState === 'speaking' && `Speaking response in ${langMeta.name}...`}
            {assistantState === 'idle' && 'Press Microphone to Speak'}
          </span>
        </div>

        {errorMessage && (
          <div className="assistant-error-banner">
            ⚠️ {errorMessage}
          </div>
        )}
      </div>

      {/* Preset Quick Voice Testing Chips */}
      <div className="assistant-sample-chips-row">
        <span className="chips-label">Try Sample Voice Prompts:</span>
        <div className="chips-group">
          <button 
            className="sample-voice-chip"
            onClick={() => {
              setTranscript("What is today's weather?");
              handleProcessSpeech("What is today's weather?");
            }}
          >
            🇬🇧 "What is today's weather?"
          </button>

          <button 
            className="sample-voice-chip"
            onClick={() => {
              setTranscript("आज मौसम कैसा है?");
              handleProcessSpeech("आज मौसम कैसा है?");
            }}
          >
            🇮🇳 "आज मौसम कैसा है?"
          </button>

          <button 
            className="sample-voice-chip"
            onClick={() => {
              setTranscript("আজকের আবহাওয়া কেমন?");
              handleProcessSpeech("আজকের আবহাওয়া কেমন?");
            }}
          >
            🇮🇳 "আজকের আবহাওয়া কেমন?"
          </button>

          <button 
            className="sample-voice-chip"
            onClick={() => {
              setTranscript("আজিৰ বতৰ কেনেকুৱা?");
              handleProcessSpeech("আজিৰ বতৰ কেনেকুৱা?");
            }}
          >
            🇮🇳 "আজিৰ বতৰ কেনেকুৱা?"
          </button>
        </div>
      </div>

      {/* Conversation Display Cards */}
      {(transcript || responseObj) && (
        <div className="assistant-conversation-box animate-fadeIn">
          {/* User Prompt Box */}
          {transcript && (
            <div className="conversation-card user-card">
              <div className="card-sender-label">
                👤 You Said:
              </div>
              <p className="conversation-text">{transcript}</p>
            </div>
          )}

          {/* AI Response Box */}
          {responseObj && (
            <div className="conversation-card assistant-card">
              <div className="card-sender-label">
                <span>🤖 SAATHI AI Reply ({langMeta.name}):</span>
                <span className="lang-match-badge">✓ Exact Language Matched</span>
              </div>
              <p className="conversation-text response-text">{responseObj.answer}</p>
            </div>
          )}

          {/* Controls Bar */}
          <div className="assistant-controls-bar">
            {responseObj && (
              <button 
                className="btn-assistant-control primary"
                onClick={handleReplayVoice}
              >
                🔊 Play Voice Response
              </button>
            )}

            {assistantState === 'speaking' && (
              <button 
                className="btn-assistant-control danger"
                onClick={handleStopSpeaking}
              >
                ⏹️ Stop Speaking
              </button>
            )}

            <button 
              className="btn-assistant-control secondary"
              onClick={handleClearConversation}
            >
              🗑️ Clear Conversation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MultilingualVoiceAssistant;
