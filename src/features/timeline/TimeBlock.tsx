import { CAT_MAP } from '@/utils/constants'
import { getEmotionColor } from '@/utils/emotion'
import type { TimeRecord } from '@/utils/types'
import styles from './TimeBlock.module.scss'

interface TimeBlockProps {
  id: string
  record?: TimeRecord
  isNew: boolean
  nowMin: number
  onClick: () => void
}

export default function TimeBlock({ id, record, isNew, nowMin, onClick }: TimeBlockProps) {
  const cat = record ? CAT_MAP[record.category] : null
  const eColor = record ? getEmotionColor(record.emotion) : null
  const [h, m] = id.split(':').map(Number)
  const isPastEmpty = !record && h * 60 + m < nowMin

  const cls = [
    styles.block,
    record     ? styles.filled    : '',
    isPastEmpty ? styles.pastEmpty : '',
    isNew       ? styles.newRecord : '',
  ].filter(Boolean).join(' ')

  return (
    <div
      className={cls}
      style={record && cat ? { background: `${cat.color}14`, borderLeftColor: eColor ?? undefined } : {}}
      onClick={onClick}
    >
      {record && cat ? (
        <div className={styles.content}>
          <span className={styles.emoji}>{cat.emoji}</span>
          <div className={styles.info}>
            <div className={styles.name}>{cat.name}</div>
            {record.memo && <div className={styles.memo}>{record.memo}</div>}
          </div>
          <span className={styles.score} style={{ color: eColor ?? undefined }}>
            {record.emotion}
          </span>
        </div>
      ) : (
        <span className={styles.hint}>+ 기록</span>
      )}
    </div>
  )
}
