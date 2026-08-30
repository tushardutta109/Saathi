import React, { useState, useEffect } from 'react';
import { voiceService } from '../services/voiceService';

export function VitalsMonitor({ lang = 'en', t, onAddNotification }) {
  // 1. Footstep Counter States
  const [steps, setSteps] = useState(4280);
  const [stepGoal, setStepGoal] = useState(6000);
  const [isAutoWalking, setIsAutoWalking] = useState(false);
  const [lastStepTime, setLastStepTime] = useState(Date.now());

  // Accelerometer DeviceMotion step detection
  useEffect(() => {
    let lastAccel = 0;
    const handleMotion = (event) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;
      
      const totalAccel = Math.sqrt((acc.x || 0) ** 2 + (acc.y || 0) ** 2 + (acc.z || 0) ** 2);
      const delta = Math.abs(totalAccel - lastAccel);
      
      // Step threshold
      if (delta > 11.5) {
        const now = Date.now();
        if (now - lastStepTime > 350) {
          setSteps((prev) => prev + 1);
          setLastStepTime(now);
        }
      }
      lastAccel = totalAccel;
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion);
    }
    return () => {
      if (window.DeviceMotionEvent) {
        window.removeEventListener('devicemotion', handleMotion);
      }
    };
  }, [lastStepTime]);

  // Auto-Walking simulation timer
  useEffect(() => {
    let interval = null;
    if (isAutoWalking) {
      interval = setInterval(() => {
        setSteps((prev) => prev + 2);
      }, 800);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoWalking]);

  // Calculate metrics
  const distanceKm = (steps * 0.00075).toFixed(2); // ~0.75m per step
  const caloriesKcal = Math.round(steps * 0.04);
  const activeMinutes = Math.round(steps / 100);
  const progressPercent = Math.min(Math.round((steps / stepGoal) * 100), 100);

  const handleSimulateSteps = (count = 50) => {
    setSteps((prev) => prev + count);
  };

  const handleResetSteps = () => {
    setSteps(0);
  };

  // Voice Readout of Patient Footsteps Summary
  const handleSpeakVitals = () => {
    let text = '';
    if (lang === 'hi') {
      text = `मरीज़ की गतिविधि रिपोर्ट: आज आप ${steps} कदम चले हैं, जो लगभग ${distanceKm} किलोमीटर है। आपने ${caloriesKcal} कैलोरी बर्न की है। स्वस्थ रहने के लिए रोज़ 6000 कदम चलें।`;
    } else if (lang === 'bn') {
      text = `রোগীর হাঁটার রিপোর্ট: আজ আপনি ${steps} টি পদক্ষেপ হেঁটেছেন, যা প্রায় ${distanceKm} কিলোমিটার। সুস্থ থাকতে প্রতিদিন ৬০০০ পদক্ষেপ হাঁটুন।`;
    } else if (lang === 'as') {
      text = `ৰোগীৰ খোজ কাঢ়াৰ ৰিপৰ্ট: আজি আপুনি ${steps} টা খোজ কাঢ়িছে, যি প্ৰায় ${distanceKm} কিলোমিটাৰ।`;
    } else {
      text = `Patient Mobility Report: You have walked ${steps} steps today, covering ${distanceKm} kilometers and burning ${caloriesKcal} calories.`;
    }

    voiceService.speak(text, lang);
  };

  return (
    <div className="vitals-monitor-page animate-fadeIn">
      {/* Header Banner */}
      <div className="vitals-hero-header">
        <div className="hero-title-group">
          <span className="hero-icon-badge">👟</span>
          <div>
            <h2 className="hero-main-title">{t.vitalsTitle || "Patient Footstep & Mobility Counter"}</h2>
            <p className="hero-sub-title">{t.vitalsSub || "Accurate real-time footstep counter and daily movement tracking."}</p>
          </div>
        </div>

        <button className="btn-listen-speech-large" onClick={handleSpeakVitals}>
          🔊 {t.btnListenVitalsAudio || "Listen Walking Summary Aloud"}
        </button>
      </div>

      <div className="vitals-cards-grid" style={{ gridTemplateColumns: '1fr' }}>
        {/* ===================================================================
            FOOTSTEP COUNTER CARD
           =================================================================== */}
        <div className="vitals-card step-counter-card">
          <div className="card-top-row">
            <div className="card-title-group">
              <span className="card-icon">👟</span>
              <div>
                <h3 className="card-heading">{t.stepsCardTitle || "Footstep Counter (कदमों की गिनती)"}</h3>
                <span className="card-subtext">{t.stepsGoal || "Daily Target: 6,000 Steps"}</span>
              </div>
            </div>
            <span className="goal-badge">{progressPercent}% Goal</span>
          </div>

          {/* Large Step Count Display */}
          <div className="step-count-hero">
            <span className="step-number-text">{steps.toLocaleString()}</span>
            <span className="step-unit-text">STEPS WALKED TODAY</span>
          </div>

          {/* Progress Bar */}
          <div className="step-progress-track">
            <div className="step-progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>

          {/* 3 Metric Pills */}
          <div className="step-metrics-grid">
            <div className="metric-pill">
              <span className="metric-icon">🗺️</span>
              <div className="metric-info">
                <span className="metric-val">{distanceKm} km</span>
                <span className="metric-lbl">{t.distanceLabel || "Distance"}</span>
              </div>
            </div>

            <div className="metric-pill">
              <span className="metric-icon">🔥</span>
              <div className="metric-info">
                <span className="metric-val">{caloriesKcal} kcal</span>
                <span className="metric-lbl">{t.caloriesLabel || "Calories"}</span>
              </div>
            </div>

            <div className="metric-pill">
              <span className="metric-icon">⏱️</span>
              <div className="metric-info">
                <span className="metric-val">{activeMinutes} mins</span>
                <span className="metric-lbl">{t.activeTimeLabel || "Walk Time"}</span>
              </div>
            </div>
          </div>

          {/* Interactive Step Actions */}
          <div className="step-actions-bar">
            <button className="btn-step-action primary" onClick={() => handleSimulateSteps(50)}>
              👟 {t.btnSimulateStep || "+ Walk 50 Steps"}
            </button>

            <button 
              className={`btn-step-action ${isAutoWalking ? 'active-walk' : 'secondary'}`} 
              onClick={() => {
                if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
                  DeviceMotionEvent.requestPermission()
                    .then(() => {
                      setIsAutoWalking(!isAutoWalking);
                    })
                    .catch(() => {
                      setIsAutoWalking(!isAutoWalking);
                    });
                } else {
                  setIsAutoWalking(!isAutoWalking);
                }
              }}
            >
              {isAutoWalking ? '⏹️ Stop Auto-Walk' : '▶️ Live Walking Mode'}
            </button>

            <button className="btn-step-action danger" onClick={handleResetSteps}>
              ↺ {t.btnResetSteps || "Reset"}
            </button>
          </div>
        </div>
      </div>

      {/* ===================================================================
          HEALTHY vs NOT HEALTHY MOBILITY GUIDANCE
         =================================================================== */}
      <div className="vitals-guidance-section animate-fadeIn">
        <h3 className="section-title-label" style={{ fontSize: '26px', marginBottom: '20px', color: 'var(--primary-forest)' }}>
          👟 Patient Health & Mobility Guidance: Healthy Targets vs Low Activity Cautions
        </h3>

        <div className="guidance-cards-grid">
          {/* Healthy Habits & Ranges (Green Card) */}
          <div className="guidance-card healthy-card">
            <div className="guidance-header green">
              <span className="guidance-icon">🟢</span>
              <h4 className="guidance-title">
                {t.healthyTitle || "Healthy Mobility Habits (स्वस्थ आदतें)"}
              </h4>
            </div>

            <ul className="guidance-list">
              <li className="guidance-item">
                <span className="item-bullet">✓</span>
                <div>
                  <strong>Daily Footsteps Target (6,000+ steps/day):</strong>
                  <p>{t.stepsHealthyAdvice || "Walking 6,000+ steps daily improves blood circulation, lowers blood pressure, and keeps joints flexible."}</p>
                </div>
              </li>

              <li className="guidance-item">
                <span className="item-bullet">✓</span>
                <div>
                  <strong>Gentle Morning & Evening Strolls:</strong>
                  <p>Splitting your total footsteps into two short 20-minute daily walks reduces strain and builds cardiovascular strength.</p>
                </div>
              </li>

              <li className="guidance-item">
                <span className="item-bullet">✓</span>
                <div>
                  <strong>Hydration During Mobility:</strong>
                  <p>Drinking a glass of warm water before and after light walks maintains optimal energy and prevents joint stiffness.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Sedentary Cautions (Red Card) */}
          <div className="guidance-card caution-card">
            <div className="guidance-header red">
              <span className="guidance-icon">🔴</span>
              <h4 className="guidance-title">
                {t.unhealthyTitle || "Low Mobility Cautions (अस्वास्थ्यकर संकेत)"}
              </h4>
            </div>

            <ul className="guidance-list">
              <li className="guidance-item">
                <span className="item-bullet alert">⚠️</span>
                <div>
                  <strong>Low Daily Mobility (&lt; 2,000 steps/day):</strong>
                  <p>{t.stepsCautionAdvice || "Walking under 2,000 steps daily can cause muscle weakness and lethargy. Try light 10-minute indoor walks."}</p>
                </div>
              </li>

              <li className="guidance-item">
                <span className="item-bullet alert">⚠️</span>
                <div>
                  <strong>Prolonged Sitting Risk:</strong>
                  <p>Sitting continuously for over 2 hours reduces blood circulation in legs. Stand up and take 50 steps every hour.</p>
                </div>
              </li>

              <li className="guidance-item">
                <span className="item-bullet alert">🚫</span>
                <div>
                  <strong>Unhealthy Habits to Avoid:</strong>
                  <p>Walking on slippery surfaces without proper supportive footwear or ignoring knee/joint pain during exercise.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VitalsMonitor;
