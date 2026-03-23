import { useMemo } from 'react'
import { CAT_MAP } from '@/utils/constants'
import { calcAvgEmotion } from '@/utils/emotion'
import { useCountUp } from '@/hooks/useCountUp'
import { getMonthStr } from '@/utils/time'
import type { RecordsMap } from '@/utils/types'
import styles from './RecapView.module.scss'

const MEDALS = ['🥇', '🥈', '🥉']
const NUMS   = ['1️⃣', '2️⃣', '3️⃣']

interface RecapViewProps {
  records: RecordsMap
}

export default function RecapView({ records }: RecapViewProps) {
  const values = Object.values(records)
  const filled = values.length
  const avgEmo = calcAvgEmotion(values.map((r) => r.emotion))
  const positiveRatio = filled
    ? Math.round((values.filter((r) => r.emotion >= 7).length / filled) * 100)
    : 0

  const catAvg = useMemo(() => {
    const emoSum: Record<string, number> = {}
    const cnt:    Record<string, number> = {}
    values.forEach((r) => {
      emoSum[r.category] = (emoSum[r.category] ?? 0) + r.emotion
      cnt[r.category]    = (cnt[r.category]    ?? 0) + 1
    })
    return Object.keys(emoSum)
      .map((id) => ({ cat: CAT_MAP[id], avg: emoSum[id] / cnt[id] }))
      .sort((a, b) => b.avg - a.avg)
  }, [records])

  const exerciseDiff = useMemo(() => {
    const ex = values.filter((r) => r.category === 'exercise')
    const ot = values.filter((r) => r.category !== 'exercise')
    if (!ex.length || !ot.length) return null
    const exAvg = calcAvgEmotion(ex.map((r) => r.emotion)) ?? 0
    const otAvg = calcAvgEmotion(ot.map((r) => r.emotion)) ?? 0
    return exAvg - otAvg
  }, [records])

  const { title, sub } = getMonthStr()
  const countedFilled = useCountUp(filled, 900, 190)
  const countedRatio  = useCountUp(positiveRatio, 1000, 240)

  const insightText = avgEmo != null
    ? exerciseDiff != null && exerciseDiff > 0
      ? `평균 감정 점수는 ${avgEmo.toFixed(1)}점이에요. 운동할 때 감정이 나머지보다 평균 ${exerciseDiff.toFixed(1)}점 높았어요.`
      : `평균 감정 점수는 ${avgEmo.toFixed(1)}점이에요. 꾸준한 기록으로 나만의 패턴을 발견해보세요.`
    : '기록을 더 쌓으면 나만의 인사이트 문장이 생성돼요 ✨'

  return (
    <div className={styles.scroll}>
      <div className={styles.monthHeader}>
        <div className={styles.monthTitle}>{title}</div>
        <div className={styles.monthSub}>{sub}</div>
      </div>

      <div className={styles.insightBox}>
        <div className={styles.insightBoxLabel}>이달의 인사이트</div>
        <div className={styles.insightBoxText}>{insightText}</div>
      </div>

      {/* 기분 좋았던 활동 Top 3 */}
      <div className={styles.card} style={{ animationDelay: '70ms' }}>
        <div className={styles.cardTitle}>기분 좋았던 활동 Top 3</div>
        {catAvg.slice(0, 3).map((item, i) => (
          <div key={i} className={styles.rankItem} style={{ animationDelay: `${i * 55 + 110}ms` }}>
            <span style={{ fontSize: 17, width: 26, textAlign: 'center' }}>{MEDALS[i]}</span>
            <span style={{ fontSize: 19 }}>{item.cat?.emoji}</span>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{item.cat?.name}</span>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#FBBF24' }}>{item.avg.toFixed(1)}</span>
          </div>
        ))}
        {!catAvg.length && <div className={styles.noData}>기록이 필요해요</div>}
      </div>

      {/* 기분 낮았던 활동 Top 3 */}
      <div className={styles.card} style={{ animationDelay: '120ms' }}>
        <div className={styles.cardTitle}>기분 낮았던 활동 Top 3</div>
        {[...catAvg].reverse().slice(0, 3).map((item, i) => (
          <div key={i} className={styles.rankItem} style={{ animationDelay: `${i * 55 + 160}ms` }}>
            <span style={{ fontSize: 17, width: 26, textAlign: 'center' }}>{NUMS[i]}</span>
            <span style={{ fontSize: 19 }}>{item.cat?.emoji}</span>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{item.cat?.name}</span>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#60A5FA' }}>{item.avg.toFixed(1)}</span>
          </div>
        ))}
        {!catAvg.length && <div className={styles.noData}>기록이 필요해요</div>}
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statBox} style={{ animationDelay: '190ms' }}>
          <div className={styles.statVal} style={{ color: '#6366F1' }}>{countedFilled}</div>
          <div className={styles.statLabel}>총 기록 블록</div>
        </div>
        <div className={styles.statBox} style={{ animationDelay: '240ms' }}>
          <div className={styles.statVal} style={{ color: '#10B981' }}>{countedRatio}%</div>
          <div className={styles.statLabel}>긍정 비율</div>
        </div>
      </div>
    </div>
  )
}
