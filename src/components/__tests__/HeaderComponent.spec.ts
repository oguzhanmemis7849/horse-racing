import { mount, shallowMount } from '@vue/test-utils'
import { createStore, Store } from 'vuex'
import HeaderComponent from '@/components/HeaderComponent.vue'
import type { State } from '@/types/state'
import { HORSES } from '@/constants/horses'
import { TOTAL_ROUND, RACE_LENGTH_LIST } from '@/constants/race'
import type { RoundNumber, RaceStatus, RaceLenght } from '@/types/models'
import { describe, it, expect, vi, beforeEach } from 'vitest'

let state: State
let store: Store<State>
let actions: any
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

  actions = {
    resetRace: vi.fn().mockResolvedValue(undefined),
    selectHorseForRound: vi.fn(),
    startRace: vi.fn(),
    pauseRace: vi.fn()
  }

  getters = {
    raceStatus: (state: State) => state.raceStatus,
    allRoundsHaveHorses: () => true
  }

  store = createStore({
    state,
    actions,
    getters
  })
})

describe('HeaderComponent.vue', () => {
  it('renders header content correctly', () => {
    const wrapper = shallowMount(HeaderComponent, {
      global: {
        plugins: [store]
      }
    })
    expect(wrapper.find('h2').text()).toBe('Horse Racing')
  })

  it('calls handleClickGenerateProgram when Generate Program button is clicked', async () => {
    const wrapper = mount(HeaderComponent, {
      global: {
        plugins: [store]
      }
    })
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(actions.resetRace).toHaveBeenCalled()
  })

  it('disables Start button if allRoundsHaveHorses getter is false', () => {
    getters.allRoundsHaveHorses = () => false
    store = createStore({
      state,
      actions,
      getters
    })
    const wrapper = mount(HeaderComponent, {
      global: {
        plugins: [store]
      }
    })
    const startButton = wrapper.findAll('button')[1]
    expect(startButton.attributes('disabled')).toBe('')
  })

  it('calls handleClickStart when Start button is clicked', async () => {
    const wrapper = mount(HeaderComponent, {
      global: {
        plugins: [store]
      }
    })
    const button = wrapper.findAll('button')[1]
    await button.trigger('click')
    expect(actions.startRace).toHaveBeenCalled()
  })

  it('calls handleClickPause when Pause button is clicked', async () => {
    getters.raceStatus = () => 'running'
    store = createStore({
      state,
      actions,
      getters
    })
    const wrapper = mount(HeaderComponent, {
      global: {
        plugins: [store]
      }
    })
    const button = wrapper.findAll('button')[1]
    await button.trigger('click')
    expect(actions.pauseRace).toHaveBeenCalled()
  })
})
