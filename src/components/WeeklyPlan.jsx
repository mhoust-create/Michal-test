import { getAllPlans, getPlan } from '../data/workoutPlans';
import { getExerciseById, CATEGORIES } from '../data/exercises';
import { ExerciseSVG } from './ExerciseSVG';
import { useState } from 'react';

export function WeeklyPlan({ userPlan, currentWeek, currentDay, onSelectDay, onChangePlan }) {
  const [viewingPlan, setViewingPlan] = useState(userPlan);
  const [viewingWeek, setViewingWeek] = useState(currentWeek);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showPlanSelector, setShowPlanSelector] = useState(false);

  const plan = getPlan(viewingPlan);
  if (!plan) return null;

  const week = plan.weeks.find(w => w.weekNum === viewingWeek);

  if (showPlanSelector) {
    return (
      <PlanSelector
        currentPlan={viewingPlan}
        onSelect={(id) => { setViewingPlan(id); onChangePlan(id); setShowPlanSelector(false); }}
        onBack={() => setShowPlanSelector(false)}
      />
    );
  }

  if (selectedDay) {
    return (
      <DayDetail
        day={selectedDay}
        planName={plan.name}
        weekNum={viewingWeek}
        isCurrent={viewingPlan === userPlan && viewingWeek === currentWeek && selectedDay.dayNum === currentDay}
        onBack={() => setSelectedDay(null)}
        onStart={() => { onSelectDay(selectedDay, viewingWeek); setSelectedDay(null); }}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 space-y-3" style={{ background: '#0d1117', borderBottom: '1px solid #21262d' }}>
        {/* Plan selector button */}
        <button
          onClick={() => setShowPlanSelector(true)}
          className="w-full flex items-center justify-between p-3 rounded-xl"
          style={{ background: '#161b22', border: '1px solid #21262d' }}
        >
          <div className="text-left">
            <div className="text-xs uppercase tracking-wider" style={{ color: '#6b7280' }}>Active Plan</div>
            <div className="font-bold text-sm" style={{ fontFamily: 'Oswald', color: '#e8c547' }}>{plan.name}</div>
            <div className="text-xs" style={{ color: '#6b7280' }}>{plan.subtitle} · {plan.level}</div>
          </div>
          <div className="text-xl" style={{ color: '#6b7280' }}>⇄</div>
        </button>

        {/* Week selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewingWeek(v => Math.max(1, v - 1))}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: '#21262d', color: '#9ca3af' }}
          >
            ‹
          </button>
          <div className="flex-1 text-center">
            <div className="font-bold" style={{ fontFamily: 'Oswald', color: '#e6edf3' }}>WEEK {viewingWeek}</div>
            <div className="text-xs" style={{ color: '#6b7280' }}>{week?.theme}</div>
          </div>
          <button
            onClick={() => setViewingWeek(v => Math.min(8, v + 1))}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: '#21262d', color: '#9ca3af' }}
          >
            ›
          </button>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs mb-1" style={{ color: '#6b7280' }}>
            <span>Week {viewingWeek} of 8</span>
            <span>{Math.round((viewingWeek / 8) * 100)}% complete</span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: '#21262d' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(viewingWeek / 8) * 100}%`, background: '#e8c547' }}
            />
          </div>
        </div>
      </div>

      {/* Weekly schedule */}
      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-3">
        {/* Week days */}
        <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#6b7280' }}>
          {plan.weeklyStructure.join('  ·  ')}
        </div>

        {week?.days.map((day, i) => {
          const isCurrentDay = viewingPlan === userPlan && viewingWeek === currentWeek && day.dayNum === currentDay;
          return (
            <DayCard
              key={i}
              day={day}
              dayName={plan.weeklyStructure[i] || `Day ${day.dayNum}`}
              isCurrentDay={isCurrentDay}
              onClick={() => setSelectedDay(day)}
            />
          );
        })}

        {/* Rest day indicators */}
        {plan.daysPerWeek < 7 && (
          <div className="rounded-xl p-3 text-center" style={{ background: '#0d1117', border: '1px dashed #21262d' }}>
            <div className="text-sm" style={{ color: '#6b7280' }}>
              Remaining days = Active Rest (walk, stretch, mobility)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DayCard({ day, dayName, isCurrentDay, onClick }) {
  const primaryExercise = day.exercises[0];
  const exercise = primaryExercise ? getExerciseById(primaryExercise.exerciseId) : null;

  return (
    <button
      onClick={onClick}
      className="exercise-card w-full text-left rounded-xl overflow-hidden"
      style={{
        background: '#161b22',
        border: `1px solid ${isCurrentDay ? '#e8c547' : '#21262d'}`,
        boxShadow: isCurrentDay ? '0 0 20px rgba(232,197,71,0.15)' : 'none',
      }}
    >
      <div className="flex items-center gap-3 p-3">
        {/* Day thumbnail */}
        <div className="flex-shrink-0 rounded-lg overflow-hidden" style={{ width: 72, height: 72, background: '#0d1117' }}>
          {exercise && <ExerciseSVG exerciseId={exercise.id} />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <div className="text-xs font-bold uppercase" style={{ color: isCurrentDay ? '#e8c547' : '#6b7280' }}>
              {isCurrentDay ? '● TODAY · ' : ''}{dayName}
            </div>
            <div className="text-xs" style={{ color: '#6b7280' }}>{day.exercises.length} exercises</div>
          </div>
          <div className="font-bold text-sm mb-1" style={{ fontFamily: 'Oswald', color: '#e6edf3' }}>{day.name}</div>
          <div className="text-xs" style={{ color: '#6b7280' }}>{day.focus}</div>

          {/* Exercise preview pills */}
          <div className="flex flex-wrap gap-1 mt-2">
            {day.exercises.slice(0, 3).map((ex, i) => {
              const e = getExerciseById(ex.exerciseId);
              if (!e) return null;
              const cat = CATEGORIES[e.category];
              return (
                <span key={i} className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#21262d', color: cat?.color || '#6b7280' }}>
                  {e.name}
                </span>
              );
            })}
            {day.exercises.length > 3 && (
              <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#21262d', color: '#6b7280' }}>
                +{day.exercises.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div style={{ color: '#6b7280' }}>›</div>
      </div>
    </button>
  );
}

function DayDetail({ day, planName, weekNum, isCurrent, onBack, onStart }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 pt-4 pb-3" style={{ background: '#0d1117', borderBottom: '1px solid #21262d' }}>
        <button onClick={onBack} className="p-2 rounded-full" style={{ background: '#21262d', color: '#9ca3af' }}>←</button>
        <div className="flex-1">
          <div className="text-xs uppercase tracking-wider" style={{ color: '#6b7280' }}>{planName} · Week {weekNum}</div>
          <div className="font-bold" style={{ fontFamily: 'Oswald', color: '#e6edf3' }}>{day.name}</div>
        </div>
        {isCurrent && (
          <div className="text-xs px-2 py-1 rounded-full" style={{ background: '#e8c54722', color: '#e8c547', border: '1px solid #e8c547' }}>
            TODAY
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-3">
        <div className="text-sm" style={{ color: '#6b7280' }}>{day.focus}</div>

        {day.exercises.map((ex, i) => {
          const exercise = getExerciseById(ex.exerciseId);
          if (!exercise) return null;
          const cat = CATEGORIES[exercise.category];
          return (
            <div key={i} className="flex items-center gap-3 rounded-xl p-3" style={{ background: '#161b22', border: '1px solid #21262d' }}>
              <div className="flex-shrink-0 rounded-lg overflow-hidden" style={{ width: 56, height: 56, background: '#0d1117' }}>
                <ExerciseSVG exerciseId={exercise.id} />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold uppercase" style={{ color: cat?.color }}>{cat?.label}</div>
                <div className="font-bold text-sm" style={{ fontFamily: 'Oswald', color: '#e6edf3' }}>{exercise.name}</div>
                <div className="text-xs mt-0.5" style={{ color: '#6b7280' }}>
                  {ex.sets} × {exercise.type === 'timed' ? `${ex.duration}s hold` : `${ex.reps} reps`}
                  {ex.note && ` · ${ex.note}`}
                  {` · ${ex.rest}s rest`}
                </div>
              </div>
              <div className="text-lg font-bold" style={{ fontFamily: 'Oswald', color: '#21262d' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
          );
        })}
      </div>

      {/* Start button */}
      <div className="p-4" style={{ background: '#0d1117', borderTop: '1px solid #21262d' }}>
        <button
          onClick={onStart}
          className="w-full py-4 rounded-xl text-lg font-bold uppercase tracking-wider"
          style={{ background: '#e8c547', color: '#0d1117', fontFamily: 'Oswald' }}
        >
          START WORKOUT →
        </button>
      </div>
    </div>
  );
}

function PlanSelector({ currentPlan, onSelect, onBack }) {
  const plans = getAllPlans();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 pt-4 pb-3" style={{ background: '#0d1117', borderBottom: '1px solid #21262d' }}>
        <button onClick={onBack} className="p-2 rounded-full" style={{ background: '#21262d', color: '#9ca3af' }}>←</button>
        <h2 className="text-lg font-bold" style={{ fontFamily: 'Oswald', color: '#e8c547' }}>CHOOSE PLAN</h2>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto pb-24">
        {plans.map(plan => (
          <button
            key={plan.id}
            onClick={() => onSelect(plan.id)}
            className="w-full text-left rounded-xl p-4 transition-all"
            style={{
              background: '#161b22',
              border: `2px solid ${plan.id === currentPlan ? '#e8c547' : '#21262d'}`,
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-bold text-lg" style={{ fontFamily: 'Oswald', color: '#e6edf3' }}>{plan.name}</div>
                <div className="text-sm" style={{ color: '#e8c547' }}>{plan.subtitle}</div>
              </div>
              {plan.id === currentPlan && (
                <div className="text-xs px-2 py-1 rounded-full" style={{ background: '#e8c54722', color: '#e8c547', border: '1px solid #e8c547' }}>
                  ACTIVE
                </div>
              )}
            </div>
            <p className="text-sm mb-3" style={{ color: '#9ca3af' }}>{plan.description}</p>
            <div className="flex gap-3 text-xs">
              <span className="px-2 py-1 rounded" style={{ background: '#21262d', color: '#6b7280' }}>{plan.daysPerWeek}×/week</span>
              <span className="px-2 py-1 rounded" style={{ background: '#21262d', color: '#6b7280' }}>8 weeks</span>
              <span className="px-2 py-1 rounded" style={{ background: '#21262d', color: '#6b7280' }}>{plan.level}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
