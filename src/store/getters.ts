import { GetterTree } from "vuex";
import { RootStateStorable } from "@typings/store";

export default {
  currentCountry({ country }) {
    return country
  },
  currentCity({ city }) {
    return city
  }
} as GetterTree<RootStateStorable, RootStateStorable>
