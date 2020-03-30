// IDEA: parameters may be adjusted by user input

export const API_ROOT = process.env.REACT_APP_API_ROOT

export const params = {
  // 'formatted': true, // not necessary
  north: '44.1',
  south: '-9.9',
  east: '-22.4',
  west: '55.2',
  username: 'mkoppelman'
}

export const get = async (url, params) => {
  // url += (url.includes('?') ? '' : '?')
  url += '?'
  Object.entries(params).map(([key, val]) => (url += `&${key}=${val}`))
  return fetch(url)
}
