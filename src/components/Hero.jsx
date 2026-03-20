import { useEffect, useRef } from 'react';

export function Hero() {
  const lineRef = useRef(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    setTimeout(() => { el.style.width = '80px'; }, 300);
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
        background: '#080e1c',
      }}
    >
      {/* Background geometric pattern */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Large diagonal lines */}
        <svg
          style={{ position: 'absolute', top: 0, right: 0, width: '55%', height: '100%', opacity: 0.04 }}
          viewBox="0 0 600 800"
          fill="none"
          preserveAspectRatio="xMaxYMid slice"
        >
          {[0, 60, 120, 180, 240, 300, 360, 420, 480].map((x, i) => (
            <line key={i} x1={x} y1="0" x2={x + 400} y2="800" stroke="#c4973b" strokeWidth="1" />
          ))}
        </svg>

        {/* Radial glow */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          width: 600,
          height: 600,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(196,151,59,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />

        {/* Bottom fade */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: 'linear-gradient(to bottom, transparent, #080e1c)',
        }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 2rem', paddingTop: 120 }}>
        <div style={{ maxWidth: 760 }}>
          {/* Overline */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
          }}>
            <div style={{ width: 40, height: 1, background: '#c4973b' }} />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#c4973b',
            }}>
              Principal Investment — Prague
            </span>
          </div>

          {/* Main heading */}
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            color: '#f0ebe0',
            margin: '0 0 1.5rem',
            letterSpacing: '-0.01em',
          }}>
            Building enduring<br />
            <em style={{ color: '#c4973b', fontStyle: 'italic' }}>value</em> across<br />
            emerging markets
          </h1>

          {/* Animated gold line */}
          <div
            ref={lineRef}
            style={{
              height: 1,
              width: 0,
              background: 'linear-gradient(to right, #c4973b, transparent)',
              marginBottom: '2rem',
              transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
            }}
          />

          {/* Subtitle */}
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.05rem',
            fontWeight: 300,
            lineHeight: 1.8,
            color: '#7a7060',
            maxWidth: 520,
            margin: '0 0 3rem',
          }}>
            EMMA Capital is a principal investment firm that actively manages
            a portfolio of market-leading businesses across Central and Eastern Europe,
            from gaming and logistics to energy and pharmaceuticals.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <a
              href="#portfolio"
              onClick={e => { e.preventDefault(); document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.9rem 2rem',
                background: '#c4973b',
                color: '#080e1c',
                textDecoration: 'none',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#d4a84b'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#c4973b'; }}
            >
              Explore Portfolio
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M8 1l5 4-5 4M1 5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </a>
            <a
              href="#about"
              onClick={e => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#9a9080',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#c4973b'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#9a9080'; }}
            >
              Our Approach
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'flex',
          gap: '0',
          marginTop: '6rem',
          borderTop: '1px solid rgba(196,151,59,0.2)',
          paddingTop: '2.5rem',
          flexWrap: 'wrap',
        }}>
          {STATS.map(({ value, label }, i) => (
            <div
              key={i}
              style={{
                flex: '1 1 160px',
                paddingRight: '2.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '2.5rem',
                fontWeight: 300,
                color: '#c4973b',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}>
                {value}
              </div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#5a5248',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '2.5rem',
        right: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4a4540', writingMode: 'vertical-rl' }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #4a4540, transparent)' }} />
      </div>
    </section>
  );
}

const STATS = [
  { value: '2012', label: 'Founded' },
  { value: '14+', label: 'Portfolio exits' },
  { value: '5', label: 'Active sectors' },
  { value: 'CEE', label: 'Primary focus' },
];
