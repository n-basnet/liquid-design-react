import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import enhanceWithClickOutside from 'react-click-outside'
import dateFns from 'date-fns'
import { isEmpty, isNil } from 'ramda'

import { media } from '../../utils/styling'
import { FORMATS } from '../../utils/consts/dates'
import { Glyph, ICON_CLASSNAME } from '../../elements/Icon'

const getRangeBeforeStyles = props => css`
  background-color: ${props.theme.colors.white.base};
  content: '';
  width: 25px;
  height: 31px;
  position: absolute;
  top: 0;
  ${media.max.phone`
    width: 15px;
    height: 21px;
  `};
  ${props.isEndOfRange &&
    props.isFirst &&
    !props.isStartOfRange &&
    css`
      ${media.max.phone`
        left: 0;
        width: 35px;
      `};
    `};
`

const DayCellWrapper = styled.div`
  display: inline-block;
  position: relative;
  padding: 0 9px;
  .${ICON_CLASSNAME} {
    position: absolute;
    left: 25.8px;
    ${media.max.phone`
      left: 46%;
    `};
  }
  &:first-child {
    .${ICON_CLASSNAME} {
      left: 12.8px;
    }
  }
  &:last-child {
    padding-right: 0;
    .${ICON_CLASSNAME} {
      left: 58%;
      ${media.max.phone`
          left: 57%;
        `};
    }
  }
  ${props =>
    props.disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `};
  ${props =>
    props.isWithinRange &&
    css`
      background-color: ${props.theme.colors.primary.lightest};
    `};
  ${props =>
    props.isStartOfRange &&
    !props.isOutOfMonth &&
    css`
      &:before {
        ${getRangeBeforeStyles(props)};
        left: 0;
      }
    `};
  ${props =>
    props.isEndOfRange &&
    !props.isOutOfMonth &&
    css`
      &:before {
        ${getRangeBeforeStyles(props)};
        right: 0;
      }
    `};
  ${props =>
    (props.isHovered || props.isSelected) &&
    css`
      .${ICON_CLASSNAME} {
        display: none;
      }
    `};
  ${props =>
    props.isSelected &&
    props.isOverlayOpen &&
    css`
      &:after {
        content: '';
        position: absolute;
        top: -15px;
        left: 34%;
        width: 0;
        height: 0;
        border-left: 11px solid transparent;
        border-right: 11px solid transparent;
        border-top: 11px solid ${props.theme.colors.secondary.base};
        z-index: ${props.theme.zIndex.tooltips};
        ${media.max.phone`
          left: 25%;
        `};
      }
    `};
  ${props =>
    props.isFirst &&
    css`
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      padding-left: 0;
      margin-left: 9px;
      ${media.max.phone`
        margin-left: 6.1px;
      `};
    `};
  ${props =>
    props.isLast &&
    css`
      ${media.max.phone`
      margin-left: -1px;
    `};
    `};
  ${props =>
    ((props.isEndOfRange && props.isOutOfMonth) || props.isLast) &&
    css`
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    `};
  ${media.max.phone`
    padding: 0 6.1px;
  `};
`
export const DayContainer = styled.div`
  font-size: 16px;
  line-height: 1.75;
  border: 1.4px solid transparent;
  text-align: center;
  width: 31px;
  height: 31px;
  cursor: pointer;
  position: relative;

  ${media.max.phone`
    font-size: 12px;
    line-height: 1.25;
    letter-spacing: 0.2px;
    width: 21px;
    height: 21px;
    padding-top: 1px;
  `};
  ${props =>
    props.disabled &&
    css`
      color: ${props.theme.colors.richBlack.lightest};
    `};
  ${props => css`
    border-radius: ${props.theme.borderRadius};
    ${props.isFirst
      ? css`
          margin-left: 0;
        `
      : css`
          margin-left: 4.6px;
          ${media.max.phone`
              margin-left: 3.8px;
            `};
        `};
  `};
  ${props =>
    (props.isSelected && !props.isOutOfMonth) ||
    (!props.isOutOfMonth && props.isHovered)
      ? css`
          color: ${props.theme.colors.white.base};
          border-color: ${props.theme.colors.primary.base};
          background-color: ${props.theme.colors.primary.base};
          font-weight: ${props.theme.fontWeight.black};
        `
      : props.isCurrent
      ? css`
          color: ${props.theme.colors.primary.base};
          border-color: ${props.theme.colors.primary.base};
        `
      : props.isOutOfMonth
      ? css`
          color: ${props.theme.colors.richBlack.lightest};
          cursor: not-allowed;
        `
      : css``};
`

const OverlayWrapper = styled.div`
  position: absolute;
  bottom: 100%;
  padding: 8px 10px 8px 13px;
  bottom: calc(100% + 14px);
  max-width: 250px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.02), 0 9px 7px rgba(0, 0, 0, 0.02);
  ${props => css`
    background-color: ${props.theme.colors.secondary.base};
    border-radius: ${props.theme.borderRadius};
    z-index: ${props.theme.zIndex.tooltips};
    display: ${props.isOpen ? 'block' : 'none'};
    ${props.theme.hasWhiteText &&
      css`
        color: ${props.theme.colors.white.base};
      `};
    }
  `};

  ${props =>
    props.isFirst
      ? css`
          left: -20%;
        `
      : props.isLast
      ? css`
          right: -40%;
        `
      : css`
          right: -125%;
        `};
`
const TextRow = styled.div`
  white-space: nowrap;
  font-size: 14px;
  line-height: 1.25;
`
const Overlay = ({ appointments, isOpen, isLast, isFirst }) => (
  <OverlayWrapper isOpen={isOpen} isLast={isLast} isFirst={isFirst}>
    {appointments.map(appointment => (
      <TextRow key={appointment.time}>
        <strong>{appointment.time} </strong>
        <span>{appointment.description}</span>
      </TextRow>
    ))}
  </OverlayWrapper>
)
Overlay.propTypes = {
  appointments: PropTypes.array.isRequired,
  isOpen: PropTypes.bool,
  isLast: PropTypes.bool,
  isFirst: PropTypes.bool,
}
Overlay.defaultProps = {
  isOpen: false,
  isLast: false,
  isFirst: false,
}

export class DayCell extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    day: PropTypes.instanceOf(Date).isRequired,
    today: PropTypes.instanceOf(Date).isRequired,
    isOutOfMonth: PropTypes.bool,
    isCurrent: PropTypes.bool,
    isSelected: PropTypes.bool,
    appointments: PropTypes.array,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    rangeMode: PropTypes.bool,
    isWithinRange: PropTypes.bool,
    isStartOfRange: PropTypes.bool,
    isEndOfRange: PropTypes.bool,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    isOutOfMonth: false,
    isCurrent: false,
    isSelected: false,
    appointments: null,
    isFirst: false,
    isLast: false,
    rangeMode: false,
    isWithinRange: false,
    isStartOfRange: false,
    isEndOfRange: false,
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    disabled: false,
  }

  state = {
    isHovered: false,
    isOverlayOpen: false,
  }

  hasAppointments = () =>
    !isNil(this.props.appointments) && !isEmpty(this.props.appointments)

  handleClickOutside = () => {
    this.setState({ isOverlayOpen: false, isHovered: false })
  }

  isHandlingHover = componentName => {
    return (
      (this.props.rangeMode && componentName === 'DayCellWrapper') ||
      (!this.props.rangeMode && componentName === 'DayContainer')
    )
  }

  handleMouseEnter = componentName => {
    if (this.isHandlingHover(componentName)) {
      this.setState({ isHovered: true })
      this.props.onMouseEnter()
    }
  }

  handleMouseLeave = componentName => {
    if (this.isHandlingHover(componentName)) {
      this.setState({ isHovered: false })
      this.props.onMouseLeave()
    }
  }

  toggleOverlayVisibility = () =>
    this.setState(({ isOverlayOpen }) => ({ isOverlayOpen: !isOverlayOpen }))

  cellClickHandler = () => {
    const { onClick } = this.props
    onClick()
    if (this.hasAppointments()) {
      this.toggleOverlayVisibility()
    }
  }

  render() {
    const {
      isSelected,
      isCurrent,
      isFirst,
      isLast,
      isOutOfMonth,
      isWithinRange,
      isStartOfRange,
      isEndOfRange,
      appointments,
      today,
      day,
      disabled,
    } = this.props
    const { isHovered, isOverlayOpen } = this.state
    const formattedDate = dateFns.format(day, FORMATS.MONTH_DAY_FORMAT)

    return (
      <DayCellWrapper
        isHovered={isHovered}
        isSelected={isSelected}
        isOverlayOpen={isOverlayOpen}
        isWithinRange={isWithinRange}
        isStartOfRange={isStartOfRange}
        isEndOfRange={isEndOfRange}
        isOutOfMonth={isOutOfMonth}
        isFirst={isFirst}
        isLast={isLast}
        disabled={disabled}
        onClick={this.cellClickHandler}
        onMouseEnter={() => this.handleMouseEnter('DayCellWrapper')}
        onMouseLeave={() => {
          this.handleMouseLeave('DayCellWrapper')
        }}
      >
        <DayContainer
          isHovered={isHovered}
          isSelected={isSelected}
          isCurrent={isCurrent}
          isFirst={isFirst}
          isOutOfMonth={isOutOfMonth}
          onMouseEnter={() => {
            this.handleMouseEnter('DayContainer')
          }}
          onMouseLeave={() => {
            this.handleMouseLeave('DayContainer')
          }}
          disabled={disabled}
        >
          {formattedDate}
        </DayContainer>
        {this.hasAppointments() ? (
          <>
            <Glyph
              name="dot"
              size={6}
              color={
                dateFns.isBefore(day, today) || isOutOfMonth
                  ? 'sensitiveGrey.darkest'
                  : undefined
              }
            />
            <Overlay
              appointments={appointments}
              isOpen={isOverlayOpen}
              isFirst={isFirst}
              isLast={isLast}
            />
          </>
        ) : null}
      </DayCellWrapper>
    )
  }
}

export default enhanceWithClickOutside(DayCell)
