import type { MutationTree } from 'vuex'
import type { State } from '@/types/state'
import type { HorseModel, RoundNumber } from '@/types/models'
import { TOTAL_ROUND } from '@/constants/race'

const mutations: MutationTree<State> = {
  // Used to set the list of horses
  setHorses(state: State, horses: HorseModel[]) {
    state.horses = horses
  },

  // Select a horse for a specific round and adds it to horseList
  selectHorseForRound(
    state: State,
    { roundNumber, horse }: { roundNumber: RoundNumber; horse: HorseModel }
  ) {
    const round = state.rounds.find((r) => r.roundNumber === roundNumber)
    if (round) {
      round.horseList.push({ horseId: horse.id, distanceCoveredPercentage: 0 })
    }
  },

  // Resets all rounds, clears horseList, finishTimes and results
  resetRounds(state: State) {
    state.rounds.forEach((round) => {
      round.horseList = []
      round.finishTimes = []
      round.results = []
    })
  },

  // Update the distance traveled for a specific horse
  updateHorseDistanceCovered(
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
      }
    }
  },

  // Set the finish time for a specific horse
  setHorseFinishTime(
    state: State,
    {
      roundNumber,
      horseId,
      finishTime
    }: { roundNumber: RoundNumber; horseId: number; finishTime: number }
  ) {
    const round = state.rounds.find((r) => r.roundNumber === roundNumber)
    if (round) {
      round.finishTimes.push({ horseId, finishTime })
    }
  },

  // Set results for a specific round
  setRoundResults(
    state: State,
    {
      roundNumber,
      results
    }: { roundNumber: RoundNumber; results: { horseId: number; position: number }[] }
  ) {
    const round = state.rounds.find((r) => r.roundNumber === roundNumber)
    if (round) {
      round.results = results
    }
  },

  // Start the race, set the current round number to 1 and set the race status to running
  startRace(state: State) {
    state.currentRoundNumber = 1 as RoundNumber
    state.raceStatus = 'running'
  },

  // Continue the race from where it left off
  resumeRace(state: State) {
    state.raceStatus = 'running'
  },

  // Pause
  pauseRace(state: State) {
    state.raceStatus = 'paused'
  },

  // Finish
  finishRace(state: State) {
    state.raceStatus = 'finished'
  },

  // Reset the race, set the current round number to 1, set the race status to not_started, and reset all rounds
  resetRace(state: State) {
    state.currentRoundNumber = 1 as RoundNumber
    state.raceStatus = 'not_started'
    state.rounds.forEach((round) => {
      round.horseList = []
      round.finishTimes = []
      round.results = []
    })
  },

  // Increase the current round number. If it exceed the total number of rounds, it stop the race
  nextRound(state: State) {
    if (state.currentRoundNumber < TOTAL_ROUND) {
      state.currentRoundNumber = (state.currentRoundNumber + 1) as RoundNumber
    } else {
      state.raceStatus = 'paused'
    }
  }
}

export default mutations
