import { useEffect, useState } from 'react'
import { getNowMin } from '@/utils/time'

/**
 * 현재 시각을 분 단위로 반환하며, 매 분마다 자동 갱신된다.
 * (예: 오전 9시 30분 → 570)
 */
export function useNowMin(): number {
  const [nowMin, setNowMin] = useState<number>(getNowMin)

  useEffect(() => {
    const id = setInterval(() => setNowMin(getNowMin()), 60_000)
    return () => clearInterval(id)
  }, [])

  return nowMin
}
