import { useRef, useCallback } from 'react';

// Web Audio API sound generation for workout timer
export function useAudio() {
  const ctxRef = useRef(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current || ctxRef.current.state === 'closed') {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const playTone = useCallback((frequency, duration, type = 'sine', volume = 0.3, delay = 0) => {
    try {
      const ctx = getCtx();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime + delay);

      gainNode.gain.setValueAtTime(0, ctx.currentTime + delay);
      gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

      oscillator.start(ctx.currentTime + delay);
      oscillator.stop(ctx.currentTime + delay + duration + 0.05);
    } catch (e) {
      // Silently ignore audio errors
    }
  }, [getCtx]);

  // Unlock speech synthesis on iOS — must be called from a user gesture
  // iOS silently ignores speechSynthesis calls from timers unless unlocked first
  const unlockSpeech = useCallback(() => {
    try {
      if (!('speechSynthesis' in window)) return;
      const u = new SpeechSynthesisUtterance('');
      u.volume = 0;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }, []);

  // Voice countdown — speaks the number of seconds remaining
  const speakCountdown = useCallback((seconds) => {
    try {
      if (!('speechSynthesis' in window)) return;
      // iOS sometimes pauses synthesis — resume before speaking
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${seconds}`);
      utterance.rate = 1.1;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  }, []);

  // Countdown beep — short high-pitched
  const playCountdownBeep = useCallback(() => {
    playTone(880, 0.15, 'sine', 0.25);
  }, [playTone]);

  // Final beep — louder, lower
  const playGoBeep = useCallback(() => {
    playTone(440, 0.1, 'sine', 0.4, 0);
    playTone(660, 0.1, 'sine', 0.4, 0.12);
    playTone(880, 0.3, 'sine', 0.5, 0.24);
  }, [playTone]);

  // Rest complete — triumphant
  const playRestComplete = useCallback(() => {
    playTone(523, 0.15, 'sine', 0.4, 0);    // C5
    playTone(659, 0.15, 'sine', 0.4, 0.15); // E5
    playTone(784, 0.3, 'sine', 0.5, 0.30);  // G5
  }, [playTone]);

  // Workout complete — fanfare
  const playWorkoutComplete = useCallback(() => {
    playTone(523, 0.2, 'sine', 0.4, 0);
    playTone(659, 0.2, 'sine', 0.4, 0.2);
    playTone(784, 0.2, 'sine', 0.4, 0.4);
    playTone(1047, 0.5, 'sine', 0.5, 0.6);
  }, [playTone]);

  // Ambient rest beat — rhythmic drum-like pulse
  const restBeatRef = useRef(null);
  const playRestBeat = useCallback((bpm = 60) => {
    const interval = (60 / bpm) * 1000;
    const beat = () => {
      playTone(80, 0.08, 'sine', 0.12);   // bass pulse
      playTone(200, 0.06, 'sine', 0.06);  // sub
    };
    beat();
    restBeatRef.current = setInterval(beat, interval);
  }, [playTone]);

  const stopRestBeat = useCallback(() => {
    if (restBeatRef.current) {
      clearInterval(restBeatRef.current);
      restBeatRef.current = null;
    }
  }, []);

  // Exercise rhythm beat
  const exerciseBeatRef = useRef(null);
  const playExerciseBeat = useCallback((bpm = 80) => {
    const interval = (60 / bpm) * 1000;
    let count = 0;
    const beat = () => {
      if (count % 4 === 0) {
        playTone(160, 0.1, 'square', 0.15); // downbeat
      } else {
        playTone(120, 0.06, 'square', 0.08); // offbeat
      }
      count++;
    };
    beat();
    exerciseBeatRef.current = setInterval(beat, interval);
  }, [playTone]);

  const stopExerciseBeat = useCallback(() => {
    if (exerciseBeatRef.current) {
      clearInterval(exerciseBeatRef.current);
      exerciseBeatRef.current = null;
    }
  }, []);

  const stopAll = useCallback(() => {
    stopRestBeat();
    stopExerciseBeat();
  }, [stopRestBeat, stopExerciseBeat]);

  return {
    unlockSpeech,
    speakCountdown,
    playCountdownBeep,
    playGoBeep,
    playRestComplete,
    playWorkoutComplete,
    playRestBeat,
    stopRestBeat,
    playExerciseBeat,
    stopExerciseBeat,
    stopAll,
  };
}
