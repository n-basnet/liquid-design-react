import { keyframes, css } from 'styled-components'

import { getSVGImageURLString } from '~/utils/aux'

export const fadeIn = keyframes`
  from {transform: scale(0);}
  to {transform: scale(1);}
`

export const spriteAnimation = ({
  dimensions,
  backgroundImageString,
  duration,
  steps,
  isAnimating,
}) => {
  const animX = keyframes`
    from {
      background-position-x: 0px;
    }
    to {
      background-position-x: -${dimensions[0]}px;
    }
  `

  const animY = keyframes`
    from {
      background-position-y: 0px;
    }
    to {
      background-position-y: -${dimensions[1]}px;
    }
  `

  const animateValue = `${animX} ${duration / steps[0]}ms steps(${
    steps[1]
  }) infinite, ${animY} ${duration}ms steps(${steps[0]}) infinite`

  return css`
    width: ${dimensions[0] / steps[1]}px;
    height: ${dimensions[1] / steps[0]}px;
    background-image: url("${getSVGImageURLString(backgroundImageString, {
    dimensions,
  })}");
    background-position-y: 0;
    background-repeat: no-repeat;

    ${isAnimating &&
      css`
        animation: ${animateValue};
      `}
  `
}
