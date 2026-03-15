// Exercise database with descriptions, SVG keys, and training data

export const EXERCISES = {
  // ═══════════════════════════════════════════
  // PUSH EXERCISES
  // ═══════════════════════════════════════════
  pushup: {
    id: 'pushup',
    name: 'Push-Up',
    category: 'push',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    type: 'reps',
    defaultSets: 3,
    defaultReps: 15,
    defaultRest: 60,
    description: 'The foundational upper body push exercise used in every military fitness test worldwide.',
    formTips: [
      'Keep body in a straight plank — no sagging hips',
      'Lower chest to 1 inch from ground',
      'Elbows at 45° angle from body',
      'Full lockout at the top',
      'Look slightly forward, not down'
    ],
    beginner: 'Do knee push-ups until you can do 10 full ones',
    advanced: 'Elevate feet or add a weighted vest',
    svgKey: 'pushup'
  },

  diamond_pushup: {
    id: 'diamond_pushup',
    name: 'Diamond Push-Up',
    category: 'push',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    muscles: ['Triceps', 'Inner Chest', 'Shoulders'],
    type: 'reps',
    defaultSets: 3,
    defaultReps: 10,
    defaultRest: 60,
    description: 'Hands forming a diamond shape under your chest. Brutal tricep isolation — a military staple for arm strength.',
    formTips: [
      'Index fingers and thumbs form a diamond/triangle',
      'Keep elbows tucked close to body',
      'Lower chest to your hands',
      'Full body plank — no hip drop',
      'Squeeze triceps at lockout'
    ],
    beginner: 'Start with standard push-ups to build base strength',
    advanced: 'Add a clap between reps for explosive power',
    svgKey: 'diamond_pushup'
  },

  pike_pushup: {
    id: 'pike_pushup',
    name: 'Pike Push-Up',
    category: 'push',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    muscles: ['Shoulders', 'Upper Chest', 'Triceps'],
    type: 'reps',
    defaultSets: 3,
    defaultReps: 10,
    defaultRest: 60,
    description: 'Hips high, targeting shoulders. The stepping stone to handstand push-ups used in advanced military fitness programs.',
    formTips: [
      'Form an inverted V with your body',
      'Hands shoulder-width apart',
      'Lower the top of head toward floor',
      'Keep hips high throughout',
      'Push straight up, not forward'
    ],
    beginner: 'Place hands on elevated surface to reduce angle',
    advanced: 'Elevate feet on a chair for full handstand angle',
    svgKey: 'pike_pushup'
  },

  dip: {
    id: 'dip',
    name: 'Bar / Ring Dip',
    category: 'push',
    equipment: 'bar',
    difficulty: 'intermediate',
    muscles: ['Chest', 'Triceps', 'Shoulders'],
    type: 'reps',
    defaultSets: 3,
    defaultReps: 10,
    defaultRest: 90,
    description: 'Upper body squat. The dip is essential for chest and tricep mass — a core calisthenics movement.',
    formTips: [
      'Lock out arms fully at top',
      'Lower until upper arms parallel to ground',
      'Lean forward slightly for chest focus',
      'Stay upright for tricep focus',
      'Control the descent — 2 seconds down'
    ],
    beginner: 'Use a resistance band for assistance',
    advanced: 'Add weight using a dip belt or backpack',
    svgKey: 'dip'
  },

  ring_pushup: {
    id: 'ring_pushup',
    name: 'Ring Push-Up',
    category: 'push',
    equipment: 'rings',
    difficulty: 'intermediate',
    muscles: ['Chest', 'Shoulders', 'Triceps', 'Stabilizers'],
    type: 'reps',
    defaultSets: 3,
    defaultReps: 10,
    defaultRest: 60,
    description: 'Push-ups on gymnastic rings. The instability activates deep stabilizer muscles for superior strength gains.',
    formTips: [
      'Set rings low to the ground',
      'Turn rings out at the top (false grip)',
      'Control the wobble — brace core hard',
      'Go slow on the descent',
      'Rings should be at chest height at bottom'
    ],
    beginner: 'Raise rings higher to reduce difficulty',
    advanced: 'Lower rings and add weighted vest',
    svgKey: 'ring_pushup'
  },

  // ═══════════════════════════════════════════
  // PULL EXERCISES
  // ═══════════════════════════════════════════
  pullup: {
    id: 'pullup',
    name: 'Pull-Up',
    category: 'pull',
    equipment: 'bar',
    difficulty: 'intermediate',
    muscles: ['Lats', 'Biceps', 'Upper Back', 'Rear Delts'],
    type: 'reps',
    defaultSets: 4,
    defaultReps: 8,
    defaultRest: 90,
    description: 'The king of upper body pulling. The overhand pull-up is the definitive military fitness test exercise worldwide.',
    formTips: [
      'Dead hang start — full arm extension',
      'Pull until chin clears the bar',
      'Elbows drive DOWN and BACK',
      'Engage lats before you pull',
      'Control the descent — 2 seconds down'
    ],
    beginner: 'Use resistance bands or do jumping pull-ups (jump to top, lower slowly)',
    advanced: 'Add weight plate in a backpack or dip belt',
    svgKey: 'pullup'
  },

  chinup: {
    id: 'chinup',
    name: 'Chin-Up',
    category: 'pull',
    equipment: 'bar',
    difficulty: 'intermediate',
    muscles: ['Biceps', 'Lats', 'Lower Lats'],
    type: 'reps',
    defaultSets: 3,
    defaultReps: 8,
    defaultRest: 90,
    description: 'Underhand grip targets biceps more. Easier than pull-ups — great for building pulling strength.',
    formTips: [
      'Underhand (supinated) grip, shoulder-width',
      'Full dead hang at the start',
      'Pull until chin above bar',
      'Squeeze biceps and lats at top',
      'Lower with control'
    ],
    beginner: 'Use band assistance or start with negatives only',
    advanced: 'Add weight or increase sets',
    svgKey: 'chinup'
  },

  ring_row: {
    id: 'ring_row',
    name: 'Ring Row',
    category: 'pull',
    equipment: 'rings',
    difficulty: 'beginner',
    muscles: ['Upper Back', 'Rear Delts', 'Biceps', 'Core'],
    type: 'reps',
    defaultSets: 3,
    defaultReps: 12,
    defaultRest: 60,
    description: 'Horizontal pull on rings. Perfect for beginners building pull-up strength, and for advanced athletes with full body below-horizontal.',
    formTips: [
      'Set rings at waist height',
      'Body straight — heels on floor',
      'Pull rings to chest/nipple line',
      'Squeeze shoulder blades together at top',
      'The lower your body, the harder it gets'
    ],
    beginner: 'Stand more upright (higher angle)',
    advanced: 'Lower body to near-horizontal, add weight vest',
    svgKey: 'ring_row'
  },

  muscle_up: {
    id: 'muscle_up',
    name: 'Muscle-Up',
    category: 'pull',
    equipment: 'bar',
    difficulty: 'advanced',
    muscles: ['Lats', 'Chest', 'Triceps', 'Biceps', 'Core'],
    type: 'reps',
    defaultSets: 3,
    defaultReps: 5,
    defaultRest: 120,
    description: 'The holy grail of calisthenics. A pull-up that transitions into a dip — requires explosive power and technique.',
    formTips: [
      'Master pull-ups and dips first (15+ each)',
      'Use a false grip on bar',
      'Explosive pull — get hips to bar',
      'Transition fast at the top',
      'Keep core tight throughout'
    ],
    beginner: 'Practice jumping muscle-ups and slow negatives',
    advanced: 'Ring muscle-ups are significantly harder',
    svgKey: 'muscle_up'
  },

  commando_pullup: {
    id: 'commando_pullup',
    name: 'Commando Pull-Up',
    category: 'pull',
    equipment: 'bar',
    difficulty: 'advanced',
    muscles: ['Lats', 'Biceps', 'Core', 'Obliques'],
    type: 'reps',
    defaultSets: 3,
    defaultReps: 6,
    defaultRest: 90,
    description: 'Parallel grip, pulling to alternating sides of the bar. A Special Forces staple for rotational pulling strength.',
    formTips: [
      'Grip bar from side — both hands parallel',
      'Alternate: pull left ear, then right ear, to bar',
      'Keep core engaged — avoid swinging',
      'Full dead hang between reps',
      'Control the negative on both sides'
    ],
    beginner: 'Master regular pull-ups first',
    advanced: 'Add weight or slow the tempo',
    svgKey: 'commando_pullup'
  },

  // ═══════════════════════════════════════════
  // CORE EXERCISES
  // ═══════════════════════════════════════════
  plank: {
    id: 'plank',
    name: 'Plank',
    category: 'core',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Core', 'Shoulders', 'Glutes', 'Transverse Abdominis'],
    type: 'timed',
    defaultSets: 3,
    defaultDuration: 60,
    defaultRest: 30,
    description: 'The foundation of all core training. Military fitness tests require planks held for 2+ minutes. Everything in calisthenics starts here.',
    formTips: [
      'Forearms on ground, elbows under shoulders',
      'Body in a perfectly straight line',
      'Squeeze glutes and abs simultaneously',
      'No hip pike or sagging',
      'Breathe slowly through the nose'
    ],
    beginner: 'Start with 20-second holds',
    advanced: 'Progress to RKC plank (maximum tension), then single-leg plank',
    svgKey: 'plank'
  },

  lsit: {
    id: 'lsit',
    name: 'L-Sit',
    category: 'core',
    equipment: 'bar',
    difficulty: 'advanced',
    muscles: ['Hip Flexors', 'Core', 'Triceps', 'Shoulders'],
    type: 'timed',
    defaultSets: 4,
    defaultDuration: 20,
    defaultRest: 45,
    description: 'Legs held parallel to ground while supporting bodyweight on arms. One of the most demanding core exercises in gymnastics.',
    formTips: [
      'Lock elbows fully straight',
      'Press shoulders DOWN away from ears',
      'Legs locked straight — toes pointed',
      'Hold legs at hip height or above',
      'Build from tuck L-sit first'
    ],
    beginner: 'Tuck L-sit: knees to chest instead of straight legs',
    advanced: 'V-sit: legs angled above parallel',
    svgKey: 'lsit'
  },

  hollow_body: {
    id: 'hollow_body',
    name: 'Hollow Body Hold',
    category: 'core',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    muscles: ['Core', 'Hip Flexors', 'Lower Abs'],
    type: 'timed',
    defaultSets: 3,
    defaultDuration: 40,
    defaultRest: 30,
    description: 'The foundation position of gymnastics. Teaches total body tension that carries over to every bar movement.',
    formTips: [
      'Lie on back, press lower back to floor',
      'Arms overhead, legs straight',
      'Lift shoulders and legs off the ground',
      'Hold the "banana" shape',
      'Lower body tension should be maximum'
    ],
    beginner: 'Tuck version: knees pulled to chest',
    advanced: 'Rock back and forth (hollow body rocks)',
    svgKey: 'hollow_body'
  },

  hanging_leg_raise: {
    id: 'hanging_leg_raise',
    name: 'Hanging Leg Raise',
    category: 'core',
    equipment: 'bar',
    difficulty: 'intermediate',
    muscles: ['Lower Abs', 'Hip Flexors', 'Core'],
    type: 'reps',
    defaultSets: 3,
    defaultReps: 10,
    defaultRest: 60,
    description: 'Hanging from the bar, raise legs to 90°. Brutal lower ab work combined with grip training — a calisthenics essential.',
    formTips: [
      'Dead hang start — no swinging',
      'Raise straight legs to hip height',
      'Curl hips under at the top for full ab contraction',
      'Lower slowly — 3 seconds down',
      'Do not swing — use core, not momentum'
    ],
    beginner: 'Hanging knee raises with bent knees',
    advanced: 'Toes-to-bar: raise feet all the way to the bar',
    svgKey: 'hanging_leg_raise'
  },

  situp: {
    id: 'situp',
    name: 'Military Sit-Up',
    category: 'core',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Abs', 'Hip Flexors'],
    type: 'reps',
    defaultSets: 3,
    defaultReps: 20,
    defaultRest: 45,
    description: 'Standard military sit-up tested in fitness assessments worldwide. Feet can be anchored.',
    formTips: [
      'Hands behind head or crossed on chest',
      'Feet flat on floor, knees bent',
      'Come up until elbows touch knees',
      'Lower fully — shoulder blades touch ground',
      'Breathe out on the way up'
    ],
    beginner: 'Start with crunches (half range)',
    advanced: 'Hold a weight plate on chest',
    svgKey: 'situp'
  },

  mountain_climber: {
    id: 'mountain_climber',
    name: 'Mountain Climber',
    category: 'core',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Core', 'Hip Flexors', 'Shoulders', 'Cardio'],
    type: 'timed',
    defaultSets: 3,
    defaultDuration: 30,
    defaultRest: 30,
    description: 'Dynamic full-body core exercise. High reps build both strength and cardio endurance — key in military conditioning circuits.',
    formTips: [
      'Start in push-up plank position',
      'Drive knees alternately to chest',
      'Keep hips DOWN — not piked up',
      'Fast tempo for cardio, slow for core strength',
      'Keep core braced throughout'
    ],
    beginner: 'Slow pace, focused form',
    advanced: 'Maximum speed or cross-body (knee to opposite elbow)',
    svgKey: 'mountain_climber'
  },

  // ═══════════════════════════════════════════
  // LEGS EXERCISES
  // ═══════════════════════════════════════════
  squat: {
    id: 'squat',
    name: 'Bodyweight Squat',
    category: 'legs',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Quads', 'Glutes', 'Hamstrings', 'Core'],
    type: 'reps',
    defaultSets: 3,
    defaultReps: 20,
    defaultRest: 60,
    description: 'The fundamental lower body movement. Military fitness requires high-rep squats for endurance and power.',
    formTips: [
      'Feet shoulder-width apart, toes slightly out',
      'Chest up — do not lean forward',
      'Lower until thighs parallel (or below)',
      'Knees track over toes — do not cave in',
      'Drive through heels to stand'
    ],
    beginner: 'Use a chair behind you for safety, squat to it',
    advanced: 'Jump squats, single-leg progressions',
    svgKey: 'squat'
  },

  jump_squat: {
    id: 'jump_squat',
    name: 'Jump Squat',
    category: 'legs',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    muscles: ['Quads', 'Glutes', 'Calves', 'Cardio'],
    type: 'reps',
    defaultSets: 3,
    defaultReps: 15,
    defaultRest: 60,
    description: 'Explosive squat with a jump. Builds leg power and conditions the cardiovascular system simultaneously.',
    formTips: [
      'Squat down to parallel',
      'Explode upward — full jump',
      'Land softly — bend knees to absorb',
      'Immediately drop into next squat',
      'Arms swing for momentum'
    ],
    beginner: 'Regular bodyweight squats',
    advanced: 'Add light dumbbells or weighted vest',
    svgKey: 'jump_squat'
  },

  lunge: {
    id: 'lunge',
    name: 'Walking Lunge',
    category: 'legs',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Quads', 'Glutes', 'Hamstrings', 'Balance'],
    type: 'reps',
    defaultSets: 3,
    defaultReps: 12,
    defaultRest: 60,
    description: 'Step forward into a lunge, then stand and repeat on the other side. Builds unilateral leg strength and balance.',
    formTips: [
      'Step forward — big step',
      'Back knee hovers 1 inch from ground',
      'Front shin stays vertical',
      'Chest upright — do not lean forward',
      'Push off front foot to stand'
    ],
    beginner: 'Stationary lunges — step and return',
    advanced: 'Reverse lunges, or add weight',
    svgKey: 'lunge'
  },

  pistol_squat: {
    id: 'pistol_squat',
    name: 'Pistol Squat',
    category: 'legs',
    equipment: 'bodyweight',
    difficulty: 'advanced',
    muscles: ['Quads', 'Glutes', 'Balance', 'Core'],
    type: 'reps',
    defaultSets: 3,
    defaultReps: 5,
    defaultRest: 90,
    description: 'Single-leg squat to the ground. The pinnacle of lower body calisthenics — requires strength, flexibility, and balance.',
    formTips: [
      'One leg extended forward, parallel to ground',
      'Lower on single leg to full depth',
      'Heel stays flat on ground',
      'Arms extend forward for counterbalance',
      'Drive through heel to stand'
    ],
    beginner: 'Assisted pistols using a ring or bar for support',
    advanced: 'Weighted pistol squat',
    svgKey: 'pistol_squat'
  },

  // ═══════════════════════════════════════════
  // FULL BODY / CONDITIONING
  // ═══════════════════════════════════════════
  burpee: {
    id: 'burpee',
    name: 'Burpee',
    category: 'full-body',
    equipment: 'bodyweight',
    difficulty: 'intermediate',
    muscles: ['Full Body', 'Cardio', 'Shoulders', 'Core', 'Legs'],
    type: 'reps',
    defaultSets: 3,
    defaultReps: 10,
    defaultRest: 60,
    description: 'The ultimate military conditioning exercise. Burpees are used in Special Forces selection for their devastating metabolic demand.',
    formTips: [
      'Stand → squat → jump back to plank',
      'Perform a push-up (military version requires it)',
      'Jump feet back to hands',
      'Explode UP — arms overhead jump at top',
      'Keep fast rhythm — do not pause'
    ],
    beginner: 'No push-up, step back instead of jump',
    advanced: 'Pull-up at the top, or add weight vest',
    svgKey: 'burpee'
  },

  ring_muscle_up: {
    id: 'ring_muscle_up',
    name: 'Ring Muscle-Up',
    category: 'pull',
    equipment: 'rings',
    difficulty: 'advanced',
    muscles: ['Lats', 'Chest', 'Triceps', 'Core'],
    type: 'reps',
    defaultSets: 3,
    defaultReps: 4,
    defaultRest: 120,
    description: 'The hardest standard calisthenics pulling exercise. Ring muscle-ups require exceptional strength and coordination.',
    formTips: [
      'False grip from the start',
      'Pull rings to chest with rings close to body',
      'Lean forward as you transition over the rings',
      'Push to full dip lockout',
      'Rings turn out at the top'
    ],
    beginner: 'Bar muscle-ups, ring dips + ring pull-ups separately',
    advanced: 'Slow negatives, typewriter ring muscle-ups',
    svgKey: 'ring_muscle_up'
  },

  superman: {
    id: 'superman',
    name: 'Superman / Back Extension',
    category: 'core',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Lower Back', 'Glutes', 'Hamstrings'],
    type: 'reps',
    defaultSets: 3,
    defaultReps: 15,
    defaultRest: 45,
    description: 'Lying prone, lift arms and legs simultaneously. Essential posterior chain work that prevents injury and builds military posture.',
    formTips: [
      'Lie face down, arms extended overhead',
      'Squeeze glutes and lift chest and legs simultaneously',
      'Hold peak contraction for 1-2 seconds',
      'Lower slowly — do not drop',
      'Keep neck neutral — look down at ground'
    ],
    beginner: 'Lift only arms, or only legs, alternating',
    advanced: 'Hold peak for 5 seconds each rep',
    svgKey: 'superman'
  },

  jumping_jack: {
    id: 'jumping_jack',
    name: 'Jumping Jacks',
    category: 'full-body',
    equipment: 'bodyweight',
    difficulty: 'beginner',
    muscles: ['Full Body', 'Cardio', 'Shoulders', 'Legs'],
    type: 'timed',
    defaultSets: 3,
    defaultDuration: 30,
    defaultRest: 20,
    description: 'Classic military warm-up exercise. Used in every armed forces PT session worldwide for cardio conditioning.',
    formTips: [
      'Arms fully overhead at the top',
      'Feet wider than shoulders at the spread',
      'Keep rhythm consistent',
      'Light bounce on the balls of feet',
      'Maintain upright posture'
    ],
    beginner: 'Slower tempo, step out instead of jump',
    advanced: 'Increase tempo or use a weighted vest',
    svgKey: 'jumping_jack'
  }
};

export const CATEGORIES = {
  push: { label: 'Push', color: '#f97316', icon: '💪' },
  pull: { label: 'Pull', color: '#3b82f6', icon: '🏋️' },
  core: { label: 'Core', color: '#e8c547', icon: '⚡' },
  legs: { label: 'Legs', color: '#22c55e', icon: '🦵' },
  'full-body': { label: 'Full Body', color: '#ec4899', icon: '🔥' },
};

export const EQUIPMENT = {
  bodyweight: 'Bodyweight Only',
  bar: 'Pull-Up Bar',
  rings: 'Gymnastic Rings',
};

export const getExerciseList = () => Object.values(EXERCISES);
export const getExerciseById = (id) => EXERCISES[id];
