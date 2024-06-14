import type { ActionContext, ActionTree } from 'vuex'
import type { State } from '@/types/state'
import type { HorseModel } from '@/types/models'

const actions: ActionTree<State, State> = {
  selectRandomHorse({ commit, state }: ActionContext<State, State>) {
    const randomIndex = Math.floor(Math.random() * state.horses.length)
    const selectedHorse = state.horses[randomIndex]
    commit('selectHorse', selectedHorse)
  },
  selectHorse({ commit }: ActionContext<State, State>, horse: HorseModel) {
    commit('selectHorse', horse)
  },
  resetSelectedHorses({ commit }: ActionContext<State, State>) {
    commit('resetSelectedHorses')
  }
}

export default actions
