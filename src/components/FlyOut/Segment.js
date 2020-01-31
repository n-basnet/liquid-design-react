import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { isEmpty } from 'ramda'

import { Glyph, ICON_CLASSNAME } from '../../elements/Icon'
import {
  flyOutPropTypes,
  flyOutDefaultProps,
} from '../../components/FlyOut/propTypes'
import Ellipsis from '../../components/misc/Ellipsis'

export const SegmentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 9px 15px 11px;
  font-size: 14px;

  ${props => css`
    transition: ${props.theme.transition};

    .${ICON_CLASSNAME} {
      transition: ${props.theme.transition};
    }

    ${!props.isLast &&
      css`
        border-bottom: 1px solid ${props.theme.colors.sensitiveGrey.dark};
      `};
    ${props.isHeadline
      ? css`
          font-weight: ${props.theme.fontWeight.black};
        `
      : css`
          cursor: pointer;
          &:hover,
          &:focus {
            color: ${props.theme.colors.primary.base};
            font-weight: ${props.theme.fontWeight.black};
          }
          &:focus {
            outline: none;
          }
          ${props.isHighlighted
            ? css`
                background-color: ${props.theme.colors.sensitiveGrey.base};
                &:focus,
                &:hover {
                  background-color: ${props.theme.colors.sensitiveGrey.darker};
                }
              `
            : css`
                &:hover {
                  background-color: ${props.theme.colors.sensitiveGrey.base};
                }
                &:focus {
                  background-color: ${props.theme.colors.sensitiveGrey.darker};
                }
              `};
        `};
    ${!props.isExpanded &&
      css`
        .${ICON_CLASSNAME} {
          transform: rotate(180deg);
        }
      `};
  `};
`

export default class Segment extends PureComponent {
  static propTypes = {
    ...flyOutPropTypes,
    style: PropTypes.object,
    depthIndex: PropTypes.number.isRequired,
    isLast: PropTypes.bool,
    isTopLevel: PropTypes.bool,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    ...flyOutDefaultProps,
    style: {},
    isLast: false,
    isTopLevel: false,
    onClick: null,
  }

  state = {
    isExpanded: false,
  }

  hasOptions = () => !isEmpty(this.props.options)
  handleClick = () => {
    this.hasOptions() &&
      this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }))
    this.props.onClick && this.props.onClick()
  }

  handleKeyDown = e => e.key === 'Enter' && this.handleClick()

  calculateIndentationPadding = depthIndex => ({
    paddingLeft: `${depthIndex * 10 + 15}px`,
  })

  render() {
    const { name, options, style, depthIndex, isLast, isTopLevel } = this.props
    const { isExpanded } = this.state

    return (
      <>
        <SegmentWrapper
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          isExpanded={isExpanded}
          style={style}
          isLast={isLast}
          isHighlighted={isExpanded || !isTopLevel}
          tabIndex="0"
          role="button"
        >
          <Ellipsis>{name}</Ellipsis>
          {this.hasOptions() && <Glyph size={20} name="arrowTop" />}
        </SegmentWrapper>
        {isExpanded &&
          options.map((option, i) => (
            <Segment
              style={this.calculateIndentationPadding(depthIndex)}
              key={i}
              depthIndex={depthIndex + 1}
              {...option}
            />
          ))}
      </>
    )
  }
}
