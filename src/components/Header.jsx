import { useState, useEffect } from 'react';

const GOLD = '#D4A853';
const DARK = '#0A1628';
const EMMA_RED = '#C8102E';
const EMMA_NAVY = '#1A3068';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Track Record', href: '#track-record' },
  { label: 'Team', href: '#team' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.4s ease',
        background: scrolled ? `rgba(10,22,40,0.96)` : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? `1px solid rgba(212,168,83,0.12)` : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}
          >
            <EmmLogo textColor="#F0EBE0" />
          </a>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="desktop-nav">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={e => handleNavClick(e, href)}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.75rem', fontWeight: 500,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: '#8C9198', textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.target.style.color = GOLD)}
                onMouseLeave={e => (e.target.style.color = '#8C9198')}
              >
                {label}
              </a>
            ))}

            {/* Language toggle */}
            <div style={{ display: 'flex', gap: '0', border: '1px solid rgba(212,168,83,0.2)', borderRadius: 2 }}>
              {['EN', 'CZ'].map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    padding: '0.3rem 0.6rem',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.65rem', fontWeight: 500,
                    letterSpacing: '0.1em',
                    background: lang === l ? GOLD : 'transparent',
                    color: lang === l ? DARK : '#8C9198',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Contact CTA */}
            <a
              href="#contact"
              onClick={e => handleNavClick(e, '#contact')}
              style={{
                padding: '0.5rem 1.2rem',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.72rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                background: EMMA_RED, color: '#FFFFFF',
                textDecoration: 'none', transition: 'background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#a80d25'; }}
              onMouseLeave={e => { e.currentTarget.style.background = EMMA_RED; }}
            >
              Contact
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem', display: 'none' }}
            aria-label="Toggle menu"
          >
            <div style={{ width: 24, height: 2, background: GOLD, marginBottom: 5, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <div style={{ width: 24, height: 2, background: GOLD, marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: 'opacity 0.3s' }} />
            <div style={{ width: 24, height: 2, background: GOLD, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(10,22,40,0.98)',
          backdropFilter: 'blur(16px)',
          borderTop: `1px solid rgba(212,168,83,0.12)`,
          padding: '1.5rem 2rem',
        }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={e => handleNavClick(e, href)}
              style={{
                display: 'block', padding: '0.75rem 0',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.8rem', fontWeight: 500,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#8C9198', textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={e => handleNavClick(e, '#contact')}
            style={{
              display: 'block', padding: '0.75rem 0',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8rem', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: EMMA_RED, textDecoration: 'none',
            }}
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}

/* EMMA logo — red icon + bold EMMA wordmark */
function EmmLogo({ textColor = EMMA_NAVY }) {
  return (
    <svg height="36" viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Red rectangle icon */}
      <rect x="0" y="0" width="34" height="36" fill={EMMA_RED} />
      {/* White vertical stripe on the right half */}
      <rect x="18" y="0" width="16" height="36" fill="white" />
      {/* Red square block on bottom-left of the white stripe — forms the flag shape */}
      <rect x="18" y="18" width="16" height="18" fill={EMMA_RED} />

      {/* EMMA wordmark in bold navy */}
      <text
        x="42"
        y="27"
        fontFamily="'DM Sans', Arial, sans-serif"
        fontWeight="800"
        fontSize="22"
        fill={textColor}
        letterSpacing="1"
      >
        EMMA
      </text>
    </svg>
  );
}
