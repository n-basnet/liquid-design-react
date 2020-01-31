import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { path } from 'ramda'

import { Glyph, ICON_CLASSNAME } from '../../elements/Icon'
import { cursorValue, nonTouchDevicesHoverStyles } from '../../utils/styling'
import { scaleUpDown, beamAnimation } from '../../elements/Favorite/animations'
import attachClassName from '../../components/misc/hoc/attachClassName'
import { times } from '../../utils/misc'
import { easing } from '../../utils/styling/animations'

const getFill = props =>
  path(
    props.isActive ? ['richRed', 'base'] : ['sensitiveGrey', 'darkest'],
    props.theme.colors,
  )

const getHoverFill = props =>
  path(
    props.isActive ? ['richRed', 'dark'] : ['primary', 'base'],
    props.theme.colors,
  )

export const ANIMATION_DURATION = 500
const SIZE = 24
const BEAM_THICKNESS = 2
const BEAMS_AMOUNT = 7
const BEAM_DEG_OFFSET = 360 / BEAMS_AMOUNT

const BeamsContainer = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  top: -2px;
  left: 0;
  transform: rotate(${BEAMS_AMOUNT % 2 !== 0 ? 360 / BEAMS_AMOUNT / 4 : 0}deg);
`

const Beam = styled.div`
  position: absolute;
  top: calc(50% - ${BEAM_THICKNESS / 2}px);
  left: calc(50% - ${BEAM_THICKNESS / 2}px);
  height: ${BEAM_THICKNESS}px;
  width: 80%;
  transform-origin: ${BEAM_THICKNESS / 2}px ${BEAM_THICKNESS / 2}px;

  &:after {
    content: '';
    position: absolute;
    height: 100%;
    width: 10%;
    left: 80%;
    opacity: 0;
    overflow: hidden;
    border-radius: ${BEAM_THICKNESS}px;
    ${props => css`
      background-color: ${props.theme.colors.richRed.base};
      ${props.isAnimating &&
        css`
          animation: ${beamAnimation} ${ANIMATION_DURATION}ms infinite
            ${easing.inOutQuad};
        `};
    `};
  }

  ${times(BEAMS_AMOUNT).map(
    i =>
      `&:nth-child(${i}) {
    transform: rotate(${i * BEAM_DEG_OFFSET}deg);
    }`,
  )};
`

export const FavoriteWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: ${SIZE}px;
  height: ${SIZE}px;

  ${props => css`
    ${cursorValue({ ...props, defaultValue: 'pointer' })};

    ${props.disabled
      ? css`
          opacity: 0.5;
        `
      : nonTouchDevicesHoverStyles(`
      .${ICON_CLASSNAME} svg {
        fill: ${getHoverFill(props)};
      }
    `)};

    .${ICON_CLASSNAME} svg {
      position: relative;
      z-index: 1;
      fill: ${getFill(props)};
      transition: ${props.theme.transition};

      ${props.isAnimating &&
        css`
          animation: ${scaleUpDown} ${ANIMATION_DURATION}ms ${easing.inOutQuad};
        `};
    }
  `};
`

export class Favorite extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    disabled: false,
    active: false,
    onChange: () => {},
  }

  state = {
    isAnimating: false,
    isActive: false,
  }

  handleClick = () => {
    if (this.state.isAnimating || this.props.disabled) {
      return
    }
    const isActive = !this.state.isActive
    this.setState({ isAnimating: isActive }, () => {
      setTimeout(() => this.setState({ isActive }), ANIMATION_DURATION * 0.8)
      setTimeout(() => {
        isActive && this.setState({ isAnimating: false })
        this.props.onChange(isActive)
      }, ANIMATION_DURATION)
    })
  }

  render() {
    const { disabled, active, ...props } = this.props
    const { isAnimating, isActive } = this.state
    return (
      <FavoriteWrapper
        disabled={disabled}
        onClick={this.handleClick}
        isAnimating={isAnimating}
        isActive={isActive || active || isAnimating}
        {...props}
      >
        <Glyph name="favorite" size={SIZE} />
        <BeamsContainer>
          {times(BEAMS_AMOUNT).map(i => (
            <Beam isAnimating={isAnimating} key={i} />
          ))}
        </BeamsContainer>
      </FavoriteWrapper>
    )
  }
}

const { Component } = attachClassName(Favorite)

export default Component
