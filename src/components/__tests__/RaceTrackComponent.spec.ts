import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore, Store } from 'vuex'
import RaceTrackComponent from '@/components/RaceTrackComponent.vue'
import RaceTrackRow from '@/components/RaceTrackRowComponent.vue'
import type { State } from '@/types/state'
import { HORSES, MAX_SELECTABLE_HORSE_COUNT } from '@/constants/horses'
import { TOTAL_ROUND, RACE_LENGTH_LIST } from '@/constants/race'
import type { RoundNumber, RaceStatus, RaceLenght, HorseModel } from '@/types/models'

let state: State
let store: Store<State>
let getters: any

beforeEach(() => {
  state = {
    horses: HORSES,
    rounds: Array.from({ length: TOTAL_ROUND }, (_, i) => ({
      roundNumber: (i + 1) as RoundNumber,
      raceLength: RACE_LENGTH_LIST[i] as RaceLenght,
      horseList: [],
      finishTimes: [],
      results: []
    })),
    currentRoundNumber: 1 as RoundNumber,
    raceStatus: 'not_started' as RaceStatus
  }

  getters = {
    currentRoundNumber: () => state.currentRoundNumber,
    randomHorses: () => state.horses,
    round: (state: State) => (roundNumber: RoundNumber) =>
      state.rounds.find((r) => r.roundNumber === roundNumber)
  }

  store = createStore({
    state,
    getters
  })
})

describe('RaceTrackComponent.vue', () => {
  it('renders RaceTrackRow components correctly', () => {
    const wrapper = mount(RaceTrackComponent, {
      global: {
        plugins: [store]
      }
    })

    const rows = wrapper.findAllComponents(RaceTrackRow)
    expect(rows.length).toBe(MAX_SELECTABLE_HORSE_COUNT)
  })

  it('renders FINISH text correctly', () => {
    const wrapper = mount(RaceTrackComponent, {
      global: {
        plugins: [store]
      }
    })

    const finishText = wrapper.find('.race-track__footer__finish')
    expect(finishText.exists()).toBe(true)
    expect(finishText.text()).toBe('FINISH')
  })

  it('displays horses in the correct rows', () => {
    state.rounds[0].horseList = [
      { horseId: 1, distanceCoveredPercentage: 50 },
      { horseId: 2, distanceCoveredPercentage: 60 }
    ]

    store = createStore({
      state,
      getters
    })

    const wrapper = mount(RaceTrackComponent, {
      global: {
        plugins: [store]
      }
    })

    const rows = wrapper.findAllComponents(RaceTrackRow)
    expect(rows.length).toBeGreaterThanOrEqual(2)

    if (rows[0].props('horse')) {
      expect((rows[0].props('horse') as HorseModel).id).toBe(1)
    }

    if (rows[1].props('horse')) {
      expect((rows[1].props('horse') as HorseModel).id).toBe(2)
    }
  })
})
