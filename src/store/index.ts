import type { State } from '@/types/state'

import { createStore } from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default createStore<State>({
  state,
  actions,
  mutations,
  getters
})
