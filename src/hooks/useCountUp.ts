import { useEffect, useRef, useState } from 'react'

/**
 * 0 → target 까지 숫자를 부드럽게 카운트업합니다.
 * @param target  최종 값
 * @param duration 애니메이션 시간 (ms)
 * @param delay   시작 딜레이 (ms)
 * @param decimals 소수점 자릿수
 */
export function useCountUp(
  target: number,
  duration = 700,
  delay = 0,
  decimals = 0,
): string {
  const [val, setVal] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    setVal(0)
    let startTime: number | null = null

    const timer = setTimeout(() => {
      const tick = (now: number) => {
        if (!startTime) startTime = now
        const p = Math.min((now - startTime) / duration, 1)
        // easeOutExpo
        const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
        const current = target * ease
        setVal(current)
        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          setVal(target)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(timer)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration, delay])

  return decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString()
}
