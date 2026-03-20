const GOLD = '#D4A853';
const DARK = '#0A1628';
const CREAM = '#F0EBE0';

// Each milestone: position on the SVG canvas, dot radius, and label placement
const MILESTONES = [
  {
    year: '2012', cx: 90, cy: 472, r: 10,
    above: false, major: true, label: '€31m',
    lines: ['Founded'],
  },
  {
    year: '2013', cx: 215, cy: 468, r: 13,
    above: true,
    lines: ['Premier Energy acquisition &', 'privatization of OPAP'],
  },
  {
    year: '2014', cx: 347, cy: 454, r: 14,
    above: false,
    lines: ['Management control', 'of Eldorado'],
  },
  {
    year: '2015', cx: 480, cy: 433, r: 16,
    above: true,
    lines: ['11% stake acquired in', 'Casinos Austria'],
  },
  {
    year: '2016', cx: 614, cy: 407, r: 18,
    above: false,
    lines: ['Eldorado exit; Allwyn', '(SAZKA) established;', 'LOTTOITALIA investment'],
  },
  {
    year: '2018', cx: 888, cy: 344, r: 22,
    above: true,
    lines: ['Initial 37% stake in', 'Stoiximan (Betano)'],
  },
  {
    year: '2019', cx: 1025, cy: 311, r: 26,
    above: false,
    lines: ['Allwyn / SAZKA exit', '10.3× MOIC — retained', 'SuperSport'],
  },
  {
    year: '2019–22', cx: 1145, cy: 286, r: 20,
    above: true,
    lines: ['Rixo, Profarm,', 'Box Now, FAVI,', 'Marina 21 & more'],
  },
  {
    year: '2022', cx: 1295, cy: 252, r: 30,
    above: false,
    lines: ['75% of SuperSport', 'exited to Entain PLC'],
  },
  {
    year: '2024', cx: 1640, cy: 206, r: 42,
    above: true, major: true, label: '€1.34bn',
    lines: ['JV with CVC: Packeta &', 'Foxpost; IPO Premier', 'Energy; Magna Pharmacia'],
  },
];

// Band shape: swept ribbon from bottom-left to upper-right with arrowhead
// Center axis: M 90,472 through to (1640,206)
// Band is ~20px tall at start, ~60px tall at end
const BAND_PATH =
  'M 80,462 C 560,460 1185,190 1635,176 L 1790,206 L 1635,236 C 1185,252 560,484 80,482 Z';

function MilestoneLabel({ cx, cy, r, above, year, label, lines, major }) {
  const LINE_H = 15;
  const YEAR_SIZE = major ? 18 : 14;
  const LABEL_SIZE = major ? 22 : 15;
  const DESC_SIZE = 11;
  const GAP = 14;

  if (above) {
    // Text block ends just above the dot edge
    const bottomBaseline = cy - r - GAP;
    const subLines = (label ? 1 : 0) + lines.length;
    const yearY = bottomBaseline - subLines * LINE_H;

    return (
      <g>
        <text x={cx} y={yearY} textAnchor="middle"
          fontFamily="'Instrument Serif', serif" fontSize={YEAR_SIZE} fill={GOLD}>
          {year}
        </text>
        {label && (
          <text x={cx} y={yearY + LINE_H} textAnchor="middle"
            fontFamily="'Instrument Serif', serif" fontSize={LABEL_SIZE} fill={CREAM}>
            {label}
          </text>
        )}
        {lines.map((line, i) => (
          <text key={i} x={cx} y={yearY + (label ? i + 2 : i + 1) * LINE_H}
            textAnchor="middle" fontFamily="'DM Sans', sans-serif"
            fontSize={DESC_SIZE} fill="#8C9198" fontWeight="300">
            {line}
          </text>
        ))}
      </g>
    );
  } else {
    // Text block starts just below the dot edge
    const yearY = cy + r + GAP + LINE_H;

    return (
      <g>
        <text x={cx} y={yearY} textAnchor="middle"
          fontFamily="'Instrument Serif', serif" fontSize={YEAR_SIZE} fill={GOLD}>
          {year}
        </text>
        {label && (
          <text x={cx} y={yearY + LINE_H} textAnchor="middle"
            fontFamily="'Instrument Serif', serif" fontSize={LABEL_SIZE} fill={CREAM}>
            {label}
          </text>
        )}
        {lines.map((line, i) => (
          <text key={i} x={cx} y={yearY + (label ? i + 2 : i + 1) * LINE_H}
            textAnchor="middle" fontFamily="'DM Sans', sans-serif"
            fontSize={DESC_SIZE} fill="#8C9198" fontWeight="300">
            {line}
          </text>
        ))}
      </g>
    );
  }
}

export function TrackRecord() {
  return (
    <section
      id="track-record"
      style={{
        background: DARK,
        padding: '8rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 30% 50%, rgba(212,168,83,0.04) 0%, transparent 60%)',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
        <SectionLabel text="Track Record" />

        <div style={{
          marginTop: '1.5rem', marginBottom: '4rem',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '2rem',
        }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 400, lineHeight: 1.15,
            color: CREAM, margin: 0,
          }}>
            Growing EMMA's portfolio from{' '}
            <em style={{ color: GOLD, fontStyle: 'italic' }}>€31m to €1.34bn</em>
            <br />
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              fontWeight: 300, color: '#8C9198',
            }}>
              including €78m cash out to shareholders
            </span>
          </h2>

          {/* Bullet callouts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 340 }}>
            {[
              { strong: '60+ new or add-on acquisitions', rest: ' and several exits since inception' },
              { strong: 'NAV grew to €1.34 billion', rest: ' — plus €78m paid to shareholders' },
            ].map(({ strong, rest }, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: 6, height: 6, borderRadius: 1,
                  background: '#C8102E', flexShrink: 0, marginTop: '0.35rem',
                }} />
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.83rem', fontWeight: 300, lineHeight: 1.7,
                  color: '#8C9198', margin: 0,
                }}>
                  <strong style={{ fontWeight: 600, color: CREAM }}>{strong}</strong>{rest}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '0',
          border: `1px solid rgba(212,168,83,0.15)`,
          marginBottom: '5rem',
        }}>
          {KEY_STATS.map(({ value, unit, label, sub }, i) => (
            <div key={i} style={{
              padding: '2rem 1.5rem',
              borderRight: i < KEY_STATS.length - 1 ? `1px solid rgba(212,168,83,0.15)` : 'none',
              textAlign: 'center',
            }}>
              <div style={{
                display: 'flex', alignItems: 'baseline', justifyContent: 'center',
                gap: '0.15rem', marginBottom: '0.4rem',
              }}>
                <span style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '2.2rem', fontWeight: 400, color: GOLD, lineHeight: 1,
                }}>
                  {value}
                </span>
                {unit && (
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', color: GOLD }}>
                    {unit}
                  </span>
                )}
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.65rem', fontWeight: 500,
                letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4A5568',
              }}>
                {label}
              </div>
              {sub && (
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: '#5A6A7A', marginTop: '0.2rem' }}>
                  {sub}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Graphical arrow timeline */}
        <div style={{ marginBottom: '1.5rem' }}>
          <SectionLabel text="Portfolio Growth Timeline 2012 – 2024" />
        </div>

        <div className="timeline-scroll" style={{ paddingBottom: '1rem' }}>
          <svg
            viewBox="0 0 1860 600"
            width="1860"
            height="600"
            style={{ display: 'block', overflow: 'visible' }}
            aria-label="EMMA Capital portfolio growth timeline 2012 to 2024"
          >
            <defs>
              <linearGradient id="bandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1A2E42" />
                <stop offset="55%" stopColor="#223650" />
                <stop offset="100%" stopColor="#2B4566" />
              </linearGradient>
              <linearGradient id="dotGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#152234" />
                <stop offset="100%" stopColor="#0D1A28" />
              </linearGradient>
            </defs>

            {/* Ribbon band */}
            <path d={BAND_PATH} fill="url(#bandGrad)" opacity="0.88" />

            {/* Subtle highlight along top edge of band */}
            <path
              d="M 80,462 C 560,460 1185,190 1635,176 L 1790,206"
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1.5"
            />

            {/* Milestone dots */}
            {MILESTONES.map(({ year, cx, cy, r, major }) => (
              <g key={`dot-${year}`}>
                {/* Outer ring / halo */}
                <circle
                  cx={cx} cy={cy} r={r + 5}
                  fill="none"
                  stroke={major ? `rgba(212,168,83,0.45)` : `rgba(212,168,83,0.2)`}
                  strokeWidth="1"
                />
                {/* Main dot */}
                <circle
                  cx={cx} cy={cy} r={r}
                  fill="url(#dotGlow)"
                  stroke={GOLD}
                  strokeWidth={major ? 2 : 1.5}
                />
                {/* Inner highlight */}
                <circle
                  cx={cx - r * 0.25} cy={cy - r * 0.25} r={r * 0.28}
                  fill="rgba(255,255,255,0.08)"
                />
              </g>
            ))}

            {/* Labels */}
            {MILESTONES.map((m) => (
              <MilestoneLabel key={`label-${m.year}`} {...m} />
            ))}
          </svg>
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

const KEY_STATS = [
  { value: '€31m', label: 'Initial Capital', sub: '→ €1.34bn NAV' },
  { value: '51', unit: 'x', label: 'MOIC' },
  { value: '39.2', unit: '%', label: 'IRR' },
  { value: '€78', unit: 'm', label: 'Cash to Shareholders' },
  { value: '65', unit: '+', label: 'Acquisitions' },
  { value: '14', label: 'Exits' },
];
