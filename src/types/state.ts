import type { HorseModel, Round, RoundNumber, RaceStatus } from '@/types/models'

export interface State {
  horses: HorseModel[]
  selectedHorses: HorseModel[]
  rounds: Round[]
  currentRoundNumber: RoundNumber
  raceStatus: RaceStatus
}
