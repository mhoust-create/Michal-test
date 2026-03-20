const GOLD = '#D4A853';
const DARK_MID = '#1B2D4A';
const CREAM = '#F0EBE0';
const NAVY = '#0A1628';

const COUNTRIES = [
  'Czechia', 'Romania', 'Greece', 'Croatia', 'Poland',
  'Hungary', 'Serbia', 'Slovakia', 'Bulgaria', 'Cyprus',
  'Moldova', 'Montenegro', 'Slovenia', 'Germany', 'Ukraine',
];

export function CeeRegion() {
  return (
    <section
      id="cee-region"
      style={{
        background: '#0A1628',
        padding: '8rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 80% 50%, rgba(212,168,83,0.04) 0%, transparent 55%)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        <SectionLabel text="CEE Region" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '6rem',
          alignItems: 'start',
          marginTop: '4rem',
        }}>
          {/* Left — text + country tags */}
          <div>
            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400, lineHeight: 1.15,
              color: '#F0EBE0', margin: '0 0 1.5rem',
            }}>
              The world's most{' '}
              <em style={{ color: GOLD, fontStyle: 'italic' }}>compelling</em>
              {' '}emerging market
            </h2>

            <div style={{ width: 40, height: 1, background: GOLD, marginBottom: '2rem' }} />

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.9,
              color: '#8C9198', marginBottom: '1.5rem',
            }}>
              CEE is home to 126 million people, 79% of whom are below the age of 64.
              The region's GDP is growing at 2.3% CAGR — 53% faster than the EU average
              of 1.5% — with significant catch-up potential remaining.
            </p>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.9,
              color: '#8C9198', marginBottom: '2.5rem',
            }}>
              Underpenetrated markets, fragmented competitive landscapes and structural
              tailwinds create consolidation opportunities unavailable in Western Europe.
              EMMA has been systematically capturing this opportunity since 2012.
            </p>

            {/* Country tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {COUNTRIES.map((c, i) => (
                <span key={i} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.72rem', fontWeight: 500,
                  padding: '0.3rem 0.75rem',
                  border: `1px solid rgba(212,168,83,${i < 6 ? '0.4' : '0.15'})`,
                  color: i < 6 ? GOLD : '#8C9198',
                  background: i < 6 ? 'rgba(212,168,83,0.06)' : 'transparent',
                  letterSpacing: '0.05em',
                }}>
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Right — 2×2 highlight cards */}
          <div className="cards-carousel" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}>
            {HIGHLIGHTS.map(({ stat, unit, label, desc }, i) => (
              <div key={i} style={{
                padding: '2rem 1.5rem',
                border: `1px solid rgba(212,168,83,0.12)`,
                background: '#0d1a2e',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.15rem', marginBottom: '0.5rem' }}>
                  <span style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: '2.2rem', fontWeight: 400, color: GOLD, lineHeight: 1,
                  }}>
                    {stat}
                  </span>
                  {unit && (
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '1rem', color: GOLD,
                    }}>
                      {unit}
                    </span>
                  )}
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.72rem', fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: '#F0EBE0', marginBottom: '0.4rem',
                }}>
                  {label}
                </div>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.78rem', fontWeight: 300,
                  lineHeight: 1.6, color: '#8C9198', margin: 0,
                }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ width: 32, height: 1, background: GOLD }} />
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.68rem', fontWeight: 500,
        letterSpacing: '0.25em', textTransform: 'uppercase', color: GOLD,
      }}>
        {text}
      </span>
    </div>
  );
}

const HIGHLIGHTS = [
  {
    stat: '126', unit: 'M',
    label: 'Population',
    desc: '79% below age 64 — young, productive workforce driving consumption growth.',
  },
  {
    stat: '2.3', unit: '%',
    label: 'GDP CAGR',
    desc: '53% faster than the EU average, with significant catch-up potential remaining.',
  },
  {
    stat: '15',
    label: 'Markets',
    desc: 'Active presence across 15 CEE countries from Czech Republic to Greece to Ukraine.',
  },
  {
    stat: '65', unit: '+',
    label: 'Acquisitions',
    desc: 'Deep deal flow and local relationships built over 13 years across the region.',
  },
];
