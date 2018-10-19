import React from 'react'
import { arrayOf, bool, func, node, number, shape, string } from 'prop-types'
import styled from 'styled-components'

import attachClassName from '~/components/aux/hoc/attachClassName'
import NavigationLink from '~/modules/Navigation/NavigationLink'
import NavigationIcon from '~/modules/Navigation/NavigationIcon'

const MAX_VISIBLE_TABS = 8

const NavigationWrapper = styled.div`
  width: 80px;
  text-align: center;
  background-color: ${props => props.theme.colors.sensitiveGrey.dark};
  color: ${props => props.theme.colors.richBlack.lightest};
`

// contains tabs with links
const NavigationBody = styled.div`
  width: 80px;
  min-height: 640px;
  overflow: hidden;
`
// contains Navigation image and title
const NavigationFooter = styled.div`
  width: 80px;
  height: 100px;
  padding-top: 5px;
  overflow: hidden;
`
const NavigationTitle = styled.div`
  display: flex;
  flex-basis: 100%;
  height: 35px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-size: 12px;
  letter-spacing: 0.2px;
}
`

export const Navigation = ({ activeTabIndex, title, tabs, iconName, iconUrl, ...rest }) => (
  <NavigationWrapper {...rest}>
    <NavigationBody>
      {tabs
        .slice(0, MAX_VISIBLE_TABS)
        .map((link, index) => (
          <NavigationLink {...link} key={index} index={index} active={index === activeTabIndex} />
        ))}
    </NavigationBody>
    <NavigationFooter>
      <NavigationIcon iconName={iconName} iconUrl={iconUrl} />
      <NavigationTitle>{title}</NavigationTitle>
    </NavigationFooter>
  </NavigationWrapper>
)

Navigation.propTypes = {
  iconName: string,
  activeTabIndex: number,
  iconUrl: node,
  tabs: arrayOf(
    shape({
      active: bool,
      iconName: string,
      iconUrl: string,
      href: string,
      onClick: func,
      title: node.isRequired,
    })
  ),
  title: node.isRequired,
}

Navigation.defaultProps = {
  iconName: '',
  iconUrl: '',
  activeTabIndex: null,
  tabs: [],
}

const { Component } = attachClassName(Navigation)

export default Component
