import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Segment, { SegmentWrapper } from '~/components/FlyOut/Segment'
import { flyOutPropTypes, flyOutDefaultProps } from '~/components/FlyOut/propTypes'
import Ellipsis from '~/components/aux/Ellipsis'

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
    const { name, options, getRef } = this.props
    return (
      <FlyOutContentWrapper innerRef={getRef}>
        <SegmentWrapper isHeadline>
          <Ellipsis>{name}</Ellipsis>
        </SegmentWrapper>
        {options.map((option, i) => (
          <Segment sumIndex={i} isTopLevel isLast={i === options.length - 1} {...option} key={i} />
        ))}
      </FlyOutContentWrapper>
    )
  }
}

export default FlyOutContent
