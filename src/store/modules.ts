import { ModuleTree } from 'vuex'
import { RootStateStorable } from 'typings/store'

const moduleFiles = import.meta.globEager('./modules/**/*.ts')
const moduleNames = Object.keys(moduleFiles).map(k => k.replace(/^\.\/(.+)\.js$/, '$1'))
const modules = Object.keys(moduleFiles).map(k => moduleFiles[k].default)

export default moduleNames.reduce((result: PlainObject, current, index) => {
  return (result[current] = modules[index]), result
}, {}) as ModuleTree<RootStateStorable>
