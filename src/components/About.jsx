export function About() {
  return (
    <section
      id="about"
      style={{
        background: '#0a1020',
        padding: '8rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '40%',
        height: '100%',
        background: 'linear-gradient(to right, rgba(196,151,59,0.03), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        {/* Section label */}
        <SectionLabel text="About EMMA Capital" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '5rem', alignItems: 'start', marginTop: '4rem' }}>
          {/* Left col */}
          <div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 300,
              lineHeight: 1.2,
              color: '#f0ebe0',
              margin: '0 0 1.5rem',
            }}>
              A different kind of<br />
              <em style={{ color: '#c4973b', fontStyle: 'italic' }}>investment firm</em>
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
              Founded in 2012 and headquartered in Prague, EMMA Capital is a principal
              investment firm with a long-term perspective. We don't just deploy capital —
              we roll up our sleeves and actively participate in the strategic management
              of every business we own.
            </p>

            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              fontWeight: 300,
              lineHeight: 1.9,
              color: '#6a6258',
            }}>
              Our team brings deep operational expertise and an established network across
              Central and Eastern Europe, enabling us to create genuine value rather than
              simply optimise financial structures.
            </p>

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
              <a
                href="#contact"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#c4973b',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(196,151,59,0.4)',
                  paddingBottom: '2px',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#c4973b'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(196,151,59,0.4)'; }}
              >
                Get in touch
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M7 1l4 3-4 3M1 4h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right col — values */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {VALUES.map(({ icon, title, description }, i) => (
              <div
                key={i}
                style={{
                  padding: '1.75rem',
                  border: '1px solid rgba(196,151,59,0.12)',
                  background: 'rgba(196,151,59,0.02)',
                  transition: 'border-color 0.3s, background 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(196,151,59,0.3)';
                  e.currentTarget.style.background = 'rgba(196,151,59,0.04)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(196,151,59,0.12)';
                  e.currentTarget.style.background = 'rgba(196,151,59,0.02)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#c4973b',
                  }}>
                    {icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1.2rem',
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

const VALUES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Active Ownership',
    description: 'We are deeply involved in the strategic direction and operational management of each company in our portfolio — not passive observers.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Long-Term Horizon',
    description: 'We invest for the long term, building relationships and value over years rather than seeking quick returns.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Regional Expertise',
    description: 'Twenty-plus years of combined experience navigating the unique dynamics of Central and Eastern European markets.',
  },
];
