const TEAM = [
  {
    name: 'Jiří Šmejc',
    title: 'Founder & Majority Owner',
    bio: 'Founded EMMA Capital in 2012. Formerly co-owner of PPF Group and key figure in the transformation of TV Nova into the most profitable TV channel in Central Europe. In 2005 he and Petr Kellner sold TV Nova to CME for approximately $1 billion. Studied mathematical economics at Charles University, Faculty of Mathematics and Physics.',
    initials: 'JŠ',
  },
  {
    name: 'Pavel Horák',
    title: 'Partner & Investment Director',
    bio: 'Joined EMMA Capital as Chief Investment Officer in 2014. Oversees strategic investments and leads the investment committee. Has been instrumental in major transactions including the RIXO.cz acquisition and the entry of J&T ARCH INVESTMENTS as an external investor.',
    initials: 'PH',
  },
  {
    name: 'Tomáš Kočka',
    title: 'Partner & Investment Director',
    bio: 'Investment director with deep expertise in fintech and financial services. Prior experience at PPF Group\'s banking division and Home Credit Group, bringing extensive knowledge of consumer finance and digital financial products across CEE markets.',
    initials: 'TK',
  },
  {
    name: 'Ondřej Frydrych',
    title: 'Partner',
    bio: 'Graduate of the Technical University in Liberec, with further studies in computer science at the Technological Institute in Dublin and an MBA from the Rochester Institute of Technology. Led major operational roles including CEO of Eldorado in Russia, bringing deep operational transformation expertise to the portfolio.',
    initials: 'OF',
  },
  {
    name: 'Michal Houšť',
    title: 'Partner',
    bio: 'Leads fintech and digital initiatives within EMMA Capital. Drives the group\'s strategy in digital financial services and technology-enabled business models across Central and Eastern Europe.',
    initials: 'MH',
  },
  {
    name: 'Petr Stohr',
    title: 'Partner',
    bio: 'Focuses on energy and infrastructure investments at EMMA Capital. Oversees the group\'s energy portfolio including Premier Energy Group, a leading energy distribution business operating across Romania and Moldova.',
    initials: 'PS',
  },
  {
    name: 'José Garza',
    title: 'Partner & CEO, Premier Energy Group',
    bio: 'CEO of Premier Energy Group, EMMA Capital\'s flagship energy platform. Oversees operations across Romania and Moldova, where Premier Energy distributes electricity and gas to millions of customers. Led the listing of Premier Energy at a valuation of approximately €525 million.',
    initials: 'JG',
  },
  {
    name: 'Marek Doseděl',
    title: 'Partner',
    bio: 'Supports corporate development and governance across the EMMA Capital group. Responsible for portfolio company oversight, board representation, and the implementation of governance frameworks across the group\'s diverse investments.',
    initials: 'MD',
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
