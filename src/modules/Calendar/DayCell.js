import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import enhanceWithClickOutside from 'react-click-outside'
import dateFns from 'date-fns'
import { isEmpty, isNil } from 'ramda'

import { media } from '~/utils/styling'
import { Glyph, ICON_CLASSNAME } from '~/elements/Icon'

const DayCellWrapper = styled.div`
  display: inline-block;
  position: relative;
  padding: 0 9px;
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
  ${media.max.phone`
    padding: 0 6.1px;
  `};
  .${ICON_CLASSNAME} {
    position: absolute;
    left: 25.8px;
    ${media.max.phone`
      left: 46%;
    `};
  }
`
export const DayContainer = styled.div`
  font-size: 16px;
  line-height: 1.75;
  border: 1.4px solid transparent;
  text-align: center;
  width: 31px;
  height: 31px;
  cursor: pointer;

  ${media.max.phone`
    font-size: 12px;
    line-height: 1.25;
    letter-spacing: 0.2px;
    width: 21px;
    height: 21px;
    padding-top: 1.5px;
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
    props.isSelected || (!props.isOutOfMonth && props.isHovered)
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
    isOutOfMonth: PropTypes.bool,
    isCurrent: PropTypes.bool,
    isSelected: PropTypes.bool,
    appointments: PropTypes.array,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
  }
  static defaultProps = {
    isOutOfMonth: false,
    isCurrent: false,
    isSelected: false,
    appointments: null,
    isFirst: false,
    isLast: false,
  }
  state = {
    isHovered: false,
    isOverlayOpen: false,
  }

  hasAppointments = () => !isNil(this.props.appointments) && !isEmpty(this.props.appointments)
  handleClickOutside = () => {
    this.setState({ isOverlayOpen: false, isHovered: false })
  }
  handleMouseEnter = () => this.setState({ isHovered: true })
  handleMouseLeave = () => this.setState({ isHovered: false })
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
    const { isSelected, isCurrent, isFirst, isLast, isOutOfMonth, appointments, day } = this.props
    const { isHovered, isOverlayOpen } = this.state
    const dayFormat = 'D'
    const formattedDate = dateFns.format(day, dayFormat)

    return (
      <DayCellWrapper isHovered={isHovered} isSelected={isSelected} isOverlayOpen={isOverlayOpen}>
        <DayContainer
          isHovered={isHovered}
          isSelected={isSelected}
          isCurrent={isCurrent}
          isFirst={isFirst}
          isOutOfMonth={isOutOfMonth}
          onClick={this.cellClickHandler}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {formattedDate}
        </DayContainer>
        {this.hasAppointments() ? (
          <Fragment>
            <Glyph
              name='dot'
              size={6}
              color={dateFns.isPast(day) || isOutOfMonth ? 'sensitiveGrey.darkest' : undefined}
            />
            <Overlay
              appointments={appointments}
              isOpen={isOverlayOpen}
              isFirst={isFirst}
              isLast={isLast}
            />
          </Fragment>
        ) : null}
      </DayCellWrapper>
    )
  }
}

export default enhanceWithClickOutside(DayCell)
