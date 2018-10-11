import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'
import loremIpsum from 'fast-lorem-ipsum'
import { text } from '@storybook/addon-knobs'

const BACKGROUND_COLORS = {
  dark: '#e9e9e8',
  grey: '#f9f9fc',
}

const BackgroundWrapper = styled.div`
  ${props => css`
    padding: ${props.padding || '40px 40px 20px'};
    background-color: ${BACKGROUND_COLORS[props.color] || '#fff'};
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
export const getCustomPlaceholderText = () =>
  "We've been around for 350 years, yet our majority owners are still the descendants of Friedrich Jacob Merck, the man who founded our company in Darmstadt, Germany in 1668. Since then, we have become a truly global company, with 52,000 employees in 66 countries working on breakthrough solutions and technologies."

export const getDeterministicPlaceholderText = (seed, maxAmount = 3) => {
  const words = placeholderText(seed).split(' ')
  return words
    .slice(Math.max(words.length - maxAmount, 0))
    .join(' ')
    .replace(',', '')
}

export const getTextKnob = ({ name = 'content', defaultText, placeholderTextLength = 30 } = {}) =>
  text(name, defaultText || placeholderText(placeholderTextLength))

export const formatList = list => list.map(v => `\`${v}\``).join(', ')

export const getPropTablesExcludeList = (list = []) => [Fragment, BackgroundWrapper, ...list]

export const getStoriesByVersions = ({ versions, subversions, joinString = ' ' }) => {
  const VERSIONS = versions
  const SUBVERSIONS = [{ name: '', props: {} }, ...subversions]
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
      const subversionName = !isSame && subversion
      pairs.push({
        version,
        subversion: subversionName,
        name: `${version}${subversionName ? `${joinString}${subversionName}` : ''}`,
        props,
      })
    })
  })
  return pairs
}

export const getSnippetTemplate = (snippet, description) => ({
  info: {
    text: `${description || ``}
  ~~~js
  ${snippet.trim()}
  ~~~
`,
  },
})
export const getStoryMDLink = (name, { type = 'Elements', storyName } = {}) =>
  `[\`${name}\`](/?selectedKind=${type}%2F${encodeURIComponent(storyName || name)})`
