const GOLD = '#D4A853';
const EMMA_RED = '#C8102E';
const EMMA_NAVY = '#1A3068';

const FOOTER_LINKS = [
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Track Record', href: '#track-record' },
      { label: 'Team', href: '#team' },
    ],
  },
  {
    heading: 'Investments',
    links: [
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Case Studies', href: '#case-studies' },
      { label: 'CEE Region', href: '#cee-region' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  },
];

export function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href === '#') return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#04080f',
      borderTop: `1px solid rgba(212,168,83,0.1)`,
      padding: '4rem 0 2rem',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr repeat(3, 1fr)',
          gap: '3rem',
          alignItems: 'start',
          marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div>
            <a
              href="#"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', marginBottom: '1.25rem' }}
            >
              <LogoMark />
              <div style={{ lineHeight: 1 }}>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem', fontWeight: 600,
                  color: '#F0EBE0', letterSpacing: '0.18em',
                }}>
                  EMMA
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.52rem', fontWeight: 400,
                  color: '#8C9198', letterSpacing: '0.3em',
                  textTransform: 'uppercase', marginTop: '1px',
                }}>
                  Capital
                </div>
              </div>
            </a>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8rem', fontWeight: 300, lineHeight: 1.8,
              color: '#2A3040', maxWidth: 260, margin: '0 0 1rem',
            }}>
              €1.45bn investment management group building long-term value
              across Central &amp; Eastern Europe since 2012.
            </p>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.7rem', fontWeight: 300, color: '#1E2530',
            }}>
              Na Příkopě 19, Prague 1, Czech Republic
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map(({ heading, links }) => (
            <div key={heading}>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.62rem', fontWeight: 600,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: GOLD, marginBottom: '1.25rem',
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
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.8rem', fontWeight: 300,
                      color: '#2A3040', textDecoration: 'none', transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#8C9198'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#2A3040'; }}
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
          borderTop: `1px solid rgba(212,168,83,0.07)`,
          paddingTop: '1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.7rem', fontWeight: 300, color: '#1E2530',
          }}>
            © {new Date().getFullYear()} EMMA Capital s.r.o. All rights reserved.
          </span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.7rem', fontWeight: 300, color: '#1E2530',
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
    <svg width="24" height="27" viewBox="0 0 22 26" fill="none">
      <rect x="0" y="0" width="22" height="26" rx="1.5" fill={EMMA_RED} />
      <rect x="4" y="5"   width="2.5" height="16" fill="white" />
      <rect x="4" y="5"   width="13"  height="2.5" fill="white" />
      <rect x="4" y="11.75" width="9" height="2.5" fill="white" />
      <rect x="4" y="18.5" width="13" height="2.5" fill="white" />
    </svg>
  );
}
