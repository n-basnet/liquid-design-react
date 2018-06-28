import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import { darken } from 'polished'

import { DEFAULT_THEME } from '~/utils/consts/themes'
import Icon from '~/components/Icon'

const BadgeWrapper = styled.div`
  ${props => css`
    opacity: ${props.disabled ? 0.5 : 1};
    border-radius: ${props.theme.borderRadius};
    transition: ${props.theme.transition};
    background-color: ${props.theme.colors.secondary};
    &:hover {
      ${!props.disabled && css`
        background-color: ${darken(0.2, props.theme.colors.secondary)};
      `}
    },
  `};
  display: inline-block;
  font-size: 12px;
  padding: 5px 10px;
  cursor: default;
`

BadgeWrapper.defaultProps = {
  theme: DEFAULT_THEME,
}

const BadgeTextWrapper = styled.span`
  ${props => props.padLeft && css`
    padding-left: 8px;
  `};
  display: inline-block;
  vertical-align: middle;
  padding-top: 2px;
`

export const Badge = ({
  text,
  icon,
  disabled,
}) =>
  <BadgeWrapper disabled={disabled}>
    <Fragment>
      {icon && <Icon name={icon} style={{verticalAlign: 'middle'}} />}
      <BadgeTextWrapper padLeft={!!icon}>{text}</BadgeTextWrapper>
    </Fragment>
  </BadgeWrapper>

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
}
