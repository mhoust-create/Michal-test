export function Strategy() {
  return (
    <section
      id="strategy"
      style={{
        background: '#080e1c',
        padding: '8rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Right-side background accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '40%',
        height: '100%',
        background: 'linear-gradient(to left, rgba(196,151,59,0.03), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        <SectionLabel text="Investment Strategy" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', marginTop: '4rem', alignItems: 'start' }}>
          {/* Left: heading + description */}
          <div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 300,
              lineHeight: 1.2,
              color: '#f0ebe0',
              margin: '0 0 1.5rem',
            }}>
              A primary platform for<br />
              <em style={{ color: '#c4973b', fontStyle: 'italic' }}>long-term value</em>
            </h2>

            <div style={{ width: 40, height: 1, background: '#c4973b', marginBottom: '2rem' }} />

            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              fontWeight: 300,
              lineHeight: 1.9,
              color: '#6a6258',
              marginBottom: '1.5rem',
            }}>
              EMMA Capital is a primary platform for long-term value-creating investing
              across customer-oriented, highly cash-generative businesses in Central and
              Eastern Europe. Founded in 2012 by Jiří Šmejc, the group has completed
              58 investments and 14 exits since inception.
            </p>

            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              fontWeight: 300,
              lineHeight: 1.9,
              color: '#6a6258',
              marginBottom: '1.5rem',
            }}>
              We target companies with strong market positions, durable cash flows, and
              significant potential for operational improvement through active, hands-on
              ownership. Our approach combines deep sector expertise with established
              networks built over more than a decade of investing in the region.
            </p>

            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              fontWeight: 300,
              lineHeight: 1.9,
              color: '#6a6258',
            }}>
              We invest across six core sectors — gaming &amp; betting, logistics &amp;
              e-commerce, energy, healthcare, insurance &amp; fintech, and marinas —
              where we have deep expertise and proven operational capability.
            </p>
          </div>

          {/* Right: strategy pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {PILLARS.map(({ number, title, description }, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  padding: '2rem 0',
                  borderBottom: i < PILLARS.length - 1 ? '1px solid rgba(196,151,59,0.1)' : 'none',
                }}
              >
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '2.5rem',
                  fontWeight: 300,
                  color: 'rgba(196,151,59,0.25)',
                  lineHeight: 1,
                  flexShrink: 0,
                  width: 48,
                }}>
                  {number}
                </div>
                <div>
                  <h3 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.25rem',
                    fontWeight: 500,
                    color: '#f0ebe0',
                    margin: '0 0 0.5rem',
                  }}>
                    {title}
                  </h3>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.85rem',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: '#6a6258',
                    margin: 0,
                  }}>
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sectors grid */}
        <div style={{ marginTop: '6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <div style={{ width: 32, height: 1, background: 'rgba(196,151,59,0.4)' }} />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.68rem',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(196,151,59,0.7)',
            }}>
              Target Sectors
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'rgba(196,151,59,0.1)' }}>
            {SECTORS.map(({ icon, name, description }, i) => (
              <div
                key={i}
                style={{
                  background: '#080e1c',
                  padding: '2rem 1.75rem',
                  transition: 'background 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0d1424'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#080e1c'; }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{icon}</div>
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  color: '#f0ebe0',
                  marginBottom: '0.5rem',
                }}>
                  {name}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8rem',
                  fontWeight: 300,
                  color: '#5a5248',
                  lineHeight: 1.6,
                }}>
                  {description}
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
      <div style={{ width: 32, height: 1, background: '#c4973b' }} />
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.68rem',
        fontWeight: 500,
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: '#c4973b',
      }}>
        {text}
      </span>
    </div>
  );
}

const PILLARS = [
  {
    number: '01',
    title: 'Principal Investing',
    description: 'We invest our own capital with full alignment — no external fund mandates, no short-term performance pressure. Our interests are identical to those of our partners.',
  },
  {
    number: '02',
    title: 'Operational Involvement',
    description: 'We bring hands-on management expertise to every investment, working alongside founders and management teams to drive genuine operational improvement.',
  },
  {
    number: '03',
    title: 'Long Holding Periods',
    description: 'With typical hold periods of 7–15+ years, we are able to pursue multi-cycle value creation strategies that short-term investors cannot access.',
  },
  {
    number: '04',
    title: 'CEE Specialisation',
    description: 'Over two decades of combined operating experience in Central and Eastern European markets gives us insight, relationships, and credibility that translate into superior deal flow.',
  },
];

const SECTORS = [
  {
    icon: '🎰',
    name: 'Gaming & Betting',
    description: 'State-licensed lottery and gaming operators with durable regulatory positions. Portfolio includes Entain CEE (STS, SuperSport), OPAP, Casinos Austria and Österreichische Lotterien.',
  },
  {
    icon: '📦',
    name: 'Logistics & E-commerce',
    description: 'Out-of-home parcel delivery and e-commerce fulfilment infrastructure. Portfolio includes Packeta Group (BoxNow, FoxPost) and Mailstep across the CEE region.',
  },
  {
    icon: '⚡',
    name: 'Energy',
    description: 'Energy distribution and utility services with predictable, regulated cash flows. Premier Energy Group operates across Romania and Moldova, listed at ~€525 million.',
  },
  {
    icon: '🏥',
    name: 'Healthcare',
    description: 'Medical supplies, devices and pharmaceutical distribution through EMMA ZETA. Active in Romania and Montenegro with further expansion planned across the Balkans.',
  },
  {
    icon: '🛡️',
    name: 'Insurance & Fintech',
    description: 'Digital-first insurance and financial technology services. RIXO.cz provides online insurance products to Czech customers, reflecting the group\'s fintech ambitions.',
  },
  {
    icon: '⚓',
    name: 'Marinas',
    description: 'Premium marina and waterfront infrastructure assets through Marina 21, targeting high-growth leisure and tourism destinations across Southern Europe.',
  },
];
