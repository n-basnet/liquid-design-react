import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { isTouchDevice } from '~/utils/featureDetects'

const Line = styled.div`
  pointer-events: none;
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: ${props => props.theme.colors.primary.base};
  opacity: ${props => (props.isVisible ? 1 : 0)};
`

export default (WrappedComponent, props) => {
  if (isTouchDevice()) {
    return WrappedComponent
  }
  return class HoverLine extends PureComponent {
    static propTypes = {
      hideLine: PropTypes.bool,
      max: PropTypes.number,
      lineStyle: PropTypes.object,
    }
    static defaultProps = {
      hideLine: false,
      max: null,
      lineStyle: {},
      ...props,
    }
    state = {
      position: 0,
      isInHoverRange: false,
      min: 0,
      max: 0,
    }
    componentDidMount() {
      document.addEventListener('scroll', this.recomputeState)
      setTimeout(this.recomputeState, 1)
    }
    componentWillUnmount() {
      document.removeEventListener('scroll', this.recomputeState)
    }
    recomputeState = () => {
      const { top, height } = this.containerRef.getBoundingClientRect()
      const { max } = this.props
      this.setState({
        min: top,
        max: max || top + height,
      })
    }
    handleMouseMove = e => {
      const { min, max } = this.state
      const position = e.clientY - min
      this.setState({
        position: Math.min(position, max),
        // hide if in padding area
        isInHoverRange: position >= 0,
      })
    }
    handleMouseEnter = () => {
      this.setState({ isInHoverRange: true })
      document.addEventListener('mousemove', this.handleMouseMove)
    }
    handleMouseLeave = () => {
      this.setState({ isInHoverRange: false })
      document.removeEventListener('mousemove', this.handleMouseMove)
    }
    render() {
      const { hideLine, lineStyle } = this.props
      const { position, isInHoverRange } = this.state
      return (
        <div
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          ref={v => {
            this.containerRef = v
          }}
        >
          <WrappedComponent {...this.props} />
          <Line
            isVisible={hideLine ? false : isInHoverRange}
            style={{ ...lineStyle, top: `${position}px` }}
          />
        </div>
      )
    }
  }
}
