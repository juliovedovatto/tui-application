import 'windi.css'

import store, { key } from './store'

import App from './App.vue'
import { createApp } from 'vue'
import locales from './locales'
import router from './router'

createApp(App)
  .use(locales)
  .use(router)
  .use(store, key)
  .mount("#app")
