// SVG Exercise Illustrations — Stick figure demonstrations

const SVG_SIZE = 200;

const StickFigure = ({ children, bg = '#161b22' }) => (
  <svg
    viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
    className="exercise-svg w-full h-full"
    style={{ background: bg, borderRadius: '12px' }}
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

// Color palette
const C = {
  body: '#e8c547',      // gold for body
  accent: '#f97316',    // orange for movement arrows
  bar: '#6b7280',       // gray for equipment
  ring: '#9ca3af',      // light gray for rings
  text: '#9ca3af',      // label text
  ground: '#21262d',    // ground line
  highlight: '#39d353', // green highlight
};

// Arrow helper
const Arrow = ({ x1, y1, x2, y2, color = C.accent }) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  const len = Math.sqrt(dx * dx + dy * dy);
  return (
    <g transform={`translate(${x1},${y1}) rotate(${angle})`}>
      <line x1={0} y1={0} x2={len} y2={0} stroke={color} strokeWidth={2} strokeDasharray="4,2" />
      <polygon points={`${len},0 ${len - 6},3 ${len - 6},-3`} fill={color} />
    </g>
  );
};

// ═══════════════════════════════════════════
// PUSH EXERCISES
// ═══════════════════════════════════════════

export function PushupSVG() {
  return (
    <StickFigure>
      {/* Ground */}
      <line x1={10} y1={160} x2={190} y2={160} stroke={C.ground} strokeWidth={2} />

      {/* Body in plank/pushup position - DOWN phase */}
      {/* Hands */}
      <circle cx={45} cy={150} r={5} fill={C.body} />
      <circle cx={155} cy={150} r={5} fill={C.body} />
      {/* Arms */}
      <line x1={45} y1={145} x2={65} y2={130} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={155} y1={145} x2={135} y2={130} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      {/* Body */}
      <line x1={65} y1={130} x2={135} y2={125} stroke={C.body} strokeWidth={4} strokeLinecap="round" />
      {/* Head */}
      <circle cx={145} cy={118} r={10} fill="none" stroke={C.body} strokeWidth={3} />
      {/* Legs */}
      <line x1={65} y1={130} x2={40} y2={158} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      {/* Feet */}
      <circle cx={40} cy={158} r={4} fill={C.body} />

      {/* Arrow showing movement UP */}
      <Arrow x1={100} y1={128} x2={100} y2={108} color={C.accent} />

      {/* Labels */}
      <text x={100} y={22} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">PUSH-UP</text>
      <text x={100} y={185} fill={C.text} fontSize={9} textAnchor="middle" fontFamily="sans-serif">Plank → lower chest 1" → push up</text>
    </StickFigure>
  );
}

export function DiamondPushupSVG() {
  return (
    <StickFigure>
      <line x1={10} y1={160} x2={190} y2={160} stroke={C.ground} strokeWidth={2} />

      {/* Diamond hand position shown from above */}
      {/* Triangle/diamond shape hands */}
      <polygon points="100,145 90,155 110,155" fill="none" stroke={C.accent} strokeWidth={2} />
      <circle cx={100} cy={145} r={4} fill={C.body} />
      <circle cx={90} cy={155} r={4} fill={C.body} />
      <circle cx={110} cy={155} r={4} fill={C.body} />

      {/* Arms from diamond inward */}
      <line x1={90} y1={155} x2={70} y2={135} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={110} y1={155} x2={130} y2={135} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      {/* Shoulders/body */}
      <line x1={70} y1={135} x2={130} y2={132} stroke={C.body} strokeWidth={4} strokeLinecap="round" />
      {/* Head */}
      <circle cx={140} cy={124} r={10} fill="none" stroke={C.body} strokeWidth={3} />
      {/* Legs */}
      <line x1={70} y1={135} x2={42} y2={158} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <circle cx={42} cy={158} r={4} fill={C.body} />

      <Arrow x1={100} y1={130} x2={100} y2={110} color={C.accent} />

      <text x={100} y={22} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">DIAMOND PUSH-UP</text>
      <text x={100} y={180} fill={C.accent} fontSize={10} textAnchor="middle" fontFamily="sans-serif">Hands form ◆ under chest</text>
      <text x={100} y={193} fill={C.text} fontSize={9} textAnchor="middle" fontFamily="sans-serif">Elbows tucked close to body</text>
    </StickFigure>
  );
}

export function PikePushupSVG() {
  return (
    <StickFigure>
      <line x1={10} y1={175} x2={190} y2={175} stroke={C.ground} strokeWidth={2} />

      {/* Pike position — inverted V */}
      {/* Hands on ground */}
      <circle cx={55} cy={165} r={5} fill={C.body} />
      <circle cx={75} cy={165} r={5} fill={C.body} />
      {/* Arms going up */}
      <line x1={55} y1={165} x2={100} y2={110} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={75} y1={165} x2={100} y2={110} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      {/* Hips at top */}
      <circle cx={100} cy={100} r={7} fill={C.accent} opacity={0.6} />
      {/* Body going down from hips */}
      <line x1={100} y1={107} x2={145} y2={165} stroke={C.body} strokeWidth={4} strokeLinecap="round" />
      {/* Feet */}
      <circle cx={145} cy={165} r={5} fill={C.body} />
      <circle cx={155} cy={165} r={5} fill={C.body} />

      {/* Arrow down for head lowering */}
      <Arrow x1={70} y1={100} x2={70} y2={130} color={C.accent} />

      <text x={100} y={25} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">PIKE PUSH-UP</text>
      <text x={100} y={192} fill={C.text} fontSize={9} textAnchor="middle" fontFamily="sans-serif">Hips HIGH, lower head toward ground</text>
    </StickFigure>
  );
}

export function DipSVG() {
  return (
    <StickFigure>
      {/* Parallel bars */}
      <rect x={40} y={90} width={10} height={80} rx={3} fill={C.bar} />
      <rect x={150} y={90} width={10} height={80} rx={3} fill={C.bar} />
      <line x1={40} y1={95} x2={50} y2={95} stroke={C.bar} strokeWidth={8} />
      <line x1={150} y1={95} x2={160} y2={95} stroke={C.bar} strokeWidth={8} />

      {/* Grip on bars */}
      <circle cx={45} cy={100} r={6} fill={C.body} />
      <circle cx={155} cy={100} r={6} fill={C.body} />

      {/* Arms going up */}
      <line x1={45} y1={100} x2={75} y2={78} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={155} y1={100} x2={125} y2={78} stroke={C.body} strokeWidth={3} strokeLinecap="round" />

      {/* Torso */}
      <line x1={75} y1={78} x2={125} y2={78} stroke={C.body} strokeWidth={4} />
      <line x1={100} y1={78} x2={100} y2={48} stroke={C.body} strokeWidth={3} />
      {/* Head */}
      <circle cx={100} cy={38} r={10} fill="none" stroke={C.body} strokeWidth={3} />

      {/* Legs hanging */}
      <line x1={100} y1={78} x2={90} y2={120} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={100} y1={78} x2={110} y2={120} stroke={C.body} strokeWidth={3} strokeLinecap="round" />

      <Arrow x1={100} y1={75} x2={100} y2={55} color={C.accent} />

      <text x={100} y={175} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">BAR / RING DIP</text>
      <text x={100} y={192} fill={C.text} fontSize={9} textAnchor="middle" fontFamily="sans-serif">Lower until upper arms parallel to ground</text>
    </StickFigure>
  );
}

export function RingPushupSVG() {
  return (
    <StickFigure>
      {/* Rings hanging */}
      <line x1={55} y1={10} x2={55} y2={140} stroke={C.ring} strokeWidth={1} strokeDasharray="3,3" />
      <line x1={145} y1={10} x2={145} y2={140} stroke={C.ring} strokeWidth={1} strokeDasharray="3,3" />
      <circle cx={55} cy={145} r={8} fill="none" stroke={C.ring} strokeWidth={2} />
      <circle cx={145} cy={145} r={8} fill="none" stroke={C.ring} strokeWidth={2} />

      {/* Grip */}
      <circle cx={55} cy={145} r={5} fill={C.body} />
      <circle cx={145} cy={145} r={5} fill={C.body} />

      {/* Plank body on rings */}
      <line x1={55} y1={140} x2={80} y2={125} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={145} y1={140} x2={120} y2={125} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={80} y1={125} x2={120} y2={122} stroke={C.body} strokeWidth={4} strokeLinecap="round" />
      <circle cx={130} cy={115} r={10} fill="none" stroke={C.body} strokeWidth={3} />
      <line x1={80} y1={125} x2={52} y2={155} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <circle cx={52} cy={155} r={4} fill={C.body} />

      <Arrow x1={100} y1={124} x2={100} y2={104} color={C.accent} />
      <text x={100} y={25} fill={C.ring} fontSize={9} textAnchor="middle">Rings add instability</text>
      <text x={100} y={180} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">RING PUSH-UP</text>
      <text x={100} y={194} fill={C.text} fontSize={9} textAnchor="middle">Rings out at top (false grip)</text>
    </StickFigure>
  );
}

// ═══════════════════════════════════════════
// PULL EXERCISES
// ═══════════════════════════════════════════

export function PullupSVG() {
  return (
    <StickFigure>
      {/* Bar */}
      <rect x={30} y={20} width={140} height={8} rx={4} fill={C.bar} />
      {/* Bar supports */}
      <line x1={50} y1={10} x2={50} y2={28} stroke={C.bar} strokeWidth={3} />
      <line x1={150} y1={10} x2={150} y2={28} stroke={C.bar} strokeWidth={3} />

      {/* Hands gripping bar */}
      <circle cx={65} cy={28} r={7} fill={C.body} />
      <circle cx={135} cy={28} r={7} fill={C.body} />

      {/* Arms */}
      <line x1={65} y1={35} x2={82} y2={58} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={135} y1={35} x2={118} y2={58} stroke={C.body} strokeWidth={3} strokeLinecap="round" />

      {/* Torso */}
      <line x1={82} y1={58} x2={118} y2={58} stroke={C.body} strokeWidth={4} />
      <line x1={100} y1={58} x2={100} y2={90} stroke={C.body} strokeWidth={3} />
      {/* Head */}
      <circle cx={100} cy={50} r={10} fill="none" stroke={C.body} strokeWidth={3} />

      {/* Legs hanging */}
      <line x1={100} y1={90} x2={88} y2={140} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={100} y1={90} x2={112} y2={140} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      {/* Feet */}
      <line x1={88} y1={140} x2={80} y2={148} stroke={C.body} strokeWidth={2} strokeLinecap="round" />
      <line x1={112} y1={140} x2={120} y2={148} stroke={C.body} strokeWidth={2} strokeLinecap="round" />

      {/* Chin line */}
      <line x1={70} y1={48} x2={130} y2={48} stroke={C.accent} strokeWidth={1} strokeDasharray="4,2" />
      <text x={140} y={50} fill={C.accent} fontSize={8}>chin!</text>

      <Arrow x1={100} y1={95} x2={100} y2={65} color={C.accent} />

      <text x={100} y={168} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">PULL-UP</text>
      <text x={100} y={183} fill={C.text} fontSize={9} textAnchor="middle">Overhand grip. Dead hang → chin over bar</text>
    </StickFigure>
  );
}

export function ChinupSVG() {
  return (
    <StickFigure>
      {/* Bar */}
      <rect x={30} y={20} width={140} height={8} rx={4} fill={C.bar} />
      <line x1={50} y1={10} x2={50} y2={28} stroke={C.bar} strokeWidth={3} />
      <line x1={150} y1={10} x2={150} y2={28} stroke={C.bar} strokeWidth={3} />

      {/* Underhand grip indicator */}
      <circle cx={70} cy={28} r={7} fill={C.body} />
      <circle cx={130} cy={28} r={7} fill={C.body} />
      <text x={100} y={18} fill={C.accent} fontSize={9} textAnchor="middle">underhand ↓</text>

      {/* Arms */}
      <line x1={70} y1={35} x2={85} y2={55} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={130} y1={35} x2={115} y2={55} stroke={C.body} strokeWidth={3} strokeLinecap="round" />

      {/* Torso + Head */}
      <line x1={85} y1={55} x2={115} y2={55} stroke={C.body} strokeWidth={4} />
      <line x1={100} y1={55} x2={100} y2={88} stroke={C.body} strokeWidth={3} />
      <circle cx={100} cy={47} r={10} fill="none" stroke={C.body} strokeWidth={3} />

      {/* Legs */}
      <line x1={100} y1={88} x2={88} y2={138} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={100} y1={88} x2={112} y2={138} stroke={C.body} strokeWidth={3} strokeLinecap="round" />

      <Arrow x1={100} y1={92} x2={100} y2={62} color={C.accent} />

      <text x={100} y={165} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">CHIN-UP</text>
      <text x={100} y={180} fill={C.text} fontSize={9} textAnchor="middle">Underhand grip = more bicep activation</text>
    </StickFigure>
  );
}

export function RingRowSVG() {
  return (
    <StickFigure>
      {/* Ceiling attachment */}
      <rect x={85} y={5} width={30} height={6} rx={2} fill={C.bar} />
      {/* Ring straps */}
      <line x1={92} y1={11} x2={72} y2={90} stroke={C.ring} strokeWidth={1} strokeDasharray="3,3" />
      <line x1={108} y1={11} x2={128} y2={90} stroke={C.ring} strokeWidth={1} strokeDasharray="3,3" />
      <circle cx={72} cy={95} r={7} fill="none" stroke={C.ring} strokeWidth={2} />
      <circle cx={128} cy={95} r={7} fill="none" stroke={C.ring} strokeWidth={2} />

      {/* Body at angle — ring row position */}
      {/* Hands on rings */}
      <circle cx={72} cy={95} r={5} fill={C.body} />
      <circle cx={128} cy={95} r={5} fill={C.body} />

      {/* Arms to shoulders */}
      <line x1={72} y1={90} x2={88} y2={110} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={128} y1={90} x2={112} y2={110} stroke={C.body} strokeWidth={3} strokeLinecap="round" />

      {/* Torso diagonal */}
      <line x1={88} y1={110} x2={112} y2={110} stroke={C.body} strokeWidth={4} />
      <line x1={100} y1={110} x2={130} y2={155} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      {/* Head */}
      <circle cx={80} cy={103} r={10} fill="none" stroke={C.body} strokeWidth={3} />
      {/* Heels on ground */}
      <line x1={130} y1={155} x2={160} y2={160} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <circle cx={160} cy={162} r={5} fill={C.body} />
      <line x1={10} y1={165} x2={190} y2={165} stroke={C.ground} strokeWidth={2} />

      <Arrow x1={90} y1={115} x2={75} y2={98} color={C.accent} />

      <text x={100} y={185} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">RING ROW</text>
      <text x={100} y={197} fill={C.text} fontSize={9} textAnchor="middle">Pull chest to rings. Lower = harder</text>
    </StickFigure>
  );
}

export function MuscleUpSVG() {
  return (
    <StickFigure>
      {/* Bar */}
      <rect x={30} y={30} width={140} height={8} rx={4} fill={C.bar} />
      <line x1={50} y1={15} x2={50} y2={38} stroke={C.bar} strokeWidth={3} />
      <line x1={150} y1={15} x2={150} y2={38} stroke={C.bar} strokeWidth={3} />

      {/* Phase 1: Pull phase — ghost */}
      <circle cx={75} cy={38} r={5} fill={C.body} opacity={0.3} />
      <circle cx={125} cy={38} r={5} fill={C.body} opacity={0.3} />
      <line x1={75} y1={43} x2={88} y2={70} stroke={C.body} strokeWidth={2} strokeLinecap="round" opacity={0.3} />
      <line x1={125} y1={43} x2={112} y2={70} stroke={C.body} strokeWidth={2} strokeLinecap="round" opacity={0.3} />
      <line x1={88} y1={70} x2={112} y2={70} stroke={C.body} strokeWidth={3} opacity={0.3} />
      <circle cx={100} cy={60} r={9} fill="none" stroke={C.body} strokeWidth={2} opacity={0.3} />
      <line x1={100} y1={79} x2={88} y2={120} stroke={C.body} strokeWidth={2} opacity={0.3} />
      <line x1={100} y1={79} x2={112} y2={120} stroke={C.body} strokeWidth={2} opacity={0.3} />

      {/* Phase 2: Transition/dip phase — solid */}
      <circle cx={75} cy={38} r={6} fill={C.body} />
      <circle cx={125} cy={38} r={6} fill={C.body} />
      <line x1={75} y1={32} x2={85} y2={20} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={125} y1={32} x2={115} y2={20} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={85} y1={20} x2={115} y2={20} stroke={C.body} strokeWidth={4} />
      <circle cx={100} cy={14} r={8} fill="none" stroke={C.body} strokeWidth={3} />

      <Arrow x1={90} y1={68} x2={90} y2={40} color={C.accent} />
      <text x={100} y={145} fill={C.accent} fontSize={9} textAnchor="middle">Pull → Transition → Push</text>
      <text x={100} y={165} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">MUSCLE-UP</text>
      <text x={100} y={180} fill={C.text} fontSize={9} textAnchor="middle">Get hips to bar, lean forward, push up</text>
    </StickFigure>
  );
}

export function CommandoPullupSVG() {
  return (
    <StickFigure>
      {/* Bar — side on */}
      <rect x={30} y={25} width={140} height={8} rx={4} fill={C.bar} />

      {/* Figure gripping from side — parallel grip */}
      <circle cx={95} cy={33} r={6} fill={C.body} />
      <circle cx={110} cy={33} r={6} fill={C.body} />

      {/* Arms */}
      <line x1={95} y1={39} x2={85} y2={65} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={110} y1={39} x2={120} y2={65} stroke={C.body} strokeWidth={3} strokeLinecap="round" />

      {/* Body */}
      <line x1={85} y1={65} x2={120} y2={65} stroke={C.body} strokeWidth={4} />
      <line x1={100} y1={65} x2={100} y2={95} stroke={C.body} strokeWidth={3} />
      {/* Head — to left side (LEFT pull) */}
      <circle cx={78} cy={30} r={10} fill="none" stroke={C.accent} strokeWidth={3} />
      <text x={65} y={18} fill={C.accent} fontSize={8}>left ear</text>

      {/* Legs */}
      <line x1={100} y1={95} x2={88} y2={145} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={100} y1={95} x2={112} y2={145} stroke={C.body} strokeWidth={3} strokeLinecap="round" />

      <Arrow x1={100} y1={100} x2={80} y2={38} color={C.accent} />

      <text x={100} y={170} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">COMMANDO PULL-UP</text>
      <text x={100} y={185} fill={C.text} fontSize={9} textAnchor="middle">Parallel grip, alternate left/right ear</text>
    </StickFigure>
  );
}

// ═══════════════════════════════════════════
// CORE EXERCISES
// ═══════════════════════════════════════════

export function PlankSVG() {
  return (
    <StickFigure>
      <line x1={10} y1={155} x2={190} y2={155} stroke={C.ground} strokeWidth={2} />

      {/* Forearms */}
      <rect x={35} y={138} width={30} height={8} rx={4} fill={C.body} />
      <rect x={135} y={138} width={30} height={8} rx={4} fill={C.body} />

      {/* Body plank — perfectly straight */}
      <line x1={50} y1={138} x2={155} y2={115} stroke={C.body} strokeWidth={5} strokeLinecap="round" />

      {/* Head */}
      <circle cx={168} cy={108} r={10} fill="none" stroke={C.body} strokeWidth={3} />

      {/* Toes */}
      <circle cx={35} cy={145} r={5} fill={C.body} />
      <circle cx={42} cy={145} r={5} fill={C.body} />

      {/* Alignment arrow (straight body line) */}
      <line x1={50} y1={105} x2={168} y2={85} stroke={C.accent} strokeWidth={1} strokeDasharray="4,3" opacity={0.6} />
      <text x={100} y={100} fill={C.accent} fontSize={8} textAnchor="middle" transform="rotate(-10,100,100)">STRAIGHT LINE</text>

      {/* Elbows-under-shoulders indicator */}
      <line x1={50} y1={138} x2={50} y2={115} stroke={C.highlight} strokeWidth={1} strokeDasharray="2,2" />

      <text x={100} y={30} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">PLANK</text>
      <text x={100} y={175} fill={C.text} fontSize={9} textAnchor="middle">Elbows under shoulders. Squeeze glutes + abs</text>
    </StickFigure>
  );
}

export function LsitSVG() {
  return (
    <StickFigure>
      {/* Parallel bars or support */}
      <rect x={35} y={100} width={12} height={60} rx={3} fill={C.bar} />
      <rect x={153} y={100} width={12} height={60} rx={3} fill={C.bar} />

      {/* Hands on bars */}
      <circle cx={41} cy={100} r={7} fill={C.body} />
      <circle cx={159} cy={100} r={7} fill={C.body} />

      {/* Arms — straight, locked out */}
      <line x1={41} y1={93} x2={65} y2={75} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={159} y1={93} x2={135} y2={75} stroke={C.body} strokeWidth={3} strokeLinecap="round" />

      {/* Torso */}
      <line x1={65} y1={75} x2={135} y2={75} stroke={C.body} strokeWidth={4} />
      <line x1={100} y1={75} x2={100} y2={48} stroke={C.body} strokeWidth={3} />
      {/* Head */}
      <circle cx={100} cy={38} r={10} fill="none" stroke={C.body} strokeWidth={3} />

      {/* Legs parallel to ground — L shape */}
      <line x1={100} y1={75} x2={172} y2={75} stroke={C.body} strokeWidth={4} strokeLinecap="round" />
      {/* Feet */}
      <circle cx={172} cy={75} r={6} fill={C.body} />

      {/* L-sit angle indicator */}
      <path d="M 105,75 L 105,90 L 120,90" fill="none" stroke={C.accent} strokeWidth={2} />
      <text x={115} y={105} fill={C.accent} fontSize={10} textAnchor="middle">90°</text>

      {/* Shoulder press down arrow */}
      <Arrow x1={65} y1={65} x2={65} y2={80} color={C.highlight} />
      <text x={52} y={60} fill={C.highlight} fontSize={7}>press</text>
      <text x={52} y={68} fill={C.highlight} fontSize={7}>down</text>

      <text x={100} y={160} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">L-SIT</text>
      <text x={100} y={175} fill={C.text} fontSize={9} textAnchor="middle">Arms locked, legs straight at 90°, toes pointed</text>
    </StickFigure>
  );
}

export function HollowBodySVG() {
  return (
    <StickFigure>
      <line x1={10} y1={170} x2={190} y2={170} stroke={C.ground} strokeWidth={2} />

      {/* Body in hollow position — lying, curved */}
      {/* Arms overhead */}
      <line x1={28} y1={100} x2={70} y2={115} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={35} y1={105} x2={70} y2={115} stroke={C.body} strokeWidth={3} strokeLinecap="round" />

      {/* Torso — slight curve */}
      <path d="M 70,115 Q 100,118 130,115" fill="none" stroke={C.body} strokeWidth={5} strokeLinecap="round" />

      {/* Legs raised */}
      <line x1={130} y1={115} x2={165} y2={100} stroke={C.body} strokeWidth={4} strokeLinecap="round" />
      <circle cx={170} cy={98} r={5} fill={C.body} />

      {/* Head lifted */}
      <circle cx={58} cy={108} r={10} fill="none" stroke={C.body} strokeWidth={3} />

      {/* Ground reference lines */}
      <line x1={35} y1={120} x2={35} y2={170} stroke={C.ground} strokeWidth={1} strokeDasharray="3,3" opacity={0.5} />
      <text x={35} y={185} fill={C.text} fontSize={8} textAnchor="middle">floor</text>

      {/* Lower back to floor indicator */}
      <Arrow x1={100} y1={145} x2={100} y2={128} color={C.accent} />
      <text x={100} y={158} fill={C.accent} fontSize={8} textAnchor="middle">press low back DOWN</text>

      <text x={100} y={25} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">HOLLOW BODY HOLD</text>
      <text x={100} y={197} fill={C.text} fontSize={9} textAnchor="middle">Shoulders + legs off ground, lower back flat</text>
    </StickFigure>
  );
}

export function HangingLegRaiseSVG() {
  return (
    <StickFigure>
      {/* Bar */}
      <rect x={30} y={15} width={140} height={8} rx={4} fill={C.bar} />
      <line x1={50} y1={8} x2={50} y2={23} stroke={C.bar} strokeWidth={3} />
      <line x1={150} y1={8} x2={150} y2={23} stroke={C.bar} strokeWidth={3} />

      {/* Hands */}
      <circle cx={72} cy={23} r={6} fill={C.body} />
      <circle cx={128} cy={23} r={6} fill={C.body} />

      {/* Arms extended */}
      <line x1={72} y1={29} x2={83} y2={52} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={128} y1={29} x2={117} y2={52} stroke={C.body} strokeWidth={3} strokeLinecap="round" />

      {/* Torso */}
      <line x1={83} y1={52} x2={117} y2={52} stroke={C.body} strokeWidth={4} />
      <line x1={100} y1={52} x2={100} y2={75} stroke={C.body} strokeWidth={3} />
      {/* Head */}
      <circle cx={100} cy={43} r={9} fill="none" stroke={C.body} strokeWidth={3} />

      {/* Legs raised to 90° */}
      <line x1={100} y1={75} x2={148} y2={75} stroke={C.body} strokeWidth={4} strokeLinecap="round" />
      <circle cx={152} cy={75} r={6} fill={C.body} />

      {/* Ghost legs down (start position) */}
      <line x1={100} y1={75} x2={90} y2={135} stroke={C.body} strokeWidth={2} opacity={0.3} strokeLinecap="round" />
      <line x1={100} y1={75} x2={110} y2={135} stroke={C.body} strokeWidth={2} opacity={0.3} strokeLinecap="round" />

      {/* Arrow up */}
      <Arrow x1={130} y1={120} x2={145} y2={80} color={C.accent} />

      <text x={100} y={165} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">HANGING LEG RAISE</text>
      <text x={100} y={180} fill={C.text} fontSize={9} textAnchor="middle">Dead hang → legs to 90° → slow lower</text>
    </StickFigure>
  );
}

export function SitupSVG() {
  return (
    <StickFigure>
      <line x1={10} y1={160} x2={190} y2={160} stroke={C.ground} strokeWidth={2} />

      {/* UP position */}
      {/* Feet */}
      <circle cx={50} cy={155} r={6} fill={C.body} />
      <circle cx={65} cy={155} r={6} fill={C.body} />
      {/* Shins */}
      <line x1={55} y1={155} x2={75} y2={130} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={63} y1={155} x2={83} y2={130} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      {/* Torso upright */}
      <line x1={79} y1={130} x2={95} y2={80} stroke={C.body} strokeWidth={4} strokeLinecap="round" />
      {/* Head */}
      <circle cx={100} cy={72} r={11} fill="none" stroke={C.body} strokeWidth={3} />
      {/* Arms behind head */}
      <line x1={100} y1={72} x2={118} y2={65} stroke={C.body} strokeWidth={2} strokeLinecap="round" />
      <line x1={100} y1={72} x2={82} y2={65} stroke={C.body} strokeWidth={2} strokeLinecap="round" />

      {/* DOWN position ghost */}
      <line x1={79} y1={130} x2={165} y2={145} stroke={C.body} strokeWidth={3} opacity={0.3} strokeLinecap="round" />
      <circle cx={172} cy={142} r={9} fill="none" stroke={C.body} strokeWidth={2} opacity={0.3} />

      <Arrow x1={155} y1={145} x2={110} y2={100} color={C.accent} />

      <text x={120} y={40} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">MILITARY SIT-UP</text>
      <text x={100} y={185} fill={C.text} fontSize={9} textAnchor="middle">Elbows to knees. Feet flat, hands behind head</text>
    </StickFigure>
  );
}

export function MountainClimberSVG() {
  return (
    <StickFigure>
      <line x1={10} y1={165} x2={190} y2={165} stroke={C.ground} strokeWidth={2} />

      {/* Plank body */}
      <circle cx={35} cy={155} r={5} fill={C.body} />
      <circle cx={48} cy={155} r={5} fill={C.body} />
      {/* Arms */}
      <line x1={40} y1={150} x2={70} y2={125} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      {/* Body */}
      <line x1={70} y1={125} x2={145} y2={110} stroke={C.body} strokeWidth={4} strokeLinecap="round" />
      {/* Head */}
      <circle cx={158} cy={103} r={10} fill="none" stroke={C.body} strokeWidth={3} />

      {/* Knee up position - left knee to chest */}
      <line x1={100} y1={118} x2={82} y2={140} stroke={C.accent} strokeWidth={3} strokeLinecap="round" />
      <circle cx={80} cy={143} r={5} fill={C.accent} />

      {/* Ghost right leg back */}
      <line x1={100} y1={118} x2={125} y2={158} stroke={C.body} strokeWidth={3} opacity={0.4} strokeLinecap="round" />
      <circle cx={127} cy={162} r={5} fill={C.body} opacity={0.4} />

      <Arrow x1={108} y1={130} x2={88} y2={145} color={C.accent} />
      <text x={60} y={160} fill={C.accent} fontSize={8}>drive knee</text>
      <text x={60} y={170} fill={C.accent} fontSize={8}>to chest!</text>

      <text x={110} y={35} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">MOUNTAIN CLIMBER</text>
      <text x={110} y={190} fill={C.text} fontSize={9} textAnchor="middle">Plank → alternate knees to chest</text>
    </StickFigure>
  );
}

// ═══════════════════════════════════════════
// LEGS
// ═══════════════════════════════════════════

export function SquatSVG() {
  return (
    <StickFigure>
      <line x1={10} y1={170} x2={190} y2={170} stroke={C.ground} strokeWidth={2} />

      {/* Bottom squat position */}
      {/* Feet */}
      <circle cx={65} cy={165} r={7} fill={C.body} />
      <circle cx={135} cy={165} r={7} fill={C.body} />
      {/* Shins angled */}
      <line x1={65} y1={162} x2={80} y2={130} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={135} y1={162} x2={120} y2={130} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      {/* Thighs parallel */}
      <line x1={80} y1={130} x2={120} y2={130} stroke={C.body} strokeWidth={4} />
      {/* Torso upright */}
      <line x1={100} y1={130} x2={100} y2={90} stroke={C.body} strokeWidth={4} strokeLinecap="round" />
      {/* Head */}
      <circle cx={100} cy={80} r={11} fill="none" stroke={C.body} strokeWidth={3} />
      {/* Arms extended forward */}
      <line x1={100} y1={100} x2={130} y2={108} stroke={C.body} strokeWidth={2} strokeLinecap="round" />
      <line x1={100} y1={100} x2={70} y2={108} stroke={C.body} strokeWidth={2} strokeLinecap="round" />

      {/* Parallel line indicator */}
      <line x1={60} y1={130} x2={140} y2={130} stroke={C.accent} strokeWidth={1} strokeDasharray="4,2" />
      <text x={45} y={133} fill={C.accent} fontSize={8}>parallel</text>

      {/* Knee tracking arrows */}
      <Arrow x1={80} y1={140} x2={73} y2={155} color={C.highlight} />
      <Arrow x1={120} y1={140} x2={127} y2={155} color={C.highlight} />
      <text x={100} y={50} fill={C.text} fontSize={8} textAnchor="middle">knees track over toes →</text>

      <text x={100} y={28} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">BODYWEIGHT SQUAT</text>
      <text x={100} y={190} fill={C.text} fontSize={9} textAnchor="middle">Chest up, knees out, thighs to parallel</text>
    </StickFigure>
  );
}

export function JumpSquatSVG() {
  return (
    <StickFigure>
      <line x1={10} y1={175} x2={190} y2={175} stroke={C.ground} strokeWidth={2} />

      {/* Squat down phase (ghost) */}
      <circle cx={65} cy={170} r={6} fill={C.body} opacity={0.3} />
      <circle cx={135} cy={170} r={6} fill={C.body} opacity={0.3} />
      <line x1={65} y1={167} x2={80} y2={135} stroke={C.body} strokeWidth={2} opacity={0.3} strokeLinecap="round" />
      <line x1={135} y1={167} x2={120} y2={135} stroke={C.body} strokeWidth={2} opacity={0.3} strokeLinecap="round" />
      <line x1={80} y1={135} x2={120} y2={135} stroke={C.body} strokeWidth={3} opacity={0.3} />
      <line x1={100} y1={135} x2={100} y2={95} stroke={C.body} strokeWidth={3} opacity={0.3} strokeLinecap="round" />
      <circle cx={100} cy={85} r={10} fill="none" stroke={C.body} strokeWidth={2} opacity={0.3} />

      {/* Jump phase — in air */}
      <circle cx={65} cy={130} r={6} fill={C.body} />
      <circle cx={135} cy={130} r={6} fill={C.body} />
      <line x1={65} y1={126} x2={80} y2={100} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={135} y1={126} x2={120} y2={100} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={80} y1={100} x2={120} y2={100} stroke={C.body} strokeWidth={4} />
      <line x1={100} y1={100} x2={100} y2={70} stroke={C.body} strokeWidth={4} strokeLinecap="round" />
      <circle cx={100} cy={60} r={11} fill="none" stroke={C.body} strokeWidth={3} />
      {/* Arms up */}
      <line x1={100} y1={82} x2={80} y2={60} stroke={C.body} strokeWidth={2} strokeLinecap="round" />
      <line x1={100} y1={82} x2={120} y2={60} stroke={C.body} strokeWidth={2} strokeLinecap="round" />

      <Arrow x1={100} y1={165} x2={100} y2={140} color={C.accent} />

      <text x={100} y={28} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">JUMP SQUAT</text>
      <text x={100} y={193} fill={C.text} fontSize={9} textAnchor="middle">Squat → explode up → land soft</text>
    </StickFigure>
  );
}

export function LungeSVG() {
  return (
    <StickFigure>
      <line x1={10} y1={170} x2={190} y2={170} stroke={C.ground} strokeWidth={2} />

      {/* Lunge position */}
      {/* Front foot */}
      <circle cx={55} cy={165} r={7} fill={C.body} />
      {/* Front leg - shin vertical */}
      <line x1={55} y1={162} x2={68} y2={125} stroke={C.body} strokeWidth={4} strokeLinecap="round" />
      {/* Front thigh */}
      <line x1={68} y1={125} x2={100} y2={120} stroke={C.body} strokeWidth={4} strokeLinecap="round" />

      {/* Back leg */}
      <line x1={100} y1={120} x2={130} y2={130} stroke={C.body} strokeWidth={4} strokeLinecap="round" />
      {/* Back knee near ground */}
      <circle cx={130} cy={133} r={6} fill={C.accent} opacity={0.7} />
      <line x1={130} y1={135} x2={148} y2={165} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      {/* Back foot */}
      <circle cx={150} cy={165} r={6} fill={C.body} />

      {/* Torso upright */}
      <line x1={100} y1={120} x2={100} y2={75} stroke={C.body} strokeWidth={4} strokeLinecap="round" />
      {/* Head */}
      <circle cx={100} cy={65} r={11} fill="none" stroke={C.body} strokeWidth={3} />

      {/* Back knee hover */}
      <text x={148} y={148} fill={C.accent} fontSize={8}>1" above</text>
      <text x={148} y={158} fill={C.accent} fontSize={8}>ground</text>

      {/* Front shin vertical indicator */}
      <line x1={60} y1={125} x2={60} y2={165} stroke={C.highlight} strokeWidth={1} strokeDasharray="3,2" />
      <text x={30} y={148} fill={C.highlight} fontSize={7}>shin</text>
      <text x={30} y={157} fill={C.highlight} fontSize={7}>vertical</text>

      <text x={100} y={28} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">WALKING LUNGE</text>
      <text x={100} y={190} fill={C.text} fontSize={9} textAnchor="middle">Back knee 1" from ground, chest upright</text>
    </StickFigure>
  );
}

export function PistolSquatSVG() {
  return (
    <StickFigure>
      <line x1={10} y1={175} x2={190} y2={175} stroke={C.ground} strokeWidth={2} />

      {/* Single leg squat */}
      {/* Standing foot */}
      <circle cx={100} cy={170} r={7} fill={C.body} />
      {/* Single leg going down */}
      <line x1={100} y1={168} x2={100} y2={130} stroke={C.body} strokeWidth={4} strokeLinecap="round" />
      {/* Knee bent deep */}
      <circle cx={100} cy={128} r={6} fill={C.accent} opacity={0.7} />
      {/* Thigh going back up to hip */}
      <line x1={100} y1={128} x2={100} y2={95} stroke={C.body} strokeWidth={4} strokeLinecap="round" />

      {/* Torso */}
      <line x1={100} y1={95} x2={100} y2={60} stroke={C.body} strokeWidth={4} strokeLinecap="round" />
      {/* Head */}
      <circle cx={100} cy={50} r={11} fill="none" stroke={C.body} strokeWidth={3} />

      {/* Extended leg forward — parallel to ground */}
      <line x1={100} y1={128} x2={155} y2={120} stroke={C.body} strokeWidth={4} strokeLinecap="round" />
      <circle cx={162} cy={118} r={6} fill={C.body} />

      {/* Arms extended for balance */}
      <line x1={100} y1={78} x2={60} y2={90} stroke={C.body} strokeWidth={2} strokeLinecap="round" />
      <line x1={100} y1={78} x2={140} y2={90} stroke={C.body} strokeWidth={2} strokeLinecap="round" />

      {/* Balance indicator */}
      <Arrow x1={100} y1={162} x2={100} y2={142} color={C.accent} />
      <text x={100} y={28} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">PISTOL SQUAT</text>
      <text x={100} y={193} fill={C.text} fontSize={9} textAnchor="middle">Single leg to full depth, other leg extended</text>
    </StickFigure>
  );
}

// ═══════════════════════════════════════════
// FULL BODY / CONDITIONING
// ═══════════════════════════════════════════

export function BurpeeSVG() {
  return (
    <StickFigure>
      {/* Multi-phase: squat, plank, jump */}
      <line x1={10} y1={170} x2={190} y2={170} stroke={C.ground} strokeWidth={2} />

      {/* Phase 1: Standing → Squat (left) */}
      <circle cx={35} cy={163} r={5} fill={C.body} opacity={0.8} />
      <line x1={35} y1={160} x2={40} y2={140} stroke={C.body} strokeWidth={2} opacity={0.8} strokeLinecap="round" />
      <line x1={40} y1={140} x2={55} y2={140} stroke={C.body} strokeWidth={3} opacity={0.8} />
      <line x1={47} y1={140} x2={47} y2={115} stroke={C.body} strokeWidth={2} opacity={0.8} strokeLinecap="round" />
      <circle cx={47} cy={108} r={7} fill="none" stroke={C.body} strokeWidth={2} opacity={0.8} />
      <text x={38} y={100} fill={C.text} fontSize={7} opacity={0.7}>①squat</text>

      {/* Phase 2: Plank (middle) */}
      <circle cx={75} cy={160} r={4} fill={C.body} />
      <line x1={75} y1={157} x2={100} y2={145} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={100} y1={145} x2={125} y2={135} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <circle cx={130} cy={130} r={7} fill="none" stroke={C.body} strokeWidth={2} />
      <circle cx={125} cy={155} r={4} fill={C.body} />
      <text x={100} y={118} fill={C.text} fontSize={7} textAnchor="middle">②plank+push-up</text>

      {/* Phase 3: Jump (right) */}
      <circle cx={162} cy={130} r={5} fill={C.body} />
      <circle cx={172} cy={130} r={5} fill={C.body} />
      <line x1={167} y1={127} x2={167} y2={100} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <circle cx={167} cy={90} r={9} fill="none" stroke={C.body} strokeWidth={2} />
      <line x1={167} y1={100} x2={155} y2={115} stroke={C.body} strokeWidth={2} strokeLinecap="round" />
      <line x1={167} y1={100} x2={179} y2={115} stroke={C.body} strokeWidth={2} strokeLinecap="round" />
      <text x={167} y={76} fill={C.accent} fontSize={7} textAnchor="middle">③jump!</text>

      <Arrow x1={60} y1={135} x2={72} y2={148} color={C.accent} />
      <Arrow x1={140} y1={140} x2={155} y2={130} color={C.accent} />

      <text x={100} y={22} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">BURPEE</text>
      <text x={100} y={190} fill={C.text} fontSize={9} textAnchor="middle">Squat → plank → push-up → jump up!</text>
    </StickFigure>
  );
}

export function SupermanSVG() {
  return (
    <StickFigure>
      <line x1={10} y1={140} x2={190} y2={140} stroke={C.ground} strokeWidth={2} />

      {/* Prone position, lifted */}
      {/* Arms extended overhead */}
      <line x1={38} y1={108} x2={70} y2={120} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={45} y1={112} x2={70} y2={120} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      {/* Torso */}
      <line x1={70} y1={120} x2={130} y2={122} stroke={C.body} strokeWidth={5} strokeLinecap="round" />
      {/* Legs raised behind */}
      <line x1={130} y1={122} x2={162} y2={108} stroke={C.body} strokeWidth={4} strokeLinecap="round" />
      <circle cx={167} cy={105} r={5} fill={C.body} />

      {/* Head up */}
      <circle cx={58} cy={113} r={9} fill="none" stroke={C.body} strokeWidth={3} />

      {/* Ground reference */}
      <line x1={40} y1={130} x2={40} y2={140} stroke={C.text} strokeWidth={1} strokeDasharray="2,2" />
      <line x1={160} y1={120} x2={160} y2={140} stroke={C.text} strokeWidth={1} strokeDasharray="2,2" />

      {/* Up arrows */}
      <Arrow x1={45} y1={130} x2={45} y2={115} color={C.accent} />
      <Arrow x1={160} y1={128} x2={160} y2={112} color={C.accent} />

      <text x={100} y={30} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">SUPERMAN</text>
      <text x={100} y={165} fill={C.text} fontSize={9} textAnchor="middle">Lift arms + legs simultaneously, hold 1-2s</text>
    </StickFigure>
  );
}

export function JumpingJackSVG() {
  return (
    <StickFigure>
      <line x1={10} y1={170} x2={190} y2={170} stroke={C.ground} strokeWidth={2} />

      {/* Starting position (ghost — feet together, arms down) */}
      <circle cx={100} cy={162} r={5} fill={C.body} opacity={0.3} />
      <circle cx={108} cy={162} r={5} fill={C.body} opacity={0.3} />
      <line x1={104} y1={160} x2={100} y2={120} stroke={C.body} strokeWidth={3} opacity={0.3} strokeLinecap="round" />
      <line x1={100} y1={135} x2={90} y2={145} stroke={C.body} strokeWidth={2} opacity={0.3} strokeLinecap="round" />
      <line x1={100} y1={135} x2={110} y2={145} stroke={C.body} strokeWidth={2} opacity={0.3} strokeLinecap="round" />
      <circle cx={100} cy={112} r={9} fill="none" stroke={C.body} strokeWidth={2} opacity={0.3} />

      {/* OUT position — feet wide, arms up */}
      <circle cx={55} cy={162} r={6} fill={C.body} />
      <circle cx={145} cy={162} r={6} fill={C.body} />
      <line x1={55} y1={158} x2={80} y2={128} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={145} y1={158} x2={120} y2={128} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={80} y1={128} x2={120} y2={128} stroke={C.body} strokeWidth={4} />
      <line x1={100} y1={128} x2={100} y2={92} stroke={C.body} strokeWidth={4} strokeLinecap="round" />
      {/* Head */}
      <circle cx={100} cy={82} r={11} fill="none" stroke={C.body} strokeWidth={3} />
      {/* Arms overhead */}
      <line x1={100} y1={105} x2={68} y2={82} stroke={C.body} strokeWidth={2} strokeLinecap="round" />
      <line x1={100} y1={105} x2={132} y2={82} stroke={C.body} strokeWidth={2} strokeLinecap="round" />
      {/* Hands */}
      <circle cx={65} cy={80} r={4} fill={C.body} />
      <circle cx={135} cy={80} r={4} fill={C.body} />

      <Arrow x1={85} y1={155} x2={68} y2={155} color={C.accent} />
      <Arrow x1={115} y1={155} x2={132} y2={155} color={C.accent} />

      <text x={100} y={30} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">JUMPING JACKS</text>
      <text x={100} y={192} fill={C.text} fontSize={9} textAnchor="middle">Arms fully overhead, feet wide apart</text>
    </StickFigure>
  );
}

export function RingMuscleUpSVG() {
  return (
    <StickFigure>
      {/* Ring straps */}
      <line x1={65} y1={5} x2={65} y2={40} stroke={C.ring} strokeWidth={2} />
      <line x1={135} y1={5} x2={135} y2={40} stroke={C.ring} strokeWidth={2} />
      <circle cx={65} cy={45} r={8} fill="none" stroke={C.ring} strokeWidth={2} />
      <circle cx={135} cy={45} r={8} fill="none" stroke={C.ring} strokeWidth={2} />

      {/* Top position — over rings */}
      <circle cx={65} cy={45} r={6} fill={C.body} />
      <circle cx={135} cy={45} r={6} fill={C.body} />
      <line x1={65} y1={40} x2={80} y2={28} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={135} y1={40} x2={120} y2={28} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={80} y1={28} x2={120} y2={28} stroke={C.body} strokeWidth={4} />
      <line x1={100} y1={28} x2={100} y2={10} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <circle cx={100} cy={6} r={6} fill="none" stroke={C.body} strokeWidth={2} />
      <line x1={100} y1={28} x2={86} y2={60} stroke={C.body} strokeWidth={3} strokeLinecap="round" />
      <line x1={100} y1={28} x2={114} y2={60} stroke={C.body} strokeWidth={3} strokeLinecap="round" />

      {/* Bottom / pull phase ghost */}
      <line x1={72} y1={45} x2={84} y2={90} stroke={C.body} strokeWidth={2} opacity={0.3} strokeLinecap="round" />
      <line x1={128} y1={45} x2={116} y2={90} stroke={C.body} strokeWidth={2} opacity={0.3} strokeLinecap="round" />
      <line x1={84} y1={90} x2={116} y2={90} stroke={C.body} strokeWidth={3} opacity={0.3} />
      <line x1={100} y1={90} x2={100} y2={120} stroke={C.body} strokeWidth={2} opacity={0.3} strokeLinecap="round" />
      <circle cx={100} cy={128} r={8} fill="none" stroke={C.body} strokeWidth={2} opacity={0.3} />
      <line x1={100} y1={120} x2={88} y2={155} stroke={C.body} strokeWidth={2} opacity={0.3} strokeLinecap="round" />
      <line x1={100} y1={120} x2={112} y2={155} stroke={C.body} strokeWidth={2} opacity={0.3} strokeLinecap="round" />

      <Arrow x1={100} y1={130} x2={100} y2={70} color={C.accent} />
      <text x={100} y={170} fill={C.text} fontSize={11} textAnchor="middle" fontFamily="Oswald">RING MUSCLE-UP</text>
      <text x={100} y={185} fill={C.text} fontSize={9} textAnchor="middle">False grip pull → lean over rings → push</text>
    </StickFigure>
  );
}

// ═══════════════════════════════════════════
// SVG REGISTRY
// ═══════════════════════════════════════════

export const EXERCISE_SVGS = {
  pushup: PushupSVG,
  diamond_pushup: DiamondPushupSVG,
  pike_pushup: PikePushupSVG,
  dip: DipSVG,
  ring_pushup: RingPushupSVG,
  pullup: PullupSVG,
  chinup: ChinupSVG,
  ring_row: RingRowSVG,
  muscle_up: MuscleUpSVG,
  commando_pullup: CommandoPullupSVG,
  plank: PlankSVG,
  lsit: LsitSVG,
  hollow_body: HollowBodySVG,
  hanging_leg_raise: HangingLegRaiseSVG,
  situp: SitupSVG,
  mountain_climber: MountainClimberSVG,
  squat: SquatSVG,
  jump_squat: JumpSquatSVG,
  lunge: LungeSVG,
  pistol_squat: PistolSquatSVG,
  burpee: BurpeeSVG,
  superman: SupermanSVG,
  jumping_jack: JumpingJackSVG,
  ring_muscle_up: RingMuscleUpSVG,
};

export function ExerciseSVG({ exerciseId, className = '' }) {
  const Component = EXERCISE_SVGS[exerciseId];
  if (!Component) {
    return (
      <svg viewBox="0 0 200 200" className={className} style={{ background: '#161b22', borderRadius: '12px' }}>
        <text x="100" y="100" fill="#6b7280" fontSize="12" textAnchor="middle">No illustration</text>
      </svg>
    );
  }
  return <Component className={className} />;
}
