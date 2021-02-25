import { environment } from '@/core/helpers/env'
import { version } from '../../../package.json'

const {
  NODE_ENV,
  MODE,
  VUE_APP_BASE_URL,
  VUE_APP_WEATHER_API_KEY,
  VUE_APP_HOTEL_API_KEY,
  VUE_APP_HOTEL_API_SECRET
} = environment()

const ENVIRONMENT = NODE_ENV || MODE
const APP_VERSION = version || '0.0.0'
const BASE_URL = VUE_APP_BASE_URL || '/'

const WEATHER_API_KEY = VUE_APP_WEATHER_API_KEY || ''
const HOTEL_API_KEY = VUE_APP_HOTEL_API_KEY || ''
const HOTEL_API_SECRET = VUE_APP_HOTEL_API_SECRET || ''

export {
  APP_VERSION,
  BASE_URL,
  ENVIRONMENT,
  WEATHER_API_KEY,
  HOTEL_API_KEY,
  HOTEL_API_SECRET
}
