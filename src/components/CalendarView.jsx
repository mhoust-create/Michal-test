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

export function CalendarView({ supplements, log, today, onToggle }) {
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date(today);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selectedDateStr, setSelectedDateStr] = useState(null);
  const [detailSupp, setDetailSupp] = useState(null);

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

  const selectedLog = selectedDateStr ? (log[selectedDateStr] || {}) : null;

  // stats for selected day
  let takenDoses = 0, totalDoses = 0;
  if (selectedDateStr) {
    totalDoses = supplements.reduce((sum, s) => sum + s.timesPerDay, 0);
    takenDoses = supplements.reduce((sum, s) => {
      const sl = (selectedLog?.[s.id] || []);
      return sum + sl.filter(Boolean).length;
    }, 0);
  }
  const allDone = totalDoses > 0 && takenDoses === totalDoses;

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
        >‹</button>
        <h2 className="text-base font-bold text-white">{monthName}</h2>
        <button
          onClick={nextMonth}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-300 text-lg"
          style={{ background: '#161b22' }}
        >›</button>
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
                  : status === 'full' ? '#22c55e22'
                  : status === 'partial' ? '#f59e0b18'
                  : '#161b22',
                color: isSelected ? '#fff'
                  : isFuture ? '#2d3748'
                  : isToday ? '#22c55e'
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
      </div>

      {/* Month summary */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="rounded-2xl p-3 text-center" style={{ background: '#161b22', border: '1px solid #21262d' }}>
          <div className="text-2xl font-bold" style={{ color: '#22c55e' }}>{monthFull.length}</div>
          <div className="text-xs text-gray-400 mt-0.5">Perfect days</div>
        </div>
        <div className="rounded-2xl p-3 text-center" style={{ background: '#161b22', border: '1px solid #21262d' }}>
          <div className="text-2xl font-bold" style={{ color: '#f59e0b' }}>{monthPartial.length}</div>
          <div className="text-xs text-gray-400 mt-0.5">Partial days</div>
        </div>
      </div>

      {/* Selected day panel */}
      {selectedDateStr && (
        <div className="rounded-2xl p-4 slide-up" style={{ background: '#161b22', border: '1px solid #21262d' }}>
          {/* Day header + progress */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-white text-sm">
              {new Date(selectedDateStr + 'T12:00:00').toLocaleDateString('en-US', {
                weekday: 'long', month: 'long', day: 'numeric',
              })}
            </h3>
            {allDone && <span className="text-xs font-semibold text-green-400">All done!</span>}
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-1.5 rounded-full" style={{ background: '#21262d' }}>
              <div
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: totalDoses > 0 ? `${Math.round((takenDoses / totalDoses) * 100)}%` : '0%',
                  background: allDone ? '#22c55e' : '#3b82f6',
                }}
              />
            </div>
            <span className="text-xs font-semibold tabular-nums" style={{ color: allDone ? '#22c55e' : '#9ca3af' }}>
              {takenDoses}/{totalDoses}
            </span>
          </div>

          {/* Supplement rows with checkboxes */}
          {supplements.length === 0 ? (
            <p className="text-xs text-gray-500">No supplements in list</p>
          ) : (
            <div className="flex flex-col gap-3">
              {supplements.map(supp => {
                const sl = selectedLog?.[supp.id] || [];
                const taken = sl.filter(Boolean).length;
                const allTaken = taken === supp.timesPerDay;
                const hasDetail = !!(supp.description || supp.dosageText);

                return (
                  <div key={supp.id} className="flex items-center gap-3">
                    {/* Emoji */}
                    <span className="text-lg flex-shrink-0">{supp.emoji}</span>

                    {/* Name — tappable for detail */}
                    <button
                      className="flex-1 min-w-0 text-left"
                      onClick={() => setDetailSupp(supp)}
                    >
                      <div className="flex items-center gap-1">
                        <span
                          className="text-sm truncate"
                          style={{
                            color: allTaken ? '#6b7280' : '#d1d5db',
                            textDecoration: allTaken ? 'line-through' : 'none',
                          }}
                        >
                          {supp.name}
                        </span>
                        {hasDetail && (
                          <span className="text-xs flex-shrink-0" style={{ color: supp.color + '80' }}>ⓘ</span>
                        )}
                      </div>
                    </button>

                    {/* Dot indicators + count */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex gap-1">
                        {Array.from({ length: supp.timesPerDay }).map((_, i) => (
                          <span
                            key={i}
                            className="w-2 h-2 rounded-full"
                            style={{ background: sl[i] ? supp.color : '#21262d' }}
                          />
                        ))}
                      </div>
                      <span
                        className="text-xs font-semibold tabular-nums w-6 text-right"
                        style={{ color: allTaken ? '#22c55e' : taken > 0 ? '#f59e0b' : '#4b5563' }}
                      >
                        {taken}/{supp.timesPerDay}
                      </span>
                    </div>

                    {/* Checkboxes */}
                    <div className="flex gap-1.5 flex-shrink-0">
                      {Array.from({ length: supp.timesPerDay }).map((_, i) => {
                        const checked = sl[i] === true;
                        const lbl = supp.timeLabels?.[i];
                        return (
                          <div key={i} className="flex flex-col items-center gap-0.5">
                            {lbl && (
                              <span style={{ fontSize: '0.48rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                {lbl}
                              </span>
                            )}
                            <button
                              onClick={() => onToggle(selectedDateStr, supp.id, i)}
                              className="rounded-lg flex items-center justify-center transition-all active:scale-90"
                              style={{
                                width: supp.timesPerDay > 2 ? 26 : 30,
                                height: supp.timesPerDay > 2 ? 26 : 30,
                                background: checked ? supp.color : '#21262d',
                                border: `2px solid ${checked ? supp.color : '#30363d'}`,
                              }}
                            >
                              {checked && (
                                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                  <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {detailSupp && <SupplementDetail supp={detailSupp} onClose={() => setDetailSupp(null)} />}
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
