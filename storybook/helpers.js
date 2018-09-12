import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'
import loremIpsum from 'fast-lorem-ipsum'
import { text } from '@storybook/addon-knobs'

const BackgroundWrapper = styled.div`
  padding: 40px 40px 20px;
  ${props => css`
    background-color: ${props.dark ? '#e9e9e8' : '#fff'};
  `};
`

export const getBackgroundWrapper = (props = {}) => storyFn => (
  <BackgroundWrapper {...props}>{storyFn()}</BackgroundWrapper>
)

export const includeComponentInPropTable = (Component, props = {}) => storyFn => (
  <Fragment>
    {/* just to make addon-info aware of the Component props */}
    <div style={{ display: 'none' }}>
      <Component {...props} />
    </div>
    {storyFn()}
  </Fragment>
)

export const placeholderText = amount => loremIpsum(amount, 'w')

export const getTextKnob = ({ name = 'content', defaultText, placeholderTextLength = 30 } = {}) =>
  text(name, defaultText || placeholderText(placeholderTextLength))

export const formatList = list => list.map(v => `\`${v}\``).join(', ')

export const getPropTablesExcludeList = (list = []) => [Fragment, BackgroundWrapper, ...list]

export const getStoriesByVersions = ({ versions, subversions }) => {
  const DEFAULT_VERSION = { name: 'default' }
  const VERSIONS = [DEFAULT_VERSION, ...versions]
  const SUBVERSIONS = [DEFAULT_VERSION, ...subversions]
  const pairs = []
  VERSIONS.map((versionObject, i) => {
    const version = versionObject.name
    SUBVERSIONS.map(subversionObject => {
      const subversion = subversionObject.name
      const isSame = version === subversion
      const props = {
        ...(versionObject.props || {}),
        ...(subversionObject.props || {}),
      }
      const subversionName = !isSame && subversionObject !== DEFAULT_VERSION && subversion
      pairs.push({
        version,
        subversion: subversionName,
        name: `${version}${subversionName ? ` - ${subversionName}` : ''}`,
        props,
      })
    })
  })
  return pairs
}
