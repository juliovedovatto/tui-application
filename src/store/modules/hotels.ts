import { HotelOfffersStateStorable, HotelOfffersStateStorableItem, RootStateStorable } from '@typings/store'
import { merge, sum } from 'lodash-es'

import { Hotels } from '@/core/api'
import { Module } from 'vuex'

export default {
  namespaced: true,
  state: {
    items: {}
  },
  getters: {
    items({ items }) {
      return items
    }
  },
  actions: {
    async list({ commit }, payload: string)  {
      const data = await Hotels.listCity(payload)

      data.forEach(item => commit('set', item))
    },
    clear({ commit }) {
      commit('clear')
    }
  },
  mutations: {
    set(state, payload: PlainObject) {
      const { hotel, offers } = payload
      const {
        hotelId,
        description,
        name,
        cityCode,
        amenities,
        media,
        contact,
        latitude,
        longitude
      } = hotel

      const normalizedOffers = offers.map((offer: PlainObject) => {
        const { id, guests, price, room } = offer

        return {
          id,
          description: room.description?.text || '',
          guests: sum(Object.values<number>(guests)),
          price: `${price.total} ${price.currency}`
        }
      })

      const [ mediaItem ] = media || []

      const item: HotelOfffersStateStorableItem = {
        hotelId,
        name,
        description: description?.text || '',
        cityCode,
        latitude,
        longitude,
        address: '', // TODO: retrieve hotel address
        contact: contact?.phone || '',
        amenities,
        media: mediaItem?.uri || '',
        offers: normalizedOffers
      }

      state.items = merge(state.items, { [item.hotelId]: item })
    },
    remove(state, payload) {
      delete state.items[payload]
    },
    clear(state) {
      state.items = {}
    }
  }
} as Module<HotelOfffersStateStorable, RootStateStorable>
