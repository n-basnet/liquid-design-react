import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { Glyph, ICON_CLASSNAME } from '../../elements/Icon'
import { cursorValue, nonTouchDevicesHoverStyles } from '../../utils/styling'

const StyledSingleBreadcrumb = styled.div`
  display: inline-block;
  padding: 7px 3px;
  line-height: 1;

  .${ICON_CLASSNAME} {
    transform: translate(-1px, 1px);
    vertical-align: middle;
  }

  ${cursorValue};

  ${props => css`
    ${!props.disabled &&
      nonTouchDevicesHoverStyles(`
      color: ${props.theme.colors.primary.base};
    `)}
    ${props.active &&
      css`
        padding-right: 0;
        font-weight: ${props.theme.fontWeight.black};
        color: ${props.theme.colors.primary.base};
      };
    `};
    ${props.disabled &&
      css`
        color: ${props.theme.colors.sensitiveGrey.darker};
      `};
    ${!props.disabled &&
      props.onClick &&
      css`
        cursor: pointer;
      `};
  `};
`

const SingleBreadcrumbTextWrapper = styled.span`
  display: inline-block;
  vertical-align: middle;
  padding-left: 5px;
`

const SingleBreadcrumb = ({ content, onClick, active, disabled }) => (
  <StyledSingleBreadcrumb
    active={active}
    disabled={disabled}
    onClick={onClick || undefined}
  >
    <Glyph
      name="arrowRight"
      size={19}
      color={disabled ? 'sensitiveGrey.darker' : undefined}
    />
    <SingleBreadcrumbTextWrapper>{content}</SingleBreadcrumbTextWrapper>
  </StyledSingleBreadcrumb>
)

SingleBreadcrumb.propTypes = {
  content: PropTypes.node.isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

SingleBreadcrumb.defaultProps = {
  active: false,
  disabled: false,
  onClick: null,
}

export default SingleBreadcrumb
