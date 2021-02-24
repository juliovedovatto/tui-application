const request = import.meta.globEager('./request/**/*.ts')
const response = import.meta.globEager('./response/**/*.ts')

const interceptors = {
  request: Object.keys(request)
    .sort()
    .map(k => request[k].default),
  response: Object.keys(response)
    .sort()
    .map(k => response[k].default)
}

export default interceptors
