import { useState, useEffect, useRef } from 'react';
import { getExerciseById, CATEGORIES } from '../data/exercises';
import { ExerciseSVG } from './ExerciseSVG';
import { RestTimer, CircularTimer, ExerciseBeatPlayer } from './Timer';
import { useAudio } from '../hooks/useAudio';

export function WorkoutSession({ workout, planName, week, onComplete, onExit }) {
  const isCircuit = workout.format === 'circuit';

  return isCircuit
    ? <CircuitSession workout={workout} planName={planName} week={week} onComplete={onComplete} onExit={onExit} />
    : <StraightSession workout={workout} planName={planName} week={week} onComplete={onComplete} onExit={onExit} />;
}

// ═══════════════════════════════════════════
// CIRCUIT SESSION
// Round 1: ex1 → ex2 → ex3 → rest → Round 2 → ...
// ═══════════════════════════════════════════
function CircuitSession({ workout, planName, week, onComplete, onExit }) {
  const [currentRound, setCurrentRound] = useState(1);
  const [currentExIdx, setCurrentExIdx] = useState(0);
  const [phase, setPhase] = useState('exercise'); // 'exercise' | 'rest-between' | 'rest-round' | 'done'
  const [completed, setCompleted] = useState([]);
  const completedRef = useRef([]); // ref always has latest value — avoids stale closure bug
  const [startTime] = useState(Date.now());
  const [showDetails, setShowDetails] = useState(true);
  const audio = useAudio();

  // Unlock iOS speech synthesis on mount (requires being triggered by user gesture chain)
  useEffect(() => { audio.unlockSpeech(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const totalRounds = workout.rounds || 3;
  const exercises = workout.exercises;
  const current = exercises[currentExIdx];
  const exercise = current ? getExerciseById(current.exerciseId) : null;

  const totalSteps = totalRounds * exercises.length;
  const doneSteps = (currentRound - 1) * exercises.length + currentExIdx;
  const overallProgress = totalSteps > 0 ? doneSteps / totalSteps : 0;

  const markExerciseComplete = () => {
    const newEntry = { completed: true, reps: current.reps, duration: current.duration };
    const prev = completedRef.current;
    const existing = prev.find(c => c.exerciseId === current.exerciseId);
    const updated = existing
      ? prev.map(c => c.exerciseId === current.exerciseId
          ? { ...c, sets: [...c.sets, newEntry] } : c)
      : [...prev, { exerciseId: current.exerciseId, sets: [newEntry] }];

    completedRef.current = updated;
    setCompleted(updated);

    const isLastExercise = currentExIdx >= exercises.length - 1;
    const isLastRound = currentRound >= totalRounds;

    if (isLastExercise && isLastRound) {
      setPhase('done');
      audio.playWorkoutComplete();
      return;
    }

    if (isLastExercise) {
      setPhase('rest-round');
    } else {
      setPhase('rest-between');
    }
  };

  const afterRestBetween = () => {
    setCurrentExIdx(prev => prev + 1);
    setPhase('exercise');
  };

  const afterRestRound = () => {
    setCurrentRound(prev => prev + 1);
    setCurrentExIdx(0);
    setPhase('exercise');
  };

  // Uses ref — always has the latest completed list, no stale closure
  const handleComplete = () => {
    const duration = Math.round((Date.now() - startTime) / 60000);
    onComplete({ exercises: completedRef.current, duration, date: new Date().toISOString() });
  };

  if (phase === 'done') {
    const duration = Math.round((Date.now() - startTime) / 60000);
    return <WorkoutComplete workout={workout} planName={planName} week={week} duration={duration} onDone={handleComplete} />;
  }

  if (!exercise) return null;
  const catInfo = CATEGORIES[exercise.category];

  return (
    <div className="flex flex-col h-full" style={{ background: '#0d1117' }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3" style={{ background: '#0d1117', borderBottom: '1px solid #21262d' }}>
        <button onClick={onExit} className="p-2 rounded-full" style={{ background: '#21262d', color: '#9ca3af' }}>✕</button>
        <div className="flex-1">
          <div className="text-xs uppercase tracking-wider" style={{ color: '#6b7280' }}>{planName} · Week {week}</div>
          <div className="font-bold text-sm" style={{ fontFamily: 'Oswald', color: '#f97316' }}>{workout.name}</div>
        </div>
        <div className="text-right">
          <div className="text-xs" style={{ color: '#6b7280' }}>Round {currentRound}/{totalRounds}</div>
          <div className="w-20 h-1.5 rounded-full mt-1" style={{ background: '#21262d' }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${overallProgress * 100}%`, background: '#f97316' }} />
          </div>
        </div>
      </div>

      {/* Round indicator pills */}
      <div className="flex justify-center gap-2 py-2" style={{ background: '#0d1117' }}>
        {Array.from({ length: totalRounds }).map((_, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="rounded-full transition-all duration-300"
              style={{
                width: 28, height: 6,
                background: i + 1 < currentRound ? '#39d353' : i + 1 === currentRound ? '#f97316' : '#21262d',
              }}
            />
            {i < totalRounds - 1 && <div style={{ width: 4, height: 1, background: '#21262d' }} />}
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {phase === 'exercise' && (
          <ExerciseView
            exercise={exercise}
            current={current}
            label={`Round ${currentRound} · Exercise ${currentExIdx + 1}/${exercises.length}`}
            catInfo={catInfo}
            showDetails={showDetails}
            onToggleDetails={() => setShowDetails(v => !v)}
            onComplete={markExerciseComplete}
          />
        )}
        {phase === 'rest-between' && (
          <RestView
            restDuration={workout.restBetweenExercises || 15}
            label="QUICK REST"
            color="#f97316"
            nextExercise={getExerciseById(exercises[currentExIdx + 1]?.exerciseId)}
            nextLabel={`Exercise ${currentExIdx + 2}/${exercises.length} · Round ${currentRound}`}
            onDone={afterRestBetween}
          />
        )}
        {phase === 'rest-round' && (
          <RestView
            restDuration={workout.restBetweenRounds || 90}
            label={`ROUND ${currentRound} DONE`}
            color="#39d353"
            nextExercise={getExerciseById(exercises[0]?.exerciseId)}
            nextLabel={`Round ${currentRound + 1} of ${totalRounds} — Starting exercise 1`}
            onDone={afterRestRound}
          />
        )}
      </div>

      {/* Exercise dots for current round */}
      <div className="flex justify-center gap-1.5 py-3" style={{ background: '#0d1117', borderTop: '1px solid #21262d' }}>
        {exercises.map((_, i) => (
          <div key={i} className="rounded-full transition-all duration-300"
            style={{
              width: i === currentExIdx ? 20 : 8,
              height: 8,
              background: i < currentExIdx ? '#39d353' : i === currentExIdx ? '#f97316' : '#21262d',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// STRAIGHT SESSION (Calisthenics plan)
// All sets of exercise 1 → all sets of exercise 2 → ...
// ═══════════════════════════════════════════
function StraightSession({ workout, planName, week, onComplete, onExit }) {
  const [currentExIdx, setCurrentExIdx] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [phase, setPhase] = useState('exercise');
  const [completed, setCompleted] = useState([]);
  const completedRef = useRef([]);
  const [startTime] = useState(Date.now());
  const [showDetails, setShowDetails] = useState(true);
  const audio = useAudio();

  // Unlock iOS speech synthesis on mount
  useEffect(() => { audio.unlockSpeech(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const exercises = workout.exercises;
  const current = exercises[currentExIdx];
  const exercise = current ? getExerciseById(current.exerciseId) : null;
  const totalSets = exercises.reduce((acc, e) => acc + (e.sets || 1), 0);
  const doneSetCount = completed.reduce((acc, c) => acc + c.sets.filter(s => s.completed).length, 0);

  const markSetComplete = () => {
    const newEntry = { completed: true, reps: current.reps, duration: current.duration };
    const prev = completedRef.current;
    const existing = prev.find(c => c.exerciseId === current.exerciseId);
    const updated = existing
      ? prev.map(c => c.exerciseId === current.exerciseId
          ? { ...c, sets: [...c.sets, newEntry] } : c)
      : [...prev, { exerciseId: current.exerciseId, sets: [newEntry] }];

    completedRef.current = updated;
    setCompleted(updated);

    const isLastSet = currentSet >= (current.sets || 1);
    const isLastExercise = currentExIdx >= exercises.length - 1;

    if (isLastSet && isLastExercise) { setPhase('done'); audio.playWorkoutComplete(); return; }
    setPhase('rest');
  };

  const afterRest = () => {
    if (currentSet >= (current.sets || 1)) {
      setCurrentExIdx(prev => prev + 1);
      setCurrentSet(1);
    } else {
      setCurrentSet(prev => prev + 1);
    }
    setPhase('exercise');
  };

  const handleComplete = () => {
    const duration = Math.round((Date.now() - startTime) / 60000);
    onComplete({ exercises: completedRef.current, duration, date: new Date().toISOString() });
  };

  if (phase === 'done') {
    const duration = Math.round((Date.now() - startTime) / 60000);
    return <WorkoutComplete workout={workout} planName={planName} week={week} duration={duration} onDone={handleComplete} />;
  }

  if (!exercise) return null;
  const catInfo = CATEGORIES[exercise.category];

  return (
    <div className="flex flex-col h-full" style={{ background: '#0d1117' }}>
      <div className="flex items-center gap-3 px-4 pt-4 pb-3" style={{ background: '#0d1117', borderBottom: '1px solid #21262d' }}>
        <button onClick={onExit} className="p-2 rounded-full" style={{ background: '#21262d', color: '#9ca3af' }}>✕</button>
        <div className="flex-1">
          <div className="text-xs uppercase tracking-wider" style={{ color: '#6b7280' }}>{planName} · Week {week}</div>
          <div className="font-bold text-sm" style={{ fontFamily: 'Oswald', color: '#e8c547' }}>{workout.name}</div>
        </div>
        <div className="text-right">
          <div className="text-xs" style={{ color: '#6b7280' }}>{doneSetCount}/{totalSets} sets</div>
          <div className="w-20 h-1.5 rounded-full mt-1" style={{ background: '#21262d' }}>
            <div className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(doneSetCount / totalSets) * 100}%`, background: '#e8c547' }} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {phase === 'exercise' && (
          <ExerciseView
            exercise={exercise}
            current={current}
            label={`Set ${currentSet}/${current.sets || 1}`}
            catInfo={catInfo}
            showDetails={showDetails}
            onToggleDetails={() => setShowDetails(v => !v)}
            onComplete={markSetComplete}
          />
        )}
        {phase === 'rest' && (
          <RestView
            restDuration={current.rest || 60}
            label="REST"
            color="#3b82f6"
            nextExercise={(() => {
              const isLastSet = currentSet >= (current.sets || 1);
              return isLastSet ? getExerciseById(exercises[currentExIdx + 1]?.exerciseId) : exercise;
            })()}
            nextLabel={currentSet >= (current.sets || 1)
              ? `Next: ${getExerciseById(exercises[currentExIdx + 1]?.exerciseId)?.name}`
              : `Set ${currentSet + 1}/${current.sets}`}
            onDone={afterRest}
          />
        )}
      </div>

      <div className="flex justify-center gap-1.5 py-3" style={{ background: '#0d1117', borderTop: '1px solid #21262d' }}>
        {exercises.map((_, i) => (
          <div key={i} className="rounded-full transition-all duration-300"
            style={{
              width: i === currentExIdx ? 20 : 8, height: 8,
              background: i < currentExIdx ? '#39d353' : i === currentExIdx ? '#e8c547' : '#21262d',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════

function ExerciseView({ exercise, current, label, catInfo, showDetails, onToggleDetails, onComplete }) {
  const isTimed = exercise.type === 'timed';
  const accentColor = catInfo?.color || '#e8c547';

  return (
    <div className="p-4 space-y-4 slide-up">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: accentColor }}>
            {catInfo?.label} · {exercise.muscles.slice(0, 2).join(', ')}
          </div>
          <h2 className="text-2xl font-bold" style={{ fontFamily: 'Oswald', color: '#e6edf3' }}>{exercise.name}</h2>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold uppercase" style={{ fontFamily: 'Oswald', color: accentColor }}>{label}</div>
        </div>
      </div>

      {/* SVG */}
      <div className="rounded-xl overflow-hidden" style={{ height: 180, background: '#161b22', border: '1px solid #21262d' }}>
        <ExerciseSVG exerciseId={exercise.id} />
      </div>

      {/* Reps / Timer */}
      <div className="rounded-xl p-4 text-center" style={{ background: '#161b22', border: '1px solid #21262d' }}>
        {isTimed ? (
          <CircularTimer
            key={`${exercise.id}-${label}`}
            duration={current.duration}
            label="hold"
            color={accentColor}
            size={150}
            onComplete={onComplete}
          />
        ) : (
          <div>
            <div className="text-5xl font-bold mb-1" style={{ fontFamily: 'Oswald', color: accentColor }}>
              {current.reps}
            </div>
            <div className="text-sm uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>reps</div>
            {current.note && (
              <div className="text-xs px-3 py-1 rounded-full inline-block mb-3" style={{ background: '#21262d', color: '#9ca3af' }}>
                {current.note}
              </div>
            )}
            <ExerciseBeatPlayer isActive={true} />
          </div>
        )}
      </div>

      {/* Form tips */}
      <button onClick={onToggleDetails}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl"
        style={{ background: '#161b22', border: '1px solid #21262d' }}>
        <span className="text-sm font-medium" style={{ color: '#9ca3af' }}>Form Tips</span>
        <span style={{ color: '#6b7280' }}>{showDetails ? '▲' : '▼'}</span>
      </button>

      {showDetails && (
        <div className="rounded-xl p-4 space-y-3 fade-in" style={{ background: '#161b22', border: '1px solid #21262d' }}>
          <ul className="space-y-2">
            {exercise.formTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#9ca3af' }}>
                <span style={{ color: accentColor, flexShrink: 0, marginTop: 2 }}>▸</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
          <div className="pt-2 border-t" style={{ borderColor: '#21262d' }}>
            <div className="text-xs font-bold uppercase mb-1" style={{ color: '#39d353' }}>Beginner</div>
            <div className="text-xs" style={{ color: '#6b7280' }}>{exercise.beginner}</div>
          </div>
          <div>
            <div className="text-xs font-bold uppercase mb-1" style={{ color: '#f97316' }}>Advanced</div>
            <div className="text-xs" style={{ color: '#6b7280' }}>{exercise.advanced}</div>
          </div>
        </div>
      )}

      {!isTimed && (
        <button onClick={onComplete}
          className="w-full py-4 rounded-xl text-lg font-bold uppercase tracking-wider active:scale-95 transition-all"
          style={{ background: accentColor, color: '#0d1117', fontFamily: 'Oswald' }}>
          ✓ DONE
        </button>
      )}
    </div>
  );
}

function RestView({ restDuration, label, color, nextExercise, nextLabel, onDone }) {
  return (
    <div className="p-4 flex flex-col items-center slide-up">
      <div className="w-full rounded-xl p-6 text-center" style={{ background: '#161b22', border: '1px solid #21262d' }}>
        <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color }}>
          {label}
        </div>
        <RestTimer duration={restDuration} onSkip={onDone} onComplete={onDone} color={color} />
      </div>

      {nextExercise && (
        <div className="mt-4 w-full rounded-xl p-4" style={{ background: '#0d1117', border: '1px solid #21262d' }}>
          <div className="text-xs uppercase tracking-wider mb-2" style={{ color: '#6b7280' }}>{nextLabel}</div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg overflow-hidden flex-shrink-0" style={{ width: 60, height: 60, background: '#161b22' }}>
              <ExerciseSVG exerciseId={nextExercise.id} />
            </div>
            <div>
              <div className="font-bold" style={{ fontFamily: 'Oswald', color: '#e6edf3' }}>{nextExercise.name}</div>
              <div className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{nextExercise.muscles.slice(0, 2).join(' · ')}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WorkoutComplete({ workout, planName, week, duration, onDone }) {
  const isCircuit = workout.format === 'circuit';
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 text-center slide-up">
      <div className="text-6xl mb-4">🎖️</div>
      <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Oswald', color: '#e8c547' }}>MISSION COMPLETE</h1>
      <div className="text-sm mb-6" style={{ color: '#6b7280' }}>{workout.name} · {planName} · Week {week}</div>

      <div className="grid grid-cols-3 gap-3 w-full max-w-xs mb-8">
        <div className="rounded-xl p-3 text-center" style={{ background: '#161b22', border: '1px solid #21262d' }}>
          <div className="text-xl font-bold" style={{ fontFamily: 'Oswald', color: '#39d353' }}>{duration}m</div>
          <div className="text-xs mt-0.5 uppercase" style={{ color: '#6b7280' }}>Time</div>
        </div>
        {isCircuit ? (
          <div className="rounded-xl p-3 text-center" style={{ background: '#161b22', border: '1px solid #21262d' }}>
            <div className="text-xl font-bold" style={{ fontFamily: 'Oswald', color: '#f97316' }}>{workout.rounds}</div>
            <div className="text-xs mt-0.5 uppercase" style={{ color: '#6b7280' }}>Rounds</div>
          </div>
        ) : (
          <div className="rounded-xl p-3 text-center" style={{ background: '#161b22', border: '1px solid #21262d' }}>
            <div className="text-xl font-bold" style={{ fontFamily: 'Oswald', color: '#f97316' }}>{workout.exercises.length}</div>
            <div className="text-xs mt-0.5 uppercase" style={{ color: '#6b7280' }}>Exercises</div>
          </div>
        )}
        <div className="rounded-xl p-3 text-center" style={{ background: '#161b22', border: '1px solid #21262d' }}>
          <div className="text-xl font-bold" style={{ fontFamily: 'Oswald', color: '#3b82f6' }}>
            {isCircuit ? workout.exercises.length * workout.rounds : workout.exercises.reduce((a, e) => a + (e.sets || 1), 0)}
          </div>
          <div className="text-xs mt-0.5 uppercase" style={{ color: '#6b7280' }}>Total Sets</div>
        </div>
      </div>

      <button onClick={onDone}
        className="w-full max-w-xs py-4 rounded-xl text-lg font-bold uppercase tracking-wider"
        style={{ background: '#e8c547', color: '#0d1117', fontFamily: 'Oswald' }}>
        SAVE & CONTINUE
      </button>
    </div>
  );
}
