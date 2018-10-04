import styled, { css } from 'styled-components'

import { M_FONT_NAME } from '~/utils/consts'

const H = styled.div`
  margin: 0;
  line-height: 1.15;
  text-transform: uppercase;
  ${props => css`
    font-family: ${M_FONT_NAME};
    font-weight: ${props.theme.fontWeight.regular};
    color: ${props.theme.colors.richBlue.base};
  `};
`

export const XBH1 = styled(H)`
  line-height: 1.1;
  ${props => css`
    font-size: ${props.theme.fontSize.xh1};
  `};
`

export const XBH2 = styled(H)`
  ${props => css`
    font-size: ${props.theme.fontSize.xh2};
  `};
`

export const XBH3 = styled(H)`
  ${props => css`
    font-size: ${props.theme.fontSize.xh3};
  `};
`

export const BH1 = styled(H.withComponent('h1'))`
  ${props => css`
    font-size: ${props.theme.fontSize.bh1};
  `};
`

export const BH2 = styled(H.withComponent('h2'))`
  ${props => css`
    font-size: ${props.theme.fontSize.bh2};
  `};
`

export const BH3 = styled(H.withComponent('h3'))`
  ${props => css`
    font-size: ${props.theme.fontSize.bh3};
  `};
`

export const BH4 = styled(H.withComponent('h4'))`
  ${props => css`
    font-size: ${props.theme.fontSize.bh4};
  `};
`

export const BH5 = styled(H.withComponent('h5'))`
  ${props => css`
    font-size: ${props.theme.fontSize.bh5};
  `};
`

export const BH6 = styled(H.withComponent('h6'))`
  ${props => css`
    font-size: ${props.theme.fontSize.bh6};
  `};
`
