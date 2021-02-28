import Home from '@/views/Home.vue'
import { RouteRecordRaw } from 'vue-router'
import { isPlainObject } from 'lodash-es'

const modules = import.meta.globEager('./modules/**/*.ts')

const routes = Object.keys(modules).map(k => modules[k]?.default).filter(isPlainObject)

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  ...routes
] as RouteRecordRaw[]
