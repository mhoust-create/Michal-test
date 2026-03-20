import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Strategy } from './components/Strategy';
import { Portfolio } from './components/Portfolio';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div style={{ background: '#080e1c', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <main>
        <Hero />
        <About />
        <Strategy />
        <Portfolio />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
