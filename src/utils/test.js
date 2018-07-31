import { values, filter, flatten } from 'ramda'

import { THEMES } from './consts/themes'

describe('consts', () => {
  it('all colors have a base value', () => {
    const invalidColors = values(THEMES).map(theme =>
      Object.keys(filter(color => !color.base, theme.colors))
    )

    expect(flatten(invalidColors)).toEqual([])
  })
})
