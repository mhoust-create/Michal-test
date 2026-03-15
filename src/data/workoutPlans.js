// Workout plans: Military + Calisthenics, 3x and 4x per week, 8-week progression
//
// format: 'straight' — all sets of one exercise, then next (Calisthenics plan)
// format: 'circuit'  — 1 set of each exercise = 1 round, repeat N rounds (Military plan)

const PLANS = {
  military_3day: {
    id: 'military_3day',
    name: 'Military Fitness',
    subtitle: '3 Days / Week',
    description: 'Based on military physical training standards. Circuit-style PT keeps your heart rate high — building strength and conditioning simultaneously.',
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
    description: 'Progressive calisthenics and ring training. Straight sets allow full recovery between sets for maximum strength and skill development.',
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
    const scale = getScale(w);
    const rounds = w <= 2 ? 3 : w <= 5 ? 4 : 5; // more rounds as weeks progress
    weeks.push({
      weekNum: w,
      theme: getMilitaryTheme(w),
      days: [
        {
          dayNum: 1,
          name: 'Push Circuit',
          focus: 'Chest · Shoulders · Triceps · Core',
          format: 'circuit',
          rounds,
          restBetweenExercises: 15,
          restBetweenRounds: 90,
          exercises: [
            { exerciseId: 'pushup',          reps: Math.round(12 * scale), rest: 15 },
            { exerciseId: 'diamond_pushup',  reps: Math.round(8  * scale), rest: 15 },
            { exerciseId: 'pike_pushup',     reps: Math.round(8  * scale), rest: 15 },
            { exerciseId: 'dip',             reps: Math.round(8  * scale), rest: 15 },
            { exerciseId: 'plank',           duration: Math.round(30 * scale), rest: 15 },
          ],
        },
        {
          dayNum: 2,
          name: 'Pull + Core Circuit',
          focus: 'Back · Biceps · Abs',
          format: 'circuit',
          rounds,
          restBetweenExercises: 15,
          restBetweenRounds: 90,
          exercises: [
            { exerciseId: 'pullup',            reps: Math.round(5  * scale), rest: 15 },
            { exerciseId: 'ring_row',          reps: Math.round(10 * scale), rest: 15 },
            { exerciseId: 'hanging_leg_raise', reps: Math.round(8  * scale), rest: 15 },
            { exerciseId: 'situp',             reps: Math.round(15 * scale), rest: 15 },
            { exerciseId: 'superman',          reps: Math.round(12 * scale), rest: 15 },
            { exerciseId: 'hollow_body',       duration: Math.round(25 * scale), rest: 15 },
          ],
        },
        {
          dayNum: 3,
          name: 'Legs + Conditioning Circuit',
          focus: 'Quads · Glutes · Full Body Cardio',
          format: 'circuit',
          rounds,
          restBetweenExercises: 15,
          restBetweenRounds: 90,
          exercises: [
            { exerciseId: 'squat',            reps: Math.round(15 * scale), rest: 15 },
            { exerciseId: 'lunge',            reps: Math.round(10 * scale), rest: 15, note: 'per leg' },
            { exerciseId: 'jump_squat',       reps: Math.round(10 * scale), rest: 15 },
            { exerciseId: 'burpee',           reps: Math.round(8  * scale), rest: 15 },
            { exerciseId: 'mountain_climber', duration: Math.round(30 * scale), rest: 15 },
          ],
        },
      ],
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
          format: 'straight',
          exercises: [
            { exerciseId: 'ring_pushup',    sets: 4, reps: Math.round(10 * scale), rest: 90 },
            { exerciseId: 'dip',            sets: 4, reps: Math.round(8  * scale), rest: 90 },
            { exerciseId: 'pike_pushup',    sets: 3, reps: Math.round(10 * scale), rest: 60 },
            { exerciseId: 'diamond_pushup', sets: 3, reps: Math.round(10 * scale), rest: 60 },
            { exerciseId: 'pushup',         sets: 2, reps: Math.round(20 * scale), rest: 45, note: 'AMRAP — max reps' },
          ],
        },
        {
          dayNum: 2,
          name: 'Pull Strength + Core',
          focus: 'Back · Biceps · Core Skills',
          format: 'straight',
          exercises: [
            { exerciseId: 'pullup',            sets: 5, reps: Math.round(6  * scale), rest: 120 },
            { exerciseId: 'commando_pullup',   sets: 3, reps: Math.round(5  * scale), rest: 90 },
            { exerciseId: 'ring_row',          sets: 3, reps: Math.round(12 * scale), rest: 60 },
            { exerciseId: 'lsit',              sets: 4, duration: Math.round(15 * scale), rest: 45 },
            { exerciseId: 'hollow_body',       sets: 3, duration: Math.round(30 * scale), rest: 30 },
            { exerciseId: 'hanging_leg_raise', sets: 3, reps: Math.round(8  * scale), rest: 60 },
          ],
        },
        {
          dayNum: 3,
          name: 'Legs + Explosive Power',
          focus: 'Legs · Plyometrics · Conditioning',
          format: 'straight',
          exercises: [
            { exerciseId: 'squat',       sets: 4, reps: Math.round(20 * scale), rest: 60 },
            { exerciseId: 'jump_squat',  sets: 4, reps: Math.round(15 * scale), rest: 60 },
            { exerciseId: 'lunge',       sets: 3, reps: Math.round(12 * scale), rest: 60, note: 'per leg' },
            { exerciseId: 'pistol_squat',sets: 3, reps: Math.round(3  * scale), rest: 90, note: 'assisted if needed' },
            { exerciseId: 'burpee',      sets: 4, reps: Math.round(10 * scale), rest: 60 },
          ],
        },
        {
          dayNum: 4,
          name: 'Skills + Full Body',
          focus: 'Advanced Skills · Full Body Conditioning',
          format: 'straight',
          exercises: [
            { exerciseId: 'muscle_up',        sets: 3, reps: Math.round(3  * scale), rest: 120, note: 'or practice drills' },
            { exerciseId: 'ring_pushup',      sets: 3, reps: Math.round(8  * scale), rest: 90 },
            { exerciseId: 'lsit',             sets: 3, duration: Math.round(15 * scale), rest: 45 },
            { exerciseId: 'hanging_leg_raise',sets: 3, reps: Math.round(10 * scale), rest: 60 },
            { exerciseId: 'superman',         sets: 3, reps: Math.round(15 * scale), rest: 45 },
            { exerciseId: 'plank',            sets: 2, duration: Math.round(60 * scale), rest: 30 },
          ],
        },
      ],
    });
  }
  return weeks;
}

function getScale(week) {
  const scales = [0.7, 0.8, 0.85, 0.9, 1.0, 1.1, 1.2, 1.3];
  return scales[week - 1] || 1.0;
}

function getMilitaryTheme(week) {
  const themes = [
    'Foundation — 3 rounds, learn the circuit',
    'Build Base — 3 rounds, nail the form',
    'Volume Up — 4 rounds, push the pace',
    'Tempo — 4 rounds, controlled and strong',
    'Strength — 4 rounds, increase reps',
    'Endurance — 5 rounds, keep moving',
    'Peak Performance — 5 rounds, all out',
    'Elite Standard — 5 rounds, military ready',
  ];
  return themes[week - 1];
}

function getCalisthenicTheme(week) {
  const themes = [
    'Technique — Master the basics',
    'Stability — Build the foundation',
    'Volume — Increase work capacity',
    'Skill Practice — Ring proficiency',
    'Strength Focus — Heavy sets',
    'Power — Explosive movements',
    'Integration — Combine skills',
    'Peak — Elite calisthenics level',
  ];
  return themes[week - 1];
}

export { PLANS };
export const getPlan = (id) => PLANS[id];
export const getAllPlans = () => Object.values(PLANS);

export function getTodayWorkout(planId, currentWeek, currentDay) {
  const plan = PLANS[planId];
  if (!plan) return null;
  const week = plan.weeks.find(w => w.weekNum === currentWeek);
  if (!week) return null;
  const day = week.days.find(d => d.dayNum === currentDay);
  if (!day) return null;
  return { plan, week, day };
}
