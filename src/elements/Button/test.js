import Button from '.'
import ButtonLabel from '~/elements/Button/Labels/Button'
import { Glyph } from '~/elements/Icon'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

describe('Button', () => {
  const defaultProps = {
    label: 'Some label',
    icon: 'star',
    onClick: jest.fn(),
  }
  const getButtonWrapper = getWrapper(Button, defaultProps)

  it('renders a label', () => {
    expect(
      getButtonWrapper()
        .find(ButtonLabel)
        .children()
        .text()
    ).toEqual(defaultProps.label)
  })

  it('renders an icon', () => {
    expect(
      getButtonWrapper()
        .find(Glyph)
        .prop('name')
    ).toEqual(defaultProps.icon)
  })

  it('calls a function when clicked', () => {
    getButtonWrapper()
      .find(Button)
      .simulate('click')
    expect(defaultProps.onClick).toBeCalled()
  })

  everyComponentTestSuite(getButtonWrapper, Button, 'Button')
})
