import { useState } from 'react';
import { useSynced } from '../hooks/useSync';

const FAMILY_CODE = '3GSBML';
const CYCLE = [null, 'good', 'bad'];
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const KIDS = [
  { id: 'kid1', color: '#a78bfa', bg: '#a78bfa18', star: 15, cross: 10 },
  { id: 'kid2', color: '#38bdf8', bg: '#38bdf818', star: 7,  cross: 3  },
];

function nextState(cur) {
  return CYCLE[(CYCLE.indexOf(cur) + 1) % CYCLE.length];
}
function dateKey(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

function DayToggle({ state, color, bg, onClick }) {
  if (state === 'good') return (
    <button onClick={onClick} className="w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90 text-sm"
      style={{ background: `${color}28`, border: `1.5px solid ${color}`, cursor: onClick ? 'pointer' : 'default' }}>⭐</button>
  );
  if (state === 'bad') return (
    <button onClick={onClick} className="w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90 text-xs"
      style={{ background: `${color}18`, border: `1.5px solid ${color}`, cursor: onClick ? 'pointer' : 'default' }}>❌</button>
  );
  return (
    <button onClick={onClick} className="w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90"
      style={{ background: bg, border: `1.5px solid ${color}55`, cursor: onClick ? 'pointer' : 'default' }}>
      <span style={{ color: `${color}88`, fontSize: '0.6rem', fontWeight: 800 }}>?</span>
    </button>
  );
}

function EditableName({ value, onChange, color, editable }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  if (!editable) return (
    <span className="px-2 py-0.5 text-sm font-bold" style={{ color }}>{value}</span>
  );
  if (editing) return (
    <input autoFocus value={draft}
      onChange={e => setDraft(e.target.value)}
      onBlur={() => { onChange(draft.trim() || value); setEditing(false); }}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === 'Escape') { onChange(draft.trim() || value); setEditing(false); } }}
      className="rounded px-2 py-0.5 text-sm font-bold outline-none w-24 text-center"
      style={{ background: '#21262d', border: `1.5px solid ${color}`, color }}
      maxLength={16}
    />
  );
  return (
    <button onClick={() => { setDraft(value); setEditing(true); }}
      className="px-2 py-0.5 rounded text-sm font-bold"
      style={{ color, background: '#21262d', border: `1px solid ${color}44` }}
      title="Tap to rename">
      {value} <span style={{ fontSize: '0.6rem', opacity: 0.6 }}>✏️</span>
    </button>
  );
}

function PinModal({ onSuccess, onClose, storedPin }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  function press(digit) {
    if (input.length >= 4) return;
    const next = input + digit;
    setInput(next);
    if (next.length === 4) {
      if (next === storedPin) {
        onSuccess();
      } else {
        setError(true);
        setTimeout(() => { setError(false); setInput(''); }, 700);
      }
    }
  }

  function del() { setInput(p => p.slice(0, -1)); }

  const KEYS = ['1','2','3','4','5','6','7','8','9','','0','⌫'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={onClose}>
      <div className="rounded-2xl p-6 flex flex-col items-center gap-5 w-72"
        style={{ background: '#161b22', border: '1px solid #30363d' }}
        onClick={e => e.stopPropagation()}>

        <h2 className="font-bold text-base" style={{ color: '#e6edf3' }}>🔒 Parent mode</h2>
        <p className="text-xs" style={{ color: '#6b7280' }}>Enter PIN to unlock editing</p>

        {/* Dots */}
        <div className="flex gap-3">
          {[0,1,2,3].map(i => (
            <div key={i} className="w-4 h-4 rounded-full transition-all"
              style={{ background: i < input.length ? (error ? '#ef4444' : '#e8c547') : '#21262d', border: `2px solid ${i < input.length ? (error ? '#ef4444' : '#e8c547') : '#30363d'}` }} />
          ))}
        </div>

        {error && <p className="text-xs font-semibold" style={{ color: '#ef4444', marginTop: -8 }}>Wrong PIN</p>}

        {/* Number pad */}
        <div className="grid grid-cols-3 gap-2 w-full">
          {KEYS.map((k, i) => (
            k === '' ? <div key={i} /> :
            k === '⌫' ? (
              <button key={i} onClick={del}
                className="h-14 rounded-xl text-lg font-bold transition-all active:scale-90"
                style={{ background: '#21262d', border: '1px solid #30363d', color: '#8b949e' }}>
                {k}
              </button>
            ) : (
              <button key={i} onClick={() => press(k)}
                className="h-14 rounded-xl text-xl font-bold transition-all active:scale-90"
                style={{ background: '#21262d', border: '1px solid #30363d', color: '#e6edf3' }}>
                {k}
              </button>
            )
          ))}
        </div>

        <button onClick={onClose} className="text-xs" style={{ color: '#484f58' }}>Cancel</button>
      </div>
    </div>
  );
}

function ChangePinModal({ storedPin, onSave, onClose }) {
  const [step, setStep] = useState('current'); // 'current' | 'new' | 'confirm'
  const [input, setInput] = useState('');
  const [newPin, setNewPin] = useState('');
  const [error, setError] = useState(false);

  const titles = { current: 'Enter current PIN', new: 'Enter new PIN', confirm: 'Confirm new PIN' };

  function press(digit) {
    if (input.length >= 4) return;
    const next = input + digit;
    setInput(next);
    if (next.length === 4) {
      if (step === 'current') {
        if (next === storedPin) { setStep('new'); setInput(''); }
        else { setError(true); setTimeout(() => { setError(false); setInput(''); }, 700); }
      } else if (step === 'new') {
        setNewPin(next); setStep('confirm'); setInput('');
      } else {
        if (next === newPin) { onSave(next); }
        else { setError(true); setTimeout(() => { setError(false); setInput(''); setStep('new'); setNewPin(''); }, 700); }
      }
    }
  }

  function del() { setInput(p => p.slice(0, -1)); }

  const KEYS = ['1','2','3','4','5','6','7','8','9','','0','⌫'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={onClose}>
      <div className="rounded-2xl p-6 flex flex-col items-center gap-5 w-72"
        style={{ background: '#161b22', border: '1px solid #30363d' }}
        onClick={e => e.stopPropagation()}>

        <h2 className="font-bold text-base" style={{ color: '#e6edf3' }}>Change PIN</h2>
        <p className="text-xs" style={{ color: '#6b7280' }}>{titles[step]}</p>

        <div className="flex gap-3">
          {[0,1,2,3].map(i => (
            <div key={i} className="w-4 h-4 rounded-full transition-all"
              style={{ background: i < input.length ? (error ? '#ef4444' : '#a78bfa') : '#21262d', border: `2px solid ${i < input.length ? (error ? '#ef4444' : '#a78bfa') : '#30363d'}` }} />
          ))}
        </div>

        {error && <p className="text-xs font-semibold" style={{ color: '#ef4444', marginTop: -8 }}>
          {step === 'current' ? 'Wrong PIN' : 'PINs do not match'}
        </p>}

        <div className="grid grid-cols-3 gap-2 w-full">
          {KEYS.map((k, i) => (
            k === '' ? <div key={i} /> :
            k === '⌫' ? (
              <button key={i} onClick={del}
                className="h-14 rounded-xl text-lg font-bold transition-all active:scale-90"
                style={{ background: '#21262d', border: '1px solid #30363d', color: '#8b949e' }}>{k}</button>
            ) : (
              <button key={i} onClick={() => press(k)}
                className="h-14 rounded-xl text-xl font-bold transition-all active:scale-90"
                style={{ background: '#21262d', border: '1px solid #30363d', color: '#e6edf3' }}>{k}</button>
            )
          ))}
        </div>

        <button onClick={onClose} className="text-xs" style={{ color: '#484f58' }}>Cancel</button>
      </div>
    </div>
  );
}

function SummaryTab({ records, names }) {
  const TARGET = 30;
  const today = new Date();
  const todayStr = dateKey(today.getFullYear(), today.getMonth(), today.getDate());

  const allDateKeys = Object.keys(records).sort();
  const firstDate = allDateKeys[0];

  // Build full list of dates from first record to today
  const dateList = [];
  if (firstDate) {
    const d = new Date(firstDate + 'T00:00:00');
    const end = new Date(todayStr + 'T00:00:00');
    while (d <= end) {
      dateList.push(dateKey(d.getFullYear(), d.getMonth(), d.getDate()));
      d.setDate(d.getDate() + 1);
    }
  }

  const cumulativeData = KIDS.map(({ id }) => {
    let sum = 0;
    return dateList.map((date, i) => {
      const rec = records[date] || {};
      if (rec[id] === 'good') sum += 1;
      else if (rec[id] === 'bad') sum -= 1;
      return { i, value: sum };
    });
  });

  const W = 300, H = 190;
  const PAD = { left: 30, right: 12, top: 18, bottom: 32 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const n = Math.max(dateList.length - 1, 1);

  const allVals = [...cumulativeData.flat().map(p => p.value), TARGET, 0];
  const minV = Math.min(...allVals) - 2;
  const maxV = Math.max(...allVals) + 3;

  const xScale = i => PAD.left + (i / n) * plotW;
  const yScale = v => PAD.top + plotH - ((v - minV) / (maxV - minV)) * plotH;

  function buildPath(data) {
    return data.map(({ i, value }) =>
      `${i === 0 ? 'M' : 'L'}${xScale(i).toFixed(1)},${yScale(value).toFixed(1)}`
    ).join(' ');
  }

  // Month boundary labels
  const monthLabels = [];
  dateList.forEach((date, i) => {
    if (date.slice(8) === '01' || i === 0) {
      const d = new Date(date + 'T00:00:00');
      monthLabels.push({ i, label: d.toLocaleDateString('en', { month: 'short', year: '2-digit' }) });
    }
  });

  const yStep = maxV - minV > 20 ? 10 : 5;
  const yTicks = [];
  for (let v = Math.ceil(minV / yStep) * yStep; v <= maxV; v += yStep) yTicks.push(v);

  if (dateList.length === 0) return (
    <div className="px-4 py-8 text-center" style={{ color: '#484f58' }}>No records yet — start tracking!</div>
  );

  return (
    <div className="px-3 py-4 flex flex-col gap-3">
      <div className="rounded-2xl p-4" style={{ background: '#161b22', border: '1px solid #21262d' }}>
        {/* Legend */}
        <div className="flex items-center gap-4 mb-3">
          {KIDS.map(({ color }, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="w-5 rounded-full" style={{ height: 2, background: color }} />
              <span className="text-xs font-semibold" style={{ color }}>{names[i]}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 ml-auto">
            <svg width="20" height="8"><line x1="0" y1="4" x2="20" y2="4" stroke="#e8c547" strokeWidth="1.5" strokeDasharray="4,2" /></svg>
            <span className="text-xs font-semibold" style={{ color: '#e8c547' }}>Target {TARGET}</span>
          </div>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
          {/* Y grid + labels */}
          {yTicks.map(v => (
            <g key={v}>
              <line x1={PAD.left} y1={yScale(v)} x2={W - PAD.right} y2={yScale(v)}
                stroke={v === 0 ? '#30363d' : '#1e2530'} strokeWidth={v === 0 ? 1 : 0.5} />
              <text x={PAD.left - 4} y={yScale(v)} textAnchor="end" dominantBaseline="middle"
                fontSize="7.5" fill="#484f58">{v}</text>
            </g>
          ))}

          {/* Month boundaries */}
          {monthLabels.map(({ i, label }) => (
            <g key={i}>
              <line x1={xScale(i)} y1={PAD.top} x2={xScale(i)} y2={H - PAD.bottom}
                stroke="#21262d" strokeWidth="0.5" strokeDasharray="3,2" />
              <text x={xScale(i) + 2} y={H - PAD.bottom + 12} fontSize="7" fill="#6b7280">{label}</text>
            </g>
          ))}

          {/* Target dashed line */}
          <line x1={PAD.left} y1={yScale(TARGET)} x2={W - PAD.right} y2={yScale(TARGET)}
            stroke="#e8c547" strokeWidth="1.5" strokeDasharray="5,3" />

          {/* Kid lines */}
          {KIDS.map(({ color }, i) => (
            <path key={i} d={buildPath(cumulativeData[i])} fill="none"
              stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          ))}

          {/* X axis */}
          <line x1={PAD.left} y1={H - PAD.bottom} x2={W - PAD.right} y2={H - PAD.bottom}
            stroke="#30363d" />
        </svg>
      </div>

      {/* Progress cards */}
      <div className="grid grid-cols-2 gap-3">
        {KIDS.map(({ color }, i) => {
          const last = cumulativeData[i][cumulativeData[i].length - 1];
          const score = last ? last.value : 0;
          const pct = Math.min(100, Math.max(0, (score / TARGET) * 100));
          return (
            <div key={i} className="rounded-2xl px-3 py-3"
              style={{ background: '#161b22', border: `1.5px solid ${color}44` }}>
              <span className="text-sm font-bold" style={{ color }}>{names[i]}</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-extrabold"
                  style={{ color: score >= TARGET ? '#22c55e' : score >= 0 ? '#e8c547' : '#ef4444' }}>
                  {score}
                </span>
                <span className="text-xs" style={{ color: '#484f58' }}>/ {TARGET}</span>
              </div>
              <div className="mt-2 rounded-full overflow-hidden" style={{ height: 5, background: '#21262d' }}>
                <div className="h-full rounded-full"
                  style={{ width: `${pct}%`, background: score >= TARGET ? '#22c55e' : color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function BehaviourTracker() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const [activeTab, setActiveTab] = useState('calendar');
  const [isParent, setIsParent] = useState(false);
  const [pin, setPin] = useState(() => localStorage.getItem('parent_pin') || '1234');
  const [showPinModal, setShowPinModal] = useState(false);
  const [showChangePinModal, setShowChangePinModal] = useState(false);

  const [records, setRecords]   = useSynced(FAMILY_CODE, 'records', {}, true);
  const [kid1Name, setKid1Name] = useSynced(FAMILY_CODE, 'kid1', 'Niki', true);
  const [kid2Name, setKid2Name] = useSynced(FAMILY_CODE, 'kid2', 'David', true);

  const names   = [kid1Name, kid2Name];
  const setters = [setKid1Name, setKid2Name];

  function unlock() { setIsParent(true); setShowPinModal(false); }
  function lock()   { setIsParent(false); }

  function savePin(newPin) {
    localStorage.setItem('parent_pin', newPin);
    setPin(newPin);
    setShowChangePinModal(false);
  }

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDow    = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;

  function toggle(day, kidId) {
    const key = dateKey(viewYear, viewMonth, day);
    setRecords(prev => {
      const rec  = prev[key] || {};
      const next = nextState(rec[kidId] ?? null);
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

  const stats = KIDS.map(({ id, star, cross }) => {
    let good = 0, bad = 0;
    for (let d = 1; d <= daysInMonth; d++) {
      const rec = records[dateKey(viewYear, viewMonth, d)] || {};
      if (rec[id] === 'good') good++;
      if (rec[id] === 'bad')  bad++;
    }
    return { good, bad, balance: good * star - bad * cross };
  });

  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const cells = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="flex flex-col min-h-full" style={{ background: '#0d1117' }}>

      {/* Header */}
      <div className="px-4 pt-5 pb-4" style={{ borderBottom: '1px solid #21262d' }}>
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-extrabold" style={{ color: '#e6edf3', letterSpacing: '-0.5px' }}>
            ⭐ Behaviour Tracker
          </h1>
          {isParent ? (
            <div className="flex items-center gap-2">
              <button onClick={() => setShowChangePinModal(true)}
                className="text-xs px-2 py-1 rounded-lg"
                style={{ color: '#6b7280', background: '#21262d', border: '1px solid #30363d' }}>
                PIN
              </button>
              <button onClick={lock}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95"
                style={{ background: '#22c55e18', border: '1px solid #22c55e44', color: '#22c55e' }}>
                🔓 Parent
              </button>
            </div>
          ) : (
            <button onClick={() => setShowPinModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95"
              style={{ background: '#21262d', border: '1px solid #30363d', color: '#6b7280' }}>
              🔒 Kids view
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {KIDS.map(({ id, color }, i) => (
            <div key={id} className="rounded-2xl px-3 py-3"
              style={{ background: '#161b22', border: `1.5px solid ${color}44` }}>
              <EditableName value={names[i]} onChange={setters[i]} color={color} editable={isParent} />
              <div className="flex gap-3 mt-2 items-center rounded-xl px-2 py-1.5" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                <div className="flex items-center gap-1">
                  <span className="text-base">⭐</span>
                  <span className="text-lg font-extrabold" style={{ color: '#22c55e' }}>{stats[i].good}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm">❌</span>
                  <span className="text-lg font-extrabold" style={{ color: '#ef4444' }}>{stats[i].bad}</span>
                </div>
                <div className="ml-auto flex items-center">
                  {(() => { const s = stats[i].good - stats[i].bad; return (
                    <span className="text-lg font-extrabold" style={{ color: s > 0 ? '#22c55e' : s < 0 ? '#ef4444' : '#6b7280' }}>
                      ∑{s > 0 ? '+' : ''}{s}
                    </span>
                  ); })()}
                </div>
              </div>
              <div className="flex items-center justify-between mt-1.5 px-1">
                <span className="text-xs" style={{ color: `${color}88` }}>
                  ⭐{KIDS[i].star} / ❌-{KIDS[i].cross} CZK
                </span>
                <span className="text-sm font-extrabold" style={{ color: stats[i].balance >= 0 ? '#22c55e' : '#ef4444' }}>
                  {stats[i].balance >= 0 ? '+' : ''}{stats[i].balance} CZK
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex px-4 pt-3 gap-2">
        {[['calendar','📅 Calendar'],['maledives','🌴 Trip to Maledives']].map(([id, label]) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: activeTab === id ? '#e8c547' : '#161b22',
              color: activeTab === id ? '#0d1117' : '#6b7280',
              border: `1px solid ${activeTab === id ? '#e8c547' : '#30363d'}`,
            }}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'calendar' && <>
        {/* Month nav */}
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={prevMonth} className="w-9 h-9 rounded-full flex items-center justify-center text-xl transition-all active:scale-90"
            style={{ background: '#161b22', border: '1px solid #30363d', color: '#c9d1d9' }}>‹</button>
          <span className="font-bold text-base" style={{ color: '#e6edf3' }}>{MONTHS[viewMonth]} {viewYear}</span>
          <button onClick={nextMonth} className="w-9 h-9 rounded-full flex items-center justify-center text-xl transition-all active:scale-90"
            style={{ background: '#161b22', border: '1px solid #30363d', color: '#c9d1d9' }}>›</button>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4 px-4 pb-1 text-xs" style={{ color: '#6b7280' }}>
          {KIDS.map(({ id, color }, i) => (
            <span key={id} style={{ color }}>● {names[i]}</span>
          ))}
          {isParent && <span className="ml-auto" style={{ color: '#484f58' }}>? → ⭐ → ❌ → ?</span>}
        </div>

        {/* Calendar */}
        <div className="px-2 pb-2">
          <div className="grid grid-cols-7 mb-1">
            {WEEKDAYS.map(d => (
              <div key={d} className="text-center text-xs font-semibold py-1" style={{ color: '#484f58' }}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, idx) => {
              if (day === null) return <div key={`x${idx}`} style={{ minHeight: 78 }} />;
              const key = dateKey(viewYear, viewMonth, day);
              const rec = records[key] || {};
              const isToday   = isCurrentMonth && day === today.getDate();
              const isFuture  = isCurrentMonth
                ? day > today.getDate()
                : (viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth()));
              return (
                <div key={day} className="rounded-xl flex flex-col items-center py-2 gap-1"
                  style={{ background: isToday ? '#1c2535' : '#161b22', border: isToday ? '1.5px solid #e8c547' : '1px solid #21262d', minHeight: 78, opacity: isFuture ? 0.45 : 1 }}>
                  <span className="text-xs font-semibold" style={{ color: isToday ? '#e8c547' : '#6b7280' }}>{day}</span>
                  {KIDS.map(({ id, color, bg }) => (
                    <DayToggle key={id} state={rec[id] ?? null} color={color} bg={bg}
                      onClick={isParent && !isFuture ? () => toggle(day, id) : undefined} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </>}

      {activeTab === 'maledives' && (
        <SummaryTab records={records} names={names} />
      )}

      {showPinModal && (
        <PinModal storedPin={pin} onSuccess={unlock} onClose={() => setShowPinModal(false)} />
      )}
      {showChangePinModal && (
        <ChangePinModal storedPin={pin} onSave={savePin} onClose={() => setShowChangePinModal(false)} />
      )}

    </div>
  );
}
