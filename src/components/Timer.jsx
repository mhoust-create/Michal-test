import { useState, useEffect, useRef, useCallback } from 'react';
import { useAudio } from '../hooks/useAudio';

// Circular countdown timer component
export function CircularTimer({ duration, onComplete, autoStart = false, label = '', color = '#e8c547', size = 180 }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [hasStarted, setHasStarted] = useState(autoStart);
  const intervalRef = useRef(null);
  const audio = useAudio();

  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / duration;
  const strokeDashoffset = circumference * (1 - progress);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}:${sec.toString().padStart(2, '0')}` : `${sec}s`;
  };

  const start = useCallback(() => {
    setIsRunning(true);
    setHasStarted(true);
    audio.playGoBeep();
  }, [audio]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setHasStarted(false);
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    setTimeLeft(duration);
    setIsRunning(autoStart);
    setHasStarted(autoStart);
  }, [duration, autoStart]);

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          audio.playRestComplete();
          onComplete?.();
          return 0;
        }
        // Countdown beeps at 3, 2, 1
        if (prev <= 4) {
          audio.playCountdownBeep();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, audio, onComplete]);

  const timerColor = timeLeft <= 5 ? '#f85149' : timeLeft <= 10 ? '#f97316' : color;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Circular SVG timer */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background ring */}
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="#21262d" strokeWidth={8}
          />
          {/* Progress ring */}
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke={timerColor}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.8s ease, stroke 0.3s ease' }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="font-bold text-center"
            style={{
              fontFamily: 'Oswald, sans-serif',
              fontSize: size > 150 ? '2.8rem' : '2rem',
              color: timerColor,
              lineHeight: 1,
              transition: 'color 0.3s ease',
            }}
          >
            {formatTime(timeLeft)}
          </div>
          {label && (
            <div className="text-xs mt-1 uppercase tracking-widest" style={{ color: '#6b7280' }}>
              {label}
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {!hasStarted && (
          <button
            onClick={start}
            className="px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
            style={{ background: color, color: '#0d1117' }}
          >
            START
          </button>
        )}
        {hasStarted && timeLeft > 0 && (
          <>
            <button
              onClick={isRunning ? pause : start}
              className="px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
              style={{ background: isRunning ? '#21262d' : color, color: isRunning ? '#e6edf3' : '#0d1117', border: `1px solid ${isRunning ? '#30363d' : color}` }}
            >
              {isRunning ? '⏸ PAUSE' : '▶ RESUME'}
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 rounded-full text-sm uppercase tracking-wider"
              style={{ background: '#21262d', color: '#6b7280', border: '1px solid #30363d' }}
            >
              ↺ RESET
            </button>
          </>
        )}
        {timeLeft === 0 && (
          <button
            onClick={reset}
            className="px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
            style={{ background: color, color: '#0d1117' }}
          >
            ↺ RESTART
          </button>
        )}
      </div>
    </div>
  );
}

// Rest timer with music beats
export function RestTimer({ duration, onSkip, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const intervalRef = useRef(null);
  const audio = useAudio();

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    setTimeLeft(duration);
    setIsRunning(true);
  }, [duration]);

  useEffect(() => {
    if (musicOn) {
      audio.playRestBeat(50);
    } else {
      audio.stopRestBeat();
    }
    return () => audio.stopRestBeat();
  }, [musicOn, audio]);

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          audio.stopRestBeat();
          audio.playRestComplete();
          onComplete?.();
          return 0;
        }
        if (prev <= 4) audio.playCountdownBeep();
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, audio, onComplete]);

  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / duration;
  const offset = circumference * (1 - progress);
  const timerColor = timeLeft <= 5 ? '#f85149' : '#3b82f6';

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      {/* REST label */}
      <div className="text-xs font-bold uppercase tracking-widest text-blue-400">Rest Period</div>

      {/* Circular timer */}
      <div className="relative" style={{ width: 130, height: 130 }}>
        <svg width={130} height={130} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={65} cy={65} r={radius} fill="none" stroke="#21262d" strokeWidth={6} />
          <circle
            cx={65} cy={65} r={radius}
            fill="none" stroke={timerColor} strokeWidth={6} strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.8s ease, stroke 0.3s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div style={{ fontFamily: 'Oswald', fontSize: '2rem', color: timerColor, lineHeight: 1 }}>
            {formatTime(timeLeft)}
          </div>
          <div className="text-xs mt-1" style={{ color: '#6b7280' }}>REST</div>
        </div>
      </div>

      {/* Music toggle */}
      <button
        onClick={() => setMusicOn(!musicOn)}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all"
        style={{
          background: musicOn ? '#1d4ed8' : '#21262d',
          color: musicOn ? 'white' : '#6b7280',
          border: `1px solid ${musicOn ? '#3b82f6' : '#30363d'}`
        }}
      >
        {musicOn ? '🎵 BEAT ON' : '🎵 BEAT OFF'}
      </button>

      {/* Skip button */}
      <button
        onClick={() => { audio.stopRestBeat(); onSkip?.(); }}
        className="px-5 py-2 rounded-full text-xs uppercase tracking-wider"
        style={{ background: '#21262d', color: '#e6edf3', border: '1px solid #30363d' }}
      >
        SKIP REST →
      </button>
    </div>
  );
}

// Workout exercise beat player
export function ExerciseBeatPlayer({ isActive }) {
  const [bpm, setBpm] = useState(80);
  const [on, setOn] = useState(false);
  const audio = useAudio();

  useEffect(() => {
    if (!isActive) {
      audio.stopExerciseBeat();
      setOn(false);
    }
  }, [isActive, audio]);

  const toggle = () => {
    if (on) {
      audio.stopExerciseBeat();
      setOn(false);
    } else {
      audio.playExerciseBeat(bpm);
      setOn(true);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={toggle}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs uppercase tracking-wider"
        style={{
          background: on ? '#f97316' : '#21262d',
          color: on ? '#0d1117' : '#6b7280',
          border: `1px solid ${on ? '#f97316' : '#30363d'}`
        }}
      >
        🥁 {on ? 'BEAT ON' : 'BEAT OFF'}
      </button>
      {on && (
        <div className="flex items-center gap-2">
          <input
            type="range" min={40} max={160} value={bpm}
            onChange={(e) => {
              const newBpm = Number(e.target.value);
              setBpm(newBpm);
              audio.stopExerciseBeat();
              audio.playExerciseBeat(newBpm);
            }}
            className="w-20 accent-orange-500"
            style={{ accentColor: '#f97316' }}
          />
          <span className="text-xs" style={{ color: '#9ca3af' }}>{bpm}bpm</span>
        </div>
      )}
    </div>
  );
}
