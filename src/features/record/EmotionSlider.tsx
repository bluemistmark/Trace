import { useEffect, useRef, useState } from 'react'
import { getEmotionColor } from '@/utils/emotion'
import styles from './EmotionSlider.module.scss'

interface EmotionSliderProps {
  value: number
  onChange: (v: number) => void
}

export default function EmotionSlider({ value, onChange }: EmotionSliderProps) {
  const [dragging, setDragging] = useState(false)
  const [bubbleOn, setBubbleOn] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const pct = value / 10
  const thumbW = dragging ? 30 : 24
  const thumbCenter = `calc(${pct * 100}% + ${thumbW / 2 - pct * thumbW}px)`

  const handleStart = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setDragging(true)
    setBubbleOn(true)
  }

  const handleEnd = () => {
    setDragging(false)
    timerRef.current = setTimeout(() => setBubbleOn(false), 550)
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  return (
    <div className={`${styles.outer} ${dragging ? styles.dragging : ''}`}>
      {bubbleOn && (
        <div
          className={`${styles.bubble} ${dragging ? styles.show : styles.hide}`}
          style={{ left: thumbCenter }}
        >
          <div className={styles.bubbleLabel} style={{ color: getEmotionColor(value) }}>
            {value}
          </div>
          <div className={styles.bubbleArrow} />
        </div>
      )}
      <div className={styles.trackWrap}>
        <div className={styles.fill} style={{ width: thumbCenter }} />
        <input
          type="range"
          className={styles.slider}
          min={0}
          max={10}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onPointerDown={handleStart}
          onPointerUp={handleEnd}
          onPointerLeave={() => { if (dragging) handleEnd() }}
        />
      </div>
    </div>
  )
}
