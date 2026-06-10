import { useState } from 'react';
import { SupplementDetail } from './SupplementDetail';

export function TodayView({ supplements, log, today, onToggle }) {
  const [detailSupp, setDetailSupp] = useState(null);
  const dayLog = log[today] || {};

  const totalDoses = supplements.reduce((sum, s) => sum + s.timesPerDay, 0);
  const takenDoses = supplements.reduce((sum, s) => {
    const sl = dayLog[s.id] || [];
    return sum + sl.filter(Boolean).length;
  }, 0);

  const pct = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 0;
  const allDone = takenDoses === totalDoses && totalDoses > 0;

  const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <div className="p-4 pb-6">
      <div className="mb-6">
        <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">{dayName}</div>
        <div className="flex items-end justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">{dateStr}</h1>
          {allDone && <span className="text-sm font-semibold text-green-400">All done!</span>}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full" style={{ background: '#21262d' }}>
            <div className="h-2 rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: allDone ? '#22c55e' : '#3b82f6' }} />
          </div>
          <span className="text-sm font-semibold tabular-nums" style={{ color: allDone ? '#22c55e' : '#9ca3af' }}>
            {takenDoses}/{totalDoses}
          </span>
        </div>
      </div>

      {supplements.length === 0 ? (
        <div className="text-center text-gray-500 mt-16">
          <div className="text-5xl mb-4">💊</div>
          <p className="font-medium">No supplements yet</p>
          <p className="text-sm mt-1">Add some in the My List tab</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {supplements.map(supp => {
            const suppLog = dayLog[supp.id] || [];
            const taken = suppLog.filter(Boolean).length;
            const allTaken = taken === supp.timesPerDay;
            const hasDetail = !!(supp.description || supp.dosageText);
            return (
              <div key={supp.id} className="rounded-2xl p-4 transition-all"
                style={{ background: '#161b22', border: `1px solid ${allTaken ? supp.color + '50' : '#21262d'}`, opacity: allTaken ? 0.85 : 1 }}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: supp.color + '20' }}>{supp.emoji}</div>
                  <button className="flex-1 min-w-0 text-left" onClick={() => setDetailSupp(supp)}>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold leading-tight truncate"
                        style={{ textDecoration: allTaken ? 'line-through' : 'none', color: allTaken ? '#6b7280' : '#fff' }}>
                        {supp.name}
                      </span>
                      {hasDetail && <span className="text-xs flex-shrink-0" style={{ color: supp.color + '90' }}>ⓘ</span>}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5 truncate">
                      <span style={{ color: supp.color + 'cc' }}>{supp.dose}</span>
                      {supp.timesPerDay > 1 && <span className="text-gray-500"> × {supp.timesPerDay}/day</span>}
                      {supp.note ? <span className="text-gray-500"> · {supp.note}</span> : null}
                    </div>
                  </button>
                  <div className="flex gap-2 flex-shrink-0">
                    {Array.from({ length: supp.timesPerDay }).map((_, i) => {
                      const checked = suppLog[i] === true;
                      const label = supp.timeLabels?.[i];
                      return (
                        <div key={i} className="flex flex-col items-center gap-1">
                          {label && <span className="text-gray-500" style={{ fontSize: '0.52rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>}
                          <button onClick={() => onToggle(supp.id, i)}
                            className="rounded-lg flex items-center justify-center transition-all active:scale-90"
                            style={{ width: supp.timesPerDay > 2 ? 28 : 32, height: supp.timesPerDay > 2 ? 28 : 32, background: checked ? supp.color : '#21262d', border: `2px solid ${checked ? supp.color : '#30363d'}` }}>
                            {checked && <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
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
      {detailSupp && <SupplementDetail supp={detailSupp} onClose={() => setDetailSupp(null)} />}
    </div>
  );
}
