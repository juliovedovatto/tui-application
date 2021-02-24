/** @module core/helpers/url */

import { parse, stringify } from 'qs'

/**
 * Convert object to a query string.
 * Example: { foo: 'bar' } => 'foo=bar'
 * @param {PlainObject} obj
 * @return {string} The query string representation of the object
 */
export function objToParams(obj: PlainObject): string  {
  return stringify(obj)
}

/**
 * Convert a query string to object.
 * Example: 'foo=bar' => { foo: 'bar' }
 * @param {string} params
 * @return {PlainObject} the object representation of the query string
 */
export function paramsToObj(params: string): PlainObject {
  return parse(params)
}
