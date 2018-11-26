import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import { VictoryTooltip } from 'victory'
import { isMobile } from '~/components/LineGraph/utils'
import { GLOBAL_CSS_PREFIX } from '~/utils/consts'
import COLORS from '~/utils/consts/colors'

const { WHITE } = COLORS

const FLYOUT_CORNER_RADIUS = 7

export class CustomFlyout extends PureComponent {
  static defaultEvents = VictoryTooltip.defaultEvents
  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    dx: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }

  static defaultProps = {
    x: undefined,
    y: undefined,
    dx: undefined,
    width: undefined,
    height: undefined,
  }

  newWidth = () => Math.max(this.props.width + (isMobile() ? 25 : 50), 90)

  newHeight = () => this.props.height + 20

  render() {
    const { x, y, dx, height } = this.props
    const id = `${GLOBAL_CSS_PREFIX}LineGraphFlyout--${uniqid()}`

    return (
      <g transform='translate(0 -18)'>
        <defs>
          <filter width={this.newWidth()} height={this.newHeight() - 20} id={id}>
            <feOffset result='offOut' in='SourceAlpha' dx='0' dy='9' />
            <feGaussianBlur result='blurOut' in='offOut' stdDeviation={6} />
            <feComponentTransfer>
              <feFuncA type='linear' slope={0.2} />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
        </defs>
        <rect
          style={{ fill: WHITE }}
          x={x + dx - this.newWidth() * 0.5}
          y={y - height - 15}
          width={this.newWidth()}
          height={this.newHeight()}
          rx={FLYOUT_CORNER_RADIUS}
          ry={FLYOUT_CORNER_RADIUS}
          filter={`url(#${id})`}
        />
        <polygon points={`${x - 15}, ${y} ${x}, ${y + 15} ${x + 15}, ${y}`} fill={WHITE} />
      </g>
    )
  }
}
