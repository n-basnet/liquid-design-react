export const currencyFormatter = num =>
  `${`${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`
    .replace(/\.(\d\d)$/, ',$1')
    .replace(/\.00$/, '')} EUR`

export const thousandsFormatter = value =>
  value === 0 ? value : `${value / 1000}k`
