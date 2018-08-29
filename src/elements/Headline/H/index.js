import styled, { css } from 'styled-components'

const H = styled.div`
  margin: 0;
  line-height: 1.25;
  ${props => css`
    font-weight: ${props.theme.fontWeight.black};
  `};
`

export const XH1 = H.extend`
  line-height: 1.15;
  ${props => css`
    font-size: ${props.theme.fontSize.xh1};
  `};
`

export const XH2 = H.extend`
  ${props => css`
    font-size: ${props.theme.fontSize.xh2};
  `};
`

export const XH3 = H.extend`
  ${props => css`
    font-size: ${props.theme.fontSize.xh3};
  `};
`

export const XH4 = H.extend`
  ${props => css`
    font-size: ${props.theme.fontSize.xh4};
  `};
`

export const XH5 = H.extend`
  ${props => css`
    font-size: ${props.theme.fontSize.xh5};
  `};
`

export const XH6 = H.extend`
  ${props => css`
    font-size: ${props.theme.fontSize.xh6};
  `};
`

export const H1 = H.withComponent('h1').extend`
  ${props => css`
    font-size: ${props.theme.fontSize.h1};
  `};
`

export const H2 = H.withComponent('h2').extend`
  ${props => css`
    font-size: ${props.theme.fontSize.h2};
  `};
`

export const H3 = H.withComponent('h3').extend`
  ${props => css`
    font-size: ${props.theme.fontSize.h3};
  `};
`

export const H4 = H.withComponent('h4').extend`
  ${props => css`
    font-size: ${props.theme.fontSize.h4};
  `};
`

export const H5 = H.withComponent('h5').extend`
  ${props => css`
    font-size: ${props.theme.fontSize.h5};
  `};
`

export const H6 = H.withComponent('h6').extend`
  ${props => css`
    font-size: ${props.theme.fontSize.h6};
  `};
`
