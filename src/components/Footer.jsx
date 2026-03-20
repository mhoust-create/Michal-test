const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
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
              <img src={`${BASE}/images/emma logo.jpg`} alt="EMMA Capital" style={{ height: 44, display: 'block' }} />
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

function EmmLogo({ textColor = '#F0EBE0' }) {
  return (
    <svg height="44" viewBox="0 0 148 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="40" height="40" fill={EMMA_RED} />
      <path d="M 18,0 A 22,22 0 0,1 40,22 L 40,0 Z" fill="white" />
      <text
        x="50" y="27"
        fontFamily="'DM Sans', Arial, sans-serif"
        fontWeight="800"
        fontSize="26"
        fill={textColor}
        letterSpacing="0.5"
      >
        EMMA
      </text>
      <text
        x="51" y="40"
        fontFamily="'DM Sans', Arial, sans-serif"
        fontWeight="400"
        fontSize="9.5"
        fill="#5A6A7A"
        letterSpacing="4"
      >
        CAPITAL
      </text>
    </svg>
  );
}
