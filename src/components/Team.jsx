const TEAM = [
  {
    name: 'Michal Šnobr',
    title: 'Founder & Managing Partner',
    bio: 'Founder of EMMA Capital with over two decades of experience in principal investing across Central and Eastern Europe. Former partner at several leading investment firms with deep expertise in gaming, utilities and logistics.',
    initials: 'MŠ',
  },
  {
    name: 'Jiří Šmejc',
    title: 'Co-Founder & Partner',
    bio: 'Co-founder with extensive experience building and managing market-leading businesses across the CEE region. Key architect of EMMA\'s gaming strategy and co-founder of Sazka Group.',
    initials: 'JŠ',
  },
  {
    name: 'Pavel Šaroch',
    title: 'Partner — Investments',
    bio: 'Leads new investment origination and portfolio strategy. Brings 15+ years of experience in M&A advisory and private equity across diverse sectors in Central Europe.',
    initials: 'PŠ',
  },
  {
    name: 'Martin Böhm',
    title: 'Partner — Operations',
    bio: 'Responsible for operational value creation across the portfolio. Former COO of multiple portfolio companies with deep expertise in logistics, supply chain and operational transformation.',
    initials: 'MB',
  },
  {
    name: 'Tomáš Fiala',
    title: 'Head of Finance',
    bio: 'Oversees financial strategy, reporting and capital structure across EMMA Capital and its portfolio companies. Former CFO at a leading CEE conglomerate.',
    initials: 'TF',
  },
  {
    name: 'Kateřina Novotná',
    title: 'Head of Legal & Compliance',
    bio: 'Leads all legal, regulatory and governance matters for the firm and its investments. Specialist in M&A, competition law and cross-border transactions across CEE jurisdictions.',
    initials: 'KN',
  },
];

export function Team() {
  return (
    <section
      id="team"
      style={{
        background: '#080e1c',
        padding: '8rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(196,151,59,0.04) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        <SectionLabel text="Our Team" />

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', marginTop: '1.5rem', marginBottom: '4rem' }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 300,
            lineHeight: 1.2,
            color: '#f0ebe0',
            margin: 0,
          }}>
            Experienced investors,<br />
            <em style={{ color: '#c4973b', fontStyle: 'italic' }}>proven operators</em>
          </h2>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            fontWeight: 300,
            lineHeight: 1.8,
            color: '#5a5248',
            maxWidth: 400,
            margin: 0,
          }}>
            Our team combines financial expertise with deep operational experience —
            having founded, managed and grown businesses across Central and Eastern
            Europe over more than two decades.
          </p>
        </div>

        {/* Team grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2px',
          background: 'rgba(196,151,59,0.08)',
        }}>
          {TEAM.map(({ name, title, bio, initials }, i) => (
            <div
              key={i}
              style={{
                background: '#080e1c',
                padding: '2.5rem',
                transition: 'background 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0d1424'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#080e1c'; }}
            >
              {/* Avatar */}
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(196,151,59,0.1)',
                border: '1px solid rgba(196,151,59,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
              }}>
                <span style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  color: '#c4973b',
                  letterSpacing: '0.05em',
                }}>
                  {initials}
                </span>
              </div>

              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.35rem',
                fontWeight: 500,
                color: '#f0ebe0',
                margin: '0 0 0.25rem',
              }}>
                {name}
              </h3>

              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#c4973b',
                marginBottom: '1rem',
              }}>
                {title}
              </div>

              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.82rem',
                fontWeight: 300,
                lineHeight: 1.75,
                color: '#5a5248',
                margin: 0,
              }}>
                {bio}
              </p>
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
