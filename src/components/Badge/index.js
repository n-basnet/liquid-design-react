import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

import { DEFAULT_THEME } from '~/utils/consts/themes'
import Icon from '~/components/aux/Icon'

const BadgeWrapper = styled.div`
  ${props => css`
    opacity: ${props.disabled ? 0.5 : 1};
    border-radius: ${props.theme.borderRadius};
    transition: ${props.theme.transition};
    background-color: ${props.theme.colors.secondary.base};
    &:hover {
      ${!props.disabled && css`
        background-color: ${props.theme.colors.secondary.dark};
      `}
    },
  `};
  ${props => props.onCard
    ? css`
      position: absolute;
      left: 0;
      bottom: -10px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      width: 100%;
      text-align: left;
      padding: 1px 25px;
    `
    : css`
      padding: 1px 11px;
    `};
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0.2px;
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

const Badge = ({
  text,
  icon,
  iconOnRight,
  disabled,
  onCard,
}) =>
  <BadgeWrapper disabled={disabled} onCard={onCard}>
    <Fragment>
      {icon && !iconOnRight && <Icon name={icon} style={{verticalAlign: 'middle'}} />}
      <BadgeTextWrapper padLeft={icon && !iconOnRight}>{text}</BadgeTextWrapper>
      {icon && iconOnRight && <Icon name={icon} style={{
        verticalAlign: 'middle',
        position: 'absolute',
        right: '25px',
        top: '3px',
      }} />}
    </Fragment>
  </BadgeWrapper>

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onCard: PropTypes.bool,
  iconOnRight: PropTypes.bool,
  icon: PropTypes.string,
}

export default Badge
