import { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { CalendarView } from './components/CalendarView';
import { ManageSupplements } from './components/ManageSupplements';

const DEFAULT_SUPPLEMENTS = [
  {
    id: 'vit-d3-k2',
    name: 'Vitamin D3+K2',
    dose: '2 drops',
    timesPerDay: 1,
    note: 'After meal',
    emoji: '☀️',
    color: '#f59e0b',
    description: 'Vitamín D3 z lanolinu kombinovaný s vitamínem K2 (MK-7), rozpouštěné v MCT oleji pro maximální vstřebatelnost. Podporuje zdraví kostí, normální funkci imunitního systému a metabolismus vápníku. Vhodné pro sportovce, osoby se sníženou imunitou nebo během zimy.',
    dosageText: '2 kapky denně (1000 IU D3 + 50 μg K2). Lze nanest přímo do úst nebo na lžíčku, případně přidat do jídla – vitamíny jsou tepelně stabilní.',
  },
  {
    id: 'cholesterol',
    name: 'Cholesterol Complex',
    dose: '1 pill',
    timesPerDay: 3,
    timeLabels: ['Morning', 'Noon', 'Evening'],
    note: 'After meal',
    emoji: '💊',
    color: '#3b82f6',
    description: 'Kombinace prémiových přírodnich extraktů, omega-3 mastných kyselin a vitamínů skupiny B ve veganských kapslích. Obsahuje extrakt z červené rýže bohatý na monakolin K – stejnou účinnou látku jako v lécích na snížení cholesterolu. 11 účinných látek pro komplexní podporu lipidového spektra.',
    dosageText: '1 kapsle 3× denně (ráno, v poledne, večer) po jídle.',
  },
  {
    id: 'reishi',
    name: 'Reishi',
    dose: '2 pills',
    timesPerDay: 1,
    note: '',
    emoji: '🍄',
    color: '#8b5cf6',
    description: 'Houba reši (Ganoderma lucidum) s pozitivními účinky na imunitní systém a celkové zdraví. Obsah 50 % polysacharidů včetně beta-glukanů. Přispívá k přirozené imunitě, normální hladině cholesterolu a normální funkci oběhové soustavy.',
    dosageText: '2 kapsle denně. Balíneck 90 kapslí (45 dávek).',
  },
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    dose: '1 pill',
    timesPerDay: 1,
    note: '',
    emoji: '🌿',
    color: '#22c55e',
    description: 'Čistý extrakt KSM-66 s obsahem 5 % withanolidů – bioaktivních látek zodpovědných za zdravotní benefity ashwagandhy. Podporuje duševní a kognitivní aktivitu, relaxaci a funkčnost reprodukčního systému. Bez přídatných látek, vegané celulozy kapsle.',
    dosageText: '1 kapsle denně, ideálně s jídlem (withanolidy jsou rozpustné v tucich). Užívat pravidelně minimálně 4 týdny pro viditelné výsledky.',
  },
  {
    id: 'joint-support',
    name: 'Joint Support',
    dose: '1 spoon',
    timesPerDay: 2,
    note: '',
    emoji: '🦴',
    color: '#06b6d4',
    description: 'Komplexní kloubni výživa se 3 typy kolágenu: Peptinex (bioaktivní peptidy), Ovomet® (kolagen ze slepichích skoprřin) a kolágen typu II z kurĞte. Obsahuje Curcumin C3 Reduct®, Boswellia (65 % bosvelových kyselin), chondroitin, glukosamin a MSM. Určeno pro aktivní jedince pro podporu kloubů, vazů a šlach.',
    dosageText: '2 lžíce denně (2 oddělené dávky po 1 lžíci). Rozmichat ve vodě nebo šťávě.',
  },
  {
    id: 'collagen',
    name: 'Collagen',
    dose: '1 spoon',
    timesPerDay: 1,
    note: '',
    emoji: '✨',
    color: '#ec4899',
    description: 'Hovezí kolagení peptidy (grass-fed) s vitamínem C pro podporu tvorby kolágenu v těle. Jedna dávka (6 g) obsahuje 5 g hydrolyzovaných kolageních peptidů a 250 mg vitamínu C. Výborná rozpustnost, čisté složení bez beta-karotenu.',
    dosageText: '1 měrná lžíce (6 g) denně. Pro silnější účinek možené užívat 2 dávky denně. Rozmichat ve vodě nebo šťávě.',
  },
];

const NAV = [
  { id: 'calendar', label: 'Calendar', icon: '📅' },
  { id: 'list', label: 'My List', icon: '💊' },
];

function App() {
  const [activeTab, setActiveTab] = useState('calendar');
  const [supplements, setSupplements] = useLocalStorage('supps_list', DEFAULT_SUPPLEMENTS);
  const [log, setLog] = useLocalStorage('supps_log', {});

  const today = new Date().toISOString().slice(0, 10);

  // One-time migration: add descriptions to existing supplements that are missing them
  useEffect(() => {
    const needsMigration = supplements.some(s => {
      const def = DEFAULT_SUPPLEMENTS.find(d => d.id === s.id);
      return def && !s.description && def.description;
    });
    if (needsMigration) {
      setSupplements(prev => prev.map(s => {
        const def = DEFAULT_SUPPLEMENTS.find(d => d.id === s.id);
        if (def && !s.description && def.description) {
          return { ...s, description: def.description, dosageText: def.dosageText };
        }
        return s;
      }));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleDose = (dateStr, suppId, doseIndex) => {
    setLog(prev => {
      const dayLog = prev[dateStr] || {};
      const suppLog = dayLog[suppId] ? [...dayLog[suppId]] : [];
      suppLog[doseIndex] = !suppLog[doseIndex];
      return { ...prev, [dateStr]: { ...dayLog, [suppId]: suppLog } };
    });
  };

  return (
    <div className="flex flex-col h-screen" style={{ background: '#0d1117' }}>
      <div className="flex-1 overflow-hidden">
        {activeTab === 'calendar' && (
          <div className="h-full overflow-y-auto">
            <CalendarView supplements={supplements} log={log} today={today} onToggle={toggleDose} />
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
