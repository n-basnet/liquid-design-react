import { keyframes } from 'styled-components'

const DEFAULT_OFFSET = 30
const getOffsetValue = (initValue, offset = DEFAULT_OFFSET) =>
  ((100 - offset) * initValue) / 100

export const scaleUpDown = keyframes`
  ${getOffsetValue(0)}% {
    transform: scale(1);
  }
  ${getOffsetValue(50)}% {
    transform: scale(0.8);
  }
  ${getOffsetValue(75)}% {
    transform: scale(1.2);
  }
  ${getOffsetValue(100)}% {
    transform: scale(1);
  }
`

export const beamAnimation = keyframes`
  0% {
    opacity: 0;
  }
  ${getOffsetValue(0) + DEFAULT_OFFSET}% {
    width: 10%;
    left: 80%;
    opacity: 0;
  }
  ${getOffsetValue(10) + DEFAULT_OFFSET}% {
    opacity: 1;
  }
  ${getOffsetValue(50) + DEFAULT_OFFSET}% {
    width: 30%;
    left: 90%;
  }
  ${getOffsetValue(90) + DEFAULT_OFFSET}% {
    opacity: 1;
  }
  ${getOffsetValue(100) + DEFAULT_OFFSET}% {
    width: 10%;
    left: 110%;
    opacity: 0;
  }
`
