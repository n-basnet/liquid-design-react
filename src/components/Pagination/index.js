import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import attachClassName from '~/components/misc/hoc/attachClassName'
import { Glyph } from '~/elements/Icon'
import { cursorValue, media } from '~/utils/styling'
import { times } from '~/utils/misc'
import { NUMBER_SIZE, ICON_SIZE, STATES } from './consts'

export const PaginationWrapper = styled.div`
  height: ${NUMBER_SIZE}px;
  display: flex;
  ${props => css`
    div {
      border-radius: ${props.theme.borderRadius};
      ${cursorValue({ ...props, defaultValue: 'pointer' })};
    }
  `};
`
const ArrowIconWrapper = styled.div`
  flex: 0 0 ${NUMBER_SIZE * 2}px;
  display: flex;
  div {
    width: ${NUMBER_SIZE}px;
    height: ${NUMBER_SIZE}px;
    svg {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    ${props =>
    !props.disabled &&
    css`
      &:hover {
        ${media.min.tablet`
          background-color: ${props.theme.colors.primary.dark};
          svg {
            fill: ${props.theme.colors.white.base};
          }
        `};
        }
      }
    `};
    ${props => css`
      ${cursorValue({ ...props, defaultValue: 'pointer' })};
      svg {
        fill: ${props.disabled && props.theme.colors.sensitiveGrey.darker};
      }
    `};
  }
    ${props =>
    props.isOnLeft &&
    css`
      div:first-child {
        svg {
          left: 11px;
        }
      }
    `};
    ${props =>
    props.isOnRight &&
    css`
      div:last-child {
        svg {
          right: 11px;
        }
      }
    `};
  }
`

const PaginationNumber = styled.div`
  font-size: 14px;
  flex: 0 0 ${NUMBER_SIZE}px;
  height: ${NUMBER_SIZE}px;
  padding: 0 3px;
  text-align: center;
  line-height: ${NUMBER_SIZE}px;
  margin-left: 10px;
  margin-right: ${props => (props.isLast ? 10 : 0)}px;
  ${props =>
    !props.isTruncated &&
    media.max.phone`
    margin-left: 7.5px;
    margin-right: ${props => (props.isLast ? '7.5' : '0')}px;
  `};
  ${props =>
    !props.disabled &&
    css`
      &:hover {
        background-color: ${props.theme.colors.primary.dark};
        font-weight: ${props.theme.fontWeight.black};
        color: ${props.theme.colors.white.base};
      }
    `};
  ${props =>
    props.isTruncated &&
    css`
      pointer-events: none;
      margin-right: 0;
      margin-left: 0;
      min-width: 9px;
      font-weight: 600;
      letter-spacing: 0.5px;
      padding-right: 0;
]    `};
  ${props =>
    props.isActive &&
    css`
      background-color: ${props.theme.colors.primary.base};
      color: ${props.theme.colors.white.base};
      font-weight: ${props.theme.fontWeight.black};
    `};
  ${props =>
    props.areItemsOverThousandInPaginationItems &&
    css`
      ${media.max.phone`
        margin-left: 3px;
        margin-right: ${props => (props.isLast ? '3' : '0')}px;
      `};
    `};
  ${props =>
    props.areItemsOverHundredInPaginationItems &&
    css`
      padding: 0 4px;
    `};
  ${props =>
    props.disabled &&
    css`
      color: ${props.theme.colors.sensitiveGrey.darkest};
    `};
  ${props =>
    props.disabled &&
    props.isActive &&
    css`
      background-color: ${props.theme.colors.sensitiveGrey.darker};
      color: ${props.theme.colors.white.base};
    `};
`

export class Pagination extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    itemsPerPage: PropTypes.number,
    firstPage: PropTypes.number,
    disabled: PropTypes.bool,
    paginationNumberAmount: PropTypes.number,
  }

  static defaultProps = {
    itemsPerPage: 20,
    firstPage: 1,
    disabled: false,
    paginationNumberAmount: 5,
  }

  state = {
    activePageIndex: 0,
  }

  getPaginationItems = () => {
    const { activePageIndex } = this.state
    const { paginationNumberAmount } = this.props
    const lastPageIndex = this.getLastPageIndex()
    const indexDistance = Math.floor(paginationNumberAmount / 2)

    switch (true) {
      case activePageIndex <= 1:
        return times(paginationNumberAmount).slice(0, paginationNumberAmount)
      case activePageIndex >= lastPageIndex - 1:
        return times(lastPageIndex + 1).slice(lastPageIndex - paginationNumberAmount + 1)
      case activePageIndex > 1:
        return times(activePageIndex + indexDistance + 1).slice(activePageIndex - indexDistance)
    }
  }

  getLastPageIndex = () => {
    const { children, itemsPerPage } = this.props
    return Math.ceil(children.length / itemsPerPage) - 1
  }

  getPageItems = () => {
    const { activePageIndex } = this.state
    const { children, itemsPerPage } = this.props
    return children.slice(activePageIndex * itemsPerPage, (activePageIndex + 1) * itemsPerPage)
  }

  setActivePageIndex = index => this.setState({ activePageIndex: index })

  onArrowClickHandler = (type, e) => {
    const { activePageIndex } = this.state
    const { disabled } = this.props
    const lastPageIndex = this.getLastPageIndex()

    if (!disabled) {
      switch (type) {
        case STATES.NEXT_PAGE:
          activePageIndex < lastPageIndex && this.setActivePageIndex(activePageIndex + 1, e)
          break
        case STATES.PREVIOUS_PAGE:
          activePageIndex && this.setActivePageIndex(activePageIndex - 1, e)
          break
        case STATES.FIRST_PAGE:
          this.setActivePageIndex(0, e)
          break
        case STATES.LAST_PAGE:
          this.setActivePageIndex(lastPageIndex, e)
          break
      }
    }
  }

  shouldTruncate = index => {
    const { activePageIndex } = this.state
    const lastPageIndex = this.getLastPageIndex()
    const paginationItems = this.getPaginationItems()
    return activePageIndex < lastPageIndex - 1 && index === paginationItems.length - 1
  }

  render () {
    const { activePageIndex } = this.state
    const { disabled, paginationNumberAmount, ...props } = this.props

    const lastPageIndex = this.getLastPageIndex()
    const pageItems = this.getPageItems()
    const paginationItems = this.getPaginationItems()

    const isLeftArrowDisabled = activePageIndex === 0
    const isRightArrowDisabled = activePageIndex === lastPageIndex

    return (
      <Fragment>
        {pageItems}
        <PaginationWrapper disabled={disabled} {...props}>
          <ArrowIconWrapper isOnLeft disabled={disabled || isLeftArrowDisabled}>
            <Glyph
              size={ICON_SIZE}
              name='arrowDoubleLeft'
              onClick={() => this.onArrowClickHandler(STATES.FIRST_PAGE)}
            />
            <Glyph
              size={ICON_SIZE}
              name='arrowLeft'
              onClick={() => this.onArrowClickHandler(STATES.PREVIOUS_PAGE)}
            />
          </ArrowIconWrapper>
          {paginationItems.map((item, index) => (
            <PaginationNumber
              key={item}
              onClick={!disabled ? () => this.setActivePageIndex(item) : null}
              isActive={item === activePageIndex}
              isLast={item === lastPageIndex}
              disabled={disabled}
              isTruncated={this.shouldTruncate(index)}
              areItemsOverHundredInPaginationItems={
                paginationNumberAmount > 4 && activePageIndex + 1 >= 100
              }
              areItemsOverThousandInPaginationItems={
                paginationNumberAmount > 4 && activePageIndex + 1 >= 1000
              }
            >
              {this.shouldTruncate(index) ? '...' : item + 1}
            </PaginationNumber>
          ))}
          <ArrowIconWrapper isOnRight disabled={disabled || isRightArrowDisabled}>
            <Glyph
              size={ICON_SIZE}
              name='arrowRight'
              onClick={() => this.onArrowClickHandler(STATES.NEXT_PAGE)}
            />
            <Glyph
              size={ICON_SIZE}
              name='arrowDoubleRight'
              onClick={() => this.onArrowClickHandler(STATES.LAST_PAGE)}
            />
          </ArrowIconWrapper>
        </PaginationWrapper>
      </Fragment>
    )
  }
}

const { Component } = attachClassName(Pagination)

export default Component
