export const times = n => Object.keys([...Array(n)]).map(v => parseInt(v))

export const camelCaseToHuman = string =>
  string.replace(/([A-Z]+)/g, ' $1').replace(/^\w/, c => c.toUpperCase())
