import { useState } from 'react';
import { SupplementDetail } from './SupplementDetail';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function getDateStr(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function getDayStatus(dateStr, supplements, log) {
  const dayLog = log[dateStr];
  if (!dayLog) return 'none';
  const totalDoses = supplements.reduce((sum, s) => sum + s.timesPerDay, 0);
  if (totalDoses === 0) return 'none';
  const taken = supplements.reduce((sum, s) => {
    const sl = dayLog[s.id] || [];
    return sum + sl.filter(Boolean).length;
  }, 0);
  if (taken === 0) return 'none';
  if (taken === totalDoses) return 'full';
  return 'partial';
}

function DaySheet({ dateStr, supplements, log, onToggle, onClose }) {
  const [detailSupp, setDetailSupp] = useState(null);
  const dayLog = log[dateStr] || {};

  const totalDoses = supplements.reduce((sum, s) => sum + s.timesPerDay, 0);
  const takenDoses = supplements.reduce((sum, s) => {
    const sl = dayLog[s.id] || [];
    return sum + sl.filter(Boolean).length;
  }, 0);
  const pct = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 0;
  const allDone = takenDoses === totalDoses && totalDoses > 0;

  const label = new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(0,0,0,0.6)' }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl slide-up"
        style={{
          background: '#161b22',
          border: '1px solid #21262d',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: 'max(24px, env(safe-area-inset-bottom, 24px))',
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full" style={{ background: '#30363d' }} />
        </div>

        {/* Header */}
        <div className="px-5 pt-2 pb-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold text-white text-base">{label}</h2>
            <button onClick={onClose} className="text-gray-500 text-xl leading-none px-1">×</button>
          </div>
          {/* Progress bar */}
          <div className="flex items-center gap-3 mt-3">
            <div className="flex-1 h-1.5 rounded-full" style={{ background: '#21262d' }}>
              <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, background: allDone ? '#22c55e' : '#3b82f6' }}
              />
            </div>
            <span className="text-xs font-semibold tabular-nums" style={{ color: allDone ? '#22c55e' : '#9ca3af' }}>
              {takenDoses}/{totalDoses}
            </span>
            {allDone && <span className="text-xs font-semibold text-green-400">All done!</span>}
          </div>
        </div>

        {/* Supplement list */}
        <div className="overflow-y-auto flex-1 px-5">
          {supplements.length === 0 ? (
            <p className="text-sm text-gray-500 text-center mt-8">No supplements in list</p>
          ) : (
            <div className="flex flex-col gap-3 pb-2">
              {supplements.map(supp => {
                const suppLog = dayLog[supp.id] || [];
                const taken = suppLog.filter(Boolean).length;
                const allTaken = taken === supp.timesPerDay;
                const hasDetail = !!(supp.description || supp.dosageText);

                return (
                  <div
                    key={supp.id}
                    className="rounded-2xl p-4 transition-all"
                    style={{
                      background: '#0d1117',
                      border: `1px solid ${allTaken ? supp.color + '50' : '#21262d'}`,
                      opacity: allTaken ? 0.85 : 1,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ background: supp.color + '20' }}
                      >
                        {supp.emoji}
                      </div>

                      <button className="flex-1 min-w-0 text-left" onClick={() => setDetailSupp(supp)}>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="font-semibold leading-tight truncate"
                            style={{
                              textDecoration: allTaken ? 'line-through' : 'none',
                              color: allTaken ? '#6b7280' : '#fff',
                            }}
                          >
                            {supp.name}
                          </span>
                          {hasDetail && (
                            <span className="text-xs flex-shrink-0" style={{ color: supp.color + '90' }}>ⓘ</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5 truncate">
                          <span style={{ color: supp.color + 'cc' }}>{supp.dose}</span>
                          {supp.timesPerDay > 1 && <span className="text-gray-500"> × {supp.timesPerDay}/day</span>}
                          {supp.note ? <span className="text-gray-500"> · {supp.note}</span> : null}
                        </div>
                      </button>

                      {/* Dose checkboxes */}
                      <div className="flex gap-2 flex-shrink-0">
                        {Array.from({ length: supp.timesPerDay }).map((_, i) => {
                          const checked = suppLog[i] === true;
                          const lbl = supp.timeLabels?.[i];
                          return (
                            <div key={i} className="flex flex-col items-center gap-1">
                              {lbl && (
                                <span className="text-gray-500" style={{ fontSize: '0.52rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                  {lbl}
                                </span>
                              )}
                              <button
                                onClick={() => onToggle(dateStr, supp.id, i)}
                                className="rounded-lg flex items-center justify-center transition-all active:scale-90"
                                style={{
                                  width: supp.timesPerDay > 2 ? 28 : 32,
                                  height: supp.timesPerDay > 2 ? 28 : 32,
                                  background: checked ? supp.color : '#21262d',
                                  border: `2px solid ${checked ? supp.color : '#30363d'}`,
                                }}
                              >
                                {checked && (
                                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {detailSupp && <SupplementDetail supp={detailSupp} onClose={() => setDetailSupp(null)} />}
    </>
  );
}

export function CalendarView({ supplements, log, today, onToggle }) {
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date(today);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selectedDateStr, setSelectedDateStr] = useState(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setSelectedDateStr(null);
    setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setSelectedDateStr(null);
    setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  };

  const streak = computeStreak(supplements, log, today);

  const monthFull = [];
  const monthPartial = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const ds = getDateStr(year, month, d);
    const st = getDayStatus(ds, supplements, log);
    if (st === 'full') monthFull.push(d);
    if (st === 'partial') monthPartial.push(d);
  }

  return (
    <div className="p-4 pb-6">
      {/* Streak banner */}
      {streak > 0 && (
        <div
          className="rounded-2xl p-4 mb-5 flex items-center gap-3"
          style={{ background: 'linear-gradient(135deg, #22c55e20, #06b6d420)', border: '1px solid #22c55e30' }}
        >
          <span className="text-3xl">🔥</span>
          <div>
            <div className="font-bold text-white text-lg leading-tight">{streak}-day streak</div>
            <div className="text-xs text-gray-400">Keep it up — all doses taken!</div>
          </div>
        </div>
      )}

      {/* Month nav */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={prevMonth}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-300 text-lg"
          style={{ background: '#161b22' }}
        >
          ‹
        </button>
        <h2 className="text-base font-bold text-white">{monthName}</h2>
        <button
          onClick={nextMonth}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-300 text-lg"
          style={{ background: '#161b22' }}
        >
          ›
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-xs text-gray-500 py-1">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 mb-5">
        {Array.from({ length: firstDow }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
          const dateStr = getDateStr(year, month, day);
          const status = getDayStatus(dateStr, supplements, log);
          const isToday = dateStr === today;
          const isFuture = dateStr > today;
          const isSelected = dateStr === selectedDateStr;

          return (
            <button
              key={day}
              onClick={() => !isFuture && setSelectedDateStr(isSelected ? null : dateStr)}
              disabled={isFuture}
              className="relative aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all"
              style={{
                background: isSelected
                  ? '#22c55e'
                  : status === 'full'
                    ? '#22c55e22'
                    : status === 'partial'
                      ? '#f59e0b18'
                      : '#161b22',
                color: isSelected
                  ? '#fff'
                  : isFuture
                    ? '#2d3748'
                    : isToday
                      ? '#22c55e'
                      : '#e6edf3',
                border: isToday && !isSelected ? '2px solid #22c55e' : '2px solid transparent',
              }}
            >
              {day}
              {!isSelected && status !== 'none' && (
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: status === 'full' ? '#22c55e' : '#f59e0b' }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-5 mb-5 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: '#22c55e' }} />
          All taken
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: '#f59e0b' }} />
          Partial
        </div>
        <div className="ml-auto text-xs text-gray-600">Tap any day to edit</div>
      </div>

      {/* Month summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl p-3 text-center" style={{ background: '#161b22', border: '1px solid #21262d' }}>
          <div className="text-2xl font-bold" style={{ color: '#22c55e' }}>{monthFull.length}</div>
          <div className="text-xs text-gray-400 mt-0.5">Perfect days</div>
        </div>
        <div className="rounded-2xl p-3 text-center" style={{ background: '#161b22', border: '1px solid #21262d' }}>
          <div className="text-2xl font-bold" style={{ color: '#f59e0b' }}>{monthPartial.length}</div>
          <div className="text-xs text-gray-400 mt-0.5">Partial days</div>
        </div>
      </div>

      {/* Day detail sheet */}
      {selectedDateStr && (
        <DaySheet
          dateStr={selectedDateStr}
          supplements={supplements}
          log={log}
          onToggle={onToggle}
          onClose={() => setSelectedDateStr(null)}
        />
      )}
    </div>
  );
}

function computeStreak(supplements, log, today) {
  if (supplements.length === 0) return 0;
  let streak = 0;
  const d = new Date(today);
  while (true) {
    const ds = d.toISOString().slice(0, 10);
    const st = getDayStatus(ds, supplements, log);
    if (st !== 'full') break;
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}
