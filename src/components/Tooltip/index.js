import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import enhanceWithClickOutside from 'react-click-outside'

import Icon, { ICON_CLASSNAME } from '~/elements/Icon'
import { getPosition, getArrowStyle } from '~/components/Tooltip/utils'
import {
  WALLS,
  WALLS_KEYS,
  SIDES,
  SIDES_KEYS,
} from '~/components/Tooltip/consts'
import { hasCSSFilters } from '~/utils/featureDetects'

const getIconColor = props =>
  props.isOpen ? 'darker' : props.isHovered ? 'dark' : 'base'

const TooltipWrapper = styled.span`
  position: relative;
  ${props => css`
    .${ICON_CLASSNAME} svg {
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
    background-color: ${props.theme.colors.white};
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
    color: props.theme.colors.white,
    wall: props.wall,
    side: props.side,
  })};
          `};
        }
      `};
  `};
`

export class Tooltip extends React.PureComponent {
  state = {
    isOpen: false,
  }
  handleClick = () => this.setState(({ isOpen }) => ({ isOpen: !isOpen }))
  handleMouseEnter = () => this.setState({ isHovered: true })
  handleMouseLeave = () => this.setState({ isHovered: false })
  handleClickOutside = () => this.setState({ isOpen: false })
  render() {
    const { isOpen, isHovered } = this.state
    const { children, wall, side } = this.props
    return (
      <TooltipWrapper
        isOpen={isOpen}
        isHovered={isHovered}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Icon
          name={`info${isHovered || isOpen ? 'Filled' : 'Circle'}`}
          onClick={this.handleClick}
        />
        {isOpen && (
          <TooltipContentWrapper wall={wall} side={side}>
            {children}
          </TooltipContentWrapper>
        )}
      </TooltipWrapper>
    )
  }
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  /** the wall on which the arrow will be displayed */
  wall: PropTypes.oneOf(WALLS_KEYS),
  /** the side of the wall - left or right - on which the arrow should be displayed */
  side: PropTypes.oneOf(SIDES_KEYS),
}

Tooltip.defaultProps = {
  wall: WALLS.top,
  side: SIDES.left,
}

Tooltip.displayName = 'Tooltip'

export default enhanceWithClickOutside(Tooltip)
