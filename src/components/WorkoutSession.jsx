import { useState, useEffect, useRef } from 'react';
import { getExerciseById, CATEGORIES } from '../data/exercises';
import { ExerciseSVG } from './ExerciseSVG';
import { RestTimer, CircularTimer, ExerciseBeatPlayer } from './Timer';
import { useAudio } from '../hooks/useAudio';

// Full workout session UI — exercise by exercise, set by set
export function WorkoutSession({ workout, planName, week, onComplete, onExit }) {
  const [currentExIdx, setCurrentExIdx] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [phase, setPhase] = useState('exercise'); // 'exercise' | 'rest' | 'done'
  const [completed, setCompleted] = useState([]); // [{exerciseId, sets: [{reps, completed}]}]
  const [startTime] = useState(Date.now());
  const [showDetails, setShowDetails] = useState(true);
  const audio = useAudio();

  const exercises = workout.exercises;
  const current = exercises[currentExIdx];
  const exercise = current ? getExerciseById(current.exerciseId) : null;
  const totalSets = exercises.reduce((acc, e) => acc + e.sets, 0);
  const doneSetCount = completed.reduce((acc, c) => acc + c.sets.filter(s => s.completed).length, 0);
  const overallProgress = totalSets > 0 ? doneSetCount / totalSets : 0;

  const markSetComplete = () => {
    setCompleted(prev => {
      const existing = prev.find(c => c.exerciseId === current.exerciseId);
      if (existing) {
        return prev.map(c =>
          c.exerciseId === current.exerciseId
            ? { ...c, sets: [...c.sets, { completed: true, reps: current.reps, duration: current.duration }] }
            : c
        );
      }
      return [...prev, { exerciseId: current.exerciseId, sets: [{ completed: true, reps: current.reps, duration: current.duration }] }];
    });

    const isLastSet = currentSet >= current.sets;
    const isLastExercise = currentExIdx >= exercises.length - 1;

    if (isLastSet && isLastExercise) {
      setPhase('done');
      audio.playWorkoutComplete();
      return;
    }

    setPhase('rest');
  };

  const afterRest = () => {
    const isLastSet = currentSet >= current.sets;
    if (isLastSet) {
      setCurrentExIdx(prev => prev + 1);
      setCurrentSet(1);
    } else {
      setCurrentSet(prev => prev + 1);
    }
    setPhase('exercise');
  };

  const handleComplete = () => {
    const duration = Math.round((Date.now() - startTime) / 60000);
    onComplete({ exercises: completed, duration, date: new Date().toISOString() });
  };

  if (phase === 'done') {
    const duration = Math.round((Date.now() - startTime) / 60000);
    return <WorkoutComplete workout={workout} planName={planName} week={week} duration={duration} onDone={handleComplete} />;
  }

  if (!exercise) return null;

  const catInfo = CATEGORIES[exercise.category];
  const restDuration = current.rest || 60;

  return (
    <div className="flex flex-col h-full bg-military-dark">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3" style={{ background: '#0d1117', borderBottom: '1px solid #21262d' }}>
        <button
          onClick={onExit}
          className="p-2 rounded-full"
          style={{ background: '#21262d', color: '#9ca3af' }}
        >
          ✕
        </button>
        <div className="flex-1">
          <div className="text-xs uppercase tracking-wider" style={{ color: '#6b7280' }}>
            {planName} · Week {week}
          </div>
          <div className="font-bold text-sm" style={{ fontFamily: 'Oswald', color: '#e8c547' }}>
            {workout.name}
          </div>
        </div>
        {/* Overall progress */}
        <div className="text-right">
          <div className="text-xs" style={{ color: '#6b7280' }}>{doneSetCount}/{totalSets} sets</div>
          <div className="w-20 h-1.5 rounded-full mt-1" style={{ background: '#21262d' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${overallProgress * 100}%`, background: '#e8c547' }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {phase === 'exercise' && (
          <ExerciseView
            exercise={exercise}
            current={current}
            currentSet={currentSet}
            catInfo={catInfo}
            showDetails={showDetails}
            onToggleDetails={() => setShowDetails(v => !v)}
            onComplete={markSetComplete}
          />
        )}
        {phase === 'rest' && (
          <RestView
            restDuration={restDuration}
            nextExercise={(() => {
              const isLastSet = currentSet >= current.sets;
              if (isLastSet) {
                const nextEx = exercises[currentExIdx + 1];
                return nextEx ? getExerciseById(nextEx.exerciseId) : null;
              }
              return exercise;
            })()}
            nextSet={currentSet >= current.sets ? 1 : currentSet + 1}
            onDone={afterRest}
          />
        )}
      </div>

      {/* Exercise progress dots */}
      <div className="flex justify-center gap-1.5 py-3" style={{ background: '#0d1117', borderTop: '1px solid #21262d' }}>
        {exercises.map((ex, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === currentExIdx ? 20 : 8,
              height: 8,
              background: i < currentExIdx ? '#39d353' : i === currentExIdx ? '#e8c547' : '#21262d',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ExerciseView({ exercise, current, currentSet, catInfo, showDetails, onToggleDetails, onComplete }) {
  const isTimed = exercise.type === 'timed';

  return (
    <div className="p-4 space-y-4 slide-up">
      {/* Exercise header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: catInfo?.color || '#e8c547' }}>
            {catInfo?.label} · {exercise.muscles.slice(0, 2).join(', ')}
          </div>
          <h2 className="text-2xl font-bold" style={{ fontFamily: 'Oswald', color: '#e6edf3' }}>
            {exercise.name}
          </h2>
        </div>
        {/* Set counter */}
        <div className="text-right">
          <div className="text-3xl font-bold" style={{ fontFamily: 'Oswald', color: '#e8c547' }}>
            {currentSet}/{current.sets}
          </div>
          <div className="text-xs uppercase" style={{ color: '#6b7280' }}>set</div>
        </div>
      </div>

      {/* SVG Illustration */}
      <div className="rounded-xl overflow-hidden" style={{ height: 180, background: '#161b22', border: '1px solid #21262d' }}>
        <ExerciseSVG exerciseId={exercise.id} />
      </div>

      {/* Reps / Duration target */}
      <div className="rounded-xl p-4 text-center" style={{ background: '#161b22', border: '1px solid #21262d' }}>
        {isTimed ? (
          <CircularTimer
            key={`${exercise.id}-${currentSet}`}
            duration={current.duration}
            label="exercise"
            color="#f97316"
            size={150}
            onComplete={onComplete}
          />
        ) : (
          <div>
            <div className="text-5xl font-bold mb-1" style={{ fontFamily: 'Oswald', color: '#f97316' }}>
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

      {/* Form tips toggle */}
      <button
        onClick={onToggleDetails}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all"
        style={{ background: '#161b22', border: '1px solid #21262d' }}
      >
        <span className="text-sm font-medium" style={{ color: '#9ca3af' }}>Form Tips</span>
        <span style={{ color: '#6b7280' }}>{showDetails ? '▲' : '▼'}</span>
      </button>

      {showDetails && (
        <div className="rounded-xl p-4 space-y-3 fade-in" style={{ background: '#161b22', border: '1px solid #21262d' }}>
          <ul className="space-y-2">
            {exercise.formTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#9ca3af' }}>
                <span style={{ color: '#e8c547', flexShrink: 0, marginTop: 2 }}>▸</span>
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

      {/* Complete set button */}
      {!isTimed && (
        <button
          onClick={onComplete}
          className="w-full py-4 rounded-xl text-lg font-bold uppercase tracking-wider transition-all active:scale-95"
          style={{ background: '#e8c547', color: '#0d1117', fontFamily: 'Oswald' }}
        >
          ✓ SET COMPLETE
        </button>
      )}
    </div>
  );
}

function RestView({ restDuration, nextExercise, nextSet, onDone }) {
  return (
    <div className="p-4 flex flex-col items-center slide-up">
      <div className="w-full rounded-xl p-6 text-center" style={{ background: '#161b22', border: '1px solid #21262d' }}>
        <RestTimer duration={restDuration} onSkip={onDone} onComplete={onDone} />
      </div>

      {nextExercise && (
        <div className="mt-4 w-full rounded-xl p-4" style={{ background: '#0d1117', border: '1px solid #21262d' }}>
          <div className="text-xs uppercase tracking-wider mb-2" style={{ color: '#6b7280' }}>
            Up Next — Set {nextSet}
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg overflow-hidden flex-shrink-0" style={{ width: 60, height: 60, background: '#161b22' }}>
              <ExerciseSVG exerciseId={nextExercise.id} />
            </div>
            <div>
              <div className="font-bold" style={{ fontFamily: 'Oswald', color: '#e6edf3' }}>{nextExercise.name}</div>
              <div className="text-xs mt-0.5" style={{ color: '#6b7280' }}>
                {nextExercise.muscles.slice(0, 2).join(' · ')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WorkoutComplete({ workout, planName, week, duration, onDone }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 text-center slide-up">
      <div className="text-6xl mb-4">🎖️</div>
      <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Oswald', color: '#e8c547' }}>
        MISSION COMPLETE
      </h1>
      <div className="text-sm mb-6" style={{ color: '#6b7280' }}>
        {workout.name} · {planName} · Week {week}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-8">
        <div className="rounded-xl p-4" style={{ background: '#161b22', border: '1px solid #21262d' }}>
          <div className="text-2xl font-bold" style={{ fontFamily: 'Oswald', color: '#39d353' }}>{duration}m</div>
          <div className="text-xs mt-1 uppercase" style={{ color: '#6b7280' }}>Duration</div>
        </div>
        <div className="rounded-xl p-4" style={{ background: '#161b22', border: '1px solid #21262d' }}>
          <div className="text-2xl font-bold" style={{ fontFamily: 'Oswald', color: '#f97316' }}>
            {workout.exercises.length}
          </div>
          <div className="text-xs mt-1 uppercase" style={{ color: '#6b7280' }}>Exercises</div>
        </div>
      </div>

      <button
        onClick={onDone}
        className="w-full max-w-xs py-4 rounded-xl text-lg font-bold uppercase tracking-wider"
        style={{ background: '#e8c547', color: '#0d1117', fontFamily: 'Oswald' }}
      >
        SAVE & CONTINUE
      </button>
    </div>
  );
}
