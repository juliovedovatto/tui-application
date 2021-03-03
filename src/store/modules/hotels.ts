import { HotelOfferStateStorableItem, HotelOfffersStateStorable, HotelOfffersStateStorableItem, HotelStorableStateItem, RootStateStorable } from '@typings/store'
import { merge, sum } from 'lodash-es'

import { Hotels } from '@/core/api'
import { Module } from 'vuex'

function buildHotelData(hotel: PlainObject): HotelStorableStateItem {
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
  const [ mediaItem ] = media || []

  return {
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
  }
}

export default {
  namespaced: true,
  state: {
    items: {},
    offer: null,
    loading: false
  },
  getters: {
    items({ items }) {
      return items
    },
    offer({ offer }) {
      return offer
    },
    loading({ loading }) {
      return loading
    }
  },
  actions: {
    toggleLoading({ commit }) {
      commit('toggleLoading')
    },
    async list({ commit }, payload: PlainObject)  {
      commit('toggleLoading')
      const { cityCode, sort } = payload
      const data = await Hotels.listCity(cityCode, sort)

      data.forEach(item => commit('set', item))
      commit('toggleLoading')
    },
    async offer({ commit }, payload: string) {
      commit('toggleLoading')
      const data = await Hotels.getOffer(payload)
      const { hotel, offers: [offer] } = data

      const { category, checkInDate, checkOutDate, description: { text }, guests, policies, price } = offer
      const { guarantee: { acceptedPayments: { methods } } } = policies
      const { currency, base, taxes: [, ...taxes ] } = price

      const offerData: HotelOfferStateStorableItem = {
        hotel: buildHotelData(hotel),
        category,
        checkInDate,
        checkOutDate,
        description: text,
        guests: sum(Object.values<number>(guests)),
        acceptedPayments: methods,
        price: {
          currency,
          base: Number(base),
          taxes: (taxes as PlainObject[]).map(({ amount, code, included }) => ({
            type: code,
            amount: Number(amount),
            included
          }))
        }
      }

      commit('setOffer', offerData)
      commit('toggleLoading')
    },
    clear({ commit }) {
      commit('clear')
    },
    clearOffer({ commit }) {
      commit('clearOffer')
    }
  },
  mutations: {
    toggleLoading(state) {
      state.loading = !state.loading
    },
    set(state, payload: PlainObject) {
      const { hotel, offers } = payload

      const hotelData = buildHotelData(hotel)
      const normalizedOffers = offers.map((offer: PlainObject) => {
        const { id, guests, price, room } = offer

        return {
          id,
          description: room.description?.text || '',
          guests: sum(Object.values<number>(guests)),
          price: `${price.total} ${price.currency}`
        }
      })

      const item: HotelOfffersStateStorableItem = {
        ...hotelData,
        offers: normalizedOffers
      }

      state.items = merge(state.items, { [item.hotelId]: item })
    },
    setOffer(state, payload: HotelOfferStateStorableItem) {
      state.offer = payload
    },
    remove(state, payload) {
      delete state.items[payload]
    },
    clear(state) {
      state.items = {}
      state.offer = null
    },
    clearOffer(state) {
      state.offer = null
    }
  }
} as Module<HotelOfffersStateStorable, RootStateStorable>
