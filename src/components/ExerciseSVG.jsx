// ExerciseSVG.jsx — Anatomical exercise illustrations
// Thick rounded stroke segments give a clear, muscular body silhouette.

const S = 200;

const StickFigure = ({ children }) => (
  <svg viewBox={`0 0 ${S} ${S}`} className="exercise-svg w-full h-full"
    style={{ background: '#161b22', borderRadius: '12px' }} xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

// ── Palette ───────────────────────────────────────────────────────────────────
const B  = '#c8a832';  // body gold
const F  = '#f0d570';  // face / joints
const M  = '#f97316';  // active muscle (orange)
const E  = '#6b7280';  // equipment grey
const GR = '#2d3748';  // ground
const AV = '#39d353';  // movement arrow green
const DM = 'rgba(200,168,50,0.35)'; // ghost / dim limb

// ── Primitives ────────────────────────────────────────────────────────────────
const Limb = ({ x1, y1, x2, y2, w = 13, c = B }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={w} strokeLinecap="round" />
);
const Dot = ({ cx, cy, r = 5 }) => <circle cx={cx} cy={cy} r={r} fill={F} />;
const Head = ({ cx, cy, r = 12, faceRight = false }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={F} stroke={B} strokeWidth={1.5} />
    <circle cx={cx + (faceRight ? r * 0.42 : -r * 0.42)} cy={cy - r * 0.08} r={1.8} fill={B} opacity={0.75} />
  </g>
);
const Ground = ({ y = 168 }) => (
  <line x1={10} y1={y} x2={190} y2={y} stroke={GR} strokeWidth={2.5} />
);
const PullBar = ({ y = 28, x1 = 35, x2 = 165 }) => (
  <g>
    <line x1={x1} y1={y} x2={x2} y2={y} stroke={E} strokeWidth={5} strokeLinecap="round" />
    <line x1={x1 + 18} y1={y - 22} x2={x1 + 18} y2={y} stroke={E} strokeWidth={3} strokeDasharray="4,3" />
    <line x1={x2 - 18} y1={y - 22} x2={x2 - 18} y2={y} stroke={E} strokeWidth={3} strokeDasharray="4,3" />
  </g>
);
const Rings = ({ lx, rx, y, rope = 36 }) => (
  <g>
    <circle cx={lx} cy={y} r={9} fill="none" stroke={E} strokeWidth={3} />
    <circle cx={rx} cy={y} r={9} fill="none" stroke={E} strokeWidth={3} />
    <line x1={lx} y1={y - 9} x2={lx} y2={y - rope} stroke={E} strokeWidth={2} strokeDasharray="4,2" />
    <line x1={rx} y1={y - 9} x2={rx} y2={y - rope} stroke={E} strokeWidth={2} strokeDasharray="4,2" />
  </g>
);
const Arrow = ({ x1, y1, x2, y2, c = AV }) => {
  const dx = x2 - x1, dy = y2 - y1;
  const ang = Math.atan2(dy, dx) * 180 / Math.PI;
  const len = Math.sqrt(dx * dx + dy * dy);
  return (
    <g transform={`translate(${x1},${y1}) rotate(${ang})`}>
      <line x1={2} y1={0} x2={len - 5} y2={0} stroke={c} strokeWidth={2.5} strokeDasharray="5,3" />
      <polygon points={`${len},0 ${len - 7},3.5 ${len - 7},-3.5`} fill={c} />
    </g>
  );
};
const Label = ({ x, y, text }) => (
  <text x={x} y={y} fill={M} fontSize={8} fontWeight="bold" textAnchor="middle" fontFamily="monospace">{text}</text>
);

// ═══════════════════════════════════════════════════════════════════════════════
// PUSH EXERCISES
// ═══════════════════════════════════════════════════════════════════════════════

// PUSH-UP — side view, down position. Body forms plank ~14° from horizontal.
export function PushupSVG() {
  return (
    <StickFigure>
      <Ground />
      {/* Far arm (ghost, slightly right) */}
      <Limb x1={88} y1={128} x2={84} y2={150} w={11} c={DM} />
      <Limb x1={84} y1={150} x2={81} y2={164} w={10} c={DM} />
      {/* Legs — straight plank */}
      <Limb x1={178} y1={162} x2={164} y2={155} w={11} />
      <Limb x1={164} y1={155} x2={148} y2={147} w={13} />
      <Limb x1={148} y1={147} x2={124} y2={137} w={14} />
      {/* Torso */}
      <Limb x1={124} y1={137} x2={80} y2={124} w={20} />
      {/* Active arm — chest + tricep highlight */}
      <Limb x1={80} y1={124} x2={75} y2={148} w={14} c={M} />
      <Limb x1={75} y1={148} x2={71} y2={163} w={12} c={M} />
      <Head cx={53} cy={114} />
      <Dot cx={124} cy={137} /><Dot cx={148} cy={147} />
      <Dot cx={80}  cy={124} /><Dot cx={75}  cy={148} />
      <Arrow x1={85} y1={110} x2={85} y2={91} />
      <Label x={100} y={192} text="CHEST · TRICEPS · CORE" />
    </StickFigure>
  );
}

// DIAMOND PUSH-UP — same plank, narrow diamond hand position under chest.
export function DiamondPushupSVG() {
  return (
    <StickFigure>
      <Ground />
      <Limb x1={178} y1={162} x2={164} y2={155} w={11} />
      <Limb x1={164} y1={155} x2={148} y2={147} w={13} />
      <Limb x1={148} y1={147} x2={124} y2={137} w={14} />
      <Limb x1={124} y1={137} x2={80} y2={124} w={20} />
      {/* Arms pulled tight to body — elbows tucked */}
      <Limb x1={80} y1={124} x2={78} y2={146} w={14} c={M} />
      <Limb x1={78} y1={146} x2={76} y2={163} w={12} c={M} />
      {/* Diamond hand indicator */}
      <polygon points="76,163 70,167 76,171 82,167" fill="none" stroke={F} strokeWidth={1.5} opacity={0.8} />
      <Head cx={53} cy={114} />
      <Dot cx={124} cy={137} /><Dot cx={148} cy={147} />
      <Dot cx={80}  cy={124} /><Dot cx={78}  cy={146} />
      <Arrow x1={84} y1={110} x2={84} y2={91} />
      <text x={76} y={186} fill={F} fontSize={7} textAnchor="middle" fontFamily="monospace" opacity={0.8}>◆</text>
      <Label x={100} y={194} text="TRICEPS · INNER CHEST" />
    </StickFigure>
  );
}

// PIKE PUSH-UP — inverted-V, hands & feet on ground, hips high.
export function PikePushupSVG() {
  return (
    <StickFigure>
      <Ground y={168} />
      {/* Legs from high hips down to feet */}
      <Limb x1={100} y1={62} x2={132} y2={115} w={14} />
      <Limb x1={132} y1={115} x2={158} y2={160} w={13} />
      <Limb x1={158} y1={160} x2={165} y2={167} w={11} />
      {/* Torso from hips to shoulders */}
      <Limb x1={100} y1={62} x2={64} y2={115} w={18} />
      {/* Arms — shoulder work highlight */}
      <Limb x1={64} y1={115} x2={50} y2={140} w={13} c={M} />
      <Limb x1={50} y1={140} x2={44} y2={163} w={12} c={M} />
      {/* Head dips toward ground */}
      <Head cx={38} cy={172} r={11} />
      <Dot cx={100} cy={62} r={6} />{/* hip peak */}
      <Dot cx={64}  cy={115} /><Dot cx={50} cy={140} />
      <Arrow x1={100} y1={75} x2={100} y2={55} />
      <Label x={100} y={192} text="SHOULDERS · UPPER CHEST" />
    </StickFigure>
  );
}

// DIP — parallel bars, front view. Body lowered to upper arms parallel.
export function DipSVG() {
  return (
    <StickFigure>
      {/* Bar uprights */}
      <line x1={55} y1={18} x2={55} y2={82} stroke={E} strokeWidth={4} />
      <line x1={145} y1={18} x2={145} y2={82} stroke={E} strokeWidth={4} />
      {/* Horizontal bars */}
      <line x1={36} y1={82} x2={74} y2={82} stroke={E} strokeWidth={6} strokeLinecap="round" />
      <line x1={126} y1={82} x2={164} y2={82} stroke={E} strokeWidth={6} strokeLinecap="round" />
      {/* Hands on bars */}
      <Dot cx={55} cy={82} r={6} /><Dot cx={145} cy={82} r={6} />
      {/* Arms bent — upper arms at ~horizontal (parallel) */}
      <Limb x1={55} y1={82} x2={70} y2={108} w={13} c={M} />
      <Limb x1={145} y1={82} x2={130} y2={108} w={13} c={M} />
      <Limb x1={70} y1={108} x2={80} y2={122} w={12} c={M} />
      <Limb x1={130} y1={108} x2={120} y2={122} w={12} c={M} />
      <Dot cx={80} cy={122} /><Dot cx={120} cy={122} />
      {/* Torso */}
      <Limb x1={80} y1={122} x2={120} y2={122} w={20} />
      <Limb x1={100} y1={122} x2={100} y2={165} w={17} />
      <Head cx={100} cy={106} />
      <Dot cx={100} cy={165} />
      {/* Legs hanging */}
      <Limb x1={100} y1={165} x2={90} y2={190} w={13} />
      <Limb x1={100} y1={165} x2={110} y2={190} w={13} />
      <Arrow x1={100} y1={132} x2={100} y2={152} c={E} />
      <Label x={100} y={199} text="CHEST · TRICEPS · SHOULDERS" />
    </StickFigure>
  );
}

// RING PUSH-UP — same plank as push-up, rings under hands.
export function RingPushupSVG() {
  return (
    <StickFigure>
      <Ground />
      <Rings lx={72} rx={128} y={163} rope={40} />
      <Limb x1={178} y1={162} x2={164} y2={155} w={11} />
      <Limb x1={164} y1={155} x2={148} y2={147} w={13} />
      <Limb x1={148} y1={147} x2={124} y2={137} w={14} />
      <Limb x1={124} y1={137} x2={80} y2={124} w={20} />
      <Limb x1={80} y1={124} x2={74} y2={148} w={14} c={M} />
      <Limb x1={74} y1={148} x2={71} y2={162} w={12} c={M} />
      <Head cx={53} cy={114} />
      <Dot cx={124} cy={137} /><Dot cx={148} cy={147} />
      <Dot cx={80}  cy={124} /><Dot cx={74}  cy={148} />
      <Arrow x1={85} y1={110} x2={85} y2={92} />
      <Label x={100} y={192} text="CHEST · STABILIZERS · CORE" />
    </StickFigure>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PULL EXERCISES
// ═══════════════════════════════════════════════════════════════════════════════

// PULL-UP — front view, dead hang. Wide overhand grip.
export function PullupSVG() {
  return (
    <StickFigure>
      <PullBar />
      {/* Hands on bar */}
      <Dot cx={55} cy={28} r={6} /><Dot cx={145} cy={28} r={6} />
      {/* Arms — lats highlighted */}
      <Limb x1={55} y1={28} x2={66} y2={65} w={13} c={M} />
      <Limb x1={66} y1={65} x2={76} y2={92} w={13} c={M} />
      <Limb x1={145} y1={28} x2={134} y2={65} w={13} c={M} />
      <Limb x1={134} y1={65} x2={124} y2={92} w={13} c={M} />
      <Dot cx={76} cy={92} /><Dot cx={124} cy={92} />
      {/* Torso (lats) */}
      <Limb x1={76} y1={92} x2={124} y2={92} w={22} c={M} />
      <Limb x1={100} y1={92} x2={100} y2={152} w={18} />
      <Head cx={100} cy={77} />
      <Dot cx={100} cy={152} />
      <Limb x1={100} y1={152} x2={90} y2={185} w={13} />
      <Limb x1={100} y1={152} x2={110} y2={185} w={13} />
      <Arrow x1={100} y1={84} x2={100} y2={60} />
      <Label x={100} y={198} text="LATS · BICEPS · UPPER BACK" />
    </StickFigure>
  );
}

// CHIN-UP — front view, underhand (supinated) grip, shoulder-width.
export function ChinupSVG() {
  return (
    <StickFigure>
      <PullBar y={28} x1={50} x2={150} />
      <Dot cx={70} cy={28} r={6} /><Dot cx={130} cy={28} r={6} />
      {/* Narrower underhand — biceps pop */}
      <Limb x1={70} y1={28} x2={75} y2={65} w={14} c={M} />
      <Limb x1={75} y1={65} x2={80} y2={92} w={14} c={M} />
      <Limb x1={130} y1={28} x2={125} y2={65} w={14} c={M} />
      <Limb x1={125} y1={65} x2={120} y2={92} w={14} c={M} />
      <Dot cx={80} cy={92} /><Dot cx={120} cy={92} />
      <Limb x1={80} y1={92} x2={120} y2={92} w={22} />
      <Limb x1={100} y1={92} x2={100} y2={152} w={18} />
      <Head cx={100} cy={77} />
      <Dot cx={100} cy={152} />
      <Limb x1={100} y1={152} x2={90} y2={185} w={13} />
      <Limb x1={100} y1={152} x2={110} y2={185} w={13} />
      <Arrow x1={100} y1={84} x2={100} y2={60} />
      <Label x={100} y={198} text="BICEPS · LATS · LOWER LATS" />
    </StickFigure>
  );
}

// RING ROW — side view, body ~40° incline, heels on ground, pulling to chest.
export function RingRowSVG() {
  return (
    <StickFigure>
      <Ground y={175} />
      <Rings lx={88} rx={120} y={100} rope={55} />
      {/* Legs (heels on ground, body inclined) */}
      <Limb x1={168} y1={172} x2={150} y2={162} w={12} />
      <Limb x1={150} y1={162} x2={130} y2={148} w={13} />
      <Limb x1={130} y1={148} x2={108} y2={130} w={14} />
      {/* Torso */}
      <Limb x1={108} y1={130} x2={76} y2={105} w={19} />
      {/* Arms pulling rings to chest — back highlight */}
      <Limb x1={76} y1={105} x2={92} y2={96} w={13} c={M} />
      <Limb x1={92} y1={96} x2={108} y2={95} w={12} c={M} />
      <Dot cx={108} cy={130} /><Dot cx={130} cy={148} /><Dot cx={150} cy={162} />
      <Dot cx={76} cy={105} /><Dot cx={92} cy={96} />
      <Head cx={60} cy={96} r={12} faceRight={true} />
      <Arrow x1={68} y1={90} x2={50} y2={82} />
      <Label x={100} y={194} text="UPPER BACK · REAR DELTS" />
    </StickFigure>
  );
}

// MUSCLE-UP — side view, body at bar level, chest transitioning over bar.
export function MuscleUpSVG() {
  return (
    <StickFigure>
      <PullBar y={75} x1={30} x2={170} />
      {/* Body at bar height — transition moment */}
      <Dot cx={78} cy={75} r={6} /><Dot cx={122} cy={75} r={6} />
      {/* Arms bent hard, pulling body over bar */}
      <Limb x1={78} y1={75} x2={78} y2={95} w={13} c={M} />
      <Limb x1={122} y1={75} x2={122} y2={95} w={13} c={M} />
      <Dot cx={78} cy={95} /><Dot cx={122} cy={95} />
      {/* Shoulders */}
      <Limb x1={78} y1={95} x2={122} y2={95} w={20} c={M} />
      {/* Torso */}
      <Limb x1={100} y1={95} x2={100} y2={150} w={18} />
      <Head cx={100} cy={80} />
      <Dot cx={100} cy={150} />
      <Limb x1={100} y1={150} x2={90} y2={182} w={13} />
      <Limb x1={100} y1={150} x2={110} y2={182} w={13} />
      {/* Arc arrow showing movement over bar */}
      <path d="M82,58 Q100,40 118,58" fill="none" stroke={AV} strokeWidth={2.5} strokeDasharray="5,3" />
      <polygon points="118,58 112,52 119,53" fill={AV} />
      <Label x={100} y={197} text="LATS · CHEST · TRICEPS" />
    </StickFigure>
  );
}

// COMMANDO PULL-UP — neutral grip, pulling to alternate sides.
export function CommandoPullupSVG() {
  return (
    <StickFigure>
      {/* Bar running front-to-back (seen from 3/4) */}
      <line x1={70} y1={28} x2={130} y2={28} stroke={E} strokeWidth={5} strokeLinecap="round" />
      <line x1={70} y1={18} x2={70} y2={28} stroke={E} strokeWidth={3} strokeDasharray="4,3" />
      <line x1={130} y1={18} x2={130} y2={28} stroke={E} strokeWidth={3} strokeDasharray="4,3" />
      <Dot cx={85} cy={28} r={6} /><Dot cx={115} cy={28} r={6} />
      {/* Parallel (neutral) grip arms */}
      <Limb x1={85} y1={28} x2={82} y2={65} w={13} c={M} />
      <Limb x1={82} y1={65} x2={80} y2={92} w={13} c={M} />
      <Limb x1={115} y1={28} x2={118} y2={65} w={13} c={M} />
      <Limb x1={118} y1={65} x2={120} y2={92} w={13} c={M} />
      <Dot cx={80} cy={92} /><Dot cx={120} cy={92} />
      <Limb x1={80} y1={92} x2={120} y2={92} w={20} />
      <Limb x1={100} y1={92} x2={100} y2={150} w={17} />
      <Head cx={100} cy={78} />
      <Dot cx={100} cy={150} />
      <Limb x1={100} y1={150} x2={90} y2={183} w={13} />
      <Limb x1={100} y1={150} x2={110} y2={183} w={13} />
      <Arrow x1={100} y1={85} x2={88} y2={62} />
      <Label x={100} y={198} text="LATS · BICEPS · OBLIQUES" />
    </StickFigure>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CORE EXERCISES
// ═══════════════════════════════════════════════════════════════════════════════

// PLANK — side view, forearms on ground, perfect horizontal body.
export function PlankSVG() {
  return (
    <StickFigure>
      <Ground />
      {/* Legs */}
      <Limb x1={178} y1={162} x2={164} y2={155} w={11} />
      <Limb x1={164} y1={155} x2={148} y2={148} w={13} />
      <Limb x1={148} y1={148} x2={124} y2={138} w={14} />
      {/* Torso — core highlighted */}
      <Limb x1={124} y1={138} x2={74} y2={122} w={20} c={M} />
      {/* Forearm on ground (elbow planted) */}
      <Limb x1={74} y1={122} x2={68} y2={148} w={13} />
      <Limb x1={68} y1={148} x2={56} y2={164} w={12} />
      <Head cx={52} cy={112} />
      <Dot cx={124} cy={138} /><Dot cx={148} cy={148} />
      <Dot cx={74}  cy={122} /><Dot cx={68}  cy={148} />
      <Label x={100} y={190} text="CORE · GLUTES · SHOULDERS" />
    </StickFigure>
  );
}

// L-SIT — side view. Body upright on parallettes, legs horizontal.
export function LsitSVG() {
  return (
    <StickFigure>
      {/* Parallettes */}
      <line x1={50} y1={148} x2={76} y2={148} stroke={E} strokeWidth={5} strokeLinecap="round" />
      <line x1={124} y1={148} x2={150} y2={148} stroke={E} strokeWidth={5} strokeLinecap="round" />
      <line x1={56} y1={148} x2={56} y2={162} stroke={E} strokeWidth={4} />
      <line x1={144} y1={148} x2={144} y2={162} stroke={E} strokeWidth={4} />
      <Dot cx={63} cy={148} r={6} /><Dot cx={137} cy={148} r={6} />
      {/* Arms straight down — pressing body up */}
      <Limb x1={63} y1={148} x2={70} y2={118} w={13} c={M} />
      <Limb x1={137} y1={148} x2={130} y2={118} w={13} c={M} />
      <Dot cx={70} cy={118} /><Dot cx={130} cy={118} />
      {/* Shoulders + torso */}
      <Limb x1={70} y1={118} x2={130} y2={118} w={20} />
      <Limb x1={100} y1={118} x2={100} y2={72} w={17} />
      {/* Legs extended horizontal — hip flexors */}
      <Limb x1={100} y1={118} x2={152} y2={112} w={14} c={M} />
      <Limb x1={152} y1={112} x2={182} y2={110} w={12} c={M} />
      <Head cx={100} cy={58} />
      <Dot cx={100} cy={118} /><Dot cx={152} cy={112} />
      <Arrow x1={100} y1={125} x2={100} y2={142} c={E} />
      <Label x={100} y={192} text="HIP FLEXORS · CORE · TRICEPS" />
    </StickFigure>
  );
}

// HOLLOW BODY HOLD — lying on back, arms overhead, legs/shoulders raised.
export function HollowBodySVG() {
  return (
    <StickFigure>
      <Ground y={162} />
      {/* Lower back barely touching ground — banana arc */}
      {/* Feet raised (left side) */}
      <Limb x1={22} y1={148} x2={38} y2={158} w={11} />
      <Limb x1={38} y1={158} x2={58} y2={155} w={13} />
      <Limb x1={58} y1={155} x2={82} y2={148} w={14} />
      {/* Hips / lower back at ground */}
      <Limb x1={82} y1={148} x2={112} y2={148} w={18} c={M} />
      {/* Upper body curled up */}
      <Limb x1={112} y1={148} x2={138} y2={140} w={17} c={M} />
      {/* Arms extended overhead (right side) */}
      <Limb x1={138} y1={140} x2={162} y2={130} w={13} c={M} />
      <Limb x1={162} y1={130} x2={180} y2={122} w={11} c={M} />
      <Head cx={148} cy={128} r={12} faceRight={true} />
      <Dot cx={82} cy={148} /><Dot cx={112} cy={148} />
      <Dot cx={138} cy={140} />
      <Arrow x1={100} y1={138} x2={100} y2={118} />
      <Label x={100} y={190} text="CORE · HIP FLEXORS · LOWER ABS" />
    </StickFigure>
  );
}

// HANGING LEG RAISE — front view, bar at top, legs raised to 90°.
export function HangingLegRaiseSVG() {
  return (
    <StickFigure>
      <PullBar />
      <Dot cx={72} cy={28} r={6} /><Dot cx={128} cy={28} r={6} />
      {/* Arms */}
      <Limb x1={72} y1={28} x2={78} y2={65} w={13} />
      <Limb x1={128} y1={28} x2={122} y2={65} w={13} />
      <Dot cx={78} cy={65} /><Dot cx={122} cy={65} />
      {/* Torso */}
      <Limb x1={78} y1={65} x2={122} y2={65} w={20} />
      <Limb x1={100} y1={65} x2={100} y2={118} w={17} />
      <Head cx={100} cy={52} />
      {/* Legs raised to 90° — core/abs highlight */}
      <Limb x1={100} y1={118} x2={85} y2={118} w={14} c={M} />
      <Limb x1={85} y1={118} x2={68} y2={118} w={13} c={M} />
      <Limb x1={100} y1={118} x2={115} y2={118} w={14} c={M} />
      <Limb x1={115} y1={118} x2={132} y2={118} w={13} c={M} />
      <Dot cx={100} cy={118} /><Dot cx={85} cy={118} /><Dot cx={115} cy={118} />
      <Arrow x1={100} y1={128} x2={100} y2={108} />
      <Label x={100} y={140} text="LOWER ABS · HIP FLEXORS" />
    </StickFigure>
  );
}

// MILITARY SIT-UP — side view, coming up ~45°.
export function SitupSVG() {
  return (
    <StickFigure>
      <Ground y={172} />
      {/* Legs flat on ground */}
      <Limb x1={28} y1={168} x2={58} y2={165} w={11} />
      <Limb x1={58} y1={165} x2={92} y2={158} w={13} />
      {/* Hips on ground */}
      <Limb x1={92} y1={158} x2={115} y2={145} w={14} />
      {/* Torso coming up ~45° */}
      <Limb x1={115} y1={145} x2={138} y2={118} w={19} c={M} />
      {/* Arms (hands behind head) */}
      <Limb x1={138} y1={118} x2={152} y2={108} w={13} />
      <Limb x1={152} y1={108} x2={162} y2={115} w={12} />
      {/* Head */}
      <Head cx={150} cy={105} r={12} faceRight={true} />
      <Dot cx={115} cy={145} /><Dot cx={92} cy={158} /><Dot cx={138} cy={118} />
      <Arrow x1={125} y1={133} x2={135} y2={115} />
      <Label x={100} y={192} text="ABS · HIP FLEXORS" />
    </StickFigure>
  );
}

// MOUNTAIN CLIMBER — side view, plank with one knee driven forward.
export function MountainClimberSVG() {
  return (
    <StickFigure>
      <Ground />
      {/* Back leg straight */}
      <Limb x1={178} y1={162} x2={162} y2={153} w={11} />
      <Limb x1={162} y1={153} x2={145} y2={145} w={13} />
      {/* Front leg knee driven forward */}
      <Limb x1={145} y1={145} x2={128} y2={135} w={14} />
      <Limb x1={128} y1={135} x2={105} y2={148} w={14} c={M} />
      <Limb x1={105} y1={148} x2={90} y2={158} w={12} c={M} />
      {/* Torso — plank */}
      <Limb x1={128} y1={135} x2={80} y2={120} w={20} />
      {/* Arms straight (push-up position) */}
      <Limb x1={80} y1={120} x2={74} y2={148} w={13} />
      <Limb x1={74} y1={148} x2={70} y2={162} w={12} />
      <Head cx={54} cy={110} />
      <Dot cx={128} cy={135} /><Dot cx={145} cy={145} /><Dot cx={105} cy={148} />
      <Dot cx={80}  cy={120} /><Dot cx={74}  cy={148} />
      <Arrow x1={112} y1={135} x2={95} y2={128} />
      <Label x={100} y={190} text="CORE · HIP FLEXORS · SHOULDERS" />
    </StickFigure>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LEGS EXERCISES
// ═══════════════════════════════════════════════════════════════════════════════

// BODYWEIGHT SQUAT — side view, parallel depth, knees track over toes.
export function SquatSVG() {
  return (
    <StickFigure>
      <Ground />
      {/* Feet flat */}
      <Limb x1={112} y1={165} x2={128} y2={164} w={11} />
      <Limb x1={72} y1={165} x2={88} y2={164} w={11} />
      {/* Lower legs */}
      <Limb x1={120} y1={164} x2={118} y2={138} w={13} c={M} />
      <Limb x1={80} y1={164} x2={82} y2={138} w={13} c={M} />
      {/* Upper legs — parallel */}
      <Limb x1={118} y1={138} x2={110} y2={115} w={15} c={M} />
      <Limb x1={82} y1={138} x2={90} y2={115} w={15} c={M} />
      {/* Hips */}
      <Dot cx={110} cy={115} /><Dot cx={90} cy={115} />
      {/* Torso — upright */}
      <Limb x1={90} y1={115} x2={110} y2={115} w={22} />
      <Limb x1={100} y1={115} x2={100} y2={72} w={18} />
      {/* Arms out front for balance */}
      <Limb x1={100} y1={85} x2={72} y2={95} w={12} />
      <Limb x1={100} y1={85} x2={128} y2={95} w={12} />
      <Head cx={100} cy={58} />
      <Dot cx={118} cy={138} /><Dot cx={82} cy={138} />
      <Arrow x1={100} y1={105} x2={100} y2={84} />
      <Label x={100} y={190} text="QUADS · GLUTES · HAMSTRINGS" />
    </StickFigure>
  );
}

// JUMP SQUAT — side view, airborne, arms back ready to swing.
export function JumpSquatSVG() {
  return (
    <StickFigure>
      <Ground />
      {/* Feet off ground */}
      <Limb x1={114} y1={155} x2={128} y2={158} w={11} />
      <Limb x1={86} y1={155} x2={72} y2={158} w={11} />
      {/* Legs extended in air */}
      <Limb x1={121} y1={152} x2={118} y2={128} w={14} c={M} />
      <Limb x1={79} y1={152} x2={82} y2={128} w={14} c={M} />
      <Limb x1={118} y1={128} x2={112} y2={105} w={15} c={M} />
      <Limb x1={82} y1={128} x2={88} y2={105} w={15} c={M} />
      <Dot cx={112} cy={105} /><Dot cx={88} cy={105} />
      <Limb x1={88} y1={105} x2={112} y2={105} w={22} />
      <Limb x1={100} y1={105} x2={100} y2={62} w={18} />
      {/* Arms back (momentum) */}
      <Limb x1={100} y1={78} x2={72} y2={88} w={12} />
      <Limb x1={100} y1={78} x2={128} y2={88} w={12} />
      <Head cx={100} cy={48} />
      <Dot cx={118} cy={128} /><Dot cx={82} cy={128} />
      <Arrow x1={100} y1={140} x2={100} y2={120} />
      <Label x={100} y={190} text="QUADS · GLUTES · CALVES · CARDIO" />
    </StickFigure>
  );
}

// WALKING LUNGE — side view, front knee 90°, back knee near ground.
export function LungeSVG() {
  return (
    <StickFigure>
      <Ground />
      {/* Back foot */}
      <Limb x1={170} y1={162} x2={158} y2={158} w={11} />
      {/* Back leg — knee near ground */}
      <Limb x1={158} y1={158} x2={150} y2={140} w={13} c={M} />
      <Limb x1={150} y1={140} x2={138} y2={118} w={14} c={M} />
      {/* Front foot flat */}
      <Limb x1={60} y1={164} x2={75} y2={163} w={11} />
      {/* Front shin vertical */}
      <Limb x1={68} y1={163} x2={68} y2={138} w={13} c={M} />
      {/* Front thigh */}
      <Limb x1={68} y1={138} x2={80} y2={115} w={14} c={M} />
      {/* Hips */}
      <Dot cx={80} cy={115} /><Dot cx={138} cy={118} />
      <Limb x1={80} y1={115} x2={138} y2={118} w={20} />
      {/* Torso upright */}
      <Limb x1={109} y1={116} x2={109} y2={72} w={18} />
      {/* Arms */}
      <Limb x1={109} y1={85} x2={88} y2={95} w={12} />
      <Limb x1={109} y1={85} x2={130} y2={95} w={12} />
      <Head cx={109} cy={58} />
      <Dot cx={68} cy={138} /><Dot cx={150} cy={140} />
      <Arrow x1={109} y1={104} x2={109} y2={85} />
      <Label x={100} y={190} text="QUADS · GLUTES · BALANCE" />
    </StickFigure>
  );
}

// PISTOL SQUAT — side view, single-leg deep squat, free leg extended.
export function PistolSquatSVG() {
  return (
    <StickFigure>
      <Ground />
      {/* Foot on ground */}
      <Limb x1={105} y1={165} x2={120} y2={163} w={11} />
      {/* Supporting leg — very bent, deep squat */}
      <Limb x1={112} y1={163} x2={100} y2={138} w={14} c={M} />
      <Limb x1={100} y1={138} x2={92} y2={112} w={15} c={M} />
      {/* Free leg extended forward */}
      <Limb x1={92} y1={112} x2={62} y2={108} w={14} c={M} />
      <Limb x1={62} y1={108} x2={35} y2={108} w={12} c={M} />
      <Dot cx={35} cy={108} r={4} />
      {/* Hip */}
      <Dot cx={92} cy={112} />
      {/* Torso upright */}
      <Limb x1={92} y1={112} x2={95} y2={68} w={18} />
      {/* Arms extended forward for balance */}
      <Limb x1={95} y1={80} x2={65} y2={90} w={12} />
      <Head cx={95} cy={54} />
      <Dot cx={100} cy={138} />
      <Arrow x1={95} y1={100} x2={95} y2={80} />
      <Label x={100} y={190} text="QUADS · GLUTES · BALANCE" />
    </StickFigure>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FULL BODY / CONDITIONING
// ═══════════════════════════════════════════════════════════════════════════════

// BURPEE — shown at the top (jump with arms overhead).
export function BurpeeSVG() {
  return (
    <StickFigure>
      <Ground />
      {/* Feet off ground (jumping) */}
      <Limb x1={94} y1={148} x2={82} y2={155} w={11} c={M} />
      <Limb x1={106} y1={148} x2={118} y2={155} w={11} c={M} />
      {/* Legs extended */}
      <Limb x1={88} y1={148} x2={90} y2={122} w={14} c={M} />
      <Limb x1={112} y1={148} x2={110} y2={122} w={14} c={M} />
      <Dot cx={90} cy={122} /><Dot cx={110} cy={122} />
      {/* Hips + torso */}
      <Limb x1={90} y1={122} x2={110} y2={122} w={22} />
      <Limb x1={100} y1={122} x2={100} y2={78} w={18} />
      {/* Arms overhead, full extension */}
      <Limb x1={100} y1={88} x2={72} y2={65} w={13} c={M} />
      <Limb x1={72} y1={65} x2={58} y2={45} w={12} c={M} />
      <Limb x1={100} y1={88} x2={128} y2={65} w={13} c={M} />
      <Limb x1={128} y1={65} x2={142} y2={45} w={12} c={M} />
      <Dot cx={72} cy={65} /><Dot cx={128} cy={65} />
      <Head cx={100} cy={62} />
      <Arrow x1={100} y1={112} x2={100} y2={93} />
      <Label x={100} y={190} text="FULL BODY · CARDIO · POWER" />
    </StickFigure>
  );
}

// SUPERMAN / BACK EXTENSION — prone, arms & legs lifted off ground.
export function SupermanSVG() {
  return (
    <StickFigure>
      <Ground y={125} />
      {/* Hips/waist as the contact point */}
      {/* Legs lifted (left side = feet) */}
      <Limb x1={25} y1={112} x2={50} y2={118} w={11} c={M} />
      <Limb x1={50} y1={118} x2={78} y2={120} w={13} c={M} />
      <Limb x1={78} y1={120} x2={100} y2={122} w={14} c={M} />
      {/* Hips — pivot on ground */}
      <Dot cx={100} cy={122} r={7} />
      {/* Torso and upper body lifted */}
      <Limb x1={100} y1={122} x2={128} y2={118} w={19} c={M} />
      {/* Arms extended overhead, also lifted */}
      <Limb x1={128} y1={118} x2={155} y2={110} w={13} c={M} />
      <Limb x1={155} y1={110} x2={178} y2={105} w={12} c={M} />
      <Dot cx={128} cy={118} /><Dot cx={155} cy={110} />
      <Head cx={142} cy={108} r={12} faceRight={true} />
      <Arrow x1={100} y1={110} x2={100} y2={92} />
      <Label x={100} y={148} text="LOWER BACK · GLUTES · HAMSTRINGS" />
    </StickFigure>
  );
}

// JUMPING JACKS — front view, star position (mid-rep).
export function JumpingJackSVG() {
  return (
    <StickFigure>
      {/* Feet spread wide */}
      <Limb x1={32} y1={175} x2={50} y2={170} w={11} c={M} />
      <Limb x1={168} y1={175} x2={150} y2={170} w={11} c={M} />
      {/* Legs spread */}
      <Limb x1={50} y1={170} x2={72} y2={148} w={14} c={M} />
      <Limb x1={150} y1={170} x2={128} y2={148} w={14} c={M} />
      <Dot cx={72} cy={148} /><Dot cx={128} cy={148} />
      {/* Hips */}
      <Limb x1={72} y1={148} x2={128} y2={148} w={22} />
      {/* Torso */}
      <Limb x1={100} y1={148} x2={100} y2={100} w={18} />
      {/* Arms overhead wide — star shape */}
      <Limb x1={100} y1={110} x2={68} y2={82} w={13} c={M} />
      <Limb x1={68} y1={82} x2={42} y2={60} w={12} c={M} />
      <Limb x1={100} y1={110} x2={132} y2={82} w={13} c={M} />
      <Limb x1={132} y1={82} x2={158} y2={60} w={12} c={M} />
      <Dot cx={68} cy={82} /><Dot cx={132} cy={82} />
      <Head cx={100} cy={84} />
      <Arrow x1={100} y1={96} x2={100} y2={76} />
      <Label x={100} y={193} text="FULL BODY · CARDIO · COORDINATION" />
    </StickFigure>
  );
}

// RING MUSCLE-UP — on rings, body transitioning above rings.
export function RingMuscleUpSVG() {
  return (
    <StickFigure>
      <Rings lx={75} rx={125} y={78} rope={55} />
      {/* Hands on rings */}
      <Dot cx={75} cy={78} r={6} /><Dot cx={125} cy={78} r={6} />
      {/* Arms bent — explosive pull over rings */}
      <Limb x1={75} y1={78} x2={78} y2={98} w={13} c={M} />
      <Limb x1={125} y1={78} x2={122} y2={98} w={13} c={M} />
      <Dot cx={78} cy={98} /><Dot cx={122} cy={98} />
      <Limb x1={78} y1={98} x2={122} y2={98} w={22} c={M} />
      {/* Torso */}
      <Limb x1={100} y1={98} x2={100} y2={152} w={18} />
      <Head cx={100} cy={83} />
      <Dot cx={100} cy={152} />
      <Limb x1={100} y1={152} x2={90} y2={185} w={13} />
      <Limb x1={100} y1={152} x2={110} y2={185} w={13} />
      <path d="M80,60 Q100,42 120,60" fill="none" stroke={AV} strokeWidth={2.5} strokeDasharray="5,3" />
      <polygon points="120,60 114,54 121,55" fill={AV} />
      <Label x={100} y={198} text="LATS · CHEST · TRICEPS · CORE" />
    </StickFigure>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SVG REGISTRY
// ═══════════════════════════════════════════════════════════════════════════════

export const EXERCISE_SVGS = {
  pushup:           PushupSVG,
  diamond_pushup:   DiamondPushupSVG,
  pike_pushup:      PikePushupSVG,
  dip:              DipSVG,
  ring_pushup:      RingPushupSVG,
  pullup:           PullupSVG,
  chinup:           ChinupSVG,
  ring_row:         RingRowSVG,
  muscle_up:        MuscleUpSVG,
  commando_pullup:  CommandoPullupSVG,
  plank:            PlankSVG,
  lsit:             LsitSVG,
  hollow_body:      HollowBodySVG,
  hanging_leg_raise: HangingLegRaiseSVG,
  situp:            SitupSVG,
  mountain_climber: MountainClimberSVG,
  squat:            SquatSVG,
  jump_squat:       JumpSquatSVG,
  lunge:            LungeSVG,
  pistol_squat:     PistolSquatSVG,
  burpee:           BurpeeSVG,
  superman:         SupermanSVG,
  jumping_jack:     JumpingJackSVG,
  ring_muscle_up:   RingMuscleUpSVG,
};

export function ExerciseSVG({ exerciseId, className = '' }) {
  const Component = EXERCISE_SVGS[exerciseId];
  if (!Component) {
    return (
      <svg viewBox="0 0 200 200" className={className}
        style={{ background: '#161b22', borderRadius: '12px' }}>
        <text x="100" y="100" fill="#6b7280" fontSize="12" textAnchor="middle">No illustration</text>
      </svg>
    );
  }
  return <Component className={className} />;
}
