import React, { PureComponent } from 'react'
import ReactDOMServer from 'react-dom/server'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { path } from 'ramda'

import Icon, { ICON_CLASSNAME } from '~/elements/Icon'
import Heart from '~/assets/svgSprites/heart.svg'
import { cursorValue } from '~/utils/styling'
import { spriteAnimation } from '~/utils/styling/animations'
import attachClassName from '~/components/aux/hoc/attachClassName'

export const FavoriteWrapper = styled.div`
  display: inline-block;
  position: relative;
  ${props => css`
    ${cursorValue({ ...props, defaultValue: 'pointer' })};

    .${ICON_CLASSNAME} svg {
      fill: ${path(
    props.isActive ? ['richRed', 'base'] : ['sensitiveGrey', 'darker'],
    props.theme.colors
  )};
      transition: ${props.theme.transition};
    }

    ${props.isAnimating &&
      css`
        .${ICON_CLASSNAME} {
          opacity: 0;
        }
      `};

    ${props.disabled
    ? css`
          opacity: 0.5;
        `
    : css`
          &:hover {
            .${ICON_CLASSNAME} svg {
              fill: ${path(
    props.isActive ? ['richRed', 'dark'] : ['primary', 'base'],
    props.theme.colors
  )};
            }
          }
        `};
  `};
`

export const ANIMATION_DURATION = 500
const SPRITESHEET_SCALE_FACTOR = 5
const HEART_ANIMATION_SPRITESHEET_STRING = ReactDOMServer.renderToStaticMarkup(<Heart />)

const SPRITESHEET_DIMENSIONS_DATA = HEART_ANIMATION_SPRITESHEET_STRING.match(
  /viewBox="0 0 (\d*) (\d*)"/
)

const AnimationWrapper = styled.div`
  position: absolute;
  top: -19px;
  left: -19px;
  pointer-events: none;

  ${props =>
    spriteAnimation({
      // SVG will be not be loaded in test env, so let's check if the regex matched
      dimensions: SPRITESHEET_DIMENSIONS_DATA
        ? [
          SPRITESHEET_DIMENSIONS_DATA[1] / SPRITESHEET_SCALE_FACTOR,
          SPRITESHEET_DIMENSIONS_DATA[2] / SPRITESHEET_SCALE_FACTOR,
        ]
        : [0, 0],
      backgroundImageString: HEART_ANIMATION_SPRITESHEET_STRING,
      duration: ANIMATION_DURATION,
      steps: [3, 4],
      isAnimating: props.isAnimating,
    })};
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
        isActive={isActive || active}
        {...props}
      >
        <Icon name='heart' />
        <AnimationWrapper isAnimating={isAnimating} />
      </FavoriteWrapper>
    )
  }
}

const { Component } = attachClassName(Favorite)

export default Component
