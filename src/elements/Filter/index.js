import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import DropdownWrapper from '~/elements/aux/DropdownProvider/DropdownWrapper'
import DropdownTriggerWrapper from '~/elements/aux/DropdownProvider/DropdownTriggerWrapper'
import DropdownProvider from '~/elements/aux/DropdownProvider'

const IconWrapper = styled.div`
  margin-right: 0;
  margin-left: -2px;
  margin-bottom: -4px;
`

const Filter = props => (
  <DropdownProvider
    {...props}
    nameForClassName='Filter'
    inline
    isFilter
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
          <IconWrapper>{renderGlyph({ name: 'filter', size: 24 })}</IconWrapper>
        </DropdownTriggerWrapper>
        {renderOptionsGroup({ inline: true, isFilter: true })}
      </DropdownWrapper>
    )}
  />
)

Filter.propTypes = {
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  }),
  disabled: PropTypes.bool,
  multiselect: PropTypes.bool,
  /** For controlling the state of multiselect version. */
  selectedOptionsIds: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ),
  onOptionDeselect: PropTypes.func,
  onSubmit: PropTypes.func,
  /** Id of selected option - for controlling the state externally. */
  value: PropTypes.string,
}

Filter.defaultProps = {
  label: null,
  defaultValue: null,
  disabled: false,
  multiselect: false,
  selectedOptionsIds: [],
  options: [],
  onOptionDeselect: () => {},
  onSubmit: () => {},
  value: null,
}

export default Filter
