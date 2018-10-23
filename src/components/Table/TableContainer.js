import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { TABLE_PAGINATION_CLASSNAME } from '~/components/TablePagination'

const widthFromProps = props =>
  props.width
    ? css`
        width: ${props.width};
      `
    : css`
        opacity: 0;
      `

const TableContainerWrapper = styled.div`
  max-width: 100%;
  ${widthFromProps};
  overflow-x: scroll;
  overflow-y: hidden;
  .${TABLE_PAGINATION_CLASSNAME} {
    position: relative;
    z-index: 1;
  }
`

export default class TableContainer extends PureComponent {
  static propTypes = {
    width: PropTypes.number,
  }
  static defaultProps = {
    width: null,
  }
  state = {
    resetWidth: false,
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  handleWindowResize = () => {
    // a fairly ugly hack to recompute table width
    this.setState({ resetWidth: true }, () => {
      setTimeout(() => this.setState({ resetWidth: false }), 100)
    })
  }

  render() {
    const { width, ...props } = this.props
    const { resetWidth } = this.state
    return (
      <TableContainerWrapper
        width={resetWidth || isNaN(width) ? 'auto' : `${width}px`}
        {...props}
      />
    )
  }
}
