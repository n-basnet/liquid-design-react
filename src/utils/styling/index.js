import { css } from 'styled-components'

export const getBackgroundImage = ({ src }) => css`
  background-image: url(${src});
  background-position: center;
  background-size: cover;
`

export const SCREEN_SIZES = {
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
  customMin: breakpoint => (...args) =>
    css`
      @media (min-width: ${breakpoint}px) {
        ${css(...args)};
      }
    `,
  customMax: breakpoint => (...args) =>
    css`
      @media (max-width: ${breakpoint}px) {
        ${css(...args)};
      }
    `,
}

export const cursorValue = ({ disabled, defaultValue = 'default' }) => css`
  cursor: ${disabled ? 'not-allowed' : defaultValue};
`

export const safariStyles = styleString =>
  process.env.NODE_ENV === 'test'
    ? css``
    : css`
        @supports (-webkit-marquee-repetition: infinite) and (object-fit: fill) {
          ${styleString};
        }
      `
export const ieStyles = styleString => css`
  @media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
    ${styleString};
  }
`

export const touchDeviceHoverStyles = styleString => css`
  @media (hover: none), (pointer: coarse) {
    ${styleString};
  }
`

export const disableTextSelectionBackground = css`
  *::selection {
    background: rgba(255, 255, 255, 0);
  }
`

export const customWebKitScrollBar = css`
  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb {
    border: 2px solid rgba(255, 255, 255, 0);
    background-clip: padding-box;
  }
  ::-webkit-scrollbar-thumb {
    ${props => css`
      border-radius: ${props.theme.borderRadius};
      background-color: ${props.theme.colors.sensitiveGrey.darkest};
    `};
  }
`

export const disableMozTextSelection = css`
  -moz-user-focus: ignore;
  -moz-user-select: none;
`
