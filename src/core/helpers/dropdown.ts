export function generateOptions(obj: PlainObject): PlainObject[]  {
  return Object.entries(obj).map(([value,label]) => ({ value, label }))
}
