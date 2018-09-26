import { values, filter, flatten } from 'ramda'

import { THEMES } from './consts/themes'
import { getFirstTruthyKeyName } from '~/utils/aux'

describe('consts', () => {
  it('all colors have a base value', () => {
    const invalidColors = values(THEMES).map(theme =>
      Object.keys(filter(color => !color.base, theme.colors))
    )

    expect(flatten(invalidColors)).toEqual([])
  })
})

it('getFirstTruthyKeyName', () => {
  const trueType = 'isSquare'
  const props = { [trueType]: true, isRectangular: null, someProp: 42 }
  expect(getFirstTruthyKeyName(props)).toEqual(trueType)
})
