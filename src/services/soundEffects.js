// Sound Effects Service for SAATHI
// Provides tactile audio feedback whenever buttons, tabs, or interactive UI elements are touched/clicked.

export function playButtonSound(soundType = 'click') {
  try {
    // Native phone haptic vibration feedback
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      if (soundType === 'emergency') {
        navigator.vibrate([35, 40, 35]);
      } else if (soundType === 'delete') {
        navigator.vibrate(20);
      } else {
        navigator.vibrate(10);
      }
    }

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!window.__saathiAudioCtx) {
      window.__saathiAudioCtx = new AudioCtx();
    }
    const ctx = window.__saathiAudioCtx;

    // Resume if suspended (required by browser audio policy after first user interaction)
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (soundType === 'delete') {
      // Soft low tone for delete / clear actions
      osc.type = 'sine';
      osc.frequency.setValueAtTime(340, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(170, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (soundType === 'emergency' || soundType === 'mic') {
      // Energetic double-tone for microphone / emergency action
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else {
      // Crisp, pleasant high-frequency click feedback
      osc.type = 'sine';
      osc.frequency.setValueAtTime(780, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(460, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    }
  } catch (e) {
    // Fail gracefully if web audio is unavailable
  }
}

// Attach a global event listener so EVERY button tap in the app plays the touch sound
export function initGlobalButtonSoundListener() {
  if (typeof window === 'undefined') return;

  const handleGlobalClick = (event) => {
    // Check if the click target or any parent is a button or clickable element
    const clickable = event.target.closest(
      'button, .btn, [role="button"], a, input[type="button"], input[type="submit"], .preset-btn, .sample-voice-chip, .nav-item, .chip-item'
    );

    if (clickable) {
      if (clickable.innerText && (clickable.innerText.includes('🗑️') || clickable.innerText.includes('Delete') || clickable.innerText.includes('Clear'))) {
        playButtonSound('delete');
      } else if (clickable.innerText && (clickable.innerText.includes('🎙️') || clickable.innerText.includes('Need Help') || clickable.className.includes('emergency'))) {
        playButtonSound('emergency');
      } else {
        playButtonSound('click');
      }
    }
  };

  window.addEventListener('click', handleGlobalClick, { capture: true, passive: true });
}
