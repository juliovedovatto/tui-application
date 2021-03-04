import { MutationTree } from "vuex";
import { RootStateStorable } from "@typings/store";

export default {
  setCountry(state, payload) {
    state.country = payload
  },
  setCity(state, payload) {
    state.city = payload
  }
} as MutationTree<RootStateStorable>
