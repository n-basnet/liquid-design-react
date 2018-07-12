import { css } from 'styled-components'

export const getBackgroundImage = ({ src }) => css`
  background-image: url(${src});
  background-position: center;
  background-size: cover;
`
const SCREEN_SIZES = {
  desktop: 992,
  tablet: 768,
  phone: 576,
}

const getMediaQuery = mediaQueryKey =>
  Object.keys(SCREEN_SIZES).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (${mediaQueryKey}: ${SCREEN_SIZES[label]}px) {
        ${css(...args)};
      }
    `

    return acc
  }, {})

export const media = {
  min: getMediaQuery('min-width'),
  max: getMediaQuery('max-width'),
}
