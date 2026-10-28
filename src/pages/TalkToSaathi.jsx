import React, { useState, useEffect, useRef } from 'react';
import VoiceButton from '../components/VoiceButton';
import { api } from '../services/api';
import { voiceService } from '../services/voiceService';

const LANGS = [
  { code: 'hi', label: 'हिन्दी' },
  { code: 'en', label: 'English' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'as', label: 'অসমীয়া' },
];

export function TalkToSaathi({ lang: propLang, initialQuery, t }) {
  const [activeLang, setActiveLang] = useState(propLang || 'en');
  const [messages, setMessages] = useState([{
    id: 1,
    sender: 'saathi',
    text: getInitialGreeting(propLang || 'en'),
  }]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  function getInitialGreeting(l) {
    if (l === 'bn') return 'নমস্কার! আমি আপনার সাথী। আপনি আমাকে যেকোনো প্রশ্ন করতে পারেন।';
    if (l === 'as') return 'নমস্কাৰ! মই আপোনাৰ সাথী। আপুনি মোক যিকোনো প্ৰশ্ন সুধিব পাৰে।';
    if (l === 'hi') return 'नमस्ते! मैं आपकी साथी हूँ। आप मुझसे कुछ भी पूछ सकते हैं।';
    return 'Hello! I am SAATHI. How can I help you today?';
  }

  useEffect(() => {
    if (initialQuery) handleUserQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const speakText = (text) => voiceService.speak(text, activeLang);

  const handleDeleteMessage = (id) => {
    voiceService.stop();
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const handleClearAll = () => {
    voiceService.stop();
    setMessages([]);
  };

  const handleUserQuery = async (queryText) => {
    if (!queryText?.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: queryText };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);
    const response = await api.askSaathi(queryText, activeLang);
    const saathiMsg = { id: Date.now() + 1, sender: 'saathi', text: response.answer };
    setMessages((prev) => [...prev, saathiMsg]);
    setLoading(false);
    if (response.audioText || response.answer) speakText(response.audioText || response.answer);
  };

  return (
    <div className="talk-page animate-fadeIn">

      {/* ── HERO: Pulsing Mic ── */}
      <div className="talk-hero">
        <h2 className="talk-title">🎙️ {t.talkTitle}</h2>
        <p className="talk-sub">{t.talkSub}</p>

        <VoiceButton
          onVoiceInput={(text) => handleUserQuery(text)}
          isListening={loading}
          lang={activeLang}
          t={t}
        />

        {/* Language Chip Selector */}
        <div className="talk-lang-chips">
          {LANGS.map((l) => (
            <button
              key={l.code}
              className={`talk-lang-chip ${activeLang === l.code ? 'talk-lang-chip-active' : ''}`}
              onClick={() => setActiveLang(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Sample Question Chips ── */}
      <div className="preset-buttons-group" style={{ marginBottom: '24px', justifyContent: 'center' }}>
        <button className="preset-btn" onClick={() => handleUserQuery(t.q1)}>💬 "{t.q1}"</button>
        <button className="preset-btn" onClick={() => handleUserQuery(t.q2)}>⏰ "{t.q2}"</button>
        <button className="preset-btn" onClick={() => handleUserQuery(t.q3)}>📞 "{t.q3}"</button>
      </div>

      {/* ── Chat History ── */}
      <div className="chat-history">
        {messages.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
            <button
              onClick={handleClearAll}
              style={{
                fontSize: '14px', padding: '6px 14px', borderRadius: '10px',
                backgroundColor: 'rgba(239,68,68,0.1)', color: '#dc2626',
                border: '1.5px solid rgba(239,68,68,0.3)', fontWeight: '700',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px',
              }}
            >
              🗑️ {t.deleteChat || 'Clear Chat'}
            </button>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-bubble ${msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-saathi'}`}
          >
            <div className="chat-bubble-meta">
              <span className="bubble-sender">
                {msg.sender === 'user' ? (t.userPromptLabel || 'You') : `🌼 ${t.saathiReplyLabel || 'SAATHI'}`}
              </span>
              <button
                onClick={() => handleDeleteMessage(msg.id)}
                className="chat-delete-btn"
                aria-label="Delete message"
              >🗑️</button>
            </div>

            <div className="chat-bubble-text">{msg.text}</div>

            {msg.sender === 'saathi' && (
              <button
                className="btn-chat-listen"
                onClick={() => speakText(msg.text)}
              >
                🔊 {t.btnListenStep || 'Listen Again'}
              </button>
            )}
          </div>
        ))}

        {loading && (
          <div className="chat-bubble chat-bubble-saathi">
            <div className="bubble-sender">🌼 {t.saathiReplyLabel || 'SAATHI'}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
              <div className="spinner" style={{ width: '22px', height: '22px' }} />
              <span>{t.processing || 'Thinking...'}</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Text Input Bar ── */}
      <div className="chat-input-bar">
        <input
          type="text"
          placeholder={t.typePlaceholder || 'Type your question here...'}
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUserQuery(inputQuery)}
          className="chat-input-field"
        />
        <button
          className="btn btn-primary chat-send-btn"
          onClick={() => handleUserQuery(inputQuery)}
          disabled={!inputQuery.trim()}
        >
          {t.btnSend || '➤ Send'}
        </button>
      </div>
    </div>
  );
}

export default TalkToSaathi;
