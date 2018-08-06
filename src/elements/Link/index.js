import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Icon from '~/elements/Icon'

const LinkWrapper = styled.div`
  display: inline-block;
  font-size: 16px;
  line-height: 0.63;
  letter-spacing: 0.2px;
  cursor: pointer;
  ${props => css`
    color: ${props.theme.colors.primary.base};
  `};
  &:hover {
    text-decoration: underline;
  }
  &:active {
    text-decoration: none;
    font-weight: ${props => props.theme.fontWeight.black};
  }
`

const Link = ({ children }) => (
  <LinkWrapper>
    <Icon name='arrowRight' size={14} style={{ top: '2px' }} />
    {children}
  </LinkWrapper>
)

Link.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Link
