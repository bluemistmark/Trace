import type { Tab, TabId } from '@/utils/types'
import styles from './BottomNav.module.scss'

interface BottomNavProps {
  tabs: Tab[]
  activeTab: TabId
  onChange: (id: TabId) => void
}

export default function BottomNav({ tabs, activeTab, onChange }: BottomNavProps) {
  return (
    <nav className={styles.nav}>
      {tabs.map(({ id, icon, label }) => (
        <div
          key={id}
          className={`${styles.item} ${activeTab === id ? styles.active : ''}`}
          onClick={() => onChange(id)}
        >
          <div className={styles.iconWrap}>
            <span className={styles.icon}>{icon}</span>
          </div>
          <span className={styles.label}>{label}</span>
        </div>
      ))}
    </nav>
  )
}
