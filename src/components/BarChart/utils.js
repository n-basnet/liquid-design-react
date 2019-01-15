import uniqid from 'uniqid'
import { find, pluck, head, prop, uniqBy } from 'ramda'

import { DEFAULT_COLORS } from '~/components/BarChart/consts'
import { times, getElementModular } from '~/utils/misc'
import { SCREEN_SIZES } from '~/utils/styling'

const getLabels = data =>
  data
    .reduce((labels, { values }) => {
      const valuesLabels = pluck('label', values)
      return uniqBy(prop('name'), [...labels, ...valuesLabels])
    }, [])
    .map((label, i) => ({
      id: `l-${uniqid()}`,
      color: getElementModular(i, DEFAULT_COLORS),
      ...label,
    }))

const getLargestValue = data => {
  const allValues = pluck('values', data).map(pluck('value'))
  return head(allValues.reduce((a, b) => [...a, ...b], []).sort((a, b) => b - a))
}

const findByName = (name, array) => find(element => element.name === name, array)

const roundToThousands = num => Math.round(num / 1000) * 1000
export const getTicks = (data, offset = 0, amount = 6) => {
  if (data.length === 0) {
    return []
  }
  const maximum = (100 * getLargestValue(data)) / (100 - offset)
  const tickValue = roundToThousands(maximum / amount)
  return times(amount + 1).map(i => i * tickValue)
}

export const recomputeData = data => {
  const largestValue = getLargestValue(data)
  const labels = getLabels(data)

  return {
    data: data.map((point, i) => ({
      ...point,
      id: `p-${uniqid()}`,
      values: point.values.map(value => ({
        id: `v-${uniqid()}`,
        valueAsPercentage: (value.value * 100) / largestValue,
        ...value,
        label: findByName(value.label.name, labels),
      })),
    })),
    labels,
  }
}

export const isMobile = () => window.innerWidth <= SCREEN_SIZES.phone
