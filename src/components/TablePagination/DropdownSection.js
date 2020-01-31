import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Dropdown, { DROPDOWN_CLASSNAME } from '../../elements/Dropdown'
import { DROPDOWN_TRIGGER_CLASSNAME } from '../../elements/misc/DropdownProvider'
import { OPTIONS_GROUP_CLASSNAME } from '../../elements/misc/OptionsGroup'
import { ICON_CLASSNAME } from '../../elements/Icon'
import { optionPropType } from '../../elements/misc/OptionsGroupProps'
import { ClickableSection } from '../../components/TablePagination/styled'
import { media } from '../../utils/styling'

const DropdownWrapper = styled(ClickableSection)`
  z-index: 0;
  top: 0;
  height: 100%;
  padding: 0;
  ${props =>
    props.isItemsPerPageDropdown &&
    css`
      border: none;
    `};
  .${DROPDOWN_TRIGGER_CLASSNAME} {
    border: none;
    ${props => css`
      padding: 3px ${props.isItemsPerPageDropdown ? 11 : 2}px;
    `};
  }
  .${DROPDOWN_CLASSNAME} {
    ${props => css`
      min-width: ${props.isItemsPerPageDropdown ? 64 : 51}px !important;
    `};
    ${media.max.phone`
      // reverting the default dropdown mobile styles:
      font-size: 14px;
      .${ICON_CLASSNAME} {
        margin-left: 2px;
        svg {
          transform: scale(0.8);
        }
      };
      min-width: 150px;
    `};
  }
  .${OPTIONS_GROUP_CLASSNAME} {
    transform: translate(11px, 7px);
    min-width: 160px;
    right: 0;
    ${props =>
      props.shouldOpenToTop &&
      css`
        bottom: 50px;
        box-shadow: 0 5px 20px #0000003d;
      `};
  }
`
const DropdownSection = ({
  options,
  isItemsPerPageDropdown,
  shouldOpenToTop,
  ...props
}) => (
  <DropdownWrapper
    isItemsPerPageDropdown={isItemsPerPageDropdown}
    shouldOpenToTop={shouldOpenToTop}
  >
    <Dropdown options={options} inline {...props} />
  </DropdownWrapper>
)

DropdownSection.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape(optionPropType)).isRequired,
  isItemsPerPageDropdown: PropTypes.bool,
  shouldOpenToTop: PropTypes.bool,
}

DropdownSection.defaultProps = {
  isItemsPerPageDropdown: false,
  shouldOpenToTop: false,
}

export default DropdownSection
