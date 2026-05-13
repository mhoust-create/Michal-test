import { useState } from 'react';
import { useFamilyCode, useSynced, useFirebaseConnected } from '../hooks/useSync';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

const CYCLE = [null, 'good', 'bad'];
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const KIDS = [
  { id: 'kid1', color: '#a78bfa', bg: '#a78bfa18' },
  { id: 'kid2', color: '#38bdf8', bg: '#38bdf818' },
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
      style={{ background: '#22c55e28', border: '1.5px solid #22c55e' }}>⭐</button>
  );
  if (state === 'bad') return (
    <button onClick={onClick} className="w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90 text-xs"
      style={{ background: '#ef444428', border: '1.5px solid #ef4444' }}>❌</button>
  );
  return (
    <button onClick={onClick} className="w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90"
      style={{ background: bg, border: `1.5px solid ${color}55` }}>
      <span style={{ color: `${color}88`, fontSize: '0.6rem', fontWeight: 800 }}>?</span>
    </button>
  );
}

function EditableName({ value, onChange, color }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
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

function SyncModal({ familyCode, onChangeCode, onReset, onClose, onForcePush }) {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [pushed, setPushed] = useState(false);
  const connected = useFirebaseConnected();

  function forcePush() {
    onForcePush();
    setPushed(true);
    setTimeout(() => setPushed(false), 2500);
  }

  function copy() {
    navigator.clipboard.writeText(familyCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function join() {
    const c = input.trim().toUpperCase();
    if (c.length >= 4) { onChangeCode(c); setInput(''); onClose(); }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}>
      <div className="w-full max-w-md rounded-t-2xl p-5 flex flex-col gap-4"
        style={{ background: '#161b22', border: '1px solid #30363d' }}
        onClick={e => e.stopPropagation()}>

        <div className="flex items-center justify-between">
          <h2 className="font-bold text-base" style={{ color: '#e6edf3' }}>🔄 Sync across devices</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: connected ? '#22c55e22' : '#ef444422', color: connected ? '#22c55e' : '#ef4444', border: `1px solid ${connected ? '#22c55e' : '#ef4444'}` }}>
              {connected ? '● Online' : '● Offline'}
            </span>
            <button onClick={onClose} style={{ color: '#6b7280', fontSize: '1.2rem' }}>✕</button>
          </div>
        </div>

        {/* Current code */}
        <div className="rounded-xl p-4" style={{ background: '#0d1117', border: '1px solid #21262d' }}>
          <p className="text-xs mb-3" style={{ color: '#8b949e' }}>Your family sync code — share this with the other device:</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold tracking-widest" style={{ color: '#e8c547' }}>{familyCode}</span>
            <button onClick={copy}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all"
              style={{ background: copied ? '#22c55e22' : '#21262d', border: `1px solid ${copied ? '#22c55e' : '#30363d'}`, color: copied ? '#22c55e' : '#8b949e' }}>
              {copied ? '✓ Copied' : 'Copy'}
            </button>
            <button onClick={() => { onReset(); onClose(); }}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all"
              style={{ background: '#21262d', border: '1px solid #30363d', color: '#6b7280' }}>
              New ↺
            </button>
          </div>
        </div>

        {/* Join with a different code */}
        <div className="rounded-xl p-4" style={{ background: '#0d1117', border: '1px solid #21262d' }}>
          <p className="text-xs mb-3" style={{ color: '#8b949e' }}>On another device? Enter its code here to sync:</p>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === 'Enter' && join()}
              placeholder="Enter code…"
              maxLength={10}
              autoFocus
              className="flex-1 rounded-lg px-3 py-2.5 text-base font-bold tracking-widest outline-none"
              style={{ background: '#161b22', border: '1px solid #30363d', color: '#e6edf3' }}
            />
            <button onClick={join}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-95"
              style={{ background: '#e8c547', color: '#0d1117' }}>
              Join
            </button>
          </div>
        </div>

        {/* Force push */}
        <button onClick={forcePush}
          className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95"
          style={{ background: pushed ? '#22c55e22' : '#21262d', border: `1px solid ${pushed ? '#22c55e' : '#30363d'}`, color: pushed ? '#22c55e' : '#8b949e' }}>
          {pushed ? '✓ Uploaded to Firebase' : '⬆ Push my data to Firebase now'}
        </button>

        <p className="text-xs text-center" style={{ color: '#484f58' }}>
          Both devices with the same code share all records in real-time
        </p>
      </div>
    </div>
  );
}

export function BehaviourTracker() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [joinInput, setJoinInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [pushed, setPushed] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  const connected = useFirebaseConnected();
  const [familyCode, setFamilyCode, isOwn, resetCode] = useFamilyCode();
  const [records, setRecords]   = useSynced(familyCode, 'records', {}, isOwn);
  const [kid1Name, setKid1Name] = useSynced(familyCode, 'kid1', 'Niki', isOwn);
  const [kid2Name, setKid2Name] = useSynced(familyCode, 'kid2', 'David', isOwn);

  const names   = [kid1Name, kid2Name];
  const setters = [setKid1Name, setKid2Name];

  function copyCode() {
    navigator.clipboard.writeText(familyCode).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  }

  function forcePush() {
    set(ref(db, `families/${familyCode}/records`), records).catch(() => {});
    set(ref(db, `families/${familyCode}/kid1`), kid1Name).catch(() => {});
    set(ref(db, `families/${familyCode}/kid2`), kid2Name).catch(() => {});
    setPushed(true); setTimeout(() => setPushed(false), 2500);
  }

  function joinCode() {
    const c = joinInput.trim().toUpperCase();
    if (c.length >= 4) { setFamilyCode(c); setJoinInput(''); setJoinOpen(false); }
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

  const stats = KIDS.map(({ id }) => {
    let good = 0, bad = 0;
    for (let d = 1; d <= daysInMonth; d++) {
      const rec = records[dateKey(viewYear, viewMonth, d)] || {};
      if (rec[id] === 'good') good++;
      if (rec[id] === 'bad')  bad++;
    }
    return { good, bad };
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
        <h1 className="text-xl font-extrabold mb-3" style={{ color: '#e6edf3', letterSpacing: '-0.5px' }}>
          ⭐ Behaviour Tracker
        </h1>

        {/* Always-visible sync bar */}
        <div className="rounded-xl px-3 py-2.5 mb-4" style={{ background: '#161b22', border: '1px solid #30363d' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold" style={{ color: '#6b7280' }}>Sync code</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: connected ? '#22c55e22' : '#ef444422', color: connected ? '#22c55e' : '#ef4444', border: `1px solid ${connected ? '#22c55e55' : '#ef444455'}` }}>
              {connected ? '● Online' : '● Offline'}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl font-extrabold tracking-widest flex-1" style={{ color: '#e8c547' }}>{familyCode}</span>
            <button onClick={copyCode}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
              style={{ background: copied ? '#22c55e22' : '#21262d', border: `1px solid ${copied ? '#22c55e' : '#30363d'}`, color: copied ? '#22c55e' : '#8b949e' }}>
              {copied ? '✓ Copied' : 'Copy'}
            </button>
            <button onClick={forcePush}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
              style={{ background: pushed ? '#22c55e22' : '#21262d', border: `1px solid ${pushed ? '#22c55e' : '#30363d'}`, color: pushed ? '#22c55e' : '#8b949e' }}>
              {pushed ? '✓ Pushed' : '⬆ Push'}
            </button>
            <button onClick={() => resetCode({ records, kid1: kid1Name, kid2: kid2Name })}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
              style={{ background: '#21262d', border: '1px solid #30363d', color: '#6b7280' }}>
              New ↺
            </button>
          </div>
          {/* Join row — always visible */}
          <div className="flex gap-2">
            <input
              value={joinInput}
              onChange={e => setJoinInput(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === 'Enter' && joinCode()}
              placeholder="Enter another device's code to join…"
              maxLength={10}
              className="flex-1 rounded-lg px-3 py-2 text-sm font-bold tracking-widest outline-none"
              style={{ background: '#0d1117', border: '1px solid #30363d', color: '#e6edf3', fontSize: '0.8rem' }}
            />
            <button onClick={joinCode}
              className="px-3 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95"
              style={{ background: '#e8c547', color: '#0d1117' }}>
              Join
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {KIDS.map(({ id, color }, i) => (
            <div key={id} className="rounded-2xl px-3 py-3"
              style={{ background: '#161b22', border: `1.5px solid ${color}44` }}>
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
        <span className="ml-auto" style={{ color: '#484f58' }}>? → ⭐ → ❌ → ?</span>
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
                    onClick={isFuture ? undefined : () => toggle(day, id)} />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sync modal */}

    </div>
  );
}
