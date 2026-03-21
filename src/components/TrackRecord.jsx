const GOLD = '#D4A853';
const DARK = '#0A1628';
const CREAM = '#F0EBE0';

// accentH: height of the gold top-bar in px — grows with NAV to give a visual growth cue
const CARDS = [
  {
    year: '2012',
    nav: '€31m',
    accentH: 3,
    entries: [
      { label: null, text: 'Founded with €31m of principal capital.' },
    ],
  },
  {
    year: '2013',
    accentH: 4,
    entries: [
      { label: null, text: 'Premier Energy acquisition & privatization of OPAP.' },
    ],
  },
  {
    year: '2014',
    accentH: 5,
    entries: [
      { label: null, text: 'Management control of Eldorado.' },
    ],
  },
  {
    year: '2015–2018',
    accentH: 7,
    entries: [
      { label: null, text: 'Multiple Allwyn (SAZKA Group) add-ons including Casinos Austria (Austrian Lotteries), LOTTOITALIA and Stoiximan (Betano).' },
    ],
  },
  {
    year: '2016',
    accentH: 7,
    entries: [
      { label: null, text: 'Eldorado exit.' },
    ],
  },
  {
    year: '2019',
    accentH: 10,
    entries: [
      { label: null, text: 'Allwyn (SAZKA Group) exit — retained SuperSport.' },
    ],
  },
  {
    year: '2019–2022',
    accentH: 11,
    entries: [
      { label: null, text: 'Smaller investments: Rixo, Profarm, Kuchen Quelle, Europe IVF, Mailstep, FAVI, Box Now etc.' },
      { label: null, text: 'Setting up Marina 21 through acquisitions of 6 marinas across Croatia and Greece.' },
    ],
  },
  {
    year: '2022',
    accentH: 13,
    entries: [
      { label: null, text: '75% of SuperSport exited to FTSE100 listed Entain PLC.' },
    ],
  },
  {
    year: '2024',
    accentH: 16,
    entries: [
      { label: null, text: 'Setting up JV with CVC to acquire last mile logistic companies Packeta Group and Foxpost.' },
      { label: null, text: 'Acquiring medtech distribution platform Magna Pharmacia.' },
      { label: null, text: 'IPO of Premier Energy.' },
    ],
  },
  {
    year: '2025',
    nav: '€1.45bn',
    accentH: 20,
    entries: [
      { label: null, text: 'Acquisition of Diamedix Diagnostica along with 65% stake in Urion (Montenegro) through Magna MedTech Group.' },
      { label: null, text: 'Premier Energy acquired 51% stake in Iberdrola Renovables Magyarország KFT with installed renewable capacity of 158MW.' },
    ],
  },
];

export function TrackRecord() {
  return (
    <section
      id="track-record"
      style={{
        background: '#F8F9FC',
        padding: '8rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 30% 50%, rgba(212,168,83,0.04) 0%, transparent 60%)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        <SectionLabel text="Track Record" />

        {/* Heading */}
        <div style={{ marginTop: '1.5rem', marginBottom: '4rem' }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(1.8rem, 3.8vw, 3.2rem)',
            fontWeight: 400, lineHeight: 1.2,
            color: '#0A1628', margin: 0, maxWidth: 820,
          }}>
            NAV grown from €31m to{' '}
            <em style={{ color: GOLD, fontStyle: 'italic' }}>€1.45bn</em>
            {' '}in 13 years — paying €146m to shareholders on top
          </h2>
        </div>

        {/* Key stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          border: `1px solid rgba(212,168,83,0.15)`,
          marginBottom: '5rem',
        }}>
          {KEY_STATS.map(({ value, unit, label, sub }, i) => (
            <div key={i} style={{
              padding: '1.75rem 1.25rem',
              borderRight: i < KEY_STATS.length - 1 ? `1px solid rgba(212,168,83,0.15)` : 'none',
              textAlign: 'center',
            }}>
              <div style={{
                display: 'flex', alignItems: 'baseline', justifyContent: 'center',
                gap: '0.1rem', marginBottom: '0.35rem',
              }}>
                <span style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '2.1rem', fontWeight: 400, color: GOLD, lineHeight: 1,
                }}>
                  {value}
                </span>
                {unit && (
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.95rem', color: GOLD }}>
                    {unit}
                  </span>
                )}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.63rem', fontWeight: 500,
                letterSpacing: '0.12em', textTransform: 'uppercase', color: '#3A4A5A',
              }}>
                {label}
              </div>
              {sub && (
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', color: '#5A6A7A', marginTop: '0.2rem' }}>
                  {sub}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Timeline carousel label */}
        <div style={{ marginBottom: '2rem' }}>
          <SectionLabel text="Portfolio Growth Timeline 2012 – 2025" />
        </div>

        {/* Year-card carousel */}
        <div className="timeline-scroll" style={{ paddingBottom: '1.25rem' }}>
          <div style={{
            display: 'flex',
            gap: '0',
            minWidth: 'max-content',
          }}>
            {CARDS.map(({ year, nav, accentH, entries }, i) => (
              <div
                key={year}
                style={{
                  width: 240,
                  flexShrink: 0,
                  borderLeft: `1px solid rgba(212,168,83,0.12)`,
                  borderRight: i === CARDS.length - 1 ? `1px solid rgba(212,168,83,0.12)` : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  background: i % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent',
                }}
              >
                {/* Gold accent bar — grows taller each card */}
                <div style={{
                  height: accentH,
                  background: `linear-gradient(90deg, ${GOLD}, rgba(212,168,83,0.4))`,
                  width: '100%',
                  flexShrink: 0,
                }} />

                <div style={{ padding: '1.5rem 1.5rem 2rem' }}>
                  {/* Year */}
                  <div style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: '1.5rem', fontWeight: 400, color: GOLD,
                    marginBottom: nav ? '0.2rem' : '1rem',
                    lineHeight: 1.1,
                  }}>
                    {year}
                  </div>

                  {/* NAV value (for 2012 and 2025) */}
                  {nav && (
                    <div style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: '1.15rem', fontWeight: 400, color: '#0A1628',
                      marginBottom: '1rem',
                    }}>
                      {nav}
                    </div>
                  )}

                  {/* Entry lines */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {entries.map(({ text }, j) => (
                      <p key={j} style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.8rem', fontWeight: 300,
                        lineHeight: 1.65, color: '#5A6A7A', margin: 0,
                      }}>
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
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

const KEY_STATS = [
  { value: '€31m', label: 'Initial Capital', sub: '→ €1.45bn NAV' },
  { value: '51', unit: 'x', label: 'MOIC' },
  { value: '39.2', unit: '%', label: 'IRR' },
  { value: '€146', unit: 'm', label: 'Cash to Shareholders' },
  { value: '65', unit: '+', label: 'Acquisitions' },
  { value: '14', label: 'Exits' },
];
