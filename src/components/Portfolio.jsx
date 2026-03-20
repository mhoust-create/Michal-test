import { useState } from 'react';

const PORTFOLIO = [
  {
    name: 'Entain CEE',
    sector: 'Gaming & Betting',
    country: 'Czech Republic / Poland / Croatia',
    flag: '🇨🇿',
    description: 'Joint venture with global gaming leader Entain, formed in 2022. Holds Poland\'s largest bookmaker STS (acquired 2023) and Croatian gaming operator SuperSport. EMMA Capital holds a 22.5% stake.',
    status: 'Active',
    highlight: '22.5% stake',
  },
  {
    name: 'OPAP',
    sector: 'Gaming & Lotteries',
    country: 'Greece',
    flag: '🇬🇷',
    description: 'One of the largest lottery and gaming operators in Europe, with exclusive rights for land-based sports betting until 2030. EMMA led the acquisition of a 33% stake for €650 million in 2013 as its first major investment.',
    status: 'Active',
    highlight: 'European market leader',
  },
  {
    name: 'Packeta Group',
    sector: 'Logistics & E-commerce',
    country: 'Czech Republic / CEE',
    flag: '🇨🇿',
    description: 'Leading out-of-home parcel delivery and logistics platform across CEE, including BoxNow and FoxPost (Hungary). FoxPost was acquired in partnership with CVC Capital Partners in 2024 following European Commission approval.',
    status: 'Active',
    highlight: 'CEE logistics leader',
  },
  {
    name: 'Mailstep',
    sector: 'Logistics & E-commerce',
    country: 'Czech Republic',
    flag: '🇨🇿',
    description: 'Major Czech e-commerce fulfilment provider offering warehousing and last-mile services to key online retailers. EMMA Capital assumed full ownership in 2024, acquiring the remaining stake from CVC Capital Partners.',
    status: 'Active',
    highlight: 'Full ownership',
  },
  {
    name: 'Premier Energy Group',
    sector: 'Energy',
    country: 'Romania / Moldova',
    flag: '🇷🇴',
    description: 'Leading energy distribution company supplying electricity and gas to millions of customers across Romania and Moldova. Originally acquired as GAZ SUD in 2013. Listed on the stock exchange at a valuation of approximately €525 million.',
    status: 'Active',
    highlight: 'Listed ~€525M',
  },
  {
    name: 'RIXO.cz',
    sector: 'Insurance & Fintech',
    country: 'Czech Republic',
    flag: '🇨🇿',
    description: 'Online insurance service providing digital-first insurance products to Czech customers. Acquired by EMMA Capital Group, reflecting the firm\'s strategic expansion into digital financial services and insurance technology.',
    status: 'Active',
    highlight: 'Digital-first insurance',
  },
  {
    name: 'EMMA ZETA Healthcare',
    sector: 'Healthcare',
    country: 'Romania / Montenegro',
    flag: '🇷🇴',
    description: 'EMMA\'s healthcare investment platform. Includes Diamedix Impex (Romanian medical supplies distributor, acquired March 2025) and a 65% stake in Urion (Montenegrin medical devices and pharmaceuticals, acquired September 2025).',
    status: 'Active',
    highlight: 'Expanding platform',
  },
  {
    name: 'Casinos Austria & ÖL',
    sector: 'Gaming & Lotteries',
    country: 'Austria',
    flag: '🇦🇹',
    description: 'Stakes in Casinos Austria and Österreichische Lotterien, Austria\'s national lottery operator, held via the SAZKA Group joint venture with KKCG. Also includes a stake in Italian lottery operator LOTTOITALIA.',
    status: 'Active',
    highlight: 'National lottery operator',
  },
];

const TRACK_RECORD = [
  { label: 'Founded', value: '2012' },
  { label: 'Total Investments', value: '58' },
  { label: 'Successful Exits', value: '14' },
  { label: 'Years of Track Record', value: '13+' },
];

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Active', 'Exited'];

  const filtered = activeFilter === 'All'
    ? PORTFOLIO
    : PORTFOLIO.filter(p => p.status === activeFilter);

  return (
    <section
      id="portfolio"
      style={{
        background: '#0a1020',
        padding: '8rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        <SectionLabel text="Portfolio" />

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginTop: '1.5rem', marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 300,
            lineHeight: 1.2,
            color: '#f0ebe0',
            margin: 0,
          }}>
            Market-leading businesses<br />
            <em style={{ color: '#c4973b', fontStyle: 'italic' }}>across CEE</em>
          </h2>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '0', border: '1px solid rgba(196,151,59,0.2)' }}>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: '0.5rem 1.25rem',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  background: activeFilter === f ? '#c4973b' : 'transparent',
                  color: activeFilter === f ? '#080e1c' : '#6a6258',
                  border: 'none',
                  cursor: 'pointer',
                  borderRight: f !== filters[filters.length - 1] ? '1px solid rgba(196,151,59,0.2)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Track record bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '0',
          marginBottom: '4rem',
          border: '1px solid rgba(196,151,59,0.15)',
        }}>
          {TRACK_RECORD.map(({ label, value }, i) => (
            <div
              key={i}
              style={{
                padding: '1.75rem',
                borderRight: i < TRACK_RECORD.length - 1 ? '1px solid rgba(196,151,59,0.15)' : 'none',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '2.2rem',
                fontWeight: 300,
                color: '#c4973b',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}>
                {value}
              </div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.68rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#4a4540',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1px',
          background: 'rgba(196,151,59,0.1)',
        }}>
          {filtered.map(({ name, sector, country, flag, description, status, highlight }, i) => (
            <div
              key={i}
              style={{
                background: '#0a1020',
                padding: '2.5rem',
                transition: 'background 0.3s',
                cursor: 'default',
                position: 'relative',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0d1530'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0a1020'; }}
            >
              {/* Status badge */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                padding: '0.2rem 0.6rem',
                background: status === 'Active' ? 'rgba(196,151,59,0.12)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${status === 'Active' ? 'rgba(196,151,59,0.3)' : 'rgba(255,255,255,0.1)'}`,
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.6rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: status === 'Active' ? '#c4973b' : '#4a4540',
              }}>
                {status}
              </div>

              {/* Header */}
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>{flag}</span>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.68rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#c4973b',
                }}>
                  {sector}
                </span>
              </div>

              <h3 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.5rem',
                fontWeight: 500,
                color: '#f0ebe0',
                margin: '0 0 0.25rem',
              }}>
                {name}
              </h3>

              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.72rem',
                color: '#4a4540',
                marginBottom: '1rem',
              }}>
                {country}
              </div>

              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 300,
                lineHeight: 1.7,
                color: '#5a5248',
                margin: '0 0 1.5rem',
              }}>
                {description}
              </p>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                fontWeight: 500,
                color: '#c4973b',
              }}>
                <div style={{ width: 4, height: 4, background: '#c4973b', borderRadius: '50%' }} />
                {highlight}
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
