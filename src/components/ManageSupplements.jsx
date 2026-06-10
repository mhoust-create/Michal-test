import { useState } from 'react';

const EMOJIS = ['💊', '🌿', '🍄', '☀️', '🦴', '✨', '🧬', '🌊', '🍃', '🌸', '⚡', '🫐', '🧪', '🌾', '🫚'];
const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#ef4444', '#f97316'];
const UNITS = ['pill(s)', 'capsule(s)', 'drop(s)', 'spoon(s)', 'tablet(s)', 'scoop(s)', 'ml', 'mg', 'g'];

const EMPTY_FORM = {
  name: '',
  doseAmount: '1',
  unit: 'pill(s)',
  timesPerDay: 1,
  timeLabels: ['Morning', 'Noon', 'Evening'],
  note: '',
  emoji: '💊',
  color: '#22c55e',
};

function Form({ initial, onSave, onCancel, isEdit }) {
  const [form, setForm] = useState(initial);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const setLabel = (i, val) => setForm(f => {
    const labels = [...f.timeLabels];
    labels[i] = val;
    return { ...f, timeLabels: labels };
  });

  const handleSave = () => {
    if (!form.name.trim()) return;
    onSave({
      name: form.name.trim(),
      dose: `${form.doseAmount} ${form.unit}`,
      timesPerDay: form.timesPerDay,
      timeLabels: form.timesPerDay > 1 ? form.timeLabels.slice(0, form.timesPerDay) : undefined,
      note: form.note.trim(),
      emoji: form.emoji,
      color: form.color,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={e => e.target === e.currentTarget && onCancel()}
    >
      <div
        className="w-full rounded-t-3xl p-5 overflow-y-auto"
        style={{ background: '#161b22', maxWidth: 480, margin: '0 auto', maxHeight: '92vh' }}
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: '#30363d' }} />

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white">{isEdit ? 'Edit' : 'Add'} Supplement</h2>
          <button onClick={onCancel} className="text-gray-400 text-2xl leading-none">×</button>
        </div>

        {/* Emoji */}
        <p className="text-xs text-gray-400 mb-2">Icon</p>
        <div className="flex gap-2 flex-wrap mb-4">
          {EMOJIS.map(e => (
            <button
              key={e}
              onClick={() => set('emoji', e)}
              className="w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all"
              style={{
                background: form.emoji === e ? '#22c55e22' : '#21262d',
                border: `2px solid ${form.emoji === e ? '#22c55e' : 'transparent'}`,
              }}
            >
              {e}
            </button>
          ))}
        </div>

        {/* Color */}
        <p className="text-xs text-gray-400 mb-2">Color</p>
        <div className="flex gap-2 mb-5">
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => set('color', c)}
              className="w-7 h-7 rounded-full border-2 transition-all"
              style={{ background: c, borderColor: form.color === c ? '#fff' : 'transparent' }}
            />
          ))}
        </div>

        {/* Name */}
        <label className="block text-xs text-gray-400 mb-1">Name *</label>
        <input
          value={form.name}
          onChange={e => set('name', e.target.value)}
          placeholder="e.g. Vitamin D3+K2"
          className="w-full rounded-xl px-3 py-3 text-white text-sm mb-4 outline-none"
          style={{ background: '#21262d', border: '1px solid #30363d' }}
        />

        {/* Dose */}
        <label className="block text-xs text-gray-400 mb-1">Dose per serving</label>
        <div className="flex gap-2 mb-4">
          <input
            value={form.doseAmount}
            onChange={e => set('doseAmount', e.target.value)}
            className="w-20 rounded-xl px-3 py-3 text-white text-sm outline-none text-center"
            style={{ background: '#21262d', border: '1px solid #30363d' }}
          />
          <select
            value={form.unit}
            onChange={e => set('unit', e.target.value)}
            className="flex-1 rounded-xl px-3 py-3 text-white text-sm outline-none"
            style={{ background: '#21262d', border: '1px solid #30363d' }}
          >
            {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        {/* Times per day */}
        <label className="block text-xs text-gray-400 mb-2">Times per day</label>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map(n => (
            <button
              key={n}
              onClick={() => set('timesPerDay', n)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: form.timesPerDay === n ? '#22c55e' : '#21262d',
                color: form.timesPerDay === n ? '#0d1117' : '#9ca3af',
              }}
            >
              {n}×
            </button>
          ))}
        </div>

        {/* Time labels */}
        {form.timesPerDay > 1 && (
          <>
            <label className="block text-xs text-gray-400 mb-2">Time labels</label>
            <div className="flex gap-2 mb-4">
              {Array.from({ length: form.timesPerDay }).map((_, i) => (
                <input
                  key={i}
                  value={form.timeLabels[i] || ''}
                  onChange={e => setLabel(i, e.target.value)}
                  className="flex-1 rounded-xl px-2 py-2.5 text-white text-sm outline-none text-center"
                  style={{ background: '#21262d', border: '1px solid #30363d' }}
                />
              ))}
            </div>
          </>
        )}

        {/* Note */}
        <label className="block text-xs text-gray-400 mb-1">Note (optional)</label>
        <input
          value={form.note}
          onChange={e => set('note', e.target.value)}
          placeholder="e.g. After meal, with water"
          className="w-full rounded-xl px-3 py-3 text-white text-sm mb-6 outline-none"
          style={{ background: '#21262d', border: '1px solid #30363d' }}
        />

        <button
          onClick={handleSave}
          disabled={!form.name.trim()}
          className="w-full py-3.5 rounded-xl font-bold text-sm transition-opacity"
          style={{
            background: '#22c55e',
            color: '#0d1117',
            opacity: form.name.trim() ? 1 : 0.4,
          }}
        >
          {isEdit ? 'Save Changes' : 'Add Supplement'}
        </button>
      </div>
    </div>
  );
}

function supplementToForm(supp) {
  const parts = supp.dose.split(' ');
  return {
    name: supp.name,
    doseAmount: parts[0] || '1',
    unit: parts.slice(1).join(' ') || 'pill(s)',
    timesPerDay: supp.timesPerDay,
    timeLabels: supp.timeLabels || ['Morning', 'Noon', 'Evening'],
    note: supp.note || '',
    emoji: supp.emoji || '💊',
    color: supp.color || '#22c55e',
  };
}

export function ManageSupplements({ supplements, setSupplements }) {
  const [mode, setMode] = useState(null); // null | 'add' | { editId }
  const [deleteId, setDeleteId] = useState(null);

  const handleAdd = (data) => {
    setSupplements(prev => [...prev, { id: `supp-${Date.now()}`, ...data }]);
    setMode(null);
  };

  const handleEdit = (data) => {
    setSupplements(prev => prev.map(s => s.id === mode.editId ? { id: s.id, ...data } : s));
    setMode(null);
  };

  const handleDelete = (id) => {
    setSupplements(prev => prev.filter(s => s.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="p-4 pb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">My Supplements</h1>
          <p className="text-xs text-gray-500 mt-0.5">{supplements.length} supplement{supplements.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setMode('add')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold"
          style={{ background: '#22c55e', color: '#0d1117' }}
        >
          + Add
        </button>
      </div>

      {supplements.length === 0 ? (
        <div className="text-center text-gray-500 mt-16">
          <div className="text-5xl mb-4">💊</div>
          <p className="font-medium">No supplements yet</p>
          <p className="text-sm mt-1">Tap + Add to get started</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {supplements.map(supp => (
            <div
              key={supp.id}
              className="rounded-2xl p-4"
              style={{ background: '#161b22', border: '1px solid #21262d' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: supp.color + '20' }}
                >
                  {supp.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white truncate">{supp.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    <span style={{ color: supp.color + 'cc' }}>{supp.dose}</span>
                    {supp.timesPerDay > 1 ? ` × ${supp.timesPerDay}/day` : ' /day'}
                    {supp.note ? ` · ${supp.note}` : ''}
                  </div>
                  {supp.timesPerDay > 1 && supp.timeLabels && (
                    <div className="text-xs text-gray-500 mt-0.5">
                      {supp.timeLabels.slice(0, supp.timesPerDay).join(' · ')}
                    </div>
                  )}
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => setMode({ editId: supp.id })}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
                    style={{ background: '#21262d', color: '#9ca3af' }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => setDeleteId(supp.id)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold"
                    style={{ background: '#21262d', color: '#ef4444' }}
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add form */}
      {mode === 'add' && (
        <Form
          initial={EMPTY_FORM}
          onSave={handleAdd}
          onCancel={() => setMode(null)}
          isEdit={false}
        />
      )}

      {/* Edit form */}
      {mode?.editId && (() => {
        const supp = supplements.find(s => s.id === mode.editId);
        if (!supp) return null;
        return (
          <Form
            initial={supplementToForm(supp)}
            onSave={handleEdit}
            onCancel={() => setMode(null)}
            isEdit={true}
          />
        );
      })()}

      {/* Delete confirm */}
      {deleteId && (() => {
        const supp = supplements.find(s => s.id === deleteId);
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: 'rgba(0,0,0,0.75)' }}
            onClick={e => e.target === e.currentTarget && setDeleteId(null)}
          >
            <div className="w-full rounded-2xl p-5" style={{ background: '#161b22', border: '1px solid #21262d' }}>
              <h3 className="font-bold text-white mb-2">Remove supplement?</h3>
              <p className="text-sm text-gray-400 mb-5">
                <span style={{ color: supp?.color }}>{supp?.emoji} {supp?.name}</span> will be removed from your list. Your log history will be preserved.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-300"
                  style={{ background: '#21262d' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background: '#ef4444', color: '#fff' }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
