import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CYCLE = [null, 'good', 'bad'];

function nextState(cur) {
  return CYCLE[(CYCLE.indexOf(cur) + 1) % CYCLE.length];
}

function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const KIDS = [
  { id: 'kid1', defaultName: 'Niki',  color: '#a78bfa', bg: '#a78bfa18' },
  { id: 'kid2', defaultName: 'David', color: '#38bdf8', bg: '#38bdf818' },
];

function DayToggle({ state, color, bg, onClick }) {
  if (state === 'good') {
    return (
      <button
        onClick={onClick}
        className="w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90 text-sm"
        style={{ background: '#22c55e28', border: `1.5px solid #22c55e` }}
        aria-label="Good — tap to change"
      >⭐</button>
    );
  }
  if (state === 'bad') {
    return (
      <button
        onClick={onClick}
        className="w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90 text-xs"
        style={{ background: '#ef444428', border: `1.5px solid #ef4444` }}
        aria-label="Bad — tap to change"
      >❌</button>
    );
  }
  return (
    <button
      onClick={onClick}
      className="w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90"
      style={{ background: bg, border: `1.5px solid ${color}55` }}
      aria-label="Not set — tap to set"
    >
      <span style={{ color: `${color}88`, fontSize: '0.6rem', fontWeight: 800 }}>?</span>
    </button>
  );
}

function EditableName({ value, onChange, color }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  if (editing) {
    return (
      <input
        autoFocus
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={() => { onChange(draft.trim() || value); setEditing(false); }}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === 'Escape') {
            onChange(draft.trim() || value);
            setEditing(false);
          }
        }}
        className="rounded px-2 py-0.5 text-sm font-bold outline-none w-24 text-center"
        style={{ background: '#21262d', border: `1.5px solid ${color}`, color }}
        maxLength={16}
      />
    );
  }
  return (
    <button
      onClick={() => { setDraft(value); setEditing(true); }}
      className="px-2 py-0.5 rounded text-sm font-bold transition-all"
      style={{ color, background: '#21262d', border: `1px solid ${color}44` }}
      title="Tap to rename"
    >
      {value} <span style={{ fontSize: '0.6rem', opacity: 0.6 }}>✏️</span>
    </button>
  );
}

export function BehaviourTracker() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [records, setRecords] = useLocalStorage('behaviour_records', {});
  const [kid1Name, setKid1Name] = useLocalStorage('behaviour_kid1', 'Niki');
  const [kid2Name, setKid2Name] = useLocalStorage('behaviour_kid2', 'David');

  const names = [kid1Name, kid2Name];
  const setters = [setKid1Name, setKid2Name];

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDow = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // Mon=0

  function toggle(day, kidId) {
    const key = dateKey(viewYear, viewMonth, day);
    setRecords(prev => {
      const rec = prev[key] || {};
      const cur = rec[kidId] ?? null;
      const next = nextState(cur);
      const updated = next === null
        ? (({ [kidId]: _, ...r }) => r)(rec)
        : { ...rec, [kidId]: next };
      if (Object.keys(updated).length === 0) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: updated };
    });
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  // Monthly stats
  const stats = KIDS.map(({ id }) => {
    let good = 0, bad = 0;
    for (let d = 1; d <= daysInMonth; d++) {
      const rec = records[dateKey(viewYear, viewMonth, d)] || {};
      if (rec[id] === 'good') good++;
      if (rec[id] === 'bad') bad++;
    }
    return { good, bad };
  });

  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  // Grid: leading blank cells + numbered days + trailing padding
  const cells = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#0d1117' }}>

      {/* ── Header ── */}
      <div className="px-4 pt-6 pb-4" style={{ borderBottom: '1px solid #21262d' }}>
        <h1 className="text-2xl font-extrabold mb-1" style={{ color: '#e6edf3', letterSpacing: '-0.5px' }}>
          ⭐ Behaviour Tracker
        </h1>
        <p className="text-xs mb-4" style={{ color: '#6b7280' }}>Tap a star to track each day</p>

        {/* Kid cards */}
        <div className="grid grid-cols-2 gap-3">
          {KIDS.map(({ id, color, bg }, i) => (
            <div
              key={id}
              className="rounded-2xl px-3 py-3"
              style={{ background: '#161b22', border: `1.5px solid ${color}44` }}
            >
              <EditableName value={names[i]} onChange={setters[i]} color={color} />
              <div className="flex gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <span className="text-base">⭐</span>
                  <span className="text-lg font-extrabold" style={{ color: '#22c55e' }}>{stats[i].good}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm">❌</span>
                  <span className="text-lg font-extrabold" style={{ color: '#ef4444' }}>{stats[i].bad}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Month nav ── */}
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={prevMonth}
          className="w-9 h-9 rounded-full flex items-center justify-center text-xl transition-all active:scale-90"
          style={{ background: '#161b22', border: '1px solid #30363d', color: '#c9d1d9' }}
        >‹</button>
        <span className="font-bold text-base" style={{ color: '#e6edf3' }}>
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-9 h-9 rounded-full flex items-center justify-center text-xl transition-all active:scale-90"
          style={{ background: '#161b22', border: '1px solid #30363d', color: '#c9d1d9' }}
        >›</button>
      </div>

      {/* ── Legend ── */}
      <div className="flex items-center gap-4 px-4 pb-1 text-xs" style={{ color: '#6b7280' }}>
        {KIDS.map(({ id, color }, i) => (
          <span key={id} style={{ color }}>● {names[i]}</span>
        ))}
        <span className="ml-auto" style={{ color: '#484f58' }}>? → ⭐ → ❌ → ?</span>
      </div>

      {/* ── Calendar ── */}
      <div className="px-2 pb-6">
        {/* Weekday row */}
        <div className="grid grid-cols-7 mb-1">
          {WEEKDAYS.map(d => (
            <div key={d} className="text-center text-xs font-semibold py-1" style={{ color: '#484f58' }}>
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, idx) => {
            if (day === null) return <div key={`x${idx}`} style={{ minHeight: 78 }} />;

            const key = dateKey(viewYear, viewMonth, day);
            const rec = records[key] || {};
            const isToday = isCurrentMonth && day === today.getDate();
            const isFuture = isCurrentMonth
              ? day > today.getDate()
              : (viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth()));

            return (
              <div
                key={day}
                className="rounded-xl flex flex-col items-center py-2 gap-1"
                style={{
                  background: isToday ? '#1c2535' : '#161b22',
                  border: isToday ? '1.5px solid #e8c547' : '1px solid #21262d',
                  minHeight: 78,
                  opacity: isFuture ? 0.45 : 1,
                }}
              >
                <span
                  className="text-xs font-semibold"
                  style={{ color: isToday ? '#e8c547' : '#6b7280' }}
                >
                  {day}
                </span>
                {KIDS.map(({ id, color, bg }) => (
                  <DayToggle
                    key={id}
                    state={rec[id] ?? null}
                    color={color}
                    bg={bg}
                    onClick={isFuture ? undefined : () => toggle(day, id)}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
