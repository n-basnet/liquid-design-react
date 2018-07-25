import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Theme } from '~'
import { THEMES } from '~/utils/consts/themes'
import { camelCaseToHuman } from '~/utils/aux'

const themeNames = Object.keys(THEMES)

const ThemeSelectWrapper = styled.div`
  padding: 10px 40px 10px;
  select {
    margin-left: 10px;
  }
`

export default class ThemeWrapper extends React.Component {
  state = {
    currentThemeName: themeNames[0],
  }
  handleChange = ({ target }) => {
    this.setState({ currentThemeName: target.value })
  }
  render() {
    return (
      <Theme themeName={this.state.currentThemeName}>
        <ThemeSelectWrapper id='storybook-theme-wrapper'>
          Theme:
          <select onChange={this.handleChange} value={this.state.themeName}>
            {themeNames.map((themeName, i) => (
              <option key={i} value={themeName}>
                {camelCaseToHuman(themeName)}
              </option>
            ))}
          </select>
        </ThemeSelectWrapper>
        <div id='storybook-main-element'>{this.props.children}</div>
      </Theme>
    )
  }
}

ThemeWrapper.propTypes = {
  children: PropTypes.node,
}
