import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { SIZES, CELL_MIN_WIDTH } from '~/components/Table/utils'

const getPadding = size =>
  ({
    [SIZES.small]: '6px 25px',
    [SIZES.medium]: '14px 25px',
    [SIZES.large]: '21px 25px',
  }[size])

const TdWrapper = styled.td`
  > div {
    min-width: ${CELL_MIN_WIDTH};
  }
  ${props => css`
    padding: ${props.isInfoCell ? '15px 24px' : getPadding(props.size)};
  `};
  ${props =>
    props.isInfoCell &&
    // prevents expanding the table columns on IE/Edge
    css`
      width: 0;
    `};
`

const TableCell = ({ children, ...props }) => (
  <TdWrapper {...props}>
    <div>{children}</div>
  </TdWrapper>
)

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TableCell
