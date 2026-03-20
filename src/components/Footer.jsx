const FOOTER_LINKS = [
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Strategy', href: '#strategy' },
      { label: 'Team', href: '#team' },
    ],
  },
  {
    heading: 'Investments',
    links: [
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Sectors', href: '#strategy' },
      { label: 'Track Record', href: '#portfolio' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Contact', href: '#contact' },
      { label: 'Press Enquiries', href: '#contact' },
      { label: 'Careers', href: '#contact' },
    ],
  },
];

export function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#04080f',
      borderTop: '1px solid rgba(196,151,59,0.12)',
      padding: '4rem 0 2rem',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(3, 1fr)', gap: '3rem', alignItems: 'start', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <a
              href="#"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', marginBottom: '1rem' }}
            >
              <LogoMark />
              <span style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#f0ebe0',
                letterSpacing: '0.12em',
              }}>
                EMMA CAPITAL
              </span>
            </a>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.82rem',
              fontWeight: 300,
              lineHeight: 1.8,
              color: '#3a3530',
              maxWidth: 280,
              margin: '0 0 1.5rem',
            }}>
              Principal investment firm actively managing a portfolio of market-leading
              businesses across Central and Eastern Europe.
            </p>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.72rem',
              fontWeight: 300,
              color: '#2a2520',
            }}>
              Na Příkopě 19, Prague, Czech Republic
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map(({ heading, links }) => (
            <div key={heading}>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#c4973b',
                marginBottom: '1.25rem',
              }}>
                {heading}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {links.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={e => handleNavClick(e, href)}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.82rem',
                      fontWeight: 300,
                      color: '#3a3530',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#7a7060'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#3a3530'; }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(196,151,59,0.08)',
          paddingTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.7rem',
            fontWeight: 300,
            color: '#2a2520',
          }}>
            © {new Date().getFullYear()} EMMA Capital s.r.o. All rights reserved.
          </span>
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.7rem',
            fontWeight: 300,
            color: '#2a2520',
          }}>
            Prague, Czech Republic
          </span>
        </div>
      </div>
    </footer>
  );
}

function LogoMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
      <path d="M4 28 L16 4 L28 28" stroke="#c4973b" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M8 20 L24 20" stroke="#c4973b" strokeWidth="1.5" />
      <circle cx="16" cy="4" r="2" fill="#c4973b" />
    </svg>
  );
}
