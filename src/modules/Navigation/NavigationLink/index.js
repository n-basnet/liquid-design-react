import React from 'react'
import { bool, func, number, string } from 'prop-types'
import styled, { css } from 'styled-components'
import { path } from 'ramda'
import { ICON_CLASSNAME } from '../../../elements/Icon'
import NavigationIcon from '../../../modules/Navigation/NavigationIcon'

const NAVIGATION_ICON_SIZE = 38.2

const getFill = props =>
  path(
    props.isActive ? ['primary', 'base'] : ['richBlack', 'lightest'],
    props.theme.colors,
  )
const getHoverFill = props =>
  path(
    props.isActive ? ['primary', 'base'] : ['primary', 'darker'],
    props.theme.colors,
  )

const getFontWeight = ({ theme, isActive }) =>
  theme.fontWeight[isActive ? 'black' : 'regular']

const NavigationLinkWrapper = styled.a`
  display: block;
  text-align: center;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  padding: 10.8px 0 2.1px;
  margin-bottom: 10px;
  width: 80px;
  overflow: hidden;

  ${props => css`
    color: ${getFill(props)};
    font-weight: ${getFontWeight(props)};

    .${ICON_CLASSNAME} svg {
      fill: ${getFill(props)};
      transition: ${props.theme.transition};
    }

    &:hover {
      color: ${getHoverFill(props)};
      text-decoration: none;

      .${ICON_CLASSNAME} svg {
        fill: ${getHoverFill(props)};
      }
    }
  `};
  ${props =>
    props.isActive &&
    css`
      pointer-events: none;
      cursor: default;
      background-color: ${props => props.theme.colors.sensitiveGrey.base};
    `};
`
const NavigationTextWrapper = styled.div`
  padding: 0 5px;
  margin-top: -1px;
  height: 24.95px;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  flex-basis: 100%;
  overflow: hidden;

  font-size: 10px;
  line-height: 1.5;
  letter-spacing: 0.2px;
`

const NavigationText = styled.div`
  max-height: 28.93px;
  margin-top: -4px;
`
export class NavigationLink extends React.Component {
  handleChange = () => {
    // change active tab, if redirect url is not provided
    if (!this.props.href) {
      this.props.onClick(this.props.index)
    }
  }

  render() {
    const { active, iconName, iconUrl, href, title } = this.props
    return (
      <NavigationLinkWrapper
        isActive={active}
        {...(href ? { href } : {})}
        onClick={this.handleChange}
      >
        <NavigationIcon
          size={NAVIGATION_ICON_SIZE}
          iconName={iconName}
          iconUrl={iconUrl}
        />
        <NavigationTextWrapper>
          <NavigationText>{title}</NavigationText>
        </NavigationTextWrapper>
      </NavigationLinkWrapper>
    )
  }
}

NavigationLink.propTypes = {
  active: bool,
  iconName: string,
  iconUrl: string,
  index: number.isRequired,
  href: string,
  onClick: func,
  title: string.isRequired,
}

NavigationLink.defaultProps = {
  active: false,
  iconName: 'placeholder',
  iconUrl: '',
  href: '',
  onClick: () => {},
}

export default NavigationLink
