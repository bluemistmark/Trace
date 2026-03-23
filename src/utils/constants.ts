import type { Category, RecordsMap } from './types'

export const LS_KEY = 'trace_records_v1'

export const CATEGORIES: Category[] = [
  { id: 'work',     name: '업무', emoji: '💼', color: '#6366F1' },
  { id: 'study',    name: '학습', emoji: '📚', color: '#8B5CF6' },
  { id: 'exercise', name: '운동', emoji: '🏃', color: '#10B981' },
  { id: 'rest',     name: '휴식', emoji: '☕', color: '#F59E0B' },
  { id: 'personal', name: '개인', emoji: '✨', color: '#EC4899' },
  { id: 'meal',     name: '식사', emoji: '🍽️', color: '#F97316' },
]

export const CAT_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
) as Record<string, Category>

export const EMOTION_DESCS: string[] = [
  '정말 힘들어요', '힘들어요', '조금 힘들어요', '별로예요', '그저 그래요',
  '보통이에요', '좋아요', '기분 좋아요', '아주 좋아요', '최고예요', '완벽한 하루!',
]

export const EMOTION_EMOJIS: string[] = [
  '😔', '😔', '😟', '😐', '🙂', '😊', '😊', '😄', '🤩', '🌟', '✨',
]

export const ALL_BLOCKS: string[] = (() => {
  const blocks: string[] = []
  for (let h = 0; h < 24; h++) {
    blocks.push(`${String(h).padStart(2, '0')}:00`)
    blocks.push(`${String(h).padStart(2, '0')}:30`)
  }
  return blocks
})()

export const SEED: RecordsMap = {
  '06:30': { category: 'personal', emotion: 5, memo: '기상 🌅' },
  '07:00': { category: 'exercise', emotion: 8, memo: '아침 러닝 5km' },
  '07:30': { category: 'exercise', emotion: 9, memo: '' },
  '08:00': { category: 'meal',     emotion: 8, memo: '든든한 아침식사' },
  '08:30': { category: 'personal', emotion: 6, memo: '뉴스 & 커피' },
  '09:00': { category: 'work',     emotion: 7, memo: 'Trace 기획 🚀' },
  '09:30': { category: 'work',     emotion: 7, memo: '' },
  '10:00': { category: 'work',     emotion: 6, memo: '' },
  '10:30': { category: 'work',     emotion: 4, memo: '길어지는 회의…' },
  '11:00': { category: 'work',     emotion: 5, memo: '' },
  '11:30': { category: 'work',     emotion: 4, memo: '' },
  '12:00': { category: 'meal',     emotion: 8, memo: '팀 점심 🍜' },
  '12:30': { category: 'rest',     emotion: 7, memo: '산책 & 환기' },
}

