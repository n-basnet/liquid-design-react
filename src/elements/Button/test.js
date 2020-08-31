import React from 'react'
import Button from '.'
import { Glyph, Icon } from '../Icon'
import {
  everyComponentTestSuite,
  getWrapper,
  currentEventLoopEnd,
} from '../../utils/testUtils'

describe('Button', () => {
  const defaultProps = {
    children: 'Some text',
    onClick: jest.fn(),
  }
  const getButtonWrapper = getWrapper(Button, defaultProps)

  it('renders text', () => {
    expect(
      getButtonWrapper()
        .find(Button)
        .text(),
    ).toEqual(defaultProps.children)
  })

  it('renders HTML elements', () => {
    const ButtonContent = () => (
      <div>
        some <i>content</i>
      </div>
    )
    expect(
      getButtonWrapper({ children: <ButtonContent /> }).find(ButtonContent),
    ).toHaveLength(1)
  })

  it('renders an icon', () => {
    const iconName = 'star'
    expect(
      getButtonWrapper({ icon: iconName })
        .find(Glyph)
        .prop('name'),
    ).toEqual(iconName)
  })

  it('changes icon according to state', done => {
    const iconNameEnabled = 'arrowCheck'
    const iconNameDisabled = 'close'

    class ButtonStateWrapper extends React.PureComponent {
      state = {
        isEnabled: false,
      }

      render() {
        return (
          <Button
            icon={this.state.isEnabled ? iconNameDisabled : iconNameEnabled}
            onClick={() => {
              this.setState({
                isEnabled: !this.state.toggled,
              })
            }}
          >
            Some text
          </Button>
        )
      }
    }

    const ButtonWrapper = getWrapper(ButtonStateWrapper, {})()
    currentEventLoopEnd()
      .then(() => {
        expect(ButtonWrapper.find(Glyph).prop('name')).toEqual(iconNameEnabled)
        expect(
          ButtonWrapper.find(Icon).state('svgIconComponent').displayName,
        ).toEqual(iconNameEnabled)
      })
      .then(() => {
        ButtonWrapper.find(Button).simulate('click')
        return currentEventLoopEnd()
      })
      .then(() => {
        expect(ButtonWrapper.find(Glyph).prop('name')).toEqual(iconNameDisabled)
        expect(
          ButtonWrapper.find(Icon).state('svgIconComponent').displayName,
        ).toEqual(iconNameDisabled)
      })
      .then(done)
  })

  it('calls a function when clicked', () => {
    getButtonWrapper()
      .find(Button)
      .simulate('click')
    expect(defaultProps.onClick).toBeCalled()
  })

  everyComponentTestSuite(getButtonWrapper, Button, 'Button')
})
