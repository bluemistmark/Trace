import { useState } from 'react'
import Button from '@/components/ui/Button'
import { CATEGORIES, EMOTION_DESCS, EMOTION_EMOJIS } from '@/utils/constants'
import { getEmotionColor } from '@/utils/emotion'
import { getTimeRangeStr } from '@/utils/time'
import type { CategoryId, TimeRecord } from '@/utils/types'
import EmotionSlider from './EmotionSlider'
import styles from './RecordModal.module.scss'

interface RecordModalProps {
  blockId: string
  existingRecord?: TimeRecord
  onSave: (data: TimeRecord) => void
  onDelete: () => void
  onClose: () => void
}

export default function RecordModal({
  blockId: bid,
  existingRecord,
  onSave,
  onDelete,
  onClose,
}: RecordModalProps) {
  const [category, setCategory] = useState<CategoryId | null>(
    existingRecord?.category ?? null
  )
  const [emotion,   setEmotion]   = useState(existingRecord?.emotion ?? 6)
  const [memo,      setMemo]      = useState(existingRecord?.memo ?? '')
  const [saving,    setSaving]    = useState(false)
  const [closing,   setClosing]   = useState(false)
  const [triedSave, setTriedSave] = useState(false)

  const triggerClose = () => {
    setClosing(true)
    setTimeout(onClose, 260)
  }

  const handleSave = () => {
    if (!category) { setTriedSave(true); return }
    setSaving(true)
    setTimeout(() => {
      setClosing(true)
      setTimeout(() => onSave({ category, emotion, memo }), 250)
    }, 280)
  }

  const handleDelete = () => {
    setClosing(true)
    setTimeout(onDelete, 250)
  }

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }

  return (
    <div
      className={`${styles.overlay} ${closing ? styles.closing : ''}`}
      onClick={(e) => e.target === e.currentTarget && triggerClose()}
    >
      <div className={`${styles.sheet} ${closing ? styles.closing : ''}`}>
        <div className={styles.handle} />

        <div className={styles.header}>
          <div className={styles.title}>활동 기록</div>
          <div className={styles.time}>{getTimeRangeStr(bid)}</div>
        </div>

        <div className={styles.body}>
          {/* 카테고리 */}
          <div className={styles.sectionLabel}>카테고리</div>
          <div className={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className={`${styles.chip} ${category === cat.id ? styles.selected : ''}`}
                style={category === cat.id
                  ? { borderColor: cat.color, background: `${cat.color}1A` }
                  : {}}
                onClick={() => setCategory(cat.id)}
              >
                <span className={styles.chipEmoji}>{cat.emoji}</span>
                <span className={styles.chipName}>{cat.name}</span>
              </div>
            ))}
          </div>

          {/* 감정 점수 */}
          <div className={styles.emotionSection}>
            <div className={styles.sectionLabel}>감정 점수</div>
            <div className={styles.emotionDisplay}>
              <span className={styles.emotionScore} style={{ color: getEmotionColor(emotion) }}>
                {emotion}
              </span>
              <div className={styles.emotionDescWrap}>
                <div className={styles.emotionDesc}>
                  {EMOTION_EMOJIS[emotion]} {EMOTION_DESCS[emotion]}
                </div>
              </div>
            </div>
            <EmotionSlider value={emotion} onChange={setEmotion} />
          </div>

          {/* 메모 */}
          <div className={styles.sectionLabel} style={{ marginTop: 20 }}>메모</div>
          <textarea
            className={styles.memo}
            placeholder="어떤 활동을 했나요? (선택)"
            value={memo}
            onChange={handleMemoChange}
          />

          {triedSave && !category && (
            <div className={styles.categoryHint}>카테고리를 먼저 선택해주세요</div>
          )}

          <div className={styles.btnRow}>
            {existingRecord && (
              <Button variant="danger" onClick={handleDelete}>삭제</Button>
            )}
            <Button
              variant="primary"
              loading={saving}
              disabled={saving}
              onClick={handleSave}
            >
              {saving ? '저장 중…' : existingRecord ? '수정하기' : '기록하기'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
