import styled, { css } from 'styled-components'

const H = styled.div`
  margin: 0;
  line-height: 1.15;
  text-transform: uppercase;
  ${props => css`
    font-family: Merck;
    font-weight: ${props.theme.fontWeight.regular};
    color: ${props.theme.colors.richBlue.base};
  `};
`

export const XBH1 = H.extend`
  line-height: 1.1;
  ${props => css`
    font-size: ${props.theme.fontSize.xh1};
  `};
`

export const XBH2 = H.extend`
  ${props => css`
    font-size: ${props.theme.fontSize.xh2};
  `};
`

export const XBH3 = H.extend`
  ${props => css`
    font-size: ${props.theme.fontSize.xh3};
  `};
`

export const BH1 = H.withComponent('h1').extend`
  ${props => css`
    font-size: ${props.theme.fontSize.bh1};
  `};
`

export const BH2 = H.withComponent('h2').extend`
  ${props => css`
    font-size: ${props.theme.fontSize.bh2};
  `};
`

export const BH3 = H.withComponent('h3').extend`
  ${props => css`
    font-size: ${props.theme.fontSize.bh3};
  `};
`

export const BH4 = H.withComponent('h4').extend`
  ${props => css`
    font-size: ${props.theme.fontSize.bh4};
  `};
`

export const BH5 = H.withComponent('h5').extend`
  ${props => css`
    font-size: ${props.theme.fontSize.bh5};
  `};
`

export const BH6 = H.withComponent('h6').extend`
  ${props => css`
    font-size: ${props.theme.fontSize.bh6};
  `};
`
