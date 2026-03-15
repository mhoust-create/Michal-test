// Workout plans: Military + Calisthenics, 3x and 4x per week, 8-week progression

// Each workout plan follows progressive overload over 8 weeks
// Week 1-2: Foundation, Week 3-4: Build, Week 5-6: Strength, Week 7-8: Peak

const PLANS = {
  military_3day: {
    id: 'military_3day',
    name: 'Military Fitness',
    subtitle: '3 Days / Week',
    description: 'Based on military physical training standards. Build the endurance and strength tested in armed forces fitness assessments.',
    daysPerWeek: 3,
    focus: 'Military',
    level: 'Beginner–Intermediate',
    weeklyStructure: ['Monday', 'Wednesday', 'Friday'],
    weeks: generateMilitary3Day(),
  },

  calisthenics_4day: {
    id: 'calisthenics_4day',
    name: 'Calisthenics Strength',
    subtitle: '4 Days / Week',
    description: 'Progressive calisthenics and ring training. Build real functional strength and develop elite bodyweight skills.',
    daysPerWeek: 4,
    focus: 'Calisthenics',
    level: 'Intermediate–Advanced',
    weeklyStructure: ['Monday', 'Tuesday', 'Thursday', 'Saturday'],
    weeks: generateCalisthenics4Day(),
  },
};

function generateMilitary3Day() {
  const weeks = [];
  for (let w = 1; w <= 8; w++) {
    const scale = getScale(w); // Progressive overload multiplier
    weeks.push({
      weekNum: w,
      theme: getMilitaryTheme(w),
      days: [
        {
          dayNum: 1,
          name: 'Upper Body Push',
          focus: 'Chest · Shoulders · Triceps',
          warmup: 'jumping_jack:60s, mountain_climber:30s',
          exercises: [
            { exerciseId: 'pushup',         sets: 4, reps: Math.round(15 * scale), rest: 60 },
            { exerciseId: 'diamond_pushup', sets: 3, reps: Math.round(8  * scale), rest: 60 },
            { exerciseId: 'pike_pushup',    sets: 3, reps: Math.round(10 * scale), rest: 60 },
            { exerciseId: 'dip',            sets: 3, reps: Math.round(8  * scale), rest: 90 },
            { exerciseId: 'plank',          sets: 3, duration: Math.round(45 * scale), rest: 30 },
          ]
        },
        {
          dayNum: 2,
          name: 'Pull + Core',
          focus: 'Back · Biceps · Abs',
          warmup: 'jumping_jack:60s, hanging_leg_raise:5 reps',
          exercises: [
            { exerciseId: 'pullup',           sets: 4, reps: Math.round(5  * scale), rest: 90 },
            { exerciseId: 'chinup',           sets: 3, reps: Math.round(6  * scale), rest: 90 },
            { exerciseId: 'ring_row',         sets: 3, reps: Math.round(10 * scale), rest: 60 },
            { exerciseId: 'hanging_leg_raise',sets: 3, reps: Math.round(8  * scale), rest: 60 },
            { exerciseId: 'situp',            sets: 3, reps: Math.round(20 * scale), rest: 45 },
            { exerciseId: 'superman',         sets: 3, reps: Math.round(12 * scale), rest: 45 },
          ]
        },
        {
          dayNum: 3,
          name: 'Legs + Conditioning',
          focus: 'Quads · Glutes · Cardio',
          warmup: 'jumping_jack:60s, squat:10 slow',
          exercises: [
            { exerciseId: 'squat',           sets: 4, reps: Math.round(20 * scale), rest: 60 },
            { exerciseId: 'lunge',           sets: 3, reps: Math.round(10 * scale), rest: 60, note: 'per leg' },
            { exerciseId: 'jump_squat',      sets: 3, reps: Math.round(12 * scale), rest: 60 },
            { exerciseId: 'burpee',          sets: 3, reps: Math.round(8  * scale), rest: 60 },
            { exerciseId: 'mountain_climber',sets: 3, duration: Math.round(30 * scale), rest: 30 },
            { exerciseId: 'hollow_body',     sets: 3, duration: Math.round(30 * scale), rest: 30 },
          ]
        }
      ]
    });
  }
  return weeks;
}

function generateCalisthenics4Day() {
  const weeks = [];
  for (let w = 1; w <= 8; w++) {
    const scale = getScale(w);
    weeks.push({
      weekNum: w,
      theme: getCalisthenicTheme(w),
      days: [
        {
          dayNum: 1,
          name: 'Push Strength',
          focus: 'Chest · Shoulders · Triceps',
          warmup: 'mountain_climber:30s, ring_pushup:5',
          exercises: [
            { exerciseId: 'ring_pushup',    sets: 4, reps: Math.round(10 * scale), rest: 90 },
            { exerciseId: 'dip',            sets: 4, reps: Math.round(8  * scale), rest: 90 },
            { exerciseId: 'pike_pushup',    sets: 3, reps: Math.round(10 * scale), rest: 60 },
            { exerciseId: 'diamond_pushup', sets: 3, reps: Math.round(10 * scale), rest: 60 },
            { exerciseId: 'pushup',         sets: 2, reps: Math.round(20 * scale), rest: 45, note: 'AMRAP — max reps' },
          ]
        },
        {
          dayNum: 2,
          name: 'Pull Strength + Core',
          focus: 'Back · Biceps · Core Skills',
          warmup: 'jumping_jack:60s, ring_row:8',
          exercises: [
            { exerciseId: 'pullup',           sets: 5, reps: Math.round(6  * scale), rest: 120 },
            { exerciseId: 'commando_pullup',  sets: 3, reps: Math.round(5  * scale), rest: 90 },
            { exerciseId: 'ring_row',         sets: 3, reps: Math.round(12 * scale), rest: 60 },
            { exerciseId: 'lsit',             sets: 4, duration: Math.round(15 * scale), rest: 45 },
            { exerciseId: 'hollow_body',      sets: 3, duration: Math.round(30 * scale), rest: 30 },
            { exerciseId: 'hanging_leg_raise',sets: 3, reps: Math.round(8  * scale), rest: 60 },
          ]
        },
        {
          dayNum: 3,
          name: 'Legs + Explosive Power',
          focus: 'Legs · Plyometrics · Conditioning',
          warmup: 'jumping_jack:60s, squat:10',
          exercises: [
            { exerciseId: 'squat',      sets: 4, reps: Math.round(20 * scale), rest: 60 },
            { exerciseId: 'jump_squat', sets: 4, reps: Math.round(15 * scale), rest: 60 },
            { exerciseId: 'lunge',      sets: 3, reps: Math.round(12 * scale), rest: 60, note: 'per leg' },
            { exerciseId: 'pistol_squat',sets: 3, reps: Math.round(3 * scale), rest: 90, note: 'assisted if needed' },
            { exerciseId: 'burpee',     sets: 4, reps: Math.round(10 * scale), rest: 60 },
          ]
        },
        {
          dayNum: 4,
          name: 'Skills + Full Body',
          focus: 'Advanced Skills · Full Body Conditioning',
          warmup: 'mountain_climber:30s, ring_row:8',
          exercises: [
            { exerciseId: 'muscle_up',       sets: 3, reps: Math.round(3  * scale), rest: 120, note: 'or practice drills' },
            { exerciseId: 'ring_pushup',     sets: 3, reps: Math.round(8  * scale), rest: 90 },
            { exerciseId: 'lsit',            sets: 3, duration: Math.round(15 * scale), rest: 45 },
            { exerciseId: 'hanging_leg_raise',sets: 3, reps: Math.round(10 * scale), rest: 60 },
            { exerciseId: 'superman',        sets: 3, reps: Math.round(15 * scale), rest: 45 },
            { exerciseId: 'plank',           sets: 2, duration: Math.round(60 * scale), rest: 30 },
          ]
        },
      ]
    });
  }
  return weeks;
}

function getScale(week) {
  // Progressive overload: start at ~70%, peak at 130%
  const scales = [0.7, 0.8, 0.85, 0.9, 1.0, 1.1, 1.2, 1.3];
  return scales[week - 1] || 1.0;
}

function getMilitaryTheme(week) {
  const themes = [
    'Foundation — Learn the movements',
    'Build Base — Establish the habit',
    'Volume Up — More reps, more sets',
    'Tempo — Slow and controlled',
    'Strength — Push your limits',
    'Endurance — High rep sets',
    'Peak Performance — All out effort',
    'Elite Standard — Military test ready',
  ];
  return themes[week - 1];
}

function getCalisthenicTheme(week) {
  const themes = [
    'Technique — Master the basics',
    'Stability — Build the foundation',
    'Volume — Increase work capacity',
    'Skill Practice — Ring proficiency',
    'Strength Focus — Heavy lifting',
    'Power — Explosive movements',
    'Integration — Combine skills',
    'Peak — Elite calisthenics level',
  ];
  return themes[week - 1];
}

export { PLANS };
export const getPlan = (id) => PLANS[id];
export const getAllPlans = () => Object.values(PLANS);

// Helper: get workout day for today based on user's plan progress
export function getTodayWorkout(planId, currentWeek, currentDay) {
  const plan = PLANS[planId];
  if (!plan) return null;
  const week = plan.weeks.find(w => w.weekNum === currentWeek);
  if (!week) return null;
  const day = week.days.find(d => d.dayNum === currentDay);
  if (!day) return null;
  return { plan, week, day };
}
