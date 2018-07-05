import { css } from 'styled-components'

export const getBackgroundImage = ({ src }) => css`
  background-image: url(${src});
  background-position: center;
  background-size: cover;
`
