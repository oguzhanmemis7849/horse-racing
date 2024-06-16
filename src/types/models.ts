export type RoundNumber = 1 | 2 | 3 | 4 | 5 | 6

export type RaceLenght = 1200 | 1400 | 1600 | 1800 | 2000 | 2200

export type RaceStatus = 'running' | 'paused' | 'not_started' | 'finished'

export interface HorseModel {
  id: number
  name: string
  condition: number
  colorName: string
  color: string
  distanceCoveredPercentage?: number
}

export interface RoundHorseModel {
  horseId: number
  distanceCoveredPercentage: number
}

export interface FinishTimeModel {
  horseId: number
  finishTime: number
}

export interface ResultModel {
  horseId: number
  position: number
}

export interface Round {
  roundNumber: RoundNumber
  raceLength: RaceLenght
  horseList: RoundHorseModel[]
  finishTimes: FinishTimeModel[]
  results?: ResultModel[]
}

export interface ProgramTable {
  round: RoundNumber
  program: { lane: number; name: string }[]
}

export interface ResultTable {
  round: RoundNumber
  results: { position: number; name: string }[]
}
