import Headline from '.'
import { XH1 } from './H'
import { everyComponentTestSuite, getWrapper } from '../../utils/testUtils'

describe('Headline', () => {
  const defaultProps = {
    children: 'Headline',
    type: 'XH1',
  }

  const getHeadlineWrapper = getWrapper(Headline, defaultProps)

  it('renders the children', () => {
    expect(
      getHeadlineWrapper()
        .find(XH1)
        .text(),
    ).toEqual(defaultProps.children)
  })

  everyComponentTestSuite(getHeadlineWrapper, Headline, 'Headline')
})
