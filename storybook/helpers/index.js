import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import loremIpsum from 'fast-lorem-ipsum'
import { text } from '@storybook/addon-knobs'

import COLORS from '~/utils/consts/colors'

const BACKGROUND_COLORS = {
  dark: '#e9e9e8',
  grey: '#f9f9fc',
  sensitiveGrey: COLORS.SENSITIVE_GREY,
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

// addon-info does not handle Fragment well in `propTablesExclude`
// https://github.com/storybooks/addon-jsx/issues/34#issuecomment-377270299
export const Fragment = ({ children }) => children
Fragment.propTypes = {
  children: PropTypes.node.isRequired,
}
Fragment.displayName = 'React.Fragment'

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

export const isStorybookLokiBuild = () => process.env.STORYBOOK_LOKI_BUILD
export const toUpperCase = string => string.charAt(0).toUpperCase() + string.slice(1)

const prependStringToEachLine = (prependString, string) =>
  string
    .split(/\r?\n/)
    .map(line => `${prependString}${line}`)
    .join(`\n`)

export const objectToJSXAttrs = (
  object,
  config = {
    lineJoin: `
    `,
  }
) => {
  const FN_MARKER = '__function'
  return Object.keys(object)
    .reduce((string, key) => {
      const value = object[key]
      const getKeyAttribute = content => `${key}={${content}}`
      switch (typeof value) {
        case 'boolean':
          string += value ? key : getKeyAttribute('false')
          break
        case 'string':
          string += getKeyAttribute(`'${value}'`)
          break
        case 'number':
          string += getKeyAttribute(`${value}`)
          break
        case 'object':
          string += getKeyAttribute(
            prependStringToEachLine(
              '    ',
              JSON.stringify(
                value,
                (key, val) => (typeof val === 'function' ? `${key}${FN_MARKER}` : val),
                2
              )
            )
              .replace(/"([\w]*)":/g, '$1:')
              .replace(new RegExp(`"(\\w*)${FN_MARKER}"`, 'g'), '$1')
              .trim()
          )
          break
      }
      return `${string}${config.lineJoin}`
    }, '')
    .trim()
}
