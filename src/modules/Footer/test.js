import Footer from '.'
import Label from '../../elements/Label'
import { Glyph } from '../../elements/Icon'
import Headline from '../../elements/Headline'
import { everyComponentTestSuite, getWrapper } from '../../utils/testUtils'

describe('Footer', () => {
  const onClickMock = jest.fn()
  const defaultProps = {
    headlineContent: 'Get started today and bring your business idea to life.',
    labelsTexts: ['Label Text', 'Label Text', 'Label Text'],
    iconsNamesAndActions: [
      { name: 'close', onClick: onClickMock },
      { name: 'close', onClick: onClickMock },
      { name: 'close', onClick: onClickMock },
    ],
    mainIconName: 'close',
  }
  const getFooterWrapper = getWrapper(Footer, defaultProps)

  const wrapper = getFooterWrapper()

  it('renders footer heading correctly', () => {
    expect(wrapper.find(Headline).text()).toEqual(defaultProps.headlineContent)
  })

  it('renders proper label', () => {
    const firstLabel = wrapper.find(Label).first()
    const firstLabelText = defaultProps.labelsTexts[0]

    expect(firstLabel.text()).toEqual(firstLabelText)
  })

  it('renders proper icon', () => {
    const firstIcon = wrapper.find(Glyph).first()
    const firstIconName = defaultProps.iconsNamesAndActions[0].name

    expect(firstIcon.prop('name')).toEqual(firstIconName)
  })

  everyComponentTestSuite(getFooterWrapper, Footer, 'Footer')
})
