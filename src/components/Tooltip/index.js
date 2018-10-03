import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import enhanceWithClickOutside from 'react-click-outside'
import cx from 'classnames'

import { Glyph, ICON_CLASSNAME } from '~/elements/Icon'
import { getPosition, getArrowStyle } from '~/components/Tooltip/utils'
import { WALLS, WALLS_KEYS, SIDES, SIDES_KEYS } from '~/components/Tooltip/consts'
import { hasCSSFilters } from '~/utils/featureDetects'
import { getClassName } from '~/components/aux/hoc/attachClassName'

export const TOOLTIP_WRAPPER_CLASSNAME = getClassName({ name: 'TooltipWrapper' })

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
    ? css`
          filter: drop-shadow(0 10px 10px rgba(0, 0, 0, 0.1));
        `
    : css`
          box-shadow: ${props.theme.boxShadow};
        `};

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

export class Tooltip extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    /** the wall on which the arrow will be displayed */
    wall: PropTypes.oneOf(WALLS_KEYS),
    /** the side of the wall - left or right - on which the arrow should be displayed */
    side: PropTypes.oneOf(SIDES_KEYS),
    /** object for overriding the style of the Tooltip content */
    contentStyle: PropTypes.object,
    /** force open state for tooltip */
    isOpen: PropTypes.bool,
    /** provide a custom trigger element, instead of the default info icon */
    customTrigger: PropTypes.func,
    /** callback on toggling the tooltip */
    onToggle: PropTypes.func,
    className: PropTypes.string,
  }
  static defaultProps = {
    wall: WALLS.top,
    side: SIDES.left,
    contentStyle: {},
    customTrigger: undefined,
    isOpen: null,
    onToggle: undefined,
    className: null,
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
  /** setTimeout hack is to call toggle function firstly instead of handleMouseEnter on safari ios **/
  handleMouseEnter = () => setTimeout(() => this.setState({ isHovered: true }), 0)
  setHoverToFalse = () => this.setState({ isHovered: false })
  handleClickOutside = () => {
    this.setState({ isOpen: false })
    this.props.onToggle && this.props.onToggle(false)
  }
  render() {
    const { isHovered } = this.state
    const { children, wall, side, contentStyle, customTrigger, className, ...props } = this.props
    const isTooltipOpen = this.props.isOpen !== null ? this.props.isOpen : this.state.isOpen
    const iconName = `tooltip${isHovered || isTooltipOpen ? 'Filled' : 'Empty'}`
    return (
      <TooltipWrapper
        isOpen={isTooltipOpen}
        isHovered={isHovered}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.setHoverToFalse}
        onTouchStart={this.setHoverToFalse}
        className={cx(getClassName(Tooltip), className)}
        {...props}
      >
        {customTrigger ? (
          customTrigger(this.toggle)
        ) : (
          <Glyph name={iconName} onClick={this.toggle} />
        )}
        {isTooltipOpen && (
          <TooltipContentWrapper
            className={TOOLTIP_WRAPPER_CLASSNAME}
            style={contentStyle}
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
