import type { ReactNode } from 'react'
import type { CategorySlug } from '../../types'

const NAVY = '#071B35'
const BLUE = '#0879F9'
const CYAN = '#20C4F4'
const SLATE = '#CBD5E1'
const MID = '#94A3B8'

/** Reusable monitor drawing. */
const Monitor = ({ x = 0, y = 0, w = 200, h = 120 }: { x?: number; y?: number; w?: number; h?: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect width={w} height={h} rx="8" fill={NAVY} />
    <rect x="6" y="6" width={w - 12} height={h - 12} rx="4" fill="url(#screen)" />
    <path d={`M${w * 0.15} ${h * 0.7} L${w * 0.4} ${h * 0.45} L${w * 0.55} ${h * 0.6} L${w * 0.8} ${h * 0.3}`} stroke="#fff" strokeOpacity=".55" strokeWidth="3" fill="none" strokeLinecap="round" />
    <rect x={w / 2 - 6} y={h} width="12" height="22" fill={MID} />
    <rect x={w / 2 - 32} y={h + 20} width="64" height="7" rx="3.5" fill={SLATE} />
  </g>
)

const Laptop = ({ x = 0, y = 0, s = 1 }: { x?: number; y?: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="20" width="160" height="104" rx="8" fill={NAVY} />
    <rect x="26" y="6" width="148" height="92" rx="4" fill="url(#screen)" />
    <circle cx="100" cy="52" r="14" fill="#fff" fillOpacity=".25" />
    <path d="M0 112 H200 L190 126 H10 Z" fill={SLATE} />
    <rect x="84" y="112" width="32" height="5" rx="2.5" fill={MID} />
  </g>
)

const Tower = ({ x = 0, y = 0 }: { x?: number; y?: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect width="84" height="170" rx="10" fill={NAVY} />
    <rect x="10" y="12" width="64" height="8" rx="4" fill={BLUE} />
    <circle cx="42" cy="78" r="26" fill="none" stroke={CYAN} strokeWidth="3" />
    <circle cx="42" cy="78" r="8" fill={CYAN} />
    <path d="M42 52 V104 M16 78 H68" stroke={CYAN} strokeWidth="2" strokeOpacity=".6" />
    <rect x="12" y="132" width="60" height="6" rx="3" fill="#1E3A5F" />
    <rect x="12" y="144" width="60" height="6" rx="3" fill="#1E3A5F" />
    <circle cx="66" cy="160" r="3" fill={CYAN} />
  </g>
)

const Keyboard = ({ x = 0, y = 0, w = 190 }: { x?: number; y?: number; w?: number }) => {
  const keys: ReactNode[] = []
  const cols = 12
  const gap = 4
  const kw = (w - gap * (cols + 1)) / cols
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < cols; c++)
      keys.push(<rect key={`${r}-${c}`} x={gap + c * (kw + gap)} y={gap + r * 15} width={kw} height="11" rx="2.5" fill={r === 3 && c > 2 && c < 8 ? BLUE : '#fff'} fillOpacity={r === 3 && c > 2 && c < 8 ? 1 : 0.9} />)
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height="68" rx="8" fill={NAVY} />
      {keys}
    </g>
  )
}

const Mouse = ({ x = 0, y = 0 }: { x?: number; y?: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect width="40" height="64" rx="20" fill={NAVY} />
    <path d="M20 0 V26 M0 26 H40" stroke={CYAN} strokeWidth="2" />
    <rect x="17" y="8" width="6" height="12" rx="3" fill={CYAN} />
  </g>
)

const Printer = ({ x = 0, y = 0 }: { x?: number; y?: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x="40" width="100" height="50" rx="4" fill="#fff" stroke={SLATE} strokeWidth="2" />
    <rect y="46" width="180" height="76" rx="12" fill={NAVY} />
    <rect x="16" y="62" width="60" height="8" rx="4" fill="#1E3A5F" />
    <circle cx="156" cy="66" r="5" fill={CYAN} />
    <rect x="34" y="104" width="112" height="56" rx="3" fill="#fff" stroke={SLATE} strokeWidth="2" />
    <path d="M48 120 H132 M48 132 H112 M48 144 H124" stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
  </g>
)

const Router = ({ x = 0, y = 0 }: { x?: number; y?: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M30 0 V50 M150 0 V50" stroke={NAVY} strokeWidth="8" strokeLinecap="round" />
    <rect y="46" width="180" height="46" rx="12" fill={NAVY} />
    {[0, 1, 2, 3].map((i) => (
      <circle key={i} cx={30 + i * 18} cy="69" r="4" fill={i < 3 ? CYAN : MID} />
    ))}
    <rect x="124" y="64" width="40" height="10" rx="5" fill="#1E3A5F" />
    <path d="M70 26 a28 28 0 0 1 40 0 M78 36 a16 16 0 0 1 24 0" stroke={BLUE} strokeWidth="4" fill="none" strokeLinecap="round" />
  </g>
)

const art: Record<CategorySlug, ReactNode> = {
  'desktop-computers': (
    <g transform="translate(46 44)">
      <Monitor y={10} w={190} h={118} />
      <Tower x={252} y={0} />
    </g>
  ),
  laptops: <Laptop x={90} y={70} s={1.1} />,
  'computer-components': (
    <g transform="translate(110 50)">
      <rect width="170" height="170" rx="14" fill={NAVY} />
      <rect x="50" y="50" width="70" height="70" rx="8" fill={BLUE} />
      <rect x="62" y="62" width="46" height="46" rx="4" fill="#fff" fillOpacity=".9" />
      <text x="85" y="91" fontSize="14" fontWeight="800" fill={NAVY} textAnchor="middle" fontFamily="Inter, Arial">CPU</text>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={56 + i * 14} y="30" width="6" height="18" rx="2" fill={CYAN} />
          <rect x={56 + i * 14} y="122" width="6" height="18" rx="2" fill={CYAN} />
          <rect x="30" y={56 + i * 14} width="18" height="6" rx="2" fill={CYAN} />
          <rect x="122" y={56 + i * 14} width="18" height="6" rx="2" fill={CYAN} />
        </g>
      ))}
    </g>
  ),
  monitors: <Monitor x={90} y={50} w={220} h={136} />,
  'keyboards-mice': (
    <g>
      <Keyboard x={60} y={110} w={210} />
      <Mouse x={296} y={114} />
    </g>
  ),
  'printers-scanners': <Printer x={110} y={50} />,
  networking: <Router x={110} y={80} />,
  storage: (
    <g>
      <g transform="translate(70 90)">
        <rect width="150" height="100" rx="14" fill={NAVY} />
        <rect x="16" y="18" width="70" height="8" rx="4" fill={CYAN} />
        <rect x="16" y="34" width="40" height="6" rx="3" fill="#1E3A5F" />
        <circle cx="122" cy="76" r="8" fill={BLUE} />
      </g>
      <g transform="translate(244 120)">
        <rect width="60" height="78" rx="8" fill={BLUE} />
        <rect x="14" y="-16" width="32" height="22" rx="3" fill={SLATE} />
        <rect x="10" y="30" width="40" height="8" rx="4" fill="#fff" fillOpacity=".8" />
      </g>
    </g>
  ),
  accessories: (
    <g transform="translate(120 56)" fill="none">
      <path d="M10 100 V80 a70 70 0 0 1 140 0 V100" stroke={NAVY} strokeWidth="12" strokeLinecap="round" />
      <rect x="-6" y="92" width="34" height="62" rx="14" fill={NAVY} />
      <rect x="132" y="92" width="34" height="62" rx="14" fill={NAVY} />
      <rect x="2" y="104" width="12" height="38" rx="6" fill={BLUE} />
      <path d="M150 150 q-10 30 -50 30" stroke={CYAN} strokeWidth="5" strokeLinecap="round" />
      <circle cx="96" cy="180" r="9" fill={CYAN} />
    </g>
  ),
  'cables-adapters': (
    <g>
      <path d="M90 90 C 170 90, 150 210, 230 210 S 300 140, 320 140" stroke={NAVY} strokeWidth="10" fill="none" strokeLinecap="round" />
      <rect x="52" y="74" width="46" height="32" rx="6" fill={SLATE} />
      <rect x="58" y="82" width="34" height="16" rx="3" fill={MID} />
      <rect x="316" y="124" width="38" height="32" rx="6" fill={BLUE} />
      <rect x="350" y="132" width="12" height="16" rx="2" fill={CYAN} />
    </g>
  ),
}

/** Large hero composition: full desk setup. */
export function HeroArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 400" className={className} role="img" aria-label="Desktop computer, laptop, keyboard and mouse setup illustration">
      <Defs />
      <circle cx="270" cy="190" r="170" fill="#fff" fillOpacity=".06" />
      <rect x="20" y="318" width="480" height="14" rx="7" fill="#fff" fillOpacity=".14" />
      <g transform="translate(80 50)">
        <Monitor y={10} w={230} h={140} />
      </g>
      <Tower x={372} y={148} />
      <Laptop x={14} y={206} s={0.9} />
      <Keyboard x={214} y={262} w={150} />
      <Mouse x={382} y={266} />
      <g stroke={CYAN} strokeWidth="2" strokeLinecap="round" fill="none" opacity=".7">
        <path d="M430 60 h40 v30" />
        <circle cx="470" cy="96" r="4" fill={CYAN} />
        <path d="M40 120 h30 v-30" />
        <circle cx="70" cy="84" r="4" fill={CYAN} />
      </g>
    </svg>
  )
}

function Defs() {
  return (
    <defs>
      <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={CYAN} />
        <stop offset="1" stopColor={BLUE} />
      </linearGradient>
      <linearGradient id="artbg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#F4F7FB" />
        <stop offset="1" stopColor="#DCEAFB" />
      </linearGradient>
    </defs>
  )
}

/** Illustration used wherever a real photo is not supplied. */
export default function ProductArt({ category, className }: { category: CategorySlug; className?: string }) {
  return (
    <svg viewBox="0 0 400 270" className={className} role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <Defs />
      <rect width="400" height="270" fill="url(#artbg)" />
      <circle cx="200" cy="135" r="104" fill="#fff" fillOpacity=".65" />
      {art[category]}
    </svg>
  )
}
