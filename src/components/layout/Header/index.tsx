import Button from '@/components/ui/Button'
import { getEmotionColor } from '@/utils/emotion'
import { getDateStr } from '@/utils/time'
import styles from './Header.module.scss'

interface HeaderProps {
  filled: number
  avgEmo: number | null
  onReset: () => void
}

export default function Header({ filled, avgEmo, onReset }: HeaderProps) {
  const avgColor = avgEmo != null ? getEmotionColor(avgEmo) : '#555'

  return (
    <header className={styles.header}>
      <div className={styles.row1}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M3 14 C5 14 5 6 8 6 C11 6 11 13 14 11 C16 10 17 8 17 8"
                stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              />
              <circle cx="17" cy="8" r="1.8" fill="#8B5CF6" />
            </svg>
          </div>
          <div>
            <div className={styles.appName}>Trace</div>
            <div className={styles.dateText}>{getDateStr()}</div>
          </div>
        </div>
        <Button variant="ghost" onClick={onReset}>초기화</Button>
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <div className={styles.summaryDot} style={{ background: '#6366F1' }} />
          <span>{filled}개 기록</span>
        </div>
        <div className={styles.summaryDivider} />
        <div className={styles.summaryItem}>
          <div className={styles.summaryDot} style={{ background: avgColor }} />
          <span>평균 {avgEmo != null ? avgEmo.toFixed(1) : '–'}점</span>
        </div>
        <div className={styles.summaryDivider} />
        <span>{filled * 30}분</span>
      </div>
    </header>
  )
}
