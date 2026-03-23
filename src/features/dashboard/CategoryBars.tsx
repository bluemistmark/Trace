import { useEffect, useState } from 'react'
import { CATEGORIES } from '@/utils/constants'
import type { RecordsMap } from '@/utils/types'
import styles from './CategoryBars.module.scss'

interface CategoryBarsProps {
  records: RecordsMap
}

export default function CategoryBars({ records }: CategoryBarsProps) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80)
    return () => clearTimeout(t)
  }, [])

  const counts: Record<string, number> = {}
  CATEGORIES.forEach((c) => (counts[c.id] = 0))
  Object.values(records).forEach((r) => { counts[r.category] = (counts[r.category] ?? 0) + 1 })

  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1
  const sorted = CATEGORIES
    .map((c) => ({ ...c, count: counts[c.id] ?? 0 }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count)

  if (!sorted.length) {
    return <div className={styles.noData}>아직 기록이 없어요</div>
  }

  return (
    <>
      {sorted.map((cat, i) => (
        <div key={cat.id} className={styles.row} style={{ animationDelay: `${i * 45}ms` }}>
          <span className={styles.emoji}>{cat.emoji}</span>
          <span className={styles.name}>{cat.name}</span>
          <div className={styles.track}>
            <div
              className={styles.fill}
              style={{
                width: ready ? `${(cat.count / total) * 100}%` : '0%',
                background: cat.color,
              }}
            />
          </div>
          <span className={styles.dur}>{cat.count * 30}분</span>
        </div>
      ))}
    </>
  )
}
