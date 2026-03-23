import { useState } from 'react'
import BottomNav from '@/components/layout/BottomNav'
import Header from '@/components/layout/Header'
import DashboardView from '@/features/dashboard/DashboardView'
import RecapView from '@/features/recap/RecapView'
import RecordModal from '@/features/record/RecordModal'
import TimelineView from '@/features/timeline/TimelineView'
import { useNowMin } from '@/hooks/useNowMin'
import { useTheme } from '@/hooks/useTheme'
import { useRecordsStore } from '@/store/useRecordsStore'
import { TABS } from '@/utils/tabs'
import { calcAvgEmotion } from '@/utils/emotion'
import type { TabId, TimeRecord } from '@/utils/types'
import styles from './App.module.scss'

export default function App() {
  const { records, newBlocks, addRecord, deleteRecord, resetRecords } = useRecordsStore()
  const [activeTab, setActiveTab] = useState<TabId>('home')
  const [modal, setModal] = useState<string | null>(null)
  const nowMin = useNowMin()
  const { theme, toggleTheme } = useTheme()

  const values  = Object.values(records)
  const filled  = values.length
  const avgEmo  = calcAvgEmotion(values.map((r) => r.emotion))

  const handleSave = (bid: string, data: TimeRecord) => {
    addRecord(bid, data)
    setModal(null)
  }

  const handleDelete = (bid: string) => {
    deleteRecord(bid)
    setModal(null)
  }

  return (
    <>
      <Header
        filled={filled}
        avgEmo={avgEmo}
        theme={theme}
        onToggleTheme={toggleTheme}
        onReset={resetRecords}
      />

      <div key={activeTab} className={styles.viewWrapper}>
        {activeTab === 'home' && (
          <TimelineView
            records={records}
            nowMin={nowMin}
            newBlocks={newBlocks}
            onOpenModal={setModal}
          />
        )}
        {activeTab === 'dashboard' && (
          <DashboardView records={records} nowMin={nowMin} />
        )}
        {activeTab === 'recap' && (
          <RecapView records={records} />
        )}
      </div>

      {modal && (
        <RecordModal
          blockId={modal}
          existingRecord={records[modal]}
          onSave={(data) => handleSave(modal, data)}
          onDelete={() => handleDelete(modal)}
          onClose={() => setModal(null)}
        />
      )}

      <BottomNav tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
    </>
  )
}
