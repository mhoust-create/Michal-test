import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { TrackRecord } from './components/TrackRecord';
import { CaseStudies } from './components/CaseStudies';
import { Portfolio } from './components/Portfolio';
import { CeeRegion } from './components/CeeRegion';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <main>
        <Hero />          {/* Dark navy */}
        <About />         {/* Light #F8F9FC */}
        <TrackRecord />   {/* Dark #0A1628 */}
        <CaseStudies />   {/* Dark mid #132035 */}
        <Portfolio />     {/* Light #F8F9FC */}
        <CeeRegion />     {/* Dark mid #1B2D4A */}
        <Team />          {/* White #FFFFFF */}
        <Contact />       {/* Light #F8F9FC */}
      </main>
      <Footer />          {/* Dark #04080f */}
    </div>
  );
}

export default App;
