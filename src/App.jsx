import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TodayWorkout } from './components/TodayWorkout';
import { WeeklyPlan } from './components/WeeklyPlan';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { ProgressTracker } from './components/ProgressTracker';
import { WorkoutSession } from './components/WorkoutSession';
import { getPlan } from './data/workoutPlans';

// Default user state
const DEFAULT_STATE = {
  planId: 'military_3day',
  currentWeek: 1,
  currentDay: 1,
};

function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [userState, setUserState] = useLocalStorage('warfit_user', DEFAULT_STATE);
  const [workoutLog, setWorkoutLog] = useLocalStorage('warfit_log', []);
  const [activeSession, setActiveSession] = useState(null); // { workout, week }

  const { planId, currentWeek, currentDay } = userState;
  const plan = getPlan(planId);

  // Compute streak from log
  const streak = computeStreak(workoutLog);

  const handleStartWorkout = (workout, week) => {
    setActiveSession({ workout, week });
  };

  const handleSessionComplete = (result) => {
    const planData = getPlan(planId);

    // Log the workout
    const logEntry = {
      date: new Date().toISOString(),
      planId,
      week: activeSession.week,
      day: currentDay,
      workoutName: activeSession.workout.name,
      exercises: result.exercises,
      duration: result.duration,
    };
    setWorkoutLog(prev => [...prev, logEntry]);

    // Advance to next day
    const planDays = planData?.weeks[0]?.days.length || 3;
    let newDay = currentDay + 1;
    let newWeek = currentWeek;
    if (newDay > planDays) {
      newDay = 1;
      newWeek = Math.min(currentWeek + 1, 8);
    }
    setUserState(prev => ({ ...prev, currentDay: newDay, currentWeek: newWeek }));

    setActiveSession(null);
    setActiveTab('today');
  };

  const handleSelectDay = (day, week) => {
    setActiveSession({ workout: day, week });
  };

  const handleChangePlan = (newPlanId) => {
    setUserState({ planId: newPlanId, currentWeek: 1, currentDay: 1 });
  };

  // Full-screen workout session
  if (activeSession) {
    return (
      <div className="flex flex-col h-screen" style={{ background: '#0d1117' }}>
        <WorkoutSession
          workout={activeSession.workout}
          planName={plan?.name || ''}
          week={activeSession.week}
          onComplete={handleSessionComplete}
          onExit={() => setActiveSession(null)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen" style={{ background: '#0d1117' }}>
      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'today' && (
          <div className="h-full overflow-y-auto">
            <TodayWorkout
              userPlan={planId}
              currentWeek={currentWeek}
              currentDay={currentDay}
              workoutLog={workoutLog}
              streak={streak}
              onStartWorkout={handleStartWorkout}
            />
          </div>
        )}
        {activeTab === 'plan' && (
          <div className="h-full overflow-y-auto">
            <WeeklyPlan
              userPlan={planId}
              currentWeek={currentWeek}
              currentDay={currentDay}
              onSelectDay={handleSelectDay}
              onChangePlan={handleChangePlan}
            />
          </div>
        )}
        {activeTab === 'exercises' && (
          <div className="h-full overflow-y-auto">
            <ExerciseLibrary />
          </div>
        )}
        {activeTab === 'progress' && (
          <div className="h-full overflow-y-auto">
            <ProgressTracker
              workoutLog={workoutLog}
              currentStreak={streak}
              totalWorkouts={workoutLog.length}
            />
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav
        className="flex items-center justify-around py-2 px-2"
        style={{
          background: '#161b22',
          borderTop: '1px solid #21262d',
          paddingBottom: 'max(8px, env(safe-area-inset-bottom, 8px))',
        }}
      >
        {NAV_ITEMS.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all"
            style={{
              background: activeTab === id ? '#21262d' : 'transparent',
              color: activeTab === id ? '#e8c547' : '#6b7280',
              minWidth: 60,
            }}
          >
            <span className="text-xl">{icon}</span>
            <span
              className="font-medium uppercase tracking-wider"
              style={{ fontSize: '0.6rem', color: activeTab === id ? '#e8c547' : '#6b7280' }}
            >
              {label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}

const NAV_ITEMS = [
  { id: 'today', label: 'Today', icon: '⚡' },
  { id: 'plan', label: 'Plan', icon: '📅' },
  { id: 'exercises', label: 'Exercises', icon: '💪' },
  { id: 'progress', label: 'Progress', icon: '📊' },
];

function computeStreak(workoutLog) {
  if (!workoutLog.length) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sorted = [...workoutLog].sort((a, b) => new Date(b.date) - new Date(a.date));
  const latestDate = new Date(sorted[0].date);
  latestDate.setHours(0, 0, 0, 0);
  const diffDays = (today - latestDate) / (1000 * 60 * 60 * 24);
  if (diffDays > 1) return 0;

  const doneOnDate = new Set(workoutLog.map(l => {
    const d = new Date(l.date);
    d.setHours(0, 0, 0, 0);
    return d.toDateString();
  }));

  let streak = 0;
  let checkDate = new Date(latestDate);
  while (doneOnDate.has(checkDate.toDateString())) {
    streak++;
    checkDate.setDate(checkDate.getDate() - 1);
  }
  return streak;
}

export default App;
