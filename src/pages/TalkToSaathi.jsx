import React, { useState, useEffect } from 'react';
import VoiceButton from '../components/VoiceButton';
import { api } from '../services/api';
import { voiceService } from '../services/voiceService';

export function TalkToSaathi({ lang, initialQuery, t }) {
  const getInitialGreeting = (language) => {
    if (language === 'bn') return "নমস্কার! আমি আপনার সাথী। আপনি আমাকে যেকোনো প্রশ্ন করতে পারেন।";
    if (language === 'as') return "নমস্কাৰ! মই আপোনাৰ সাথী। আপুনি মোক যিকোনো প্ৰশ্ন সুধিব পাৰে।";
    if (language === 'hi') return "नमस्ते! मैं आपकी साथी हूँ। आप मुझसे कुछ भी पूछ सकते हैं।";
    return "Hello! I am SAATHI. How can I help you today?";
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'saathi',
      text: getInitialGreeting(lang),
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      handleUserQuery(initialQuery);
    }
  }, [initialQuery]);

  const speakText = (text) => {
    voiceService.speak(text, lang);
  };

  const handleDeleteMessage = (messageId) => {
    voiceService.stop();
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
  };

  const handleClearAll = () => {
    voiceService.stop();
    setMessages([]);
  };

  const handleUserQuery = async (queryText) => {
    if (!queryText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: queryText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    const response = await api.askSaathi(queryText, lang);

    const saathiMsg = {
      id: Date.now() + 1,
      sender: 'saathi',
      text: response.answer,
    };

    setMessages((prev) => [...prev, saathiMsg]);
    setLoading(false);

    // Speak AI response out loud using Voice Service
    if (response.audioText || response.answer) {
      speakText(response.audioText || response.answer);
    }
  };

  return (
    <div className="talk-page animate-fadeIn">
      {/* Top Large Centered SAATHI Flower Logo & Title */}
      <div className="talk-hero">
        <div className="flower-logo-large" role="img" aria-label="Saathi Logo">🌼</div>
        <h2 style={{ fontSize: '36px', marginBottom: '6px', color: 'var(--primary-forest)' }}>{t.talkTitle}</h2>
        <p style={{ fontSize: '22px', color: 'var(--text-sub)', fontWeight: '600' }}>
          {t.talkSub}
        </p>

        {/* Large Central Microphone Button */}
        <VoiceButton 
          onVoiceInput={(text) => handleUserQuery(text)}
          isListening={loading}
          lang={lang}
          t={t}
        />
      </div>

      {/* Quick Sample Questions Chips */}
      <div style={{ marginBottom: '28px', textAlign: 'center' }}>
        <p style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-sub)', marginBottom: '12px' }}>
          {t.sampleQuestionsTitle}
        </p>
        <div className="preset-buttons-group">
          <button className="preset-btn" onClick={() => handleUserQuery(t.q1)}>
            💬 "{t.q1}"
          </button>
          <button className="preset-btn" onClick={() => handleUserQuery(t.q2)}>
            ⏰ "{t.q2}"
          </button>
          <button className="preset-btn" onClick={() => handleUserQuery(t.q3)}>
            📞 "{t.q3}"
          </button>
        </div>
      </div>

      {/* Interactive Conversation History */}
      <div className="chat-history">
        {messages.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
            <button
              onClick={handleClearAll}
              title={t.deleteChat || "Clear Chat History"}
              style={{
                fontSize: '15px',
                padding: '8px 16px',
                borderRadius: '12px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#dc2626',
                border: '1.5px solid rgba(239, 68, 68, 0.3)',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <span>🗑️</span> {t.deleteChat || "Clear Chat History 🗑️"}
            </button>
          </div>
        )}

        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`chat-bubble ${msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-saathi'}`}
            style={{ position: 'relative' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <div className="bubble-sender">
                {msg.sender === 'user' ? t.userPromptLabel : `🌼 ${t.saathiReplyLabel}`}
              </div>
              <button 
                onClick={() => handleDeleteMessage(msg.id)}
                title={t.deleteMessage || "Delete message"}
                aria-label="Delete message"
                style={{
                  background: 'rgba(0, 0, 0, 0.05)',
                  border: 'none',
                  color: '#dc2626',
                  cursor: 'pointer',
                  fontSize: '16px',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  lineHeight: 1
                }}
              >
                <span>🗑️</span>
              </button>
            </div>

            <div>{msg.text}</div>
            
            {msg.sender === 'saathi' && (
              <button 
                onClick={() => speakText(msg.text)}
                style={{ 
                  marginTop: '10px', 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--primary-forest)', 
                  fontWeight: '800', 
                  fontSize: '16px', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>🔊</span> {t.btnListenStep || "Listen Aloud 🔊"}
              </button>
            )}
          </div>
        ))}

        {loading && (
          <div className="chat-bubble chat-bubble-saathi">
            <div className="bubble-sender">🌼 {t.saathiReplyLabel}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="spinner" style={{ width: '24px', height: '24px' }}></div>
              <span>{t.processing}</span>
            </div>
          </div>
        )}
      </div>

      {/* Manual Input Bar Fallback */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        <input 
          type="text" 
          placeholder={t.typePlaceholder}
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUserQuery(inputQuery)}
          style={{ flex: 1, padding: '16px 20px', borderRadius: '18px', border: '2.5px solid var(--border-dark)', fontSize: '19px', backgroundColor: 'var(--bg-card)', color: 'var(--text-main)' }}
        />
        <button 
          className="btn btn-primary"
          onClick={() => handleUserQuery(inputQuery)}
        >
          {t.btnSend}
        </button>
      </div>
    </div>
  );
}

export default TalkToSaathi;
