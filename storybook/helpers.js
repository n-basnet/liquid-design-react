import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import loremIpsum from 'fast-lorem-ipsum'
import { text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { without, append } from 'ramda'
import uniqid from 'uniqid'
import { times } from '~/utils/aux'

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

export const getDropdownOptions = (onClick, amount = 4) =>
  times(amount).map(v => ({
    name: getTextKnob({
      name: `option ${v + 1}`,
      defaultText: `Option ${v + 1}`,
    }),
    id: uniqid(),
    onClick,
  }))

export const getDefaultDropdownProps = ({ defaultText }) => ({
  label: getTextKnob({ defaultText }),
  options: getDropdownOptions(),
  onSubmit: action('submit'),
})

export class MultiselectDropdownStateWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  state = {
    selectedOptionsIds: [],
    options: [],
  }
  componentDidMount() {
    this.setState({ options: getDropdownOptions(this.handleClick, 10) })
  }
  handleClick = ({ id }) => {
    const isSelected = this.state.selectedOptionsIds.indexOf(id) >= 0
    this[isSelected ? 'handleRemove' : 'handleAdd'](id)
  }
  updateSelectedOptionsIds = transformation =>
    this.setState(({ selectedOptionsIds }) => ({
      selectedOptionsIds: transformation(selectedOptionsIds),
    }))
  handleAdd = id => this.updateSelectedOptionsIds(append(id))
  handleRemove = id => this.updateSelectedOptionsIds(without([id]))

  render() {
    const { children } = this.props
    const { options, selectedOptionsIds } = this.state

    if (!children) {
      return null
    }

    return React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          options,
          selectedOptionsIds,
          onOptionDeselect: this.handleRemove,
        })
      }
    })
  }
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
