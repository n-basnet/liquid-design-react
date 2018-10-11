import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Placeholder from '~/elements/Placeholder'
import { getDeterministicPlaceholderText } from '../../helpers'

const Label = styled.span`
  display: block;
  font-size: 12px;
  margin-bottom: 3px;
  ${props => css`
    color: ${props.theme.colors.richBlack.lightest};
  `};
`

export const ColumnCell = id => <span>Column {(id + 1).toString().padStart(2, '0')}</span>

const NameCellWrapper = styled.span`
  display: flex;
  align-items: center;
`

export const NameCell = ({ rowIndex, withMoreContent, withImages }) => (
  <NameCellWrapper>
    {withImages && (
      <Placeholder
        width={40}
        style={{ marginRight: '9px', marginBottom: '-2px', maxHeight: '40px' }}
      />
    )}
    <span>
      {withMoreContent && <Label>label {rowIndex}</Label>}
      <strong>Name {rowIndex}</strong> Info
    </span>
  </NameCellWrapper>
)

NameCell.propTypes = {
  rowIndex: PropTypes.number.isRequired,
  withMoreContent: PropTypes.bool,
  withImages: PropTypes.bool,
}

NameCell.defaultProps = {
  withMoreContent: false,
  withImages: false,
}

export const RegularCell = ({ placeholderSeed, withMoreContent }) => {
  const labelContent = getDeterministicPlaceholderText(placeholderSeed, 2)
  const textContent = getDeterministicPlaceholderText(placeholderSeed + 10)
  return (
    <span>
      {withMoreContent && <Label>{labelContent}</Label>}
      {textContent}
    </span>
  )
}
RegularCell.propTypes = {
  placeholderSeed: PropTypes.number.isRequired,
  withMoreContent: PropTypes.bool,
}

RegularCell.defaultProps = {
  withMoreContent: false,
}

// -webkit-text-size-adjust - for mobile safari (https://stackoverflow.com/a/5540312)
export const RowInfoWrapper = styled.div`
  padding-bottom: 18px;
  padding-right: 20px;
  line-height: 1.7;
  -webkit-text-size-adjust: 100%;
`
