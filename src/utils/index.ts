import type { RoundNumber } from '@/types/models'

export function shuffleArray(array: any[]): any[] {
  const newArray = array.slice()

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }

  return newArray
}

export function getOrdinalSuffix(roundNumber: RoundNumber): string {
  switch (roundNumber) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}
