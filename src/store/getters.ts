import type { GetterTree } from 'vuex'
import type { State } from '@/types/state'
import type { HorseModel, RoundNumber } from '@/types/models'
import { shuffleArray } from '@/utils'

const getters: GetterTree<State, State> = {
  randomHorses(state: State): HorseModel[] {
    return shuffleArray(state.horses)
  },
  selectedHorses(state: State): HorseModel[] {
    return state.selectedHorses
  },
  round(state: State) {
    return (roundNumber: RoundNumber) => state.rounds.find((r) => r.roundNumber === roundNumber)
  },
  horsePosition(state: State) {
    return (roundNumber: RoundNumber, horseId: number) => {
      const round = state.rounds.find((r) => r.roundNumber === roundNumber)
      const horsePosition = round?.horseList.find((hp) => hp.horseId === horseId)
      return horsePosition ? horsePosition.distanceCoveredPercentage : null
    }
  },
  currentRoundNumber(state: State) {
    return state.currentRoundNumber
  },
  raceStatus(state: State) {
    return state.raceStatus
  },

  currentRoundRaceLength(state: State) {
    const round = state.rounds.find((round) => round.roundNumber === state.currentRoundNumber)
    return round ? round.raceLength : 0
  }
}

export default getters
