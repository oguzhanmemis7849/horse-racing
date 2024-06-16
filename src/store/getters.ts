import type { GetterTree } from 'vuex'
import type { State } from '@/types/state'
import type { HorseModel, RoundNumber, RaceStatus, Round } from '@/types/models'
import { shuffleArray } from '@/utils'

const getters: GetterTree<State, State> = {
  randomHorses(state: State): HorseModel[] {
    return shuffleArray(state.horses)
  },
  round(state: State) {
    return (roundNumber: RoundNumber): Round | undefined =>
      state.rounds.find((r) => r.roundNumber === roundNumber)
  },
  horsePosition(state: State) {
    return (roundNumber: RoundNumber, horseId: number): number | null => {
      const round = state.rounds.find((r) => r.roundNumber === roundNumber)
      const horsePosition = round?.horseList.find((hp) => hp.horseId === horseId)
      return horsePosition ? horsePosition.distanceCoveredPercentage : null
    }
  },
  currentRoundNumber(state: State): RoundNumber {
    return state.currentRoundNumber
  },
  raceStatus(state: State): RaceStatus {
    return state.raceStatus
  },
  currentRoundRaceLength(state: State): number {
    const round = state.rounds.find((round) => round.roundNumber === state.currentRoundNumber)
    return round ? round.raceLength : 0
  },
  roundResults: (state: State) => (roundNumber: RoundNumber) => {
    const round = state.rounds.find((r) => r.roundNumber === roundNumber)
    return round ? round.results : []
  },
  allRoundsHaveHorses(state: State): boolean {
    return state.rounds.every((round) => round.horseList.length > 0)
  }
}

export default getters
