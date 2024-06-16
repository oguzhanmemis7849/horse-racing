import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceTrackRow from '@/components/RaceTrackRowComponent.vue'
import HorseComponent from '@/components/HorseComponent.vue'
import { createStore, Store } from 'vuex'
import type { State } from '@/types/state'

let store: Store<State>

beforeEach(() => {
  store = createStore({
    getters: {
      raceStatus: () => 'running'
    }
  })
})

describe('RaceTrackRow', () => {
  it('renders row number correctly', () => {
    const wrapper = mount(RaceTrackRow, {
      props: {
        rowNumber: 1
      },
      global: {
        plugins: [store]
      }
    })
    const numberBox = wrapper.find('.race-track-row__number-box__number')
    expect(numberBox.text()).toBe('1')
  })

  it('renders horse correctly when provided', () => {
    const horse = {
      id: 1,
      name: 'Thunder',
      condition: 90,
      colorName: 'Red',
      color: '#FF0000',
      distanceCoveredPercentage: 50
    }

    const wrapper = mount(RaceTrackRow, {
      props: {
        rowNumber: 1,
        horse: horse
      },
      global: {
        plugins: [store]
      }
    })

    const horseComponent = wrapper.findComponent(HorseComponent)
    expect(horseComponent.exists()).toBe(true)
    expect(horseComponent.props('color')).toBe('#FF0000')
  })

  it('positions the horse correctly based on distanceCoveredPercentage', () => {
    const horse = {
      id: 1,
      name: 'Thunder',
      condition: 90,
      colorName: 'Red',
      color: '#FF0000',
      distanceCoveredPercentage: 50
    }

    const wrapper = mount(RaceTrackRow, {
      props: {
        rowNumber: 1,
        horse: horse
      },
      global: {
        plugins: [store]
      }
    })

    const horseElement = wrapper.find('.race-track-row__track__horse')
    expect(horseElement.attributes('style')).toContain('left: calc(50% - 2rem)')
  })
})
