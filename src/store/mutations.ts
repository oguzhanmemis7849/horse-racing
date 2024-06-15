import type { MutationTree } from 'vuex'
import type { State } from '@/types/state'
import type { HorseModel, RoundNumber } from '@/types/models'
import { MAX_SELECTABLE_HORSE_COUNT } from '@/constants/horses'
import { TOTAL_ROUND } from '@/constants/race'

const mutations: MutationTree<State> = {
  selectHorse(state: State, horse: HorseModel) {
    if (
      state.selectedHorses.length < MAX_SELECTABLE_HORSE_COUNT &&
      !state.selectedHorses.find((h) => h.id === horse.id)
    ) {
      state.selectedHorses.push(horse)
    }
  },
  resetSelectedHorses(state: State) {
    state.selectedHorses = []
  },
  updateHorseDistanceCovered(
    state: State,
    {
      horseId,
      distanceCoveredPercentage
    }: { roundNumber: RoundNumber; horseId: number; distanceCoveredPercentage: number }
  ) {
    state.selectedHorses = state.selectedHorses.map((horse) => {
      if (horse.id === horseId) {
        return { ...horse, distanceCoveredPercentage }
      }
      return horse
    })
  },

  updateRound(
    state: State,
    {
      roundNumber,
      horseId,
      distanceCoveredPercentage
    }: { roundNumber: RoundNumber; horseId: number; distanceCoveredPercentage: number }
  ) {
    const round = state.rounds.find((r) => r.roundNumber === roundNumber)
    if (round) {
      const horsePosition = round.horseList.find((hp) => hp.horseId === horseId)
      if (horsePosition) {
        horsePosition.distanceCoveredPercentage = distanceCoveredPercentage
      } else {
        round.horseList.push({ horseId, distanceCoveredPercentage })
      }
    }
  },
  startRace(state: State) {
    // Sadece yarışın ilk kez başlatıldığında bu işlem yapılır
    if (state.raceStatus !== 'paused') {
      state.currentRoundNumber = 1 as RoundNumber
      state.rounds.forEach((round) => {
        round.horseList = []
        state.selectedHorses.forEach((horse) => {
          round.horseList.push({ horseId: horse.id, distanceCoveredPercentage: 0 })
        })
      })
    }
    state.raceStatus = 'running'
  },
  resumeRace(state: State) {
    state.raceStatus = 'running'
  },
  pauseRace(state: State) {
    state.raceStatus = 'paused'
  },
  resetRace(state: State) {
    state.currentRoundNumber = 1 as RoundNumber
    state.raceStatus = 'not_started'
    state.selectedHorses = []
    state.rounds.forEach((round) => {
      round.horseList = []
    })
  },
  nextRound(state: State) {
    if (state.currentRoundNumber < TOTAL_ROUND) {
      state.currentRoundNumber = (state.currentRoundNumber + 1) as RoundNumber
    } else {
      state.raceStatus = 'paused'
    }
  }
}

export default mutations
