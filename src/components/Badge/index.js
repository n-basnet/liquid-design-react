import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { space } from 'styled-system'

import { DEFAULT_THEME } from '~/utils/Theme'

const Box = styled.span`
  ${space}
  background-color: ${props => props.theme.colors.secondary};
  display: inline-block;
`

Box.defaultProps = {
  theme: DEFAULT_THEME,
  m: 4,
  p: 2,
}

export const Badge = ({
  text,
}) =>
  <Box>
    {text}
  </Box>

Badge.propTypes = {
  text: PropTypes.string.isRequired,
}
