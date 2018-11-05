import styled, { css } from 'styled-components'

import { cursorValue } from '~/utils/styling'

export const TablePaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  white-space: nowrap;
  max-width: 100%;
  overflow: scroll;
  > div {
    flex-shrink: 0;
  }
  ${props => css`
    background-color: ${props.theme.colors.white.base};
    ${props.isDisplayedBelowTable
    ? css`
          border-bottom-left-radius: ${props.theme.borderRadius};
          border-bottom-right-radius: ${props.theme.borderRadius};
        `
    : css`
          border-top-left-radius: ${props.theme.borderRadius};
          border-top-right-radius: ${props.theme.borderRadius};
        `};
  `};
`

export const Section = styled.div`
  display: inline-flex;
  align-items: center;
`

export const PerPageSection = styled(Section)`
  padding-left: 25px;
  span:first-child {
    padding-right: 10px;
  }
`

export const ItemsSection = styled(Section)`
  padding-right: 13px;
`

export const ClickableSection = styled.div.attrs({
  'data-test-value': props => props['data-test'],
})`
  position: relative;
  z-index: 1;
  max-height: 32px;
  padding: 4px 8px;
  cursor: pointer;
  ${props => css`
    border-left: 1px solid ${props.theme.colors.sensitiveGrey.base};
    ${cursorValue({ ...props, defaultValue: 'pointer' })};
  `};
  &:hover {
    ${props =>
    !props.disabled &&
      css`
        background-color: ${props.theme.colors.sensitiveGrey.dark};
      `};
  }
  &:last-child {
    padding-right: 19px;
    ${props =>
    props.isDisplayedBelowTable
      ? css`
            border-bottom-right-radius: ${props.theme.borderRadius};
          `
      : css`
            border-top-right-radius: ${props.theme.borderRadius};
          `};
  }
`

export const Separator = styled.span`
  margin-left: 13px;
  margin-right: 24px;
`
