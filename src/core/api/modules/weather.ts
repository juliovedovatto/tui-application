import API from '../main'
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

    this.request.defaults.baseURL = 'http://api.weatherapi.com/v1'
    this.request.defaults.params = { ...this.request.defaults.params, key: WEATHER_API_KEY }
  }

  async listCity(city: string, days: number): Promise<PlainObject> {
    const { data } = await this.request.get<PlainObject>('/forecast.json', { params: { q: city, days } })

    return data
  }
}

export default new Weather()
