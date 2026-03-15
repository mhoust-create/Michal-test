import { getExerciseById } from '../data/exercises';

export function ProgressTracker({ workoutLog, currentStreak, totalWorkouts }) {
  const last30 = getLast30Days(workoutLog);
  const stats = computeStats(workoutLog);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3" style={{ background: '#0d1117', borderBottom: '1px solid #21262d' }}>
        <h1 className="text-xl font-bold" style={{ fontFamily: 'Oswald', color: '#e8c547' }}>PROGRESS</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-4">
        {/* Streak + overview */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard
            value={currentStreak}
            label="Day Streak"
            color="#f97316"
            icon="🔥"
          />
          <StatCard
            value={totalWorkouts}
            label="Workouts"
            color="#39d353"
            icon="💪"
          />
          <StatCard
            value={stats.totalMinutes}
            label="Minutes"
            color="#3b82f6"
            icon="⏱"
          />
        </div>

        {/* Activity calendar */}
        <div className="rounded-xl p-4" style={{ background: '#161b22', border: '1px solid #21262d' }}>
          <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#6b7280' }}>
            Last 30 Days
          </div>
          <ActivityCalendar days={last30} />
        </div>

        {/* Recent workouts */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#6b7280' }}>Recent Workouts</div>
          {workoutLog.length === 0 ? (
            <div className="rounded-xl p-6 text-center" style={{ background: '#161b22', border: '1px solid #21262d' }}>
              <div className="text-3xl mb-2">🏋️</div>
              <div className="text-sm" style={{ color: '#6b7280' }}>No workouts logged yet.</div>
              <div className="text-xs mt-1" style={{ color: '#6b7280' }}>Complete your first workout to see data here!</div>
            </div>
          ) : (
            <div className="space-y-2">
              {[...workoutLog].reverse().slice(0, 10).map((log, i) => (
                <WorkoutLogCard key={i} log={log} />
              ))}
            </div>
          )}
        </div>

        {/* Exercise stats */}
        {stats.exerciseCounts.length > 0 && (
          <div>
            <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#6b7280' }}>
              Most Trained
            </div>
            <div className="rounded-xl p-4 space-y-3" style={{ background: '#161b22', border: '1px solid #21262d' }}>
              {stats.exerciseCounts.slice(0, 5).map(({ id, count }, i) => {
                const ex = getExerciseById(id);
                if (!ex) return null;
                const maxCount = stats.exerciseCounts[0]?.count || 1;
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span style={{ color: '#9ca3af' }}>{ex.name}</span>
                      <span style={{ color: '#6b7280' }}>{count} sets</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: '#21262d' }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(count / maxCount) * 100}%`, background: '#e8c547', transition: 'width 0.5s ease' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Personal bests */}
        {stats.personalBests.length > 0 && (
          <div>
            <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#6b7280' }}>
              Personal Bests
            </div>
            <div className="space-y-2">
              {stats.personalBests.map(({ id, best, type }, i) => {
                const ex = getExerciseById(id);
                if (!ex) return null;
                return (
                  <div key={i} className="flex items-center gap-3 rounded-xl p-3"
                    style={{ background: '#161b22', border: '1px solid #21262d' }}>
                    <div className="text-2xl">🏆</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium" style={{ fontFamily: 'Oswald', color: '#e6edf3' }}>{ex.name}</div>
                      <div className="text-xs" style={{ color: '#6b7280' }}>Best: {best} {type === 'timed' ? 'seconds' : 'reps'}</div>
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

function StatCard({ value, label, color, icon }) {
  return (
    <div className="rounded-xl p-3 text-center" style={{ background: '#161b22', border: '1px solid #21262d' }}>
      <div className="text-lg mb-0.5">{icon}</div>
      <div className="text-2xl font-bold" style={{ fontFamily: 'Oswald', color }}>{value}</div>
      <div className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{label}</div>
    </div>
  );
}

function ActivityCalendar({ days }) {
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
        <div key={i} className="text-center text-xs mb-1" style={{ color: '#6b7280' }}>{d}</div>
      ))}
      {days.map((day, i) => (
        <div
          key={i}
          className="rounded aspect-square"
          title={day.date}
          style={{
            background: day.hasWorkout ? (day.isToday ? '#e8c547' : '#39d353') : '#21262d',
            opacity: day.hasWorkout ? 1 : 0.4,
          }}
        />
      ))}
    </div>
  );
}

function WorkoutLogCard({ log }) {
  const date = new Date(log.date);
  const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="flex items-center gap-3 rounded-xl p-3" style={{ background: '#161b22', border: '1px solid #21262d' }}>
      <div className="text-center rounded-lg p-2 flex-shrink-0" style={{ background: '#21262d', minWidth: 50 }}>
        <div className="text-sm font-bold" style={{ fontFamily: 'Oswald', color: '#e8c547' }}>
          {date.toLocaleDateString('en-US', { day: 'numeric' })}
        </div>
        <div className="text-xs" style={{ color: '#6b7280' }}>
          {date.toLocaleDateString('en-US', { month: 'short' })}
        </div>
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium" style={{ fontFamily: 'Oswald', color: '#e6edf3' }}>
          {log.workoutName || 'Workout'}
        </div>
        <div className="text-xs mt-0.5" style={{ color: '#6b7280' }}>
          {log.exercises?.length || 0} exercises · {log.duration || 0}m
        </div>
      </div>
      <div className="text-green-400 text-sm">✓</div>
    </div>
  );
}

// ═══ Helpers ═══

function getLast30Days(workoutLog) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = [];

  // Pad to start on Monday
  const dayOfWeek = today.getDay(); // 0=Sun
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 29 - daysFromMonday);

  const logDates = new Set(
    workoutLog.map(log => new Date(log.date).toDateString())
  );

  for (let i = 0; i < 35; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    if (d > today) break;
    days.push({
      date: d.toDateString(),
      hasWorkout: logDates.has(d.toDateString()),
      isToday: d.toDateString() === today.toDateString(),
    });
  }

  return days;
}

function computeStats(workoutLog) {
  const totalMinutes = workoutLog.reduce((acc, l) => acc + (l.duration || 0), 0);

  // Exercise counts
  const counts = {};
  const bests = {};
  workoutLog.forEach(log => {
    (log.exercises || []).forEach(ex => {
      counts[ex.exerciseId] = (counts[ex.exerciseId] || 0) + (ex.sets?.length || 0);
      (ex.sets || []).forEach(set => {
        const val = set.reps || set.duration || 0;
        if (!bests[ex.exerciseId] || val > bests[ex.exerciseId].best) {
          bests[ex.exerciseId] = { best: val, type: set.duration ? 'timed' : 'reps' };
        }
      });
    });
  });

  const exerciseCounts = Object.entries(counts)
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count);

  const personalBests = Object.entries(bests)
    .map(([id, data]) => ({ id, ...data }));

  return { totalMinutes, exerciseCounts, personalBests };
}
