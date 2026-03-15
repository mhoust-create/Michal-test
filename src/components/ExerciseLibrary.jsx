import { useState } from 'react';
import { getExerciseList, CATEGORIES, EQUIPMENT } from '../data/exercises';
import { ExerciseSVG } from './ExerciseSVG';

export function ExerciseLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);

  const exercises = getExerciseList();

  const filtered = exercises.filter(ex => {
    const catMatch = selectedCategory === 'all' || ex.category === selectedCategory;
    const eqMatch = selectedEquipment === 'all' || ex.equipment === selectedEquipment;
    const searchMatch = !search || ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.muscles.some(m => m.toLowerCase().includes(search.toLowerCase()));
    return catMatch && eqMatch && searchMatch;
  });

  if (selectedExercise) {
    return <ExerciseDetail exercise={selectedExercise} onBack={() => setSelectedExercise(null)} />;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 space-y-3" style={{ background: '#0d1117', borderBottom: '1px solid #21262d' }}>
        <h1 className="text-xl font-bold" style={{ fontFamily: 'Oswald', color: '#e8c547' }}>
          EXERCISE LIBRARY
        </h1>

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: '#6b7280' }}>🔍</span>
          <input
            type="text"
            placeholder="Search exercises or muscles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: '#161b22', border: '1px solid #21262d', color: '#e6edf3' }}
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <FilterChip
            label="All" active={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')} color="#e8c547"
          />
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <FilterChip
              key={key} label={cat.label} active={selectedCategory === key}
              onClick={() => setSelectedCategory(key)} color={cat.color}
            />
          ))}
        </div>

        {/* Equipment filter */}
        <div className="flex gap-2">
          <FilterChip
            label="All Gear" active={selectedEquipment === 'all'}
            onClick={() => setSelectedEquipment('all')} color="#9ca3af" small
          />
          {Object.entries(EQUIPMENT).map(([key, label]) => (
            <FilterChip
              key={key} label={label} active={selectedEquipment === key}
              onClick={() => setSelectedEquipment(key)} color="#9ca3af" small
            />
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="px-4 py-2 text-xs" style={{ color: '#6b7280' }}>
        {filtered.length} exercises
      </div>

      {/* Exercise grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map(ex => (
            <ExerciseCard key={ex.id} exercise={ex} onClick={() => setSelectedExercise(ex)} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12" style={{ color: '#6b7280' }}>
            <div className="text-3xl mb-2">🔍</div>
            <div className="text-sm">No exercises found</div>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick, color, small = false }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 rounded-full ${small ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs'} font-medium uppercase tracking-wider transition-all whitespace-nowrap`}
      style={{
        background: active ? color : '#161b22',
        color: active ? '#0d1117' : '#6b7280',
        border: `1px solid ${active ? color : '#21262d'}`,
      }}
    >
      {label}
    </button>
  );
}

function ExerciseCard({ exercise, onClick }) {
  const catInfo = CATEGORIES[exercise.category];
  const diffColors = { beginner: '#39d353', intermediate: '#e8c547', advanced: '#f97316' };
  const diffColor = diffColors[exercise.difficulty] || '#6b7280';

  return (
    <button
      onClick={onClick}
      className="exercise-card flex flex-col rounded-xl overflow-hidden text-left"
      style={{ background: '#161b22', border: '1px solid #21262d' }}
    >
      {/* SVG illustration */}
      <div style={{ height: 110, background: '#0d1117' }}>
        <ExerciseSVG exerciseId={exercise.id} className="w-full h-full" />
      </div>

      <div className="p-2.5">
        <div className="text-xs font-bold uppercase mb-0.5" style={{ color: catInfo?.color || '#e8c547' }}>
          {catInfo?.label}
        </div>
        <div className="text-sm font-medium leading-tight mb-1.5" style={{ fontFamily: 'Oswald', color: '#e6edf3' }}>
          {exercise.name}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#21262d', color: diffColor }}>
            {exercise.difficulty}
          </div>
          <div className="text-xs" style={{ color: '#6b7280' }}>
            {exercise.equipment === 'bodyweight' ? '🏃' : exercise.equipment === 'bar' ? '🔩' : '⭕'}
          </div>
        </div>
      </div>
    </button>
  );
}

function ExerciseDetail({ exercise, onBack }) {
  const catInfo = CATEGORIES[exercise.category];
  const diffColors = { beginner: '#39d353', intermediate: '#e8c547', advanced: '#f97316' };
  const diffColor = diffColors[exercise.difficulty] || '#6b7280';
  const equipmentIcons = { bodyweight: '🏃 Bodyweight', bar: '🔩 Pull-up Bar', rings: '⭕ Gymnastic Rings' };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3" style={{ background: '#0d1117', borderBottom: '1px solid #21262d' }}>
        <button
          onClick={onBack}
          className="p-2 rounded-full"
          style={{ background: '#21262d', color: '#9ca3af' }}
        >
          ←
        </button>
        <div>
          <div className="text-xs uppercase tracking-wider" style={{ color: catInfo?.color }}>
            {catInfo?.label}
          </div>
          <h2 className="text-lg font-bold" style={{ fontFamily: 'Oswald', color: '#e6edf3' }}>
            {exercise.name}
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Large SVG */}
        <div style={{ background: '#161b22', height: 220 }}>
          <ExerciseSVG exerciseId={exercise.id} />
        </div>

        <div className="p-4 space-y-4">
          {/* Meta chips */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: '#21262d', color: diffColor }}>
              {exercise.difficulty.toUpperCase()}
            </span>
            <span className="px-3 py-1 rounded-full text-xs" style={{ background: '#21262d', color: '#9ca3af' }}>
              {equipmentIcons[exercise.equipment]}
            </span>
            <span className="px-3 py-1 rounded-full text-xs" style={{ background: '#21262d', color: '#9ca3af' }}>
              {exercise.type === 'timed' ? `⏱ Timed — ${exercise.defaultDuration}s` : `🔁 ${exercise.defaultReps} reps`}
            </span>
          </div>

          {/* Muscles */}
          <div className="rounded-xl p-4" style={{ background: '#161b22', border: '1px solid #21262d' }}>
            <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#6b7280' }}>Muscles Worked</div>
            <div className="flex flex-wrap gap-2">
              {exercise.muscles.map((m, i) => (
                <span key={i} className="px-2 py-1 rounded text-xs font-medium"
                  style={{ background: '#21262d', color: catInfo?.color || '#e8c547' }}>
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="rounded-xl p-4" style={{ background: '#161b22', border: '1px solid #21262d' }}>
            <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#6b7280' }}>About</div>
            <p className="text-sm leading-relaxed" style={{ color: '#9ca3af' }}>{exercise.description}</p>
          </div>

          {/* Form tips */}
          <div className="rounded-xl p-4" style={{ background: '#161b22', border: '1px solid #21262d' }}>
            <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#6b7280' }}>Form Tips</div>
            <ul className="space-y-2.5">
              {exercise.formTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-bold mt-0.5"
                    style={{ background: '#e8c547', color: '#0d1117' }}>
                    {i + 1}
                  </div>
                  <span className="text-sm" style={{ color: '#9ca3af' }}>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Progressions */}
          <div className="grid grid-cols-1 gap-3">
            <div className="rounded-xl p-4" style={{ background: '#161b22', border: '1px solid #21262d' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: '#39d353' }}>📉 Beginner Modification</div>
              </div>
              <p className="text-sm" style={{ color: '#6b7280' }}>{exercise.beginner}</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: '#161b22', border: '1px solid #21262d' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: '#f97316' }}>📈 Advanced Progression</div>
              </div>
              <p className="text-sm" style={{ color: '#6b7280' }}>{exercise.advanced}</p>
            </div>
          </div>

          {/* Default programming */}
          <div className="rounded-xl p-4" style={{ background: '#161b22', border: '1px solid #21262d' }}>
            <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#6b7280' }}>Default Programming</div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xl font-bold" style={{ fontFamily: 'Oswald', color: '#e8c547' }}>{exercise.defaultSets}</div>
                <div className="text-xs mt-0.5" style={{ color: '#6b7280' }}>Sets</div>
              </div>
              <div>
                <div className="text-xl font-bold" style={{ fontFamily: 'Oswald', color: '#f97316' }}>
                  {exercise.type === 'timed' ? `${exercise.defaultDuration}s` : exercise.defaultReps}
                </div>
                <div className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{exercise.type === 'timed' ? 'Hold' : 'Reps'}</div>
              </div>
              <div>
                <div className="text-xl font-bold" style={{ fontFamily: 'Oswald', color: '#3b82f6' }}>{exercise.defaultRest}s</div>
                <div className="text-xs mt-0.5" style={{ color: '#6b7280' }}>Rest</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
