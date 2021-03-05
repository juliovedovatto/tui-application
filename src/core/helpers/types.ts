/**
 * Returns Keys of an Enum Object
 * @param {Object} Enum type
 * @returns {Array}
 */
export function enumKeys(obj: PlainObject): string[] {
  return Object.keys(obj).filter(k => (Number(k).toString() === Number.NaN.toString()))
}

/**
 * Check if valuda is falsy
 * @param {*} value
 * @param {boolean} [excludeZero=false] exclude Number "0" from checking (since 0 is consideredy falsy in JS)
 * @returns {boolean}
 */
export function isFalsy(value: unknown, excludeZero = false): boolean {
  return excludeZero ? !value && value !== 0 : !value
}
