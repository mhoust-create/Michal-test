import { useState, useEffect } from 'react';
import { BehaviourTracker } from './components/BehaviourTracker';

function App() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setInstalled(true);
      setInstallPrompt(null);
    });
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setInstalled(true);
    setInstallPrompt(null);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#0d1117' }}>
      {/* Install banner */}
      {installPrompt && !installed && (
        <div
          className="flex items-center justify-between px-4 py-2 text-sm"
          style={{ background: '#161b22', borderBottom: '1px solid #21262d' }}
        >
          <span style={{ color: '#8b949e' }}>Add to your home screen for quick access</span>
          <button
            onClick={handleInstall}
            className="px-3 py-1 rounded-lg font-semibold text-xs transition-all active:scale-95"
            style={{ background: '#e8c547', color: '#0d1117' }}
          >
            Install
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <BehaviourTracker />
      </div>
    </div>
  );
}

export default App;
