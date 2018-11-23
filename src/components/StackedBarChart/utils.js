import { head, uniq, find, sort, sum, prop } from 'ramda'
import uniqid from 'uniqid'

import { DEFAULT_COLORS } from '~/components/StackedBarChart/consts'
import { getElementModular } from '~/utils/aux'

export const sumValues = data => sum(data.map(prop('value')))

export const normaliseValues = data => {
  if (data.length === 0) {
    return data
  }
  const total = sumValues(data)
  const sorted = sort((a, b) => b.value - a.value, data)
  // if total and value would be 0, percentValue would be NaN, because 0/0 === NaN
  // so if total is 0, the percentValue is 0
  return sorted.map(v => ({ ...v, percentValue: (v.value * 100) / total || 0 }))
}

const findLabel = (pointLabel, labels) => find(({ name }) => name === pointLabel.name, labels)
export const normaliseData = (data, labels) => {
  const dataWithSums = data.map(point => ({ sum: sumValues(point.values), ...point }))
  const highestSum = head(sort((a, b) => b.sum - a.sum, dataWithSums)).sum
  return dataWithSums.map(point => ({
    percentageHeight: Math.round((point.sum * 100) / highestSum),
    id: uniqid(),
    ...point,
    values: point.values.map(value => ({
      ...value,
      id: `point-${uniqid()}`,
      label: findLabel(value.label, labels),
    })),
  }))
}

export const getLabels = data =>
  uniq(
    data.reduce((acc, { values, id }) => {
      acc.push(...values.map(prop('label')))
      return acc
    }, [])
  ).map((label, i) => ({
    id: uniqid(),
    color: getElementModular(i, DEFAULT_COLORS),
    ...label,
  }))

export const sumHeights = (acc, val) => acc + val.height
export const sortByLabels = (a, b) => {
  if (a.label.name < b.label.name) {
    return -1
  }
  if (a.label.name > b.label.name) {
    return 1
  }
  return 0
}
