import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Icon from '~/elements/Icon'
import { cursorValue } from '~/utils/styling'

const BadgeWrapper = styled.div`
  ${props => css`
    opacity: ${props.disabled ? 0.5 : 1};
    border-radius: ${props.theme.borderRadius};
    transition: ${props.theme.transition};
    background-color: ${props.theme.colors.secondary.base};
    &:hover {
      ${!props.disabled &&
        css`
          background-color: ${props.theme.colors.secondary.dark};
        `};
    }
    ${cursorValue};
  `};
  ${props =>
    props.onCard
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
    props.onCard
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
const Badge = ({ text, icon, iconOnRight, disabled, onCard }) => (
  <BadgeWrapper disabled={disabled} onCard={onCard}>
    <Fragment>
      {icon &&
        !iconOnRight && (
        <Icon
          color='black'
          size={14}
          name={icon}
          style={{ verticalAlign: 'middle' }}
        />
      )}
      <BadgeTextWrapper padLeft={icon && !iconOnRight} onCard={onCard}>
        {text}
      </BadgeTextWrapper>
      {icon &&
        iconOnRight && (
        <Icon
          color='black'
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
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  /** By default, icon will be place on the left side. Use this prop to override this behaviour */
  iconOnRight: PropTypes.bool,
  /** Special kind of badge to be displayed on a ContentCard component */
  onCard: PropTypes.bool,
}

export default Badge
