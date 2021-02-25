import { merge } from 'lodash-es'

export function environment(): PlainObject {
  return merge({}, process.env, import.meta.env)
}
