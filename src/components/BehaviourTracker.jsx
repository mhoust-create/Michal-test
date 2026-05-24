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
  { id: 'kid1', color: '#a78bfa', bg: '#a78bfa18', star: 15, cross: 5 },
  { id: 'kid2', color: '#38bdf8', bg: '#38bdf818', star: 7,  cross: 2 },
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

export function BehaviourTracker() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

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

      {showPinModal && (
        <PinModal storedPin={pin} onSuccess={unlock} onClose={() => setShowPinModal(false)} />
      )}
      {showChangePinModal && (
        <ChangePinModal storedPin={pin} onSave={savePin} onClose={() => setShowChangePinModal(false)} />
      )}

    </div>
  );
}
