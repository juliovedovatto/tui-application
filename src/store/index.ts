import actions from './actions'
import { createStore } from 'vuex'
import getters from './getters'
import modules from './modules'
import mutations from './mutations'

export default createStore({
  state() {
    return {}
  },
  getters,
  mutations,
  actions,
  modules
})
