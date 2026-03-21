const GOLD = '#D4A853';
const NAVY = '#0A1628';
const NAVY_MID = '#1A3068';

export function About() {
  return (
    <section
      id="about"
      style={{
        background: '#0A1628',
        padding: '8rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        <SectionLabel text="About EMMA Capital" dark />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '5rem',
          alignItems: 'start',
          marginTop: '4rem',
        }}>
          {/* Left col — narrative */}
          <div>
            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400, lineHeight: 1.15,
              color: '#F0EBE0', margin: '0 0 1.5rem',
            }}>
              A different kind of{' '}
              <em style={{ color: GOLD, fontStyle: 'italic' }}>investment firm</em>
            </h2>

            <div style={{ width: 40, height: 2, background: '#C8102E', marginBottom: '2rem' }} />

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.9,
              color: '#8C9198', marginBottom: '1.5rem',
            }}>
              Founded in 2012 and headquartered in Prague, EMMA Capital is a
              €1.45bn investment management group with a long-term perspective.
              We don't just deploy capital — we roll up our sleeves and actively
              participate in the strategic management of every business we own.
            </p>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.9,
              color: '#8C9198', marginBottom: '1.5rem',
            }}>
              Our team combines deep sector expertise with an established network
              across Central and Eastern Europe, built over 13+ years of hands-on
              operational involvement — not passive capital allocation.
            </p>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.9,
              color: '#8C9198',
            }}>
              From founding OPAP's privatization to building Allwyn into Europe's
              #1 lottery group, from growing Premier Energy into a BSE-listed utility
              to creating Box Now — a #1 parcel network across 4 countries — EMMA
              builds scalable platforms with replicable success.
            </p>

            <div style={{ marginTop: '2.5rem' }}>
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.72rem', fontWeight: 500,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: '#8C9198', textDecoration: 'none',
                  borderBottom: `1px solid rgba(212,168,83,0.3)`,
                  paddingBottom: '2px', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = GOLD; e.currentTarget.style.borderColor = GOLD; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#8C9198'; e.currentTarget.style.borderColor = 'rgba(212,168,83,0.3)'; }}
              >
                Get in touch
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M7 1l4 3-4 3M1 4h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right col — 2×2 pillar cards */}
          <div className="cards-carousel" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.25rem',
          }}>
            {PILLARS.map(({ icon, title, description }, i) => (
              <div
                key={i}
                style={{
                  padding: '1.75rem',
                  background: '#152236',
                  border: '1px solid rgba(212,168,83,0.18)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `rgba(212,168,83,0.4)`;
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(212,168,83,0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(212,168,83,0.12)';
                  e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.2)';
                }}
              >
                <h3 style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '1.05rem', fontWeight: 400,
                  color: '#F0EBE0', margin: '0 0 0.5rem', lineHeight: 1.3,
                }}>
                  {title}
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.82rem', fontWeight: 300,
                  lineHeight: 1.65, color: '#8C9198', margin: 0,
                }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ text, dark }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ width: 32, height: 1, background: GOLD }} />
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.68rem', fontWeight: 500,
        letterSpacing: '0.25em', textTransform: 'uppercase',
        color: dark ? GOLD : GOLD,
      }}>
        {text}
      </span>
    </div>
  );
}

const PILLARS = [
  {
    icon: '◆',
    title: 'Strategic Capital with Long-Term Vision',
    description: 'Patient, principal capital deployed with no artificial exit pressure — aligning our interests entirely with business success.',
  },
  {
    icon: '◈',
    title: 'Sector Expertise with Investor-Operator Edge',
    description: 'We invest in sectors where we have decades of operational experience and regulatory insight across CEE markets.',
  },
  {
    icon: '◉',
    title: 'Value Creation through M&A Agility',
    description: '65+ acquisitions demonstrate our ability to identify, execute and integrate deals quickly — creating platform scale.',
  },
  {
    icon: '▲',
    title: 'Scalable Platforms with Replicable Success',
    description: 'We build category-leading businesses that can be systematically replicated across multiple CEE geographies.',
  },
];
