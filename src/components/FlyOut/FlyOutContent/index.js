import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Segment, { SegmentWrapper } from '../../../components/FlyOut/Segment'
import {
  flyOutPropTypes,
  flyOutDefaultProps,
} from '../../../components/FlyOut/propTypes'
import Ellipsis from '../../../components/misc/Ellipsis'
import attachClassName from '../../../components/misc/hoc/attachClassName'

const FlyOutContentWrapper = styled.div`
  overflow: hidden;
  ${props => css`
    border-radius: ${props.theme.borderRadius};
  `};
`

class FlyOutContent extends PureComponent {
  static propTypes = { ...flyOutPropTypes, getRef: PropTypes.func }
  static defaultProps = { ...flyOutDefaultProps, getRef: null }
  render() {
    const { name, options, getRef, ...props } = this.props
    return (
      <FlyOutContentWrapper ref={getRef} {...props}>
        <SegmentWrapper isHeadline>
          <Ellipsis>{name}</Ellipsis>
        </SegmentWrapper>
        {options.map((option, i) => (
          <Segment
            depthIndex={1}
            isTopLevel
            isLast={i === options.length - 1}
            {...option}
            key={i}
          />
        ))}
      </FlyOutContentWrapper>
    )
  }
}

const { Component } = attachClassName(FlyOutContent)

export default Component
