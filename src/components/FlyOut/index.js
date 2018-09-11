import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { find, values } from 'ramda'
import cx from 'classnames'

import Tooltip, { TOOLTIP_WRAPPER_CLASSNAME } from '~/components/Tooltip'
import Icon, { ICON_CLASSNAME } from '~/elements/Icon'
import FlyOutContent from '~/components/FlyOut/FlyOutContent'
import { flyOutPropTypes, flyOutDefaultProps } from '~/components/FlyOut/propTypes'
import { cursorValue } from '~/utils/styling'
import { hasCSSFilters } from '~/utils/featureDetects'
import withResizeListener from '~/components/aux/hoc/withResizeListener'
import { getClassName } from '~/components/aux/hoc/attachClassName'

const WIDTHS = {
  max: 500,
  mid: 250,
  min: 150,
}

const getLabelStyle = props => css`
  color: ${props.theme.colors[props.disabled || !props.isOpen ? 'black' : 'primary'].base};
  padding-right: ${props.isOpen && !props.disabled ? 10 : 13}px;
  transform: translateY(-${props.alignLeft ? 1 : 2}px)
    ${props.isOpen && !props.disabled && !props.alignLeft && `translateX(-3px)`};
  ${!props.disabled &&
    css`
      font-weight: ${props.theme.fontWeight[props.isOpen ? 'black' : 'regular']};
    `};
`

const TooltipTriggerWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  .${ICON_CLASSNAME} {
    transform: translateY(-1px);
  }
  ${props => css`
    ${cursorValue({ ...props, defaultValue: 'pointer' })};
    &:hover span {
      ${getLabelStyle({ ...props, isOpen: true })};
    }
  `};
`

const LabelWrapper = styled.span`
  display: inline-block;
  padding-left: 10px;
  font-size: 14px;
  ${getLabelStyle};
`

const FlyOutWrapper = styled.div`
  ${props =>
    props.disabled &&
    css`
      opacity: 0.3;
    `};
  ${props => css`
    .${TOOLTIP_WRAPPER_CLASSNAME} {
      ${hasCSSFilters()
    ? `filter: drop-shadow(0 33px 20px rgba(0,0,0,0.2));`
    : `box-shadow: ${props.theme.doubleBoxShadow};`};
      ${!props.width &&
        css`
          max-width: ${props.maxWidth}px;
          min-width: ${props.maxWidth >= WIDTHS.mid ? WIDTHS.mid : WIDTHS.min}px;
        `};
      width: ${props.width ? `${props.width}px` : 'auto'};
    }
  `};
  ${props =>
    props.alignCenter &&
    css`
      .${TOOLTIP_WRAPPER_CLASSNAME}:after {
        left: 0;
        right: 0;
        margin: auto;
      }
    `};
`

@withResizeListener
export default class FlyOut extends PureComponent {
  static propTypes = {
    name: flyOutPropTypes.name,
    options: flyOutPropTypes.options,
    label: PropTypes.string,
    alignLeft: PropTypes.bool,
    disabled: PropTypes.bool,
    width: PropTypes.number,
    className: PropTypes.string,
  }

  static defaultProps = {
    name: flyOutDefaultProps.name,
    options: flyOutDefaultProps.options,
    label: null,
    alignLeft: false,
    disabled: false,
    width: null,
    className: null,
  }
  state = {
    isOpen: false,
    tooltipWidth: 'auto',
  }
  setIsOpen = isOpen => {
    this.setState(
      {
        isOpen,
        ...(isOpen && { tooltipWidth: 'auto' }),
      },
      this.handleResize
    )
  }
  handleResize = () => {
    if (!this.props.width && this.state.isOpen && this.flyOutContentRef) {
      const windowWidth = window.innerWidth
      const { left, right, width } = this.flyOutContentRef.getBoundingClientRect()

      const widthsArray = this.isCenterAligned() ? [WIDTHS.min] : WIDTHS

      const center = width / 2 + left
      const centerAlignedRemainingSpace = Math.min(windowWidth - center, center) * 2
      const remainingSpace = this.isCenterAligned()
        ? centerAlignedRemainingSpace
        : this.props.alignLeft ? windowWidth - left : right

      this.setState({
        tooltipWidth: find(width => width <= remainingSpace, values(widthsArray)),
      })
    }
  }
  isCenterAligned = () => !this.props.label
  renderLabel = () =>
    this.props.label && (
      <LabelWrapper
        alignLeft={this.props.alignLeft}
        disabled={this.props.disabled}
        isOpen={this.state.isOpen}
      >
        {this.props.label}
      </LabelWrapper>
    )
  render() {
    const { name, options, alignLeft, disabled, width, className, ...props } = this.props
    const iconSize = this.isCenterAligned() ? 20 : 15
    const tooltipTranslateX = this.isCenterAligned()
      ? `translateX(50%) translateX(-${iconSize}px)`
      : alignLeft ? 'translateX(-7px)' : 'translateX(6px)'
    return (
      <FlyOutWrapper
        alignCenter={this.isCenterAligned()}
        disabled={disabled}
        maxWidth={this.state.tooltipWidth}
        width={width}
        className={cx(getClassName(FlyOut), className)}
        {...props}
      >
        <Tooltip
          contentStyle={{
            padding: 0,
            transform: `${tooltipTranslateX} translateY(${this.isCenterAligned() ? 2 : 6}px)`,
          }}
          side={alignLeft ? 'left' : 'right'}
          customTrigger={toggle => (
            <TooltipTriggerWrapper
              onClick={disabled ? undefined : toggle}
              alignLeft={alignLeft}
              disabled={disabled}
            >
              {!alignLeft && this.renderLabel()}
              <Icon name='dots' size={iconSize} color={disabled ? 'black.base' : undefined} />
              {alignLeft && this.renderLabel()}
            </TooltipTriggerWrapper>
          )}
          onToggle={this.setIsOpen}
        >
          <FlyOutContent name={name} options={options} getRef={v => (this.flyOutContentRef = v)} />
        </Tooltip>
      </FlyOutWrapper>
    )
  }
}
