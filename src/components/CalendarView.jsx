import { useState } from 'react';

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

export function CalendarView({ supplements, log, today }) {
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date(today);
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selectedDay, setSelectedDay] = useState(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthName = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setSelectedDay(null);
    setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setSelectedDay(null);
    setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  };

  const selectedDateStr = selectedDay ? getDateStr(year, month, selectedDay) : null;
  const selectedLog = selectedDateStr ? (log[selectedDateStr] || {}) : null;

  // Compute streak (consecutive full days up to today)
  const streak = computeStreak(supplements, log, today);

  // Compute month stats
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
          const isSelected = day === selectedDay;

          return (
            <button
              key={day}
              onClick={() => !isFuture && setSelectedDay(day === selectedDay ? null : day)}
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

      {/* Selected day detail */}
      {selectedDay && (
        <div className="rounded-2xl p-4" style={{ background: '#161b22', border: '1px solid #21262d' }}>
          <h3 className="font-semibold text-white mb-3 text-sm">
            {new Date(year, month, selectedDay).toLocaleDateString('en-US', {
              weekday: 'long', month: 'long', day: 'numeric',
            })}
          </h3>
          {supplements.length === 0 ? (
            <p className="text-xs text-gray-500">No supplements in list</p>
          ) : (
            <div className="flex flex-col gap-2.5">
              {supplements.map(supp => {
                const sl = (selectedLog?.[supp.id] || []);
                const taken = sl.filter(Boolean).length;
                const total = supp.timesPerDay;
                return (
                  <div key={supp.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{supp.emoji}</span>
                      <span className="text-sm text-gray-300">{supp.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Dot indicators */}
                      <div className="flex gap-1">
                        {Array.from({ length: total }).map((_, i) => (
                          <span
                            key={i}
                            className="w-2 h-2 rounded-full"
                            style={{ background: sl[i] ? supp.color : '#21262d' }}
                          />
                        ))}
                      </div>
                      <span
                        className="text-xs font-semibold tabular-nums"
                        style={{ color: taken === total ? '#22c55e' : taken > 0 ? '#f59e0b' : '#4b5563' }}
                      >
                        {taken}/{total}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
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
