import type { MutationTree } from 'vuex'
import type { State } from '@/types/state'
import type { HorseModel } from '@/types/models'

import { MAX_SELECTABLE_HORSES_COUNT } from '@/constants/horses'

const mutations: MutationTree<State> = {
  selectHorse(state: State, horse: HorseModel) {
    if (
      state.selectedHorses.length < MAX_SELECTABLE_HORSES_COUNT &&
      !state.selectedHorses.find((h) => h.id === horse.id)
    ) {
      state.selectedHorses.push(horse)
    }
  },
  resetSelectedHorses(state: State) {
    state.selectedHorses = []
  }
}

export default mutations
