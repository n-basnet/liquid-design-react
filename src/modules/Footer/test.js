import Footer from '.'
import Label from '~/elements/Label'
import Icon from '~/elements/Icon'
import Headline from '~/elements/Headline'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('Footer', () => {
  const onClickMock = jest.fn()
  const defaultProps = {
    headlineText: 'Get started today and bring your business idea to life.',
    labelsTexts: ['Label Text', 'Label Text', 'Label Text'],
    iconsNamesAndActions: [
      { name: 'circleX', onClick: onClickMock },
      { name: 'circleX', onClick: onClickMock },
      { name: 'circleX', onClick: onClickMock },
    ],
    mainIconName: 'circleX',
  }
  const getFooterWrapper = getWrapper(Footer, defaultProps)

  const wrapper = getFooterWrapper()

  it('renders footer heading correctly', () => {
    expect(wrapper.find(Headline).text()).toEqual(defaultProps.headlineText)
  })

  it('renders proper label', () => {
    const firstLabel = wrapper.find(Label).first()
    const firstLabelText = defaultProps.labelsTexts[0]

    expect(firstLabel.text()).toEqual(firstLabelText)
  })

  it('renders proper icon', () => {
    const firstIcon = wrapper.find(Icon).first()
    const firstIconName = defaultProps.iconsNamesAndActions[0]['name']

    expect(firstIcon.prop('name')).toEqual(firstIconName)
  })

  everyComponentTestSuite(getFooterWrapper, Footer, 'Footer')
})
