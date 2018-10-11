import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { tabsPropTypes, tabsDefaultProps } from '~/components/Tabs/propTypes'
import { cursorValue } from '~/utils/styling'

const TabHeadWrapper = styled.div`
  display: inline-block;
  width: 150px;
  min-width: 150px;
  ${props =>
    props.appearance === 'bar' &&
    props.id === 0 &&
    css`
      border-radius: 5px 0 0 5px;
      overflow: hidden;
    `};
  ${props =>
    props.appearance === 'bar' &&
    props.id === props.lastid &&
    css`
      border-radius: 0 5px 5px 0;
      overflow: hidden;
    `};
  button {
    width: 150px;
    min-width: 150px;
    height: ${props => (props.appearance === 'sticky' ? '50px' : '40px')};
    background: ${props => props.theme.colors.sensitiveGrey.base};
    padding: 2px 15px 0 15px;
    border: none;
    border-bottom: ${props =>
    props.active
      ? `solid 2px ${props.theme.colors.primary.base}`
      : `solid 2px ${props.theme.colors.sensitiveGrey.base}`};
    font-size: 16px;
    font-weight: ${props => props.active && props.theme.fontWeight.black};
    color: ${props => props.active && props.theme.colors.primary.base};
    transition: ${props => props.theme.transition};
    outline: 0;
    opacity: ${props => (props.disabled ? 0.5 : 1)};
    color: ${props => props.disabled && props.theme.colors.richBlack.base};
    ${props => css`
      ${cursorValue({ ...props, defaultValue: 'pointer' })};
    `};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ::-moz-focus-inner {
      border: 0;
    }
  }
`

const TabHead = ({ appearance, children, id, disabled, selectedTabId, lastTabId, onClick }) => (
  <TabHeadWrapper
    appearance={appearance}
    disabled={disabled}
    id={id}
    active={id === selectedTabId}
    lastid={lastTabId}
    onClick={onClick}
  >
    <button
      appearance={appearance}
      disabled={disabled}
      id={id}
      active={`${id === selectedTabId}`}
      lastid={lastTabId}
      onClick={onClick}
    >
      {children}
    </button>
  </TabHeadWrapper>
)

TabHead.propTypes = {
  appearance: tabsPropTypes.appearance,
  // eslint-disable-next-line react/require-default-props
  children: tabsPropTypes.children,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  id: tabsPropTypes.id,
  // eslint-disable-next-line react/require-default-props
  selectedTabId: tabsPropTypes.selectedTabId,
  onClick: PropTypes.func.isRequired,
  lastTabId: PropTypes.number.isRequired,
}

TabHead.defaultProps = {
  appearance: tabsDefaultProps.appearance,
  disabled: false,
}

export default TabHead
