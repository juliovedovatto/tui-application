import API from '../main'
import { APIResponse } from 'typings/api'
import { WEATHER_API_KEY } from '@/core/config'

export enum COUNTRY_CODES {
  PT,
  BR,
  ES,
  IT
}

export class Weather extends API {
  constructor() {
    super()

    this.request.defaults.baseURL = 'https://api.openweathermap.org/data/2.5'
    this.request.defaults.params = { ...this.request.defaults.params, appid: WEATHER_API_KEY }
  }

  async fetchCity(city: string, countryCode: Maybe<COUNTRY_CODES>): APIResponse {
    const q = `${city}${countryCode ? `,${countryCode}` : ''}`

    const { data } = await this.request.get('/weather', { params: { q } })

    return data
  }
}

export default new Weather()
