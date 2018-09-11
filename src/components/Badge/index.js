import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Icon, { ICON_CLASSNAME } from '~/elements/Icon'
import { cursorValue } from '~/utils/styling'
import attachClassName from '~/components/aux/hoc/attachClassName'

const BadgeWrapper = styled.div`
  ${props => css`
    opacity: ${props.disabled ? 0.5 : 1};
    border-radius: ${props.theme.borderRadius};
    transition: ${props.theme.transition};
    background-color: ${props.theme.colors.secondary.base};
    ${props.theme.hasWhiteText &&
      css`
        color: ${props.theme.colors.white.base};
        .${ICON_CLASSNAME} svg {
          fill: ${props.theme.colors.white.base};
        }
      `} &:hover {
      ${!props.disabled &&
        css`
          background-color: ${props.theme.colors.secondary.dark};
        `};
    }
    ${cursorValue};
  `};
  ${props =>
    props.isOnCard
      ? css`
          position: absolute;
          left: 0;
          bottom: 0;
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
`

const BadgeTextWrapper = styled.span`
  ${props =>
    props.padLeft &&
    css`
      padding-left: 8px;
    `};
  ${props =>
    props.isOnCard
      ? css`
          padding-top: 5px;
          padding-bottom: 5px;
        `
      : css`
          padding-top: 1px;
          padding-bottom: 1px;
        `};
  display: inline-block;
  vertical-align: middle;
`

/**
 * Badges symbolize special properties of an item or person. Badges provide a short overview about that property and its value.
 */
export const Badge = ({ text, icon, isIconOnRight, disabled, isOnCard, ...props }) => (
  <BadgeWrapper disabled={disabled} isOnCard={isOnCard} {...props}>
    <Fragment>
      {icon &&
        !isIconOnRight && (
        <Icon color='black.base' size={14} name={icon} style={{ verticalAlign: 'middle' }} />
      )}
      <BadgeTextWrapper padLeft={icon && !isIconOnRight} isOnCard={isOnCard}>
        {text}
      </BadgeTextWrapper>
      {icon &&
        isIconOnRight && (
        <Icon
          color='black.base'
          size={14}
          name={icon}
          style={{
            verticalAlign: 'middle',
            position: 'absolute',
            right: '25px',
            top: '7px',
          }}
        />
      )}
    </Fragment>
  </BadgeWrapper>
)

Badge.propTypes = {
  /** text to be displayed in the Badge */
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  /** By default, icon will be placed on the left side. Use this prop to override this behaviour */
  isIconOnRight: PropTypes.bool,
  /** Special kind of badge to be displayed on a ContentCard component */
  isOnCard: PropTypes.bool,
}

Badge.defaultProps = {
  disabled: false,
  icon: null,
  isIconOnRight: false,
  isOnCard: false,
}

const { Component } = attachClassName(Badge)

export default Component
