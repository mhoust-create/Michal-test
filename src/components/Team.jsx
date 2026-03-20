import { useState } from 'react';

const GOLD = '#D4A853';
const DARK = '#0A1628';
const NAVY_MID = '#1A3068';
const EMMA_RED = '#C8102E';

const FOUNDER = {
  name: 'Jiří Šmejc',
  title: 'Founder & Majority Shareholder',
  initials: 'JŠ',
  photo: '/images/team/Jiri Smejc.jpg',
  bio: 'Founded EMMA Capital in 2012 with €31m — growing it to a €1.45bn investment management group over 13 years. Formerly co-owner of PPF Group and the key architect of TV Nova\'s transformation into Central Europe\'s most profitable TV channel. In 2005, sold TV Nova to CME for approximately $1 billion. Studied mathematical economics at Charles University, Faculty of Mathematics and Physics, Prague.',
};

const PARTNERS = [
  {
    name: 'Pavel Horák',
    title: 'Partner, CIO',
    focus: 'Gaming & Marinas',
    initials: 'PH',
    photo: '/images/team/Pavel Horak.jpg',
    bio: 'Partner and Chief Investment Officer. Focus on Gaming and Marina investments. Previously CFO at PPF Group and Home Credit. Leads the investment committee and oversees strategic transactions.',
  },
  {
    name: 'Tomáš Kočka',
    title: 'Partner',
    focus: 'Box Now · Rixo · Packeta',
    initials: 'TK',
    photo: '/images/team/Tomas Kocka.png',
    bio: 'Oversees Box Now, RIXO.cz, and Packeta investments. Deep operational background from PPF Group and Home Credit Group across CEE fintech and digital services.',
  },
  {
    name: 'Ondřej Frydrych',
    title: 'Partner',
    focus: 'Operations & M&A',
    initials: 'OF',
    photo: '/images/team/Ondrej Frydrych.png',
    bio: 'ex-CEO of Home Credit China and Home Credit Group. MBA from Rochester Institute of Technology. Brings deep operational transformation expertise and international management experience across Asia and CEE.',
  },
  {
    name: 'Peter Stöhr',
    title: 'Partner, CFO',
    focus: 'Premier Energy',
    initials: 'PS',
    photo: '/images/team/Peter Stohr.jpg',
    bio: 'CFO of Premier Energy. Previously CFO of SAZKA Group and Citibank Private Equity. Oversaw Premier Energy\'s BSE listing and ongoing capital markets activity across Romania and Moldova.',
  },
  {
    name: 'José Garza',
    title: 'Partner, CEO',
    focus: 'Premier Energy',
    initials: 'JG',
    photo: '/images/team/Jose Garza.jpg',
    bio: 'CEO of Premier Energy Group. ex-PPF M&A, ex-Salomon Brothers and Merrill Lynch. Led Premier Energy\'s growth from a small Romanian gas distributor to a BSE-listed SE European utility with ~€900m market cap.',
  },
  {
    name: 'Michal Houšť',
    title: 'Partner',
    focus: 'Medical · Last-Mile · E-com',
    initials: 'MH',
    photo: '/images/team/Michal Houst.jpg',
    bio: 'Leads medical distribution, last-mile logistics and e-commerce investments. ex-CFO of OPAP. Oversees Magna MedTech, Profarm and related healthcare platform expansion across South-East Europe.',
  },
  {
    name: 'Marek Doseděl',
    title: 'Partner, Legal Counsel',
    focus: 'Legal & Governance',
    initials: 'MD',
    photo: '/images/team/marek-dosedel-1c.jpg',
    bio: 'General Counsel for EMMA Capital Group. ex-White & Case. Responsible for all legal structuring, regulatory compliance, M&A documentation and group governance across 15 CEE jurisdictions.',
  },
];

function Avatar({ photo, initials, size = 88, dark = false }) {
  const [failed, setFailed] = useState(false);
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      overflow: 'hidden', flexShrink: 0,
      background: dark ? 'rgba(212,168,83,0.1)' : 'rgba(26,48,104,0.06)',
      border: dark ? '1px solid rgba(212,168,83,0.3)' : '1px solid rgba(26,48,104,0.12)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {!failed ? (
        <img
          src={photo}
          alt=""
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
        />
      ) : (
        <span style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: size * 0.28 + 'px', fontWeight: 400,
          color: dark ? GOLD : NAVY_MID, letterSpacing: '0.05em',
        }}>
          {initials}
        </span>
      )}
    </div>
  );
}

export function Team() {
  return (
    <section
      id="team"
      style={{
        background: '#FFFFFF',
        padding: '8rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        <SectionLabel text="Leadership Team" />

        <div style={{ marginTop: '1.5rem', marginBottom: '4rem' }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 400, lineHeight: 1.15,
            color: DARK, margin: '0 0 0.75rem',
          }}>
            Experienced investors,{' '}
            <em style={{ color: GOLD, fontStyle: 'italic' }}>proven operators</em>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.8,
            color: '#5A6A7A', maxWidth: 500, margin: 0,
          }}>
            Supported by an in-house team of 30+ professionals across Prague and portfolio companies.
          </p>
        </div>

        {/* Featured founder card */}
        <div style={{
          background: DARK,
          padding: '3rem',
          marginBottom: '2rem',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '2.5rem',
          alignItems: 'start',
          border: `1px solid rgba(212,168,83,0.15)`,
        }}>
          <Avatar photo={FOUNDER.photo} initials={FOUNDER.initials} size={96} dark />

          <div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.65rem', fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: EMMA_RED, marginBottom: '0.5rem',
            }}>
              Founder
            </div>
            <h3 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: '1.8rem', fontWeight: 400,
              color: '#F0EBE0', margin: '0 0 0.3rem',
            }}>
              {FOUNDER.name}
            </h3>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.75rem', fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: GOLD, marginBottom: '1.25rem',
            }}>
              {FOUNDER.title}
            </div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.9rem', fontWeight: 300,
              lineHeight: 1.8, color: '#8C9198', margin: 0,
              maxWidth: 700,
            }}>
              {FOUNDER.bio}
            </p>
          </div>
        </div>

        {/* Partner grid — 4 columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1px',
          background: 'rgba(26,48,104,0.08)',
        }}>
          {PARTNERS.map(({ name, title, focus, initials, photo, bio }, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                padding: '2rem',
                transition: 'background 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F8F9FC'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; }}
            >
              <Avatar photo={photo} initials={initials} size={64} />

              <div style={{ marginTop: '1.25rem' }}>
                <h3 style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '1.2rem', fontWeight: 400,
                  color: DARK, margin: '0 0 0.2rem',
                }}>
                  {name}
                </h3>

                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.68rem', fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: GOLD, marginBottom: '0.25rem',
                }}>
                  {title}
                </div>

                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.72rem', fontWeight: 300,
                  color: '#8C9198', marginBottom: '1rem',
                }}>
                  {focus}
                </div>

                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.8rem', fontWeight: 300,
                  lineHeight: 1.7, color: '#5A6A7A', margin: 0,
                }}>
                  {bio}
                </p>
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
