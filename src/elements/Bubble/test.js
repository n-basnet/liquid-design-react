import Bubble, { Label } from '.'
import Icon from '~/elements/Icon'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('Bubble', () => {
  const getBubbleWrapper = getWrapper(Bubble)

  it('renders the label', () => {
    const label = 1
    const wrapper = getBubbleWrapper({ label })
    expect(
      wrapper
        .find(Label)
        .children()
        .text()
    ).toEqual(label.toString())
  })

  it('displays number 99 in the label if the number passed as label prop has more than two digits', () => {
    const label = 101
    const renderedLabel = '99'
    const wrapper = getBubbleWrapper({ label })

    expect(
      wrapper
        .find(Label)
        .children()
        .text()
    ).toEqual(renderedLabel)
  })

  it('renders the correct icon for the info bubble', () => {
    const icon = 'info'
    const wrapper = getBubbleWrapper({ isInfo: true })

    expect(wrapper.find(Icon).prop('name')).toEqual(icon)
  })

  it('renders the correct icon for the warning bubble', () => {
    const icon = 'warning'
    const wrapper = getBubbleWrapper({ isWarning: true })

    expect(wrapper.find(Icon).prop('name')).toEqual(icon)
  })

  everyComponentTestSuite(getBubbleWrapper, Bubble, 'Bubble')
})
