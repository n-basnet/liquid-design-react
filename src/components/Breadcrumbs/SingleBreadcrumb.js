import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Icon from '~/elements/Icon'

const StyledSingleBreadcrumb = styled.div`
  display: inline-block;
  padding: 7px 5px;
  svg {
    transform: translate(-1px, 1px);
    vertical-align: middle;
  };

  ${props => css`
    ${!props.disabled && css`
      &:hover {
        color: ${props.theme.colors.primary.base};
      };
    `};
    ${props.active && css`
      font-weight: bold;
      color: ${props.theme.colors.primary.base};
      span {
        transform: translateY(0.5px);
      };
    `};
    ${props.disabled && css`
      color: ${props.theme.colors.darkGrey};
    `};
    ${!props.disabled && props.onClick && css`
      cursor: pointer;
    `};
  `}
`

const SingleBreadcrumbTextWrapper = styled.span`
  display: inline-block;
  vertical-align: middle;
  padding-left: 7px;
`

const SingleBreadcrumb = ({
  name,
  onClick,
  active,
  disabled,
}) =>
  <StyledSingleBreadcrumb active={active} disabled={disabled} onClick={onClick}>
    <Icon name='arrowRight' size={15} color={disabled && 'darkGrey'} />
    <SingleBreadcrumbTextWrapper>{name}</SingleBreadcrumbTextWrapper>
  </StyledSingleBreadcrumb>

SingleBreadcrumb.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

export default SingleBreadcrumb
