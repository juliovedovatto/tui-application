const before = import.meta.globEager('./before/**/*.ts')
const after = import.meta.globEager('./after/**/*.ts')
const resolve = import.meta.globEager('./resolve/**/*.ts')

export default {
  before: Object.keys(before).sort().map(k => before[k].default),
  after: Object.keys(before).sort().map(k => after[k].default),
  resolve: Object.keys(before).sort().map(k => resolve[k].default),
}
