import objectKeys from 'object-keys'

const keys = Object.keys || objectKeys

export const times = n => keys([...Array(n)]).map(v => parseInt(v))
