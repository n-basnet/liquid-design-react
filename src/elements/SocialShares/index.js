import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Glyph, ICON_CLASSNAME } from '~/elements/Icon'
import { ieStyles } from '~/utils/styling'
import attachClassName from '~/components/misc/hoc/attachClassName'

const DEFAULT_GLYPH_SIZE = 40

const SocialShareWrapper = styled.button`
  display: inline-flex;
  justify-content: left;
  align-items: center;
  flex-basis: auto;
  border: none;
  height: 40px;
  width: 40px;
  padding: 0;
  cursor: pointer;
  ${props => css`
    ${props.hasLabel &&
      css`
        padding-left: 5px;
        width: 160px;
      `};
    background-color: ${props.theme.colors[props.type].base};
    border-radius: ${props.theme.borderRadius};
    outline: none;
    .${ICON_CLASSNAME} svg {
        fill: ${props.theme.colors[props.type === 'snapchat' ? 'black' : 'white'].base};
      }
    }
  `};
  ${ieStyles(`
    line-height: 1;
  `)};
`

export const SocialShareLabel = styled.div`
  position: relative;
  font-size: 16px;
  align-self: center;
  ${props => css`
    padding-left: ${props.type === 'mail' ? 7 : 5}px;
    font-weight: ${props.theme.fontWeight.bold};
    color: ${props.theme.colors[props.type === 'snapchat' ? 'black' : 'white'].base};
  `};
`
const labelMap = {
  facebook: 'Facebook',
  slack: 'Slack',
  instagram: 'Instagram',
  mail: 'Mail',
  snapchat: 'Snapchat',
  salesforce: 'salesforce',
  twitter: 'Twitter',
  skype: 'Skype',
  linkedin: 'Linkedin',
  teams: 'Teams',
  flickr: 'flickr',
  xing: 'Xing',
}

export const SocialShare = ({ hasLabel, type, ...props }) => (
  <SocialShareWrapper type={type} hasLabel={hasLabel} {...props}>
    <Glyph name={type} size={DEFAULT_GLYPH_SIZE} />
    {hasLabel && <SocialShareLabel type={type}>{labelMap[type]}</SocialShareLabel>}
  </SocialShareWrapper>
)

SocialShare.propTypes = {
  type: PropTypes.oneOf(Object.keys(labelMap)).isRequired,
  hasLabel: PropTypes.bool,
  // just to be explicit about the possiblity of a click handler
  onClick: PropTypes.func,
}

SocialShare.defaultProps = {
  hasLabel: false,
  onClick: null,
}

const { Component } = attachClassName(SocialShare)

export default Component
