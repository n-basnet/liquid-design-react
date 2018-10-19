import React from 'react'
import { number, string } from 'prop-types'
import styled, { css } from 'styled-components'
import { Glyph } from '~/elements/Icon'
import Placeholder from '~/elements/Placeholder'

const PLACEHOLDER_WIDTH = 50
const sizeToPixels = size => `${size}px`

const Icon = styled.div`
  display: block;
  margin: 0 auto;

  /* centering image using background */
  ${props => css`
    width: ${sizeToPixels(props.size)};
    height: ${sizeToPixels(props.size)};
    background-image: url(${props.iconUrl});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  `};
`
/* if `iconUrl` is provided, custom image is displayed, otherwise
 a glyph will be loaded based on glyph/icon name */

const SelectedIcon = ({ iconUrl, iconName, ...props }) =>
  iconUrl ? <Icon iconUrl={iconUrl} {...props} /> : <Glyph name={iconName} {...props} />

SelectedIcon.propTypes = {
  iconUrl: string,
  iconName: string,
}

SelectedIcon.defaultProps = {
  iconUrl: '',
  iconName: '',
}

export const NavigationIcon = props =>
  props.iconUrl || props.iconName ? (
    <SelectedIcon {...props} />
  ) : (
    <Placeholder width={props.size} height={props.size} />
  )

NavigationIcon.propTypes = {
  size: number,
  iconName: string,
  iconUrl: string,
}

NavigationIcon.defaultProps = {
  active: false,
  iconName: '',
  iconUrl: '',
  size: PLACEHOLDER_WIDTH,
}

export default NavigationIcon
