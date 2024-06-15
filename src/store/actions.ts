import type { ActionContext, ActionTree } from 'vuex'
import type { State } from '@/types/state'
import type { HorseModel, RoundNumber } from '@/types/models'
import { MAX_SELECTABLE_HORSE_COUNT } from '@/constants/horses'
import { MIN_POSITION, MAX_POSITION, TOTAL_ROUND, PROGRESS_QUANTIFIER } from '@/constants/race'

let raceInterval: NodeJS.Timeout | null = null

const actions: ActionTree<State, State> = {
  selectHorse({ commit }: ActionContext<State, State>, horse: HorseModel) {
    commit('selectHorse', horse)
  },
  resetSelectedHorses({ commit }: ActionContext<State, State>) {
    commit('resetSelectedHorses')
  },
  startRace({ commit, state, dispatch, getters }) {
    if (state.raceStatus === 'running') return // Yarış zaten devam ediyorsa yeniden başlatmayın

    if (state.raceStatus === 'paused') {
      commit('resumeRace')
    } else {
      commit('startRace')
    }

    raceInterval = setInterval(() => {
      state.selectedHorses.forEach((horse) => {
        const currentRound = state.rounds.find(
          (round) => round.roundNumber === state.currentRoundNumber
        )
        if (!currentRound) return

        const horsePosition = currentRound.horseList.find((element) => element.horseId === horse.id)
        if (!horsePosition) return

        if (horsePosition.distanceCoveredPercentage < 100) {
          const roundLength = getters.currentRoundRaceLength // Round length
          const progressPerTick = parseFloat(
            ((horse.condition / PROGRESS_QUANTIFIER) * (1200 / roundLength)).toFixed(2)
          )
          const newDistanceCovered = Math.min(
            100,
            horsePosition.distanceCoveredPercentage + progressPerTick
          )
          dispatch('updateHorseDistanceCovered', {
            horseId: horse.id,
            distanceCoveredPercentage: newDistanceCovered
          })

          dispatch('updateRound', {
            roundNumber: state.currentRoundNumber,
            horseId: horse.id,
            distanceCoveredPercentage: newDistanceCovered
          })
        }
      })

      const allHorsesFinished = state.selectedHorses.every((horse) => {
        const currentRound = state.rounds.find(
          (round) => round.roundNumber === state.currentRoundNumber
        )
        if (!currentRound) return false

        const horsePosition = currentRound.horseList.find((element) => element.horseId === horse.id)
        return horsePosition && horsePosition.distanceCoveredPercentage >= 100
      })

      if (allHorsesFinished) {
        commit('nextRound')
        if (state.currentRoundNumber > TOTAL_ROUND) {
          clearInterval(raceInterval!)
          raceInterval = null
          commit('pauseRace')
        }
      }
    }, 500)
  },
  pauseRace({ commit }) {
    if (raceInterval) {
      clearInterval(raceInterval)
      raceInterval = null
    }
    commit('pauseRace')
  },
  resetRace({ commit }) {
    if (raceInterval) {
      clearInterval(raceInterval)
      raceInterval = null
    }
    commit('resetRace')
  },
  updateHorseDistanceCovered(
    { commit, getters },
    { horseId, distanceCoveredPercentage }: { horseId: number; distanceCoveredPercentage: number }
  ) {
    const currentRoundRaceLength = getters.currentRoundRaceLength

    if (distanceCoveredPercentage <= currentRoundRaceLength) {
      commit('updateHorseDistanceCovered', { horseId, distanceCoveredPercentage })
    }
  },
  updateRound(
    { commit, getters },
    {
      roundNumber,
      horseId,
      distanceCoveredPercentage
    }: { roundNumber: RoundNumber; horseId: number; distanceCoveredPercentage: number }
  ) {
    const currentRoundRaceLength = getters.currentRoundRaceLength
    if (distanceCoveredPercentage <= currentRoundRaceLength) {
      commit('updateRound', { roundNumber, horseId, distanceCoveredPercentage })
    }
  },
  nextRound({ commit }) {
    commit('nextRound')
  }
}

export default actions
