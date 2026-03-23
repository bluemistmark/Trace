import { useEffect, useMemo, useRef } from 'react'
import { ALL_BLOCKS } from '@/utils/constants'
import { getEmotionColor } from '@/utils/emotion'
import type { RecordsMap } from '@/utils/types'
import styles from './EmotionChart.module.scss'

const W = 340, H = 110
const pad = { t: 10, b: 20, l: 16, r: 10 }
const cW = W - pad.l - pad.r
const cH = H - pad.t - pad.b
const sx = (x: number) => pad.l + (x / 24) * cW
const sy = (y: number) => pad.t + (1 - y / 10) * cH

interface Point { x: number; y: number }

interface EmotionChartProps {
  records: RecordsMap
}

export default function EmotionChart({ records }: EmotionChartProps) {
  const pathRef = useRef<SVGPathElement>(null)

  const pts: Point[] = ALL_BLOCKS.filter((id) => records[id]).map((id) => {
    const [h, m] = id.split(':').map(Number)
    return { x: h + m / 60, y: records[id].emotion }
  })

  const linePath = useMemo(() => {
    if (pts.length < 2) return ''
    return pts.map((p, i) => {
      if (i === 0) return `M${sx(p.x)},${sy(p.y)}`
      const pp = pts[i - 1]
      const cx = (sx(pp.x) + sx(p.x)) / 2
      return `C${cx},${sy(pp.y)} ${cx},${sy(p.y)} ${sx(p.x)},${sy(p.y)}`
    }).join(' ')
  // records 변경 시만 재계산
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [records])

  useEffect(() => {
    const el = pathRef.current
    if (!el || pts.length < 2) return
    requestAnimationFrame(() => {
      const len = el.getTotalLength()
      el.style.strokeDasharray = String(len)
      el.style.strokeDashoffset = String(len)
      requestAnimationFrame(() => {
        el.style.transition = 'stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1)'
        el.style.strokeDashoffset = '0'
      })
    })
  }, [linePath])

  if (pts.length < 2) {
    return <div className={styles.noData}>기록이 쌓이면 감정 곡선이 나타나요 📈</div>
  }

  const areaPath = `${linePath} L${sx(pts[pts.length - 1].x)},${pad.t + cH} L${sx(pts[0].x)},${pad.t + cH} Z`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.svg}>
      <defs>
        <linearGradient id="aG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#6366F1" stopOpacity={0.3} />
          <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="lG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>

      {[0, 5, 10].map((v) => (
        <g key={v}>
          <line x1={pad.l} y1={sy(v)} x2={W - pad.r} y2={sy(v)} stroke="#222226" strokeWidth="1" />
          <text x={pad.l - 4} y={sy(v) + 4} fontSize="9" fill="#444448" textAnchor="end">{v}</text>
        </g>
      ))}

      <path d={areaPath} fill="url(#aG)" />
      <path
        ref={pathRef}
        d={linePath}
        fill="none"
        stroke="url(#lG)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {pts.map((p, i) => (
        <circle
          key={i}
          cx={sx(p.x)} cy={sy(p.y)} r="3"
          fill={getEmotionColor(p.y)}
          stroke="#17171A" strokeWidth="1.5"
          style={{ opacity: 0, animation: `fadeIn 0.2s ease ${i * 35 + 800}ms forwards` }}
        />
      ))}

      {[6, 9, 12, 15, 18, 21].map((h) => (
        <text key={h} x={sx(h)} y={H - 2} fontSize="9" fill="#444448" textAnchor="middle">
          {String(h).padStart(2, '0')}
        </text>
      ))}
    </svg>
  )
}
