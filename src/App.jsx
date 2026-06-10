import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TodayView } from './components/TodayView';
import { CalendarView } from './components/CalendarView';
import { ManageSupplements } from './components/ManageSupplements';

const DEFAULT_SUPPLEMENTS = [
  { id: 'vit-d3-k2', name: 'Vitamin D3+K2', dose: '2 drops', timesPerDay: 1, note: 'After meal', emoji: '☀️', color: '#f59e0b' },
  { id: 'cholesterol', name: 'Cholesterol Complex', dose: '1 pill', timesPerDay: 3, timeLabels: ['Morning', 'Noon', 'Evening'], note: 'After meal', emoji: '💊', color: '#3b82f6' },
  { id: 'reishi', name: 'Reishi', dose: '2 pills', timesPerDay: 1, note: '', emoji: '🍄', color: '#8b5cf6' },
  { id: 'ashwagandha', name: 'Ashwagandha', dose: '1 pill', timesPerDay: 1, note: '', emoji: '🌿', color: '#22c55e' },
  { id: 'joint-support', name: 'Joint Support', dose: '2 spoons', timesPerDay: 1, note: '', emoji: '🦴', color: '#06b6d4' },
  { id: 'collagen', name: 'Collagen', dose: '1 spoon', timesPerDay: 1, note: '', emoji: '✨', color: '#ec4899' },
];

const NAV = [
  { id: 'today', label: 'Today', icon: '✅' },
  { id: 'calendar', label: 'Calendar', icon: '📅' },
  { id: 'list', label: 'My List', icon: '💊' },
];

function App() {
  const [activeTab, setActiveTab] = useState('today');
  const [supplements, setSupplements] = useLocalStorage('supps_list', DEFAULT_SUPPLEMENTS);
  const [log, setLog] = useLocalStorage('supps_log', {});

  const today = new Date().toISOString().slice(0, 10);

  const toggleDose = (suppId, doseIndex) => {
    setLog(prev => {
      const dayLog = prev[today] || {};
      const suppLog = dayLog[suppId] ? [...dayLog[suppId]] : [];
      suppLog[doseIndex] = !suppLog[doseIndex];
      return { ...prev, [today]: { ...dayLog, [suppId]: suppLog } };
    });
  };

  return (
    <div className="flex flex-col h-screen" style={{ background: '#0d1117' }}>
      <div className="flex-1 overflow-hidden">
        {activeTab === 'today' && (
          <div className="h-full overflow-y-auto">
            <TodayView supplements={supplements} log={log} today={today} onToggle={toggleDose} />
          </div>
        )}
        {activeTab === 'calendar' && (
          <div className="h-full overflow-y-auto">
            <CalendarView supplements={supplements} log={log} today={today} />
          </div>
        )}
        {activeTab === 'list' && (
          <div className="h-full overflow-y-auto">
            <ManageSupplements supplements={supplements} setSupplements={setSupplements} />
          </div>
        )}
      </div>

      <nav
        className="flex items-center justify-around py-2 px-2"
        style={{
          background: '#161b22',
          borderTop: '1px solid #21262d',
          paddingBottom: 'max(8px, env(safe-area-inset-bottom, 8px))',
        }}
      >
        {NAV.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all"
            style={{
              background: activeTab === id ? '#21262d' : 'transparent',
              color: activeTab === id ? '#22c55e' : '#6b7280',
              minWidth: 64,
            }}
          >
            <span className="text-xl">{icon}</span>
            <span className="font-medium uppercase tracking-wider" style={{ fontSize: '0.6rem' }}>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
