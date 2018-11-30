import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Placeholder from '~/elements/Placeholder'

const Label = styled.span`
  display: block;
  font-size: 12px;
  margin-bottom: 3px;
  ${props => css`
    color: ${props.theme.colors.richBlack.lightest};
  `};
`

export const RegularCell = ({ value, label, withMoreContent }) => (
  <span>
    {withMoreContent && <Label>{label}</Label>}
    {value}
  </span>
)

RegularCell.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  withMoreContent: PropTypes.bool,
}

RegularCell.defaultProps = {
  withMoreContent: false,
}

const NameCellWrapper = styled.span`
  display: flex;
`

export const NameCell = ({ value, auxText, label, withMoreContent, withImages }) => (
  <NameCellWrapper>
    {withImages && (
      <Placeholder
        width={40}
        style={{ marginRight: '9px', marginBottom: '-2px', maxHeight: '40px' }}
      />
    )}
    <span>
      {withMoreContent && <Label>{label}</Label>}
      <strong>{value}</strong> {auxText}
    </span>
  </NameCellWrapper>
)

NameCell.propTypes = {
  ...RegularCell.propTypes,
  auxText: PropTypes.string,
  withImages: PropTypes.bool,
}

NameCell.defaultProps = {
  ...RegularCell.defaultProps,
  auxText: null,
  withImages: false,
}

// -webkit-text-size-adjust - for mobile safari (https://stackoverflow.com/a/5540312)
export const RowInfoWrapper = styled.div`
  padding-bottom: 18px;
  padding-right: 20px;
  line-height: 1.7;
  -webkit-text-size-adjust: 100%;
`
