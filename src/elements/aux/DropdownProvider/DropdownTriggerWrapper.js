import styled, { css } from 'styled-components'

import { media } from '~/utils/styling'

const getActiveState = props => css`
  color: ${props.theme.colors.primary.base};
  font-weight: ${props.theme.fontWeight.black};
`

export default styled.div`
  display: ${props => (props.isFilter ? 'flex' : 'inline-flex')};
  width: 100%;
  line-height: 26px;
  border-bottom: 1px solid transparent;
  ${props => css`
    justify-content: ${props.inline ? 'flex-end' : 'space-between'};
    align-items: center;
    padding: ${props.inline ? '8px 15px 7px 15px' : '6px 11px 5px 15px'};
    ${media.max.phone`
      padding: ${
  props.isFilter
    ? '11px 13px 4px 13px'
    : props.inline ? '11px 20px 10px 15px' : '11px 12px 10px 15px'
};
    `};
    ${props.hasValue && getActiveState};
    &:focus {
      outline: none;
    }
  `};
  ${props =>
    props.isExpanded &&
    css`
      border-bottom-color: ${props.theme.colors.sensitiveGrey.base};
    `};
  ${props =>
    props.isFilter &&
    css`
      padding: 4px 4px 4px 0;
    `};
`
