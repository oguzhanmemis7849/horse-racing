import type { ActionContext, ActionTree } from 'vuex'
import type { State } from '@/types/state'
import type { HorseModel, RoundNumber } from '@/types/models'
import { TOTAL_ROUND, PROGRESS_QUANTIFIER } from '@/constants/race'

let raceInterval: NodeJS.Timeout | null = null

const actions: ActionTree<State, State> = {
  // Used to set the list of horses
  setHorses({ commit }: ActionContext<State, State>, horses: HorseModel[]) {
    commit('setHorses', horses)
  },

  // Selects a horse for a particular tour
  selectHorseForRound(
    { commit }: ActionContext<State, State>,
    { roundNumber, horse }: { roundNumber: RoundNumber; horse: HorseModel }
  ) {
    commit('selectHorseForRound', { roundNumber, horse })
  },

  // It starts the race and updates the horses progress every 500 ms
  startRace({ commit, state, dispatch, getters }: ActionContext<State, State>) {
    if (state.raceStatus === 'running') return // Yarış zaten devam ediyorsa yeniden başlatmayın

    if (state.raceStatus === 'paused') {
      commit('resumeRace')
    } else {
      commit('startRace')
    }

    const startTime = Date.now()

    raceInterval = setInterval(() => {
      const currentRound = state.rounds.find(
        (round) => round.roundNumber === state.currentRoundNumber
      )
      if (!currentRound) return

      currentRound.horseList.forEach((horse) => {
        const horseData = state.horses.find((h) => h.id === horse.horseId)
        if (!horseData) return

        if (horse.distanceCoveredPercentage < 100) {
          const roundLength = getters.currentRoundRaceLength // Round length
          const progressPerTick = parseFloat(
            ((horseData.condition / PROGRESS_QUANTIFIER) * (1200 / roundLength)).toFixed(2)
          )
          const newDistanceCovered = Math.min(
            100,
            horse.distanceCoveredPercentage + progressPerTick
          )
          dispatch('updateHorseDistanceCovered', {
            roundNumber: state.currentRoundNumber,
            horseId: horse.horseId,
            distanceCoveredPercentage: newDistanceCovered
          })

          if (newDistanceCovered >= 100) {
            const finishTime = Date.now() - startTime
            commit('setHorseFinishTime', {
              roundNumber: state.currentRoundNumber,
              horseId: horse.horseId,
              finishTime
            })
          }
        }
      })

      const allHorsesFinished = currentRound.horseList.every(
        (horse) => horse.distanceCoveredPercentage >= 100
      )

      if (allHorsesFinished) {
        dispatch('calculateRoundResults', state.currentRoundNumber)

        if (state.currentRoundNumber >= TOTAL_ROUND) {
          if (raceInterval !== null) {
            clearInterval(raceInterval)
          }
          raceInterval = null
          commit('finishRace')
        } else {
          commit('nextRound')
        }
      }
    }, 500)
  },

  // Calculate the results of a round
  calculateRoundResults({ commit, state }: ActionContext<State, State>, roundNumber: RoundNumber) {
    const round = state.rounds.find((r) => r.roundNumber === roundNumber)
    if (round) {
      const sortedFinishTimes = [...round.finishTimes].sort((a, b) => a.finishTime - b.finishTime)
      const results = sortedFinishTimes.map((entry, index) => ({
        horseId: entry.horseId,
        position: index + 1
      }))
      commit('setRoundResults', { roundNumber, results })
    }
  },

  // It stop the race
  pauseRace({ commit }: ActionContext<State, State>) {
    if (raceInterval) {
      clearInterval(raceInterval)
      raceInterval = null
    }
    commit('pauseRace')
  },

  // It reset the race
  resetRace({ commit }: ActionContext<State, State>) {
    if (raceInterval) {
      clearInterval(raceInterval)
      raceInterval = null
    }
    commit('resetRace')
  },

  // Update the distance traveled for a specific horse
  updateHorseDistanceCovered(
    { commit }: ActionContext<State, State>,
    {
      roundNumber,
      horseId,
      distanceCoveredPercentage
    }: { roundNumber: RoundNumber; horseId: number; distanceCoveredPercentage: number }
  ) {
    commit('updateHorseDistanceCovered', { roundNumber, horseId, distanceCoveredPercentage })
  }
}

export default actions
