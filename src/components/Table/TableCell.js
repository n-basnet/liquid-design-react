import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { media } from '~/utils/styling'
import { getTableCellYPadding, CELL_MIN_WIDTH } from '~/components/Table/utils'

const TdWrapper = styled.td`
  > div {
    min-width: ${CELL_MIN_WIDTH};
  }
  ${props => css`
    padding: ${props.isInfoCell ? '15px 24px' : `${getTableCellYPadding(props.size)} 25px`};
  `};
  ${media.max.phone`
    padding-right: 5px;
  `};
  ${props =>
    props.isInfoCell &&
    // prevents a bug in Chrome
    css`
      width: 100%;
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
