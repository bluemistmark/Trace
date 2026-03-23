import { useEffect, useRef } from 'react'
import { ALL_BLOCKS } from '@/utils/constants'
import { blockId } from '@/utils/time'
import type { RecordsMap } from '@/utils/types'
import TimeBlock from './TimeBlock'
import styles from './TimelineView.module.scss'

interface TimelineViewProps {
  records: RecordsMap
  nowMin: number
  newBlocks: Set<string>
  onOpenModal: (bid: string) => void
}

export default function TimelineView({ records, nowMin, newBlocks, onOpenModal }: TimelineViewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const curH = Math.floor(nowMin / 60)
  const curM = nowMin % 60
  const curBid = blockId(curH, curM < 30 ? 0 : 30)

  useEffect(() => {
    if (!ref.current) return
    ref.current.scrollTop = Math.max(0, ALL_BLOCKS.indexOf(curBid) - 5) * 58
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.inner}>
        {ALL_BLOCKS.map((id) => {
          const [, m] = id.split(':').map(Number)
          return (
            <div key={id}>
              {id === curBid && (
                <div className={styles.currentTime}>
                  <div className={styles.ctSpacer} />
                  <div className={styles.ctDot} />
                  <div className={styles.ctLine} />
                </div>
              )}
              <div className={styles.row}>
                <div className={`${styles.timeLabel} ${m !== 0 ? styles.invisible : ''}`}>
                  {m === 0 ? id : ''}
                </div>
                <div className={styles.blockWrapper}>
                  <TimeBlock
                    id={id}
                    record={records[id]}
                    isNew={newBlocks.has(id)}
                    nowMin={nowMin}
                    onClick={() => onOpenModal(id)}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
