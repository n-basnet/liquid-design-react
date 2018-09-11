import React from 'react'
import { shallow } from 'enzyme'

import Footer from '.'
import LabelsWrapper from '~/modules/Footer/LabelsWrapper'
import IconsWrapper from '~/modules/Footer/IconsWrapper'
import Headline from '~/elements/Headline'

describe('Footer', () => {
  const headlineText = 'Get started today and bring your business idea to life.'
  const labelsTexts = ['Label Text', 'Label Text', 'Label Text']
  const onClickMock = jest.fn()
  const iconsNamesAndActions = [
    { name: 'circleX', onClick: onClickMock },
    { name: 'circleX', onClick: onClickMock },
    { name: 'circleX', onClick: onClickMock },
  ]

  const wrapper = shallow(
    <Footer
      headlineText={headlineText}
      iconsNamesAndActions={iconsNamesAndActions}
      labelsTexts={labelsTexts}
    />
  )

  it('renders footer heading correctly', () => {
    expect(
      wrapper
        .find(Headline)
        .children()
        .text()
    ).toEqual(headlineText)
  })

  it('renders proper label', () => {
    const firstLabel = wrapper.find(LabelsWrapper).childAt(0)
    const firstLabelText = labelsTexts[0]

    expect(firstLabel.children().text()).toEqual(firstLabelText)
  })

  it('renders proper icon', () => {
    const firstIcon = wrapper.find(IconsWrapper).childAt(0)
    const firstIconName = iconsNamesAndActions[0]['name']

    expect(firstIcon.prop('name')).toEqual(firstIconName)
  })
})
