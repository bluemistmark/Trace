import type React from 'react'

export type CategoryId = 'work' | 'study' | 'exercise' | 'rest' | 'personal' | 'meal'

export interface Category {
  id: CategoryId
  name: string
  emoji: string
  color: string
}

export interface TimeRecord {
  category: CategoryId
  emotion: number // 0–10
  memo: string
}

export type RecordsMap = Record<string, TimeRecord>

export type TabId = 'home' | 'dashboard' | 'recap'

export interface Tab {
  id: TabId
  icon: React.ReactNode
  label: string
}
