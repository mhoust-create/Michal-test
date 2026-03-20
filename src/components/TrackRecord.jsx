const GOLD = '#D4A853';
const DARK = '#0A1628';
const CREAM = '#F0EBE0';

export function TrackRecord() {
  return (
    <section
      id="track-record"
      style={{
        background: DARK,
        padding: '8rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 30% 50%, rgba(212,168,83,0.04) 0%, transparent 60%)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        <SectionLabel text="Track Record" />

        <div style={{ marginTop: '1.5rem', marginBottom: '4rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 400, lineHeight: 1.15,
            color: CREAM, margin: 0,
          }}>
            €31m invested in 2012 →{' '}
            <em style={{ color: GOLD, fontStyle: 'italic' }}>€1.45bn today</em>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.8,
            color: '#8C9198', maxWidth: 380, margin: 0,
          }}>
            Thirteen years of consistent value creation across 65+ acquisitions
            and 14 successful exits — a 51x MOIC since inception.
          </p>
        </div>

        {/* Key stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '0',
          border: `1px solid rgba(212,168,83,0.15)`,
          marginBottom: '5rem',
        }}>
          {KEY_STATS.map(({ value, unit, label, sub }, i) => (
            <div key={i} style={{
              padding: '2rem 1.75rem',
              borderRight: i < KEY_STATS.length - 1 ? `1px solid rgba(212,168,83,0.15)` : 'none',
              textAlign: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.15rem', marginBottom: '0.4rem' }}>
                <span style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '2.4rem', fontWeight: 400, color: GOLD, lineHeight: 1,
                }}>
                  {value}
                </span>
                {unit && (
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '1rem', color: GOLD, fontWeight: 400,
                  }}>
                    {unit}
                  </span>
                )}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.68rem', fontWeight: 500,
                letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A5568',
              }}>
                {label}
              </div>
              {sub && (
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.72rem', color: '#5A6A7A', marginTop: '0.25rem',
                }}>
                  {sub}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: '1.5rem' }}>
          <SectionLabel text="Investment Timeline 2012–2025" />
        </div>

        <div className="timeline-scroll" style={{ paddingBottom: '1rem' }}>
          <div style={{
            display: 'flex',
            gap: '0',
            minWidth: 'max-content',
            borderTop: `1px solid rgba(212,168,83,0.2)`,
            paddingTop: '1.5rem',
          }}>
            {TIMELINE.map(({ year, events }, i) => (
              <div key={i} style={{ minWidth: 200, paddingRight: '2rem', position: 'relative' }}>
                {/* Year marker */}
                <div style={{
                  position: 'absolute', top: -26, left: 0,
                  width: 8, height: 8, borderRadius: '50%',
                  background: GOLD, border: `2px solid ${DARK}`,
                  outline: `1px solid rgba(212,168,83,0.4)`,
                }} />
                <div style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '1.6rem', fontWeight: 400, color: GOLD,
                  marginBottom: '0.75rem',
                }}>
                  {year}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {events.map((ev, j) => (
                    <div key={j} style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.78rem', fontWeight: 300,
                      lineHeight: 1.5, color: '#8C9198',
                    }}>
                      {ev}
                    </div>
                  ))}
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
  { value: '€31m', unit: '', label: 'Initial Capital', sub: '→ €1.45bn today' },
  { value: '51', unit: 'x', label: 'MOIC' },
  { value: '39.2', unit: '%', label: 'IRR' },
  { value: '€146', unit: 'm', label: 'Cash Distributed' },
  { value: '65', unit: '+', label: 'Acquisitions' },
  { value: '14', unit: '', label: 'Successful Exits' },
];

const TIMELINE = [
  { year: '2012', events: ['Founded with €31m', 'Principal investment model established'] },
  { year: '2013', events: ['OPAP privatization — €650m deal', 'Premier Energy (GAZ SUD) acquired'] },
  { year: '2014', events: ['Allwyn/SAZKA Group co-founded', 'Casinos Austria stake acquired'] },
  { year: '2015', events: ['LOTTOITALIA stake acquired', 'Österreichische Lotterien position'] },
  { year: '2016', events: ['SAZKA Group pan-European expansion', 'Stoiximan (Greece) investment'] },
  { year: '2017', events: ['Platform consolidation across CEE', 'Healthcare vertical initiated'] },
  { year: '2018', events: ['Premier Energy growth milestones', '5,417%+ revenue growth achieved'] },
  { year: '2019', events: ['Allwyn exit at 10.3x MOIC, 53% IRR', '€630m proceeds — landmark exit'] },
  { year: '2020', events: ['Portfolio resilience through COVID', 'Digital acceleration across holdings'] },
  { year: '2021', events: ['Box Now founded — greenfield launch', 'CEE logistics thesis initiated'] },
  { year: '2022', events: ['Entain CEE JV formed (22.5%)', 'Box Now scales to 4 countries'] },
  { year: '2023', events: ['STS (Poland) acquired via Entain JV', 'Box Now reaches 5m parcels/mo'] },
  { year: '2024', events: ['Premier Energy BSE IPO (~€900m cap)', 'Packeta/CVC JV for last-mile scale'] },
  { year: '2025', events: ['NAV reaches €1.45bn', 'Magna MedTech SEE expansion', 'Profarm #1 in Greece'] },
];
