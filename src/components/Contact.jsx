const GOLD = '#D4A853';
const NAVY = '#0A1628';
const NAVY_MID = '#1A3068';
const EMMA_RED = '#C8102E';

const IR_LINKS = [
  'All companies',
  'Financial results',
  'Obligatory disclosures',
  'Other disclosures',
  'Group structure',
  'Bond information',
];

export function Contact() {
  return (
    <section
      id="contact"
      style={{
        background: '#F8F9FC',
        padding: '8rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '6rem',
          alignItems: 'start',
        }}>
          {/* Left — Investor Relations */}
          <div>
            <SectionLabel text="Investor Relations" />

            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: 400, lineHeight: 1.2,
              color: NAVY, margin: '1.5rem 0 1rem',
            }}>
              Investor{' '}
              <em style={{ color: GOLD, fontStyle: 'italic' }}>Relations</em>
            </h2>

            <div style={{ width: 28, height: 2, background: EMMA_RED, marginBottom: '2rem' }} />

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.9,
              color: '#5A6A7A', marginBottom: '2rem',
            }}>
              EMMA Capital maintains transparent reporting for investors,
              lenders and counterparties. Access our latest disclosures
              and company information below.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {IR_LINKS.map((link, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={e => e.preventDefault()}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.9rem 0',
                    borderBottom: `1px solid rgba(26,48,104,0.08)`,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.88rem', fontWeight: 400,
                    color: NAVY_MID, textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = GOLD; }}
                  onMouseLeave={e => { e.currentTarget.style.color = NAVY_MID; }}
                >
                  {link}
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M6 1l3 3-3 3M1 4h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Contact info */}
          <div>
            <SectionLabel text="Contact" />

            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: 400, lineHeight: 1.2,
              color: NAVY, margin: '1.5rem 0 1rem',
            }}>
              Let's start a{' '}
              <em style={{ color: GOLD, fontStyle: 'italic' }}>conversation</em>
            </h2>

            <div style={{ width: 28, height: 2, background: EMMA_RED, marginBottom: '2rem' }} />

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.9,
              color: '#5A6A7A', marginBottom: '3rem',
            }}>
              Whether you are exploring a potential investment partnership,
              a business sale, or simply want to learn more about EMMA Capital,
              we welcome the conversation.
            </p>

            {/* Office info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.65rem', fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: GOLD, marginBottom: '0.6rem',
                }}>
                  Prague — Headquarters
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.88rem', fontWeight: 300,
                  lineHeight: 1.8, color: '#5A6A7A',
                }}>
                  Na Příkopě 19<br />
                  110 00 Prague 1<br />
                  Czech Republic
                </div>
                <a
                  href="mailto:info@emmacapital.cz"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.88rem', fontWeight: 400,
                    color: NAVY_MID, textDecoration: 'none',
                    display: 'inline-block', marginTop: '0.5rem',
                    borderBottom: `1px solid rgba(26,48,104,0.25)`,
                    paddingBottom: '1px', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = GOLD; e.currentTarget.style.borderColor = GOLD; }}
                  onMouseLeave={e => { e.currentTarget.style.color = NAVY_MID; e.currentTarget.style.borderColor = 'rgba(26,48,104,0.25)'; }}
                >
                  info@emmacapital.cz
                </a>
              </div>

              <div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.65rem', fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: GOLD, marginBottom: '0.6rem',
                }}>
                  Investment Enquiries
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.88rem', fontWeight: 300,
                  lineHeight: 1.8, color: '#5A6A7A',
                  marginBottom: '0.5rem',
                }}>
                  For investment partnership and deal flow enquiries.
                </div>
                <a
                  href="mailto:investments@emmacapital.cz"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.88rem', fontWeight: 400,
                    color: NAVY_MID, textDecoration: 'none',
                    borderBottom: `1px solid rgba(26,48,104,0.25)`,
                    paddingBottom: '1px', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = GOLD; e.currentTarget.style.borderColor = GOLD; }}
                  onMouseLeave={e => { e.currentTarget.style.color = NAVY_MID; e.currentTarget.style.borderColor = 'rgba(26,48,104,0.25)'; }}
                >
                  investments@emmacapital.cz
                </a>
              </div>

              {/* Entity note */}
              <div style={{
                padding: '1.25rem',
                border: `1px solid rgba(26,48,104,0.1)`,
                background: '#FFFFFF',
              }}>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.72rem', fontWeight: 300,
                  lineHeight: 1.7, color: '#8C9198',
                }}>
                  <strong style={{ color: '#5A6A7A', fontWeight: 500 }}>Legal entity:</strong>{' '}
                  EMMA Capital s.r.o., registered in the Czech Republic.
                  Group structure available upon request.
                </div>
              </div>
            </div>
          </div>
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
