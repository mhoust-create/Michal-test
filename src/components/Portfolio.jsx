const GOLD = '#D4A853';
const NAVY = '#0A1628';
const NAVY_MID = '#1A3068';

export function Portfolio() {
  return (
    <section
      id="portfolio"
      style={{
        background: '#F8F9FC',
        padding: '8rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        <SectionLabel text="Portfolio" />

        <div style={{ marginTop: '1.5rem', marginBottom: '4rem' }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 400, lineHeight: 1.15,
            color: '#0A1628', margin: '0 0 1rem',
          }}>
            Market-leading businesses{' '}
            <em style={{ color: GOLD, fontStyle: 'italic' }}>across CEE</em>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8,
            color: '#5A6A7A', maxWidth: 520, margin: 0,
          }}>
            Four core sectors where EMMA has built category-defining companies
            through deep operational expertise and M&A agility.
          </p>
        </div>

        {/* 4 sector cards */}
        <div className="cards-carousel" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          {SECTORS.map(({ sector, icon, companies, footer }, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                border: `1px solid rgba(26,48,104,0.08)`,
                padding: '2.5rem',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `rgba(212,168,83,0.35)`;
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,168,83,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(26,48,104,0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{icon}</div>

              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.65rem', fontWeight: 600,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: GOLD, marginBottom: '0.5rem',
              }}>
                {sector}
              </div>

              <div style={{
                width: 28, height: 2,
                background: '#C8102E',
                marginBottom: '1.5rem',
              }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {companies.map(({ name, desc, tag }, j) => (
                  <div key={j} style={{
                    paddingBottom: j < companies.length - 1 ? '1rem' : 0,
                    borderBottom: j < companies.length - 1 ? '1px solid rgba(26,48,104,0.08)' : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.3rem' }}>
                      <span style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: '1.1rem', fontWeight: 400, color: '#0A1628',
                      }}>
                        {name}
                      </span>
                      {tag && (
                        <span style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '0.58rem', fontWeight: 600,
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          color: GOLD, background: 'rgba(212,168,83,0.1)',
                          padding: '0.15rem 0.4rem', whiteSpace: 'nowrap',
                        }}>
                          {tag}
                        </span>
                      )}
                    </div>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.78rem', fontWeight: 300,
                      lineHeight: 1.6, color: '#5A6A7A', margin: 0,
                    }}>
                      {desc}
                    </p>
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

const SECTORS = [
  {
    sector: 'Energy',
    icon: '⚡',
    companies: [
      {
        name: 'Premier Energy',
        tag: 'BSE Listed',
        desc: 'SE Europe\'s fastest-growing integrated utility. Romania & Moldova. ~€900m market cap, 1,400+ MW capacity.',
      },
    ],
  },
  {
    sector: 'Logistics & Digital Infrastructure',
    icon: '📦',
    companies: [
      {
        name: 'Box Now',
        tag: '#1 APM',
        desc: 'Greenfield → #1 automated parcel network in 4 CEE countries. 5m parcels/month, 99.1% delivery, 85+ NPS.',
      },
      {
        name: 'Packeta',
        tag: 'CVC JV',
        desc: 'CEE\'s leading out-of-home parcel delivery platform. Joint venture with CVC Capital Partners.',
      },
      {
        name: 'Mailstep',
        tag: 'Full Ownership',
        desc: 'Czech e-commerce fulfilment leader — warehousing and last-mile for major online retailers.',
      },
    ],
  },
  {
    sector: 'Gaming',
    icon: '🎲',
    companies: [
      {
        name: 'Entain CEE',
        tag: 'JV Entain',
        desc: 'JV with global gaming leader Entain. Holds STS (Poland\'s #1 bookmaker) and SuperSport (Croatia). 22.5% stake.',
      },
      {
        name: 'Get\'s Bet',
        tag: 'Romania',
        desc: 'Sports betting and gaming operator in Romania, part of EMMA\'s consolidated gaming platform.',
      },
      {
        name: 'TipTorro',
        tag: 'CEE',
        desc: 'Digital gaming and lottery participation platform across Central and Eastern Europe.',
      },
    ],
  },
  {
    sector: 'Medical Distribution',
    icon: '🏥',
    companies: [
      {
        name: 'Magna MedTech',
        tag: 'Largest SEE',
        desc: 'Largest medical device distributor in South-East Europe. Rapid expansion through targeted M&A.',
      },
      {
        name: 'Profarm',
        tag: '#1 Greece',
        desc: 'Greece\'s #1 pharmaceutical distribution company, serving pharmacies and hospitals nationwide.',
      },
    ],
  },
  {
    sector: 'E-com Aggregators',
    icon: '🛒',
    companies: [
      {
        name: 'FAVI',
        tag: 'Furniture E-com',
        desc: 'European leader in furniture and home decor search engines.',
      },
      {
        name: 'RIXO.cz',
        tag: 'Czech Digital',
        desc: 'Czech digital insurance aggregator — comparison and distribution platform for insurance products online.',
      },
    ],
  },
];
