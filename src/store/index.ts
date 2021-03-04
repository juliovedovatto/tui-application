import { Store, useStore as baseUseStore, createStore } from 'vuex'

import { InjectionKey } from 'vue'
import { RootStateStorable } from '@typings/store'
import actions from './actions'
import getters from './getters'
import modules from './modules'
import mutations from './mutations'

export const key: InjectionKey<Store<RootStateStorable>> = Symbol()

export function useStore(): Store<RootStateStorable> {
  return baseUseStore(key)
}

export default createStore<RootStateStorable>({
  state() {
    return {
      country: '',
      city: ''
    }
  },
  getters,
  mutations,
  actions,
  modules
})
