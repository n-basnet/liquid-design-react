import React from 'react'
import Button from '.'
import { Glyph } from '~/elements/Icon'
import { everyComponentTestSuite, getWrapper } from '~/utils/testUtils'

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
        .text()
    ).toEqual(defaultProps.children)
  })

  it('renders HTML elements', () => {
    const ButtonContent = () => (
      <div>
        some <i>content</i>
      </div>
    )
    expect(getButtonWrapper({ children: <ButtonContent /> }).find(ButtonContent)).toHaveLength(1)
  })

  it('renders an icon', () => {
    const iconName = 'star'
    expect(
      getButtonWrapper({ icon: iconName })
        .find(Glyph)
        .prop('name')
    ).toEqual(iconName)
  })

  it('calls a function when clicked', () => {
    getButtonWrapper()
      .find(Button)
      .simulate('click')
    expect(defaultProps.onClick).toBeCalled()
  })

  everyComponentTestSuite(getButtonWrapper, Button, 'Button')
})
