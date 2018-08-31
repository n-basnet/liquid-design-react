import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import enhanceWithClickOutside from 'react-click-outside'

import Icon, { ICON_CLASSNAME } from '~/elements/Icon'
import { getPosition, getArrowStyle } from '~/components/Tooltip/utils'
import { WALLS, WALLS_KEYS, SIDES, SIDES_KEYS } from '~/components/Tooltip/consts'
import { hasCSSFilters } from '~/utils/featureDetects'
import { GLOBAL_CSS_PREFIX } from '~/utils/consts'

export const TOOLTIP_WRAPPER_CLASSNAME = `${GLOBAL_CSS_PREFIX}TooltipWrapper`

const getIconColor = props => (props.isOpen ? 'darker' : props.isHovered ? 'dark' : 'base')

const TooltipWrapper = styled.span`
  position: relative;
  ${props => css`
    > .${ICON_CLASSNAME} svg {
      fill: ${props.theme.colors.primary[getIconColor(props)]};
    }
  `};
`

const TooltipContentWrapper = styled.div`
  position: absolute;
  padding: 19px 25px;
  width: 250px;
  ${props => css`
    ${getPosition(props)};
    z-index: ${props.theme.zIndex.tooltips};
    background-color: ${props.theme.colors.white.base};
    border-radius: ${props.theme.borderRadius};
    ${hasCSSFilters()
    ? `filter: drop-shadow(0 10px 10px rgba(0,0,0,0.1));`
    : `box-shadow: ${props.theme.boxShadow};`};

    ${hasCSSFilters() &&
      css`
        &:after {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          ${props => css`
            ${getArrowStyle({
    color: props.theme.colors.white.base,
    wall: props.wall,
    side: props.side,
  })};
          `};
        }
      `};
  `};
`

export class Tooltip extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    /** the wall on which the arrow will be displayed */
    wall: PropTypes.oneOf(WALLS_KEYS),
    /** the side of the wall - left or right - on which the arrow should be displayed */
    side: PropTypes.oneOf(SIDES_KEYS),
    /** object for overriding the style of the Tooltip content */
    style: PropTypes.object,
    /** force open state for tooltip */
    isOpen: PropTypes.bool,
    /** provide a custom trigger element, instead of the default info icon */
    customTrigger: PropTypes.func,
    /** callback on toggling the tooltip */
    onToggle: PropTypes.func,
  }
  static defaultProps = {
    wall: WALLS.top,
    side: SIDES.left,
    style: {},
    customTrigger: undefined,
    isOpen: null,
    onToggle: undefined,
  }
  state = {
    isOpen: false,
  }
  toggle = () => {
    this.setState(
      ({ isOpen }) => ({ isOpen: !isOpen }),
      () => {
        this.props.onToggle && this.props.onToggle(this.state.isOpen)
      }
    )
  }
  handleMouseEnter = () => this.setState({ isHovered: true })
  handleMouseLeave = () => this.setState({ isHovered: false })
  handleClickOutside = () => {
    this.setState({ isOpen: false })
    this.props.onToggle && this.props.onToggle(false)
  }
  render() {
    const { isOpen, isHovered } = this.state
    const { children, wall, side, style, customTrigger } = this.props
    const isTooltipOpen = this.props.isOpen !== null ? this.props.isOpen : isOpen
    const iconName = `info${isHovered || isOpen ? 'Filled' : 'Circle'}`
    return (
      <TooltipWrapper
        isOpen={isTooltipOpen}
        isHovered={isHovered}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {customTrigger ? (
          customTrigger(this.toggle)
        ) : (
          <Icon name={iconName} onClick={this.toggle} />
        )}
        {isOpen && (
          <TooltipContentWrapper
            className={TOOLTIP_WRAPPER_CLASSNAME}
            style={style}
            wall={wall}
            side={side}
          >
            {children}
          </TooltipContentWrapper>
        )}
      </TooltipWrapper>
    )
  }
}

export default enhanceWithClickOutside(Tooltip)
