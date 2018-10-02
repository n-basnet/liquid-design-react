import styled, { css } from 'styled-components'

const H = styled.div`
  margin: 0;
  line-height: 1.25;
  ${props => css`
    font-weight: ${props.theme.fontWeight.black};
  `};
`

export const XH1 = styled(H)`
  line-height: 1.15;
  ${props => css`
    font-size: ${props.theme.fontSize.xh1};
  `};
`

export const XH2 = styled(H)`
  ${props => css`
    font-size: ${props.theme.fontSize.xh2};
  `};
`

export const XH3 = styled(H)`
  ${props => css`
    font-size: ${props.theme.fontSize.xh3};
  `};
`

export const XH4 = styled(H)`
  ${props => css`
    font-size: ${props.theme.fontSize.xh4};
  `};
`

export const XH5 = styled(H)`
  ${props => css`
    font-size: ${props.theme.fontSize.xh5};
  `};
`

export const XH6 = styled(H)`
  ${props => css`
    font-size: ${props.theme.fontSize.xh6};
  `};
`

export const H1 = styled(H.withComponent('h1'))`
  ${props => css`
    font-size: ${props.theme.fontSize.h1};
  `};
`

export const H2 = styled(H.withComponent('h2'))`
  ${props => css`
    font-size: ${props.theme.fontSize.h2};
  `};
`

export const H3 = styled(H.withComponent('h3'))`
  ${props => css`
    font-size: ${props.theme.fontSize.h3};
  `};
`

export const H4 = styled(H.withComponent('h4'))`
  ${props => css`
    font-size: ${props.theme.fontSize.h4};
  `};
`

export const H5 = styled(H.withComponent('h5'))`
  ${props => css`
    font-size: ${props.theme.fontSize.h5};
  `};
`

export const H6 = styled(H.withComponent('h6'))`
  ${props => css`
    font-size: ${props.theme.fontSize.h6};
  `};
`
