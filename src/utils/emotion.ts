export function getEmotionColor(score: number): string {
  if (score <= 3) return '#60A5FA'
  if (score <= 6) return '#9CA3AF'
  return '#FBBF24'
}

export function calcAvgEmotion(values: number[]): number | null {
  if (!values.length) return null
  return values.reduce((sum, v) => sum + v, 0) / values.length
}
