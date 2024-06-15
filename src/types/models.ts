export interface HorseModel {
  id: number
  name: string
  condition: number
  colorName: string
  color: string
  distanceCoveredPercentage?: number
  position?: number
}

export type RoundNumber = 1 | 2 | 3 | 4 | 5 | 6

export type RaceLenght = 1200 | 1400 | 1600 | 1800 | 2000 | 2200

export type RaceStatus = 'running' | 'paused' | 'not_started'

export type ButtonName = 'Start' | 'Pause' | 'Continue'

export interface Round {
  roundNumber: RoundNumber
  raceLength: RaceLenght
  horseList: { horseId: number; distanceCoveredPercentage: number }[]
}
