import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'

import attachClassName from '~/components/aux/hoc/attachClassName'
import { Glyph } from '~/elements/Icon'

export const LogoWrapper = styled(Glyph)`
  max-width: 100%;
  svg {
    max-width: 100%;
    height: auto;
  }
`

export const Logo = ({ theme, size, ...props }) => (
  <LogoWrapper size={size} name='logo' {...props} />
)

Logo.propTypes = {
  size: PropTypes.number,
  theme: PropTypes.object.isRequired,
}

Logo.defaultProps = {
  size: 134,
}

const { Component, globalClassName } = attachClassName(Logo)

export const LOGO_CLASSNAME = globalClassName

export default withTheme(Component)
