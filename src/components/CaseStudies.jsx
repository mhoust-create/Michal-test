const GOLD = '#D4A853';
const DARK_MID = '#132035';
const CREAM = '#F0EBE0';
const NAVY = '#0A1628';
const EMMA_RED = '#C8102E';

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      style={{
        background: '#0A1628',
        padding: '8rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 70% 40%, rgba(212,168,83,0.04) 0%, transparent 60%)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        <SectionLabel text="Case Studies" />

        <div style={{ marginTop: '1.5rem', marginBottom: '4rem' }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 400, lineHeight: 1.15,
            color: '#F0EBE0', margin: '0 0 1rem',
          }}>
            Value creation in{' '}
            <em style={{ color: GOLD, fontStyle: 'italic' }}>practice</em>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8,
            color: '#8C9198', maxWidth: 540, margin: 0,
          }}>
            Three examples of how EMMA builds category-leading businesses
            through hands-on operational involvement and M&A agility.
          </p>
        </div>

        {/* Three case study cards */}
        <div className="cards-carousel" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1px',
          background: 'rgba(212,168,83,0.08)',
        }}>
          {CASES.map(({ sector, name, tagline, story, metrics, color }, i) => (
            <div
              key={i}
              style={{
                background: '#152236',
                padding: '2.75rem',
                transition: 'background 0.3s',
                cursor: 'default',
                position: 'relative',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#112238'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0d1a2e'; }}
            >
              {/* Sector badge */}
              <div style={{
                display: 'inline-block',
                padding: '0.2rem 0.7rem',
                background: `rgba(${color}, 0.12)`,
                border: `1px solid rgba(${color}, 0.3)`,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.6rem', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: `rgba(${color}, 1)`,
                marginBottom: '1.5rem',
              }}>
                {sector}
              </div>

              <h3 style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: '1.6rem', fontWeight: 400,
                color: '#F0EBE0', margin: '0 0 0.5rem',
              }}>
                {name}
              </h3>

              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.8rem', fontWeight: 500,
                color: GOLD, margin: '0 0 1.25rem',
                letterSpacing: '0.02em',
              }}>
                {tagline}
              </p>

              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.85rem', fontWeight: 300,
                lineHeight: 1.75, color: '#8C9198',
                margin: '0 0 2rem',
              }}>
                {story}
              </p>

              {/* Metrics */}
              <div style={{
                borderTop: 'rgba(212,168,83,0.15) 1px solid',
                paddingTop: '1.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
              }}>
                {metrics.map(({ value, label }, j) => (
                  <div key={j}>
                    <div style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: '1.4rem', fontWeight: 400, color: GOLD,
                      lineHeight: 1, marginBottom: '0.25rem',
                    }}>
                      {value}
                    </div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.65rem', fontWeight: 500,
                      letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8C9198',
                    }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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

const CASES = [
  {
    sector: 'Energy',
    name: 'Premier Energy',
    tagline: 'Small Romanian acquisition → SE Europe\'s fastest-growing utility',
    color: '212,168,83',
    story: 'Acquired as GAZ SUD in 2013 for a modest sum, Premier Energy was systematically grown through 25+ add-on acquisitions across Romania and Moldova. Listed on the Bucharest Stock Exchange in 2024 with a market cap of ~€900m.',
    metrics: [
      { value: '202x', label: 'MOIC' },
      { value: '25+', label: 'Add-on acquisitions' },
      { value: '+5,417%', label: 'Revenue growth' },
      { value: '€900m', label: 'Market cap 2024' },
    ],
  },
  {
    sector: 'Logistics',
    name: 'Box Now',
    tagline: 'Greenfield → #1 APM player in 4 countries in 3 years',
    color: '37,99,235',
    story: 'Founded from scratch in 2021, Box Now became the leading automated parcel machine (APM) network in Greece, Romania, Bulgaria and Cyprus. Scaled from 1,000 to 5 million parcels per month with 99.1% delivery success and 85+ NPS.',
    metrics: [
      { value: '5m', label: 'Parcels/month' },
      { value: '~€80m', label: 'Projected 2028 EBITDA' },
      { value: '99.1%', label: 'Delivery success' },
      { value: '85+', label: 'NPS score' },
    ],
  },
  {
    sector: 'Medical Distribution',
    name: 'Magna MedTech Group',
    tagline: 'Leading MedTech distribution platform in Southeast Europe',
    color: '37,150,190',
    story: 'In January 2024 EMMA acquired a 65% stake in Magna Pharmacia (Serbia) and built a regional platform through targeted acquisitions — including Diamedix Diagnostica (Romania, 100%, March 2025) and Urion (Montenegro, 65%, September 2025). Now present in 6 countries with €230m+ annual turnover, targeting €400m revenue and €100m EBITDA by 2027.',
    metrics: [
      { value: '€234m', label: 'Revenue 2025E' },
      { value: '+115%', label: 'Revenue growth' },
      { value: '€51m', label: 'EBITDA 2025E' },
      { value: '6', label: 'Countries' },
    ],
  },
];
