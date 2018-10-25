import React from 'react'
import DropdownWrapper from '~/elements/aux/DropdownProvider/DropdownWrapper'
import DropdownTriggerWrapper from '~/elements/aux/DropdownProvider/DropdownTriggerWrapper'
import DropdownProvider from '~/elements/aux/DropdownProvider'
import { ResultWrapper } from '~/elements/aux/OptionsGroup'
import Tag from '~/elements/Tag'
import { Input } from '~/elements/Checkbox'
import { getWrapper } from '~/utils/testUtils'

describe('DropdownProvider', () => {
  const onClick = jest.fn()
  const OPTIONS = [{ id: '1', name: 'Option 1', onClick }, { id: '2', name: 'Option 2' }]
  const defaultProps = {
    label: 'Filter Label',
    options: OPTIONS,
  }

  const ProviderWrapper = props => (
    <DropdownProvider
      {...defaultProps}
      {...props}
      nameForClassName='Filter'
      inline
      render={({
        isExpanded,
        wrapperProps,
        triggerWrapperProps,
        optionsGroupProps,
        renderLabelContent,
        renderGlyph,
        renderOptionsGroup,
      }) => (
        <DropdownWrapper {...wrapperProps} inline isFilter>
          <DropdownTriggerWrapper {...triggerWrapperProps} inline isFilter>
            {renderLabelContent()}
            {renderGlyph({ name: 'filter', size: 24 })}
          </DropdownTriggerWrapper>
          {renderOptionsGroup({ inline: true, isFilter: true })}
        </DropdownWrapper>
      )}
    />
  )

  const getProviderWrapper = getWrapper(ProviderWrapper, defaultProps)

  it('toggles options on click', () => {
    const wrapper = getProviderWrapper()
    expect(wrapper.find(ResultWrapper).length).toEqual(0)
    wrapper.find(DropdownTriggerWrapper).simulate('click')
    expect(wrapper.find(ResultWrapper).length).toEqual(OPTIONS.length)
    wrapper.find(DropdownTriggerWrapper).simulate('click')
    expect(wrapper.find(ResultWrapper).length).toEqual(0)
  })

  it('handles option click', () => {
    const wrapper = getProviderWrapper()
    wrapper.find(DropdownTriggerWrapper).simulate('click')
    wrapper
      .find(ResultWrapper)
      .first()
      .simulate('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('handles multiselect', () => {
    const optionIndex = 0
    const props = { multiselect: true, selectedOptionsIds: [OPTIONS[optionIndex].id] }
    const wrapper = getProviderWrapper(props)
    expect(wrapper.find(Tag).length).toEqual(props.selectedOptionsIds.length)
    wrapper.find(DropdownTriggerWrapper).simulate('click')
    expect(
      wrapper
        .find(Input)
        .at(optionIndex)
        .prop('checked')
    ).toEqual(true)
  })
})
