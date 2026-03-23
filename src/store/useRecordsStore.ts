import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { RecordsMap, TimeRecord } from '@/utils/types'
import { LS_KEY, SEED } from '@/utils/constants'

interface RecordsState {
  records: RecordsMap
  newBlocks: Set<string>
  addRecord: (bid: string, data: TimeRecord) => void
  deleteRecord: (bid: string) => void
  resetRecords: () => void
}

export const useRecordsStore = create<RecordsState>()(
  persist(
    (set) => ({
      records: SEED,
      newBlocks: new Set<string>(),

      addRecord: (bid, data) => {
        set((state) => ({
          records: { ...state.records, [bid]: data },
          newBlocks: new Set([...state.newBlocks, bid]),
        }))
        // 애니메이션 후 newBlocks에서 제거
        setTimeout(() => {
          set((state) => {
            const nb = new Set(state.newBlocks)
            nb.delete(bid)
            return { newBlocks: nb }
          })
        }, 350)
      },

      deleteRecord: (bid) => {
        set((state) => {
          const next = { ...state.records }
          delete next[bid]
          return { records: next }
        })
      },

      resetRecords: () => set({ records: SEED }),
    }),
    {
      name: LS_KEY,
      // Set은 JSON 직렬화 불가 → records만 영속화
      partialize: (state) => ({ records: state.records }),
    }
  )
)
