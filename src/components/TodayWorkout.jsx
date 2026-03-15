import { getPlan, getTodayWorkout } from '../data/workoutPlans';
import { getExerciseById, CATEGORIES } from '../data/exercises';
import { ExerciseSVG } from './ExerciseSVG';

export function TodayWorkout({ userPlan, currentWeek, currentDay, workoutLog, streak, onStartWorkout }) {
  const plan = getPlan(userPlan);
  const data = getTodayWorkout(userPlan, currentWeek, currentDay);
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  // Check if today's workout was already completed
  const todayStr = today.toDateString();
  const alreadyDone = workoutLog.some(l => new Date(l.date).toDateString() === todayStr);

  const nextWorkout = data?.day;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-6 pb-4" style={{ background: '#0d1117' }}>
        {/* App name */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Oswald', color: '#e8c547', letterSpacing: '0.1em' }}>
              WARFIT
            </h1>
            <div className="text-xs tracking-widest uppercase" style={{ color: '#6b7280' }}>
              Military · Calisthenics
            </div>
          </div>
          {streak > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: '#161b22', border: '1px solid #21262d' }}>
              <span className="flame text-lg">🔥</span>
              <span className="font-bold" style={{ fontFamily: 'Oswald', color: '#f97316' }}>{streak}</span>
              <span className="text-xs" style={{ color: '#6b7280' }}>day streak</span>
            </div>
          )}
        </div>

        {/* Date */}
        <div className="text-sm" style={{ color: '#6b7280' }}>{dateStr}</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-4">
        {/* Today's workout card */}
        {nextWorkout ? (
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: alreadyDone ? '#161b22' : 'linear-gradient(135deg, #1a2e1a 0%, #0d1117 100%)',
              border: `1px solid ${alreadyDone ? '#21262d' : '#39d353'}`,
              boxShadow: alreadyDone ? 'none' : '0 0 30px rgba(57,211,83,0.1)',
            }}
          >
            {/* Status banner */}
            <div
              className="px-4 py-2 flex items-center gap-2"
              style={{ background: alreadyDone ? '#21262d' : '#39d35322' }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: alreadyDone ? '#39d353' : '#f97316' }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: alreadyDone ? '#39d353' : '#f97316' }}>
                {alreadyDone ? 'COMPLETED TODAY' : "TODAY'S MISSION"}
              </span>
            </div>

            <div className="p-4">
              {/* Plan info */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider" style={{ color: '#6b7280' }}>
                  {plan?.name} · Week {currentWeek}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Oswald', color: '#e6edf3' }}>
                Day {currentDay}: {nextWorkout.name}
              </h2>
              <div className="text-sm mb-4" style={{ color: '#9ca3af' }}>{nextWorkout.focus}</div>

              {/* Exercise preview grid */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {nextWorkout.exercises.slice(0, 3).map((ex, i) => {
                  const exercise = getExerciseById(ex.exerciseId);
                  if (!exercise) return null;
                  const cat = CATEGORIES[exercise.category];
                  return (
                    <div key={i} className="rounded-xl overflow-hidden" style={{ background: '#0d111788' }}>
                      <div style={{ height: 70 }}>
                        <ExerciseSVG exerciseId={exercise.id} />
                      </div>
                      <div className="p-1.5">
                        <div className="text-xs font-bold truncate" style={{ fontFamily: 'Oswald', color: '#e6edf3', fontSize: '0.65rem' }}>
                          {exercise.name}
                        </div>
                        <div className="text-xs" style={{ color: cat?.color || '#6b7280', fontSize: '0.6rem' }}>
                          {ex.sets}×{exercise.type === 'timed' ? `${ex.duration}s` : ex.reps}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stats row */}
              <div className="flex gap-4 mb-4">
                <div>
                  <div className="text-lg font-bold" style={{ fontFamily: 'Oswald', color: '#e8c547' }}>
                    {nextWorkout.exercises.length}
                  </div>
                  <div className="text-xs" style={{ color: '#6b7280' }}>exercises</div>
                </div>
                <div>
                  <div className="text-lg font-bold" style={{ fontFamily: 'Oswald', color: '#e8c547' }}>
                    {nextWorkout.exercises.reduce((a, e) => a + e.sets, 0)}
                  </div>
                  <div className="text-xs" style={{ color: '#6b7280' }}>total sets</div>
                </div>
                <div>
                  <div className="text-lg font-bold" style={{ fontFamily: 'Oswald', color: '#e8c547' }}>
                    ~{Math.round(nextWorkout.exercises.length * 4)}m
                  </div>
                  <div className="text-xs" style={{ color: '#6b7280' }}>est. time</div>
                </div>
              </div>

              {/* Start button */}
              <button
                onClick={() => onStartWorkout(nextWorkout, currentWeek)}
                className="w-full py-4 rounded-xl text-lg font-bold uppercase tracking-wider transition-all active:scale-95"
                style={{
                  background: alreadyDone ? '#21262d' : '#e8c547',
                  color: alreadyDone ? '#9ca3af' : '#0d1117',
                  fontFamily: 'Oswald',
                }}
              >
                {alreadyDone ? '↺ TRAIN AGAIN' : '⚡ START WORKOUT'}
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl p-6 text-center" style={{ background: '#161b22', border: '1px solid #21262d' }}>
            <div className="text-4xl mb-3">🌿</div>
            <h2 className="text-xl font-bold mb-2" style={{ fontFamily: 'Oswald', color: '#e6edf3' }}>Rest Day</h2>
            <p className="text-sm" style={{ color: '#6b7280' }}>
              Active recovery: go for a walk, stretch, or work on mobility.
              Your muscles grow during rest.
            </p>
          </div>
        )}

        {/* Week progress */}
        {plan && (
          <div className="rounded-xl p-4" style={{ background: '#161b22', border: '1px solid #21262d' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold uppercase tracking-wider" style={{ color: '#6b7280' }}>This Week</div>
              <div className="text-xs" style={{ color: '#e8c547' }}>Week {currentWeek}/8</div>
            </div>
            <WeekDots
              totalDays={plan.daysPerWeek}
              currentDay={currentDay}
              weeklyStructure={plan.weeklyStructure}
              workoutLog={workoutLog}
            />
          </div>
        )}

        {/* Motivational quote */}
        <MotivationalBlock streak={streak} totalWorkouts={workoutLog.length} />

        {/* Next 3 exercises quick look */}
        {nextWorkout && (
          <div>
            <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#6b7280' }}>
              All Exercises Today
            </div>
            <div className="space-y-2">
              {nextWorkout.exercises.map((ex, i) => {
                const exercise = getExerciseById(ex.exerciseId);
                if (!exercise) return null;
                const cat = CATEGORIES[exercise.category];
                return (
                  <div key={i} className="flex items-center gap-3 rounded-xl p-3" style={{ background: '#161b22', border: '1px solid #21262d' }}>
                    <div className="w-8 text-sm font-bold text-center" style={{ fontFamily: 'Oswald', color: '#21262d' }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-shrink-0 rounded-lg overflow-hidden" style={{ width: 44, height: 44, background: '#0d1117' }}>
                      <ExerciseSVG exerciseId={exercise.id} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium" style={{ fontFamily: 'Oswald', color: '#e6edf3' }}>{exercise.name}</div>
                      <div className="text-xs" style={{ color: cat?.color || '#6b7280' }}>
                        {ex.sets} sets × {exercise.type === 'timed' ? `${ex.duration}s` : `${ex.reps} reps`}
                        {ex.note && ` (${ex.note})`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function WeekDots({ totalDays, currentDay, weeklyStructure, workoutLog }) {
  const weekStart = getWeekStart();
  const logDates = new Set(workoutLog.map(l => new Date(l.date).toDateString()));

  return (
    <div className="flex gap-2">
      {weeklyStructure.map((dayName, i) => {
        const dayNum = i + 1;
        const isDone = dayNum < currentDay; // simplification
        const isCurrent = dayNum === currentDay;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full h-2 rounded-full"
              style={{
                background: isDone ? '#39d353' : isCurrent ? '#e8c547' : '#21262d',
              }}
            />
            <div className="text-xs" style={{ color: isCurrent ? '#e8c547' : '#6b7280', fontSize: '0.6rem' }}>
              {dayName.slice(0, 3).toUpperCase()}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getWeekStart() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

const QUOTES = [
  { text: "Pain is temporary. Pride is forever.", author: "Military Proverb" },
  { text: "No man has the right to be an amateur in the matter of physical training.", author: "Socrates" },
  { text: "Discipline equals freedom.", author: "Jocko Willink" },
  { text: "The more you sweat in training, the less you bleed in battle.", author: "Military Proverb" },
  { text: "Do not pray for easy lives. Pray to be stronger men.", author: "JFK" },
  { text: "Strength does not come from physical capacity. It comes from an indomitable will.", author: "Mahatma Gandhi" },
  { text: "A champion is someone who gets up when they can't.", author: "Jack Dempsey" },
];

function MotivationalBlock({ streak, totalWorkouts }) {
  const quote = QUOTES[(totalWorkouts + streak) % QUOTES.length];
  return (
    <div className="rounded-xl p-4" style={{ background: '#0d1a0d', border: '1px solid #1a3a1a' }}>
      <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#39d353' }}>
        ⚡ Daily Motivation
      </div>
      <p className="text-sm italic mb-1" style={{ color: '#9ca3af' }}>"{quote.text}"</p>
      <p className="text-xs" style={{ color: '#6b7280' }}>— {quote.author}</p>
    </div>
  );
}
