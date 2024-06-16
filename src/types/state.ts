import type { HorseModel, Round, RoundNumber, RaceStatus } from '@/types/models'

export interface State {
  horses: HorseModel[]
  rounds: Round[]
  currentRoundNumber: RoundNumber
  raceStatus: RaceStatus
}
