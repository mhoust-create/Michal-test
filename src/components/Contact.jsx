export function Contact() {
  return (
    <section
      id="contact"
      style={{
        background: '#0a1020',
        padding: '8rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative grid lines */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.025 }}
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          {[0, 200, 400, 600, 800, 1000, 1200].map((x, i) => (
            <line key={i} x1={x} y1="0" x2={x} y2="600" stroke="#c4973b" strokeWidth="1" />
          ))}
          {[0, 100, 200, 300, 400, 500, 600].map((y, i) => (
            <line key={i} x1="0" y1={y} x2="1200" y2={y} stroke="#c4973b" strokeWidth="1" />
          ))}
        </svg>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '6rem', alignItems: 'start' }}>
          {/* Left: heading + intro */}
          <div>
            <SectionLabel text="Contact" />

            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 300,
              lineHeight: 1.2,
              color: '#f0ebe0',
              margin: '1.5rem 0 1.5rem',
            }}>
              Let's start a<br />
              <em style={{ color: '#c4973b', fontStyle: 'italic' }}>conversation</em>
            </h2>

            <div style={{ width: 40, height: 1, background: '#c4973b', marginBottom: '2rem' }} />

            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              fontWeight: 300,
              lineHeight: 1.9,
              color: '#5a5248',
              marginBottom: '3rem',
            }}>
              Whether you are exploring a potential investment partnership, a business
              sale, or simply want to learn more about EMMA Capital, we welcome the
              conversation.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {OFFICES.map(({ city, address, email }, i) => (
                <div key={i}>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.68rem',
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#c4973b',
                    marginBottom: '0.5rem',
                  }}>
                    {city}
                  </div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.85rem',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: '#5a5248',
                  }}>
                    {address}
                  </div>
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.85rem',
                        fontWeight: 400,
                        color: '#8a8070',
                        textDecoration: 'none',
                        display: 'inline-block',
                        marginTop: '0.25rem',
                        borderBottom: '1px solid rgba(196,151,59,0.2)',
                        paddingBottom: '1px',
                        transition: 'color 0.2s, border-color 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#c4973b'; e.currentTarget.style.borderColor = '#c4973b'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#8a8070'; e.currentTarget.style.borderColor = 'rgba(196,151,59,0.2)'; }}
                    >
                      {email}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: contact form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const fieldStyle = {
    width: '100%',
    background: 'rgba(196,151,59,0.04)',
    border: '1px solid rgba(196,151,59,0.15)',
    color: '#f0ebe0',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
    fontWeight: 300,
    padding: '0.9rem 1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.68rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#5a5248',
    display: 'block',
    marginBottom: '0.5rem',
  };

  const focusIn = e => { e.target.style.borderColor = 'rgba(196,151,59,0.5)'; };
  const focusOut = e => { e.target.style.borderColor = 'rgba(196,151,59,0.15)'; };

  return (
    <form
      onSubmit={e => e.preventDefault()}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <label style={labelStyle}>First Name</label>
          <input type="text" placeholder="First name" style={fieldStyle} onFocus={focusIn} onBlur={focusOut} />
        </div>
        <div>
          <label style={labelStyle}>Last Name</label>
          <input type="text" placeholder="Last name" style={fieldStyle} onFocus={focusIn} onBlur={focusOut} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Company</label>
        <input type="text" placeholder="Your company" style={fieldStyle} onFocus={focusIn} onBlur={focusOut} />
      </div>

      <div>
        <label style={labelStyle}>Email</label>
        <input type="email" placeholder="your@email.com" style={fieldStyle} onFocus={focusIn} onBlur={focusOut} />
      </div>

      <div>
        <label style={labelStyle}>Subject</label>
        <select
          style={{ ...fieldStyle, cursor: 'pointer' }}
          onFocus={focusIn}
          onBlur={focusOut}
          defaultValue=""
        >
          <option value="" disabled>Select a topic</option>
          <option value="investment">Investment Enquiry</option>
          <option value="partnership">Partnership</option>
          <option value="media">Media &amp; Press</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Message</label>
        <textarea
          rows={5}
          placeholder="Your message..."
          style={{ ...fieldStyle, resize: 'vertical', minHeight: 120 }}
          onFocus={focusIn}
          onBlur={focusOut}
        />
      </div>

      <button
        type="submit"
        style={{
          alignSelf: 'flex-start',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.9rem 2rem',
          background: '#c4973b',
          color: '#080e1c',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#d4a84b'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#c4973b'; }}
      >
        Send Message
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path d="M8 1l5 4-5 4M1 5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </form>
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

const OFFICES = [
  {
    city: 'Prague — Headquarters',
    address: 'Na Příkopě 19\n110 00 Prague 1\nCzech Republic',
    email: 'info@emmacapital.cz',
  },
  {
    city: 'Investment Enquiries',
    address: 'For investment partnership and deal flow enquiries.',
    email: 'investments@emmacapital.cz',
  },
];
