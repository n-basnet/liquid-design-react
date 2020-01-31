import FlyOutContent from '.'
import { everyComponentTestSuite, getWrapper } from '../../../utils/testUtils'

describe('FlyOutContent', () => {
  const optionName = 'Option 1'
  const defaultProps = {
    name: 'Some name',
    options: [{ name: optionName }],
  }
  const getFlyOutContentWrapper = getWrapper(FlyOutContent, defaultProps)

  it('renders a name and options', () => {
    const wrapper = getFlyOutContentWrapper().find(FlyOutContent)
    expect(wrapper.html()).toMatch(defaultProps.name)
    expect(wrapper.html()).toMatch(optionName)
  })

  everyComponentTestSuite(
    getFlyOutContentWrapper,
    FlyOutContent,
    'FlyOutContent',
  )
})
