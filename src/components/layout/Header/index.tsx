import type { Theme } from '@/hooks/useTheme'
import { getEmotionColor } from '@/utils/emotion'
import { getDateStr } from '@/utils/time'
import styles from './Header.module.scss'

interface HeaderProps {
  filled: number
  avgEmo: number | null
  theme: Theme
  onToggleTheme: () => void
  onReset: () => void
}

function IconSun() {
  return (
    <svg width="17" height="17" viewBox="0 0 22 22" fill="none"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <circle cx="11" cy="11" r="4.2" />
      <line x1="11" y1="1.5" x2="11" y2="4.5" />
      <line x1="11" y1="17.5" x2="11" y2="20.5" />
      <line x1="1.5" y1="11" x2="4.5" y2="11" />
      <line x1="17.5" y1="11" x2="20.5" y2="11" />
      <line x1="4.3" y1="4.3" x2="6.4" y2="6.4" />
      <line x1="15.6" y1="15.6" x2="17.7" y2="17.7" />
      <line x1="4.3" y1="17.7" x2="6.4" y2="15.6" />
      <line x1="15.6" y1="6.4" x2="17.7" y2="4.3" />
    </svg>
  )
}

function IconMoon() {
  return (
    <svg width="17" height="17" viewBox="0 0 22 22" fill="currentColor">
      <path d="M20 13.5A9 9 0 0 1 8.5 2a8 8 0 1 0 11.5 11.5z" />
    </svg>
  )
}

export default function Header({ filled, avgEmo, theme, onToggleTheme, onReset }: HeaderProps) {
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

        <div className={styles.actions}>
          <button
            className={styles.themeBtn}
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>
          <button className={styles.resetBtn} onClick={onReset}>초기화</button>
        </div>
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
