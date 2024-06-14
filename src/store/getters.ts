import type { GetterTree } from 'vuex'
import type { State } from '@/types/state'
import type { HorseModel } from '@/types/models'

const getters: GetterTree<State, State> = {
  randomHorse(state: State): HorseModel | undefined {
    const randomIndex = Math.floor(Math.random() * state.horses.length)
    return state.horses[randomIndex]
  },
  selectedHorses(state: State): HorseModel[] {
    return state.selectedHorses
  }
}

export default getters
