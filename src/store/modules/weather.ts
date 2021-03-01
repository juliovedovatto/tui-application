import { RootStateStorable, WeatherStateStorable } from '@typings/store'

import { Module } from 'vuex'
import { Weather } from '@/core/api'

export default {
  namespaced: true,
  state: {
    forecast: [],
    loading: false
  },
  getters: {
    forecast({ forecast }) {
      return forecast
    },
    loading({ loading }) {
      return loading
    }
  },
  actions: {
    toggleLoading({ commit }) {
      commit('toggleLoading')
    },
    async list({ commit }, payload: PlainObject) {
      commit('toggleLoading')
      const { city, days = 5 } = payload
      const data = await Weather.listCity(city, days);

      const { forecast: { forecastday } } = data

      const forecastData = forecastday.map((item: PlainObject) => {
        const { date, day: { condition } } = item
        const { icon, text } = condition

        return {
          date,
          icon,
          text
        }
      })

      commit('setForecast', forecastData)
      commit('toggleLoading')
    },
    clear({ commit }) {
      commit('clear')
    }
  },
  mutations: {
    toggleLoading(state) {
      state.loading = !state.loading
    },
    setForecast(state, payload) {
      state.forecast = payload
    },
    clear(state) {
      state.forecast = []
    }
  }
} as Module<WeatherStateStorable, RootStateStorable>
