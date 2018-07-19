import React from 'react'
import { shallow } from 'enzyme'

import Theme from '~/Theme'
import ModalContent from './ModalContent'

describe('Modal', () => {
  it('renders content and label', () => {
    const someContent = 'Modal content'
    const someLabel = 'Modal label'
    const wrapper = shallow(
      <Theme>
        <ModalContent onClose={v => v} label={someLabel}>
          {someContent}
        </ModalContent>
      </Theme>
    )
    expect(wrapper.render().text()).toMatch(someContent)
    expect(wrapper.render().text()).toMatch(someLabel)
  })
})
