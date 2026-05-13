import { BehaviourTracker } from './components/BehaviourTracker';

function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#0d1117' }}>
      <div className="flex-1 overflow-y-auto">
        <BehaviourTracker />
      </div>
    </div>
  );
}

export default App;
