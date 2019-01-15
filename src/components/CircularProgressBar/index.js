import React from 'react'
import PropTypes from 'prop-types'
import styled, { css, withTheme } from 'styled-components'
import cx from 'classnames'

import { getClassName } from '~/components/misc/hoc/attachClassName'
import { M_FONT_NAME } from '~/utils/consts'
import ProgressBarSVG from '~/components/CircularProgressBar/ProgressBarSVG'
import { getColors } from '~/utils/progressBars'
import { cursorValue } from '~/utils/styling'

export const CIRCULAR_PROGRESS_BAR_CLASSNAME = getClassName({ name: 'CircularProgressBar' })

const CircularProgressBarWrapper = styled.div`
  position: relative;
  width: 140px;
  max-width: 100%;
  ${cursorValue};
  svg {
    transform: rotate(-84.2deg);
    transform-origin: 50% 50%;
    circle {
      ${props => css`
        transition: ${props.theme.transition};
      `};
    }
  }
`

const InnerContentWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ValueWrapper = styled.div`
  font-family: ${M_FONT_NAME};
  font-size: 36px;
  transform: translateY(-13%);
  ${props => css`
    color: ${props.textColor};
  `};
`

export const LabelWrapper = styled.label`
  font-size: 12px;
  ${props =>
    props.disabled &&
    css`
      color: ${props.theme.colors.sensitiveGrey.darker};
    `};
`

export const CircularProgressBar = ({ value, label, className, ...props }) => {
  const color = getColors({ isOverdue: value > 100, ...props })
  return (
    <CircularProgressBarWrapper
      {...props}
      className={cx(className, CIRCULAR_PROGRESS_BAR_CLASSNAME)}
    >
      <ProgressBarSVG value={value} color={color} />
      <InnerContentWrapper>
        <ValueWrapper textColor={color.main}>{value}%</ValueWrapper>
        <LabelWrapper disabled={props.disabled}>{label}</LabelWrapper>
      </InnerContentWrapper>
    </CircularProgressBarWrapper>
  )
}

CircularProgressBar.propTypes = {
  theme: PropTypes.object.isRequired,
  value: PropTypes.number,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  /** By default, green & red will be used. Use this option to use primary & secondary theme color instead. */
  useThemeColors: PropTypes.bool,
  className: PropTypes.string,
}

CircularProgressBar.defaultProps = {
  value: 0,
  disabled: false,
  useThemeColors: false,
  label: null,
  className: null,
}

export default withTheme(CircularProgressBar)
