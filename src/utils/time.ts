export function blockId(h: number, m: number): string {
  return `${String(h).padStart(2, '0')}:${m === 0 ? '00' : '30'}`
}

export function getTimeRangeStr(bid: string): string {
  const [h, m] = bid.split(':').map(Number)
  const endH = m === 30 ? h + 1 : h
  const endM = m === 30 ? '00' : '30'
  return `${bid} ~ ${String(endH).padStart(2, '0')}:${endM}`
}

export function getNowMin(): number {
  const now = new Date()
  return now.getHours() * 60 + now.getMinutes()
}

export function getCurrentBlockId(): string {
  const now = new Date()
  return blockId(now.getHours(), now.getMinutes() < 30 ? 0 : 30)
}

export function getDateStr(): string {
  const now = new Date()
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return `${now.getMonth() + 1}월 ${now.getDate()}일 ${days[now.getDay()]}요일`
}

export function getMonthStr(): { title: string; sub: string } {
  const now = new Date()
  const months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
  return {
    title: `${months[now.getMonth()]} 리캡`,
    sub: `${now.getFullYear()}년 ${months[now.getMonth()]} · 시간과 감정 리포트`,
  }
}
