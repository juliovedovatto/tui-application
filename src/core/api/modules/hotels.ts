import { HOTEL_API_KEY, HOTEL_API_SECRET, LOCALE } from '@/core/config'

import API from '../main'
import { objToParams } from '@/core/helpers/url'

/**
 * Hotel API Class. Using Amadeus API
 * @note Amadeus Node SDK is not fully compatible with browsers, there was a need to make more direct calls, relying on axios package
 */
export class Hotels extends API {
  private accessToken: Maybe<string> = null

  readonly BLACKLIST = ['/v1/security/oauth2/token']

  constructor() {
    super()

    this.setup()
  }

  async setup(): Promise<void> {
    const self = this

    this.request.defaults.baseURL = 'https://test.api.amadeus.com/'
    this.request.interceptors.request.use(config => {
      config.headers = {
        ...config.headers,
        ...(this.accessToken && { Authorization: `Bearer ${this.accessToken}` })
      }

      return config
    })
    this.request.interceptors.response.use(
      response => response,
      async function (err) {
        const { status = null } = err?.response || {}

        if (status === 401) {
          const { config } = err
          const { __isRetryRequest, url } = config

          if (!self.BLACKLIST.includes(url)) {
            if (!__isRetryRequest) {
              await self.auth()
              return setTimeout(() => self.request({ ...config, __isRetryRequest: true }), 300)
            }
          }
        }

        return Promise.reject(err)
      }
    )
  }

  async preflight(): Promise<void> {
    if (!this.accessToken) {
      await this.auth()
    }
  }

  async auth(): Promise<void> {
    this.accessToken = null

    const { data: { access_token } } = await this.request.post('v1/security/oauth2/token', objToParams({
      grant_type: 'client_credentials',
      client_id: HOTEL_API_KEY,
      client_secret: HOTEL_API_SECRET
    }))

    this.accessToken = access_token
  }

  async listCity(cityCode: string, sort: string): Promise<PlainObject[]> {
    await this.preflight();

    const { data: { data } } = await this.request.get(
      'v2/shopping/hotel-offers',
      {
        params: {
          cityCode,
          sort,
          lang: LOCALE
        }
      }
    )

    return data
  }

  async getOffer(offerId: string): Promise<PlainObject> {
    await this.preflight();

    const { data: { data } } = await this.request.get(`v2/shopping/hotel-offers/${offerId}`, { params: { lang: LOCALE } })

    return data
  }
}

export default new Hotels()
