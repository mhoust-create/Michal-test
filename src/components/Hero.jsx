import { useEffect, useRef } from 'react';

const GOLD = '#D4A853';
const DARK = '#0A1628';
const CREAM = '#F0EBE0';
const MUTED = '#8C9198';

export function Hero() {
  const lineRef = useRef(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const t = setTimeout(() => { el.style.width = '80px'; }, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        background: DARK,
      }}
    >
      {/* Background geometric grid */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <svg
          style={{ position: 'absolute', top: 0, right: 0, width: '55%', height: '100%', opacity: 0.03 }}
          viewBox="0 0 600 800"
          fill="none"
          preserveAspectRatio="xMaxYMid slice"
        >
          {[0, 70, 140, 210, 280, 350, 420, 490].map((x, i) => (
            <line key={i} x1={x} y1="0" x2={x + 450} y2="800" stroke={GOLD} strokeWidth="1" />
          ))}
        </svg>
        {/* Gold radial glow */}
        <div style={{
          position: 'absolute', top: '35%', left: '45%', width: 700, height: 700,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(212,168,83,0.05) 0%, transparent 65%)',
          borderRadius: '50%',
        }} />
        {/* EMMA red glow — subtle brand presence top-right */}
        <div style={{
          position: 'absolute', top: '8%', right: '4%', width: 280, height: 280,
          background: 'radial-gradient(circle, rgba(200,16,46,0.05) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 180,
          background: `linear-gradient(to bottom, transparent, ${DARK})`,
        }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 2rem', paddingTop: 120 }}>
        <div style={{ maxWidth: 820 }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ width: 36, height: 1, background: GOLD }} />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.7rem', fontWeight: 500,
              letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD,
            }}>
              Investment Management Group
            </span>
          </div>

          {/* Main heading */}
          <h1 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
            fontWeight: 400, lineHeight: 1.1,
            color: CREAM, margin: '0 0 1.5rem', letterSpacing: '-0.01em',
          }}>
            Building{' '}
            <em style={{ color: GOLD, fontStyle: 'italic' }}>long-term value</em>
            <br />across Central &amp; Eastern Europe
          </h1>

          {/* Animated gold line */}
          <div ref={lineRef} style={{
            height: 1, width: 0,
            background: `linear-gradient(to right, ${GOLD}, transparent)`,
            marginBottom: '2rem',
            transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
          }} />

          {/* Subheadline */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.8,
            color: MUTED, maxWidth: 560, margin: '0 0 3rem',
          }}>
            Founded in 2012 by Jiří Šmejc, EMMA Capital actively manages a €1.45bn
            portfolio of market-leading businesses — from gaming and energy to
            logistics and medical distribution across 15 CEE markets.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <a
              href="#portfolio"
              onClick={e => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.9rem 2rem', background: GOLD, color: DARK,
                textDecoration: 'none', fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.75rem', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e0b86a'; }}
              onMouseLeave={e => { e.currentTarget.style.background = GOLD; }}
            >
              Explore Portfolio
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M8 1l5 4-5 4M1 5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
            <a
              href="#track-record"
              onClick={e => { e.preventDefault(); document.querySelector('#track-record')?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.75rem', fontWeight: 500,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#4A5568', textDecoration: 'none', transition: 'color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = GOLD; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#4A5568'; }}
            >
              Track Record →
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'flex', gap: '0', marginTop: '5rem',
          borderTop: `1px solid rgba(212,168,83,0.2)`,
          paddingTop: '2.5rem', flexWrap: 'wrap',
        }}>
          {STATS.map(({ value, unit, label }, i) => (
            <div key={i} style={{
              flex: '1 1 180px', paddingRight: '2.5rem', marginBottom: '1.5rem',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(212,168,83,0.1)' : 'none',
              paddingLeft: i > 0 ? '2.5rem' : 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem', lineHeight: 1, marginBottom: '0.5rem' }}>
                <span style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '2.6rem', fontWeight: 400, color: CREAM,
                }}>
                  {value}
                </span>
                {unit && (
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '1.1rem', fontWeight: 400, color: GOLD,
                  }}>
                    {unit}
                  </span>
                )}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.68rem', fontWeight: 500,
                letterSpacing: '0.14em', textTransform: 'uppercase', color: '#3E4A5A',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', right: '2rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
      }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '0.58rem',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: '#3E4A5A', writingMode: 'vertical-rl',
        }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #3E4A5A, transparent)' }} />
      </div>
    </section>
  );
}

const STATS = [
  { value: '€1.45', unit: 'bn', label: 'NAV' },
  { value: '39', unit: '%', label: 'IRR' },
  { value: '65', unit: '+', label: 'Acquisitions' },
  { value: '13', unit: '', label: 'Years' },
];
