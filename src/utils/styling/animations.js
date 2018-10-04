import { keyframes } from 'styled-components'

export const scaleUp = keyframes`
  from {transform: scale(0);}
  to {transform: scale(1);}
`

export const easing = {
  inOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
}
