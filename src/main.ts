import 'windi.css'

import store, { key } from './store'

import App from './App.vue'
import { createApp } from 'vue'
import router from './router'

createApp(App)
  .use(router)
  .use(store, key)
  .mount("#app")
