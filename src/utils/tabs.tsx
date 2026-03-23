import type { Tab } from './types'

// ── 공통 SVG 래퍼 ──────────────────────────────────────────
function Svg({ children, ...rest }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20" height="20"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  )
}

// ── 타임라인 ── 수직 스파인 + 3노드 + 우측 대시 ───────────
function IconTimeline() {
  return (
    <Svg strokeWidth="1.6">
      <line x1="7" y1="5.5" x2="7" y2="16.5" strokeOpacity="0.3" />
      <circle cx="7" cy="5.5"  r="2" fill="currentColor" stroke="none" />
      <line x1="9.2" y1="5.5"  x2="19" y2="5.5"  />
      <circle cx="7" cy="11"   r="2" fill="currentColor" stroke="none" />
      <line x1="9.2" y1="11"   x2="16" y2="11"   />
      <circle cx="7" cy="16.5" r="2" fill="currentColor" stroke="none" />
      <line x1="9.2" y1="16.5" x2="13" y2="16.5" />
    </Svg>
  )
}

// ── 대시보드 ── 3단 오름차순 막대 ──────────────────────────
function IconDashboard() {
  return (
    <Svg>
      <rect x="2"  y="14.5" width="4" height="6"    rx="1.5" fill="currentColor" stroke="none" />
      <rect x="9"  y="9"    width="4" height="11.5" rx="1.5" fill="currentColor" stroke="none" />
      <rect x="16" y="3.5"  width="4" height="17"   rx="1.5" fill="currentColor" stroke="none" />
    </Svg>
  )
}

// ── 리캡 ── 4-point 스파클 ─────────────────────────────────
// 중심(11,11), 외반경 9, 내반경 3.2 → 가늘고 날카로운 별
function IconRecap() {
  return (
    <Svg>
      <path
        d="M11 2 L13.2 8.8 L20 11 L13.2 13.2 L11 20 L8.8 13.2 L2 11 L8.8 8.8 Z"
        fill="currentColor"
        stroke="none"
      />
    </Svg>
  )
}

export const TABS: Tab[] = [
  { id: 'home',      icon: <IconTimeline />,  label: '타임라인' },
  { id: 'dashboard', icon: <IconDashboard />, label: '대시보드' },
  { id: 'recap',     icon: <IconRecap />,     label: '리캡' },
]
