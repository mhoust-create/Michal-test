export function SupplementDetail({ supp, onClose }) {
  if (!supp) return null;
  const hasContent = !!(supp.description || supp.dosageText);
  return (
    <div className="fixed inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.82)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="w-full rounded-t-3xl overflow-y-auto slide-up"
        style={{ background: '#161b22', maxWidth: 480, margin: '0 auto', maxHeight: '85vh' }}>
        <div className="sticky top-0 pt-3 pb-2 flex justify-center" style={{ background: '#161b22' }}>
          <div className="w-10 h-1 rounded-full" style={{ background: '#30363d' }} />
        </div>
        <div className="px-5 pb-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: supp.color + '25' }}>{supp.emoji}</div>
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-white leading-tight">{supp.name}</h2>
              <p className="text-sm mt-0.5" style={{ color: supp.color }}>
                {supp.dose}{supp.timesPerDay > 1 ? ` × ${supp.timesPerDay}/day` : ' /day'}{supp.note ? ` · ${supp.note}` : ''}
              </p>
            </div>
          </div>
          {supp.timesPerDay > 1 && supp.timeLabels && (
            <div className="flex gap-2 mb-5">
              {supp.timeLabels.slice(0, supp.timesPerDay).map((label, i) => (
                <div key={i} className="flex-1 py-2 rounded-xl text-center text-xs font-semibold" style={{ background: supp.color + '18', color: supp.color }}>{label}</div>
              ))}
            </div>
          )}
          {supp.description && (
            <div className="mb-5">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Description</p>
              <p className="text-sm text-gray-300 leading-relaxed">{supp.description}</p>
            </div>
          )}
          {supp.dosageText && (
            <div className="mb-5">
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#3b82f6aa' }}>Dosage instructions</p>
              <div className="rounded-2xl p-4" style={{ background: '#0d1117', border: '1px solid #3b82f630' }}>
                <p className="text-sm text-gray-300 leading-relaxed">{supp.dosageText}</p>
              </div>
            </div>
          )}
          {!hasContent && (
            <div className="rounded-2xl p-5 mb-5 text-center" style={{ background: '#0d1117', border: '1px dashed #30363d' }}>
              <p className="text-sm text-gray-400 font-medium">No description yet</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">Import from a product URL or edit this supplement to add details.</p>
            </div>
          )}
          <button onClick={onClose} className="w-full py-3 rounded-xl text-sm font-semibold text-gray-300" style={{ background: '#21262d' }}>Close</button>
        </div>
      </div>
    </div>
  );
}
