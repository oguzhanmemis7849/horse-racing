import { describe, it, expect, vi, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createStore, Store } from 'vuex'
import HomeView from '@/views/HomeView.vue'
import DataTable from '@/components/TableComponent.vue'
import RaceTrackComponent from '@/components/RaceTrackComponent.vue'
import type { State } from '@/types/state'
import { HORSES } from '@/constants/horses'
import { TOTAL_ROUND, RACE_LENGTH_LIST } from '@/constants/race'
import type { RoundNumber, RaceLenght, RaceStatus } from '@/types/models'

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
    randomHorses: vi.fn(),
    roundResults: vi.fn(),
    round: vi.fn()
  }

  getters = {
    randomHorses: () => HORSES,
    roundResults: () => vi.fn().mockReturnValue([]),
    round: () => vi.fn().mockReturnValue(state.rounds[0])
  }

  store = createStore({
    state,
    actions,
    getters
  })
})

describe('HomeView', () => {
  it('renders horse list table correctly', () => {
    const wrapper = shallowMount(HomeView, {
      global: {
        plugins: [store]
      }
    })

    const dataTable = wrapper.findComponent(DataTable)
    expect(dataTable.exists()).toBe(true)
    expect(dataTable.props('list')).toEqual(HORSES)
  })

  it('renders race track component', () => {
    const wrapper = shallowMount(HomeView, {
      global: {
        plugins: [store]
      }
    })

    const raceTrackComponent = wrapper.findComponent(RaceTrackComponent)
    expect(raceTrackComponent.exists()).toBe(true)
  })

  it('renders program tables correctly', () => {
    const wrapper = shallowMount(HomeView, {
      global: {
        plugins: [store]
      }
    })

    const programTables = wrapper
      .findAllComponents(DataTable)
      .filter((dt) => dt.props('titleBackgroundColor') === '#3d8bf5')
    expect(programTables.length).toBe(TOTAL_ROUND)
  })

  it('renders result tables correctly', () => {
    const wrapper = shallowMount(HomeView, {
      global: {
        plugins: [store]
      }
    })

    const resultTables = wrapper
      .findAllComponents(DataTable)
      .filter((dt) => dt.props('titleBackgroundColor') === '#93d36c')
    expect(resultTables.length).toBe(TOTAL_ROUND)
  })

  it('computes table subtitles correctly', () => {
    const wrapper = shallowMount(HomeView, {
      global: {
        plugins: [store]
      }
    })

    const instance = wrapper.vm as unknown as { tableSubTitle: (round: RoundNumber) => string }
    const subtitle = instance.tableSubTitle(1 as RoundNumber)
    expect(subtitle).toBe('1.st Lap - 1200m')
  })
})
