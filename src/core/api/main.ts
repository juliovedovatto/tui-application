import axios, { AxiosInstance } from 'axios'

// import { getAPIHost } from '@/core/helpers/env'
import interceptors from './interceptors'
import { objToParams } from '@/core/helpers/url.ts'

export default class API {
  protected request: AxiosInstance

  constructor() {
    this.request = axios.create({
      // baseURL: getAPIHost(),
      paramsSerializer: params => objToParams(params)
    })

    interceptors?.request?.forEach(i => this.request.interceptors.request.use(...i))
    interceptors?.response?.forEach(i => this.request.interceptors.response.use(...i))
  }
}
