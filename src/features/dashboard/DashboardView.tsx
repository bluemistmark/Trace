import { useMemo } from 'react'
import { ALL_BLOCKS, CAT_MAP } from '@/utils/constants'
import { calcAvgEmotion, getEmotionColor } from '@/utils/emotion'
import { useCountUp } from '@/hooks/useCountUp'
import type { RecordsMap } from '@/utils/types'
import CategoryBars from './CategoryBars'
import EmotionChart from './EmotionChart'
import styles from './DashboardView.module.scss'

// ── 카운팅 애니메이션이 있는 stat 박스 ─────────────────────
interface CountStatProps {
  to: number
  suffix?: string
  decimals?: number
  label: string
  color: string
  delay?: number
  duration?: number
}

function CountStat({
  to, suffix = '', decimals = 0,
  label, color, delay = 0, duration = 700,
}: CountStatProps) {
  const displayed = useCountUp(to, duration, delay, decimals)
  return (
    <div className={styles.statBox} style={{ animationDelay: `${delay}ms` }}>
      <div className={styles.statVal} style={{ color }}>
        {displayed}{suffix}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  )
}

// ── 일반 (정적) stat 박스 ───────────────────────────────────
interface StatProps {
  val: string | number
  label: string
  color: string
  delay?: number
}

function Stat({ val, label, color, delay = 0 }: StatProps) {
  return (
    <div className={styles.statBox} style={{ animationDelay: `${delay}ms` }}>
      <div className={styles.statVal} style={{ color }}>{val}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  )
}

// ── 메인 컴포넌트 ──────────────────────────────────────────
interface DashboardViewProps {
  records: RecordsMap
  nowMin: number
}

export default function DashboardView({ records, nowMin }: DashboardViewProps) {
  const values = Object.values(records)
  const filled = values.length
  const avgEmo = calcAvgEmotion(values.map((r) => r.emotion))
  const highCnt = values.filter((r) => r.emotion >= 7).length
  const positiveRatio = filled > 0 ? Math.round((highCnt / filled) * 100) : 0
  const remainBlocks = ALL_BLOCKS.filter((id) => {
    const [h, m] = id.split(':').map(Number)
    return h * 60 + m > nowMin
  }).length

  const topCat = useMemo(() => {
    const cnt: Record<string, number> = {}
    values.forEach((r) => { cnt[r.category] = (cnt[r.category] ?? 0) + 1 })
    const sorted = Object.entries(cnt).sort((a, b) => b[1] - a[1])
    return sorted.length ? CAT_MAP[sorted[0][0]] : null
  }, [records])

  const insights = useMemo(() => {
    const items: { icon: string; text: string }[] = []
    if (avgEmo != null && avgEmo >= 7)
      items.push({ icon: '🌟', text: `오늘 평균 감정이 ${avgEmo.toFixed(1)}점으로 좋은 하루예요!` })
    if (topCat)
      items.push({ icon: '⏱', text: `오늘 가장 많은 시간을 '${topCat.name}'에 사용했어요.` })
    const ex = values.filter((r) => r.category === 'exercise')
    if (ex.length) {
      const ee = calcAvgEmotion(ex.map((r) => r.emotion))
      if (ee != null && ee >= 7)
        items.push({ icon: '💪', text: `운동할 때 감정 점수가 평균 ${ee.toFixed(1)}점이에요.` })
    }
    if (!items.length)
      items.push({ icon: '💡', text: '더 많은 기록이 쌓이면 패턴 인사이트가 나타나요.' })
    return items
  }, [records])

  return (
    <div className={styles.scroll}>
      <div className={styles.card}>
        <div className={styles.cardTitle}>오늘의 감정 흐름</div>
        <EmotionChart records={records} />
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>카테고리별 시간</div>
        <CategoryBars records={records} />
      </div>

      <div className={styles.statsGrid}>
        {/* 카운팅 애니메이션 stat */}
        <CountStat
          to={filled}
          label="총 기록 블록"
          color="#6366F1"
          delay={0}
          duration={900}
        />
        <CountStat
          to={positiveRatio}
          suffix="%"
          label="긍정 비율"
          color="#34D399"
          delay={80}
          duration={1000}
        />

        {/* 일반 stat */}
        <Stat
          val={avgEmo != null ? avgEmo.toFixed(1) : '–'}
          label="평균 감정 점수"
          color={avgEmo != null ? getEmotionColor(avgEmo) : '#555'}
          delay={160}
        />
        <Stat
          val={remainBlocks}
          label="남은 블록"
          color="#555"
          delay={240}
        />
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>패턴 인사이트</div>
        {insights.map((ins, i) => (
          <div key={i} className={styles.insightRow} style={{ animationDelay: `${i * 55 + 200}ms` }}>
            <span className={styles.insightIcon}>{ins.icon}</span>
            <span className={styles.insightText}>{ins.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
