import WarningLabel from '.'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('WarningLabel', () => {
  const defaultProps = { name: 'Flammable' }
  const getWarningLabelWrapper = getWrapper(WarningLabel, defaultProps)

  it('renders an SVG if name is correct', () => {
    const wrapper = getWarningLabelWrapper()
    expect(wrapper.find('svg').length).toEqual(1)
  })

  everyComponentTestSuite(getWarningLabelWrapper, WarningLabel, 'WarningLabel')
})
