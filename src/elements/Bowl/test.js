import Bowl from '.'
import { getWrapper, everyComponentTestSuite } from '../../utils/testUtils'
import { Glyph } from '../../elements/Icon'

describe('Bowl', () => {
  const getBowlWrapper = getWrapper(Bowl)

  it('renders a glyph if percentage is 0', () => {
    expect(getBowlWrapper({ percent: 0 }).find(Glyph).length).toEqual(1)
    expect(getBowlWrapper({ percent: 10 }).find(Glyph).length).toEqual(0)
  })

  everyComponentTestSuite(getBowlWrapper, Bowl, 'Bowl')
})
