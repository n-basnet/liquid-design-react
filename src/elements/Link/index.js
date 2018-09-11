import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Icon from '~/elements/Icon'
import attachClassName from '~/components/aux/hoc/attachClassName'

const LinkWrapper = styled.a`
  display: inline-block;
  font-size: 16px;
  line-height: 0.63;
  letter-spacing: 0.2px;
  cursor: pointer;
  text-decoration: none;
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

export const Link = ({ children, href, ...props }) => (
  <LinkWrapper href={href} {...props}>
    <Icon name='arrowRight' size={14} style={{ top: '2px' }} />
    {children}
  </LinkWrapper>
)

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
}

Link.defaultProps = {
  href: null,
}

const { Component } = attachClassName(Link)

export default Component
