import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SVG from 'svg.js'
import uniqid from 'uniqid'
import cx from 'classnames'
import styled from 'styled-components'

import { Glyph, ICON_CLASSNAME } from '../../elements/Icon'
import { getClassName } from '../../components/misc/hoc/attachClassName'
import {
  SVG_VIEWPORT_WIDTH,
  SVG_GRADIENT_COLORS,
} from '../../elements/Bowl/consts'
import { getSVGFillCoordinates } from '../../elements/Bowl/helpers'

const MAIN_SVG_CLASSNAME = getClassName({ name: 'BowlMainElement' })
const BOWL_CLASSNAME = getClassName({ name: 'Bowl' })

const BowlWrapper = styled.div`
  display: inline-block;
  position: relative;
  &,
  .${MAIN_SVG_CLASSNAME} {
    max-width: 100%;
    height: auto;
  }
  .${ICON_CLASSNAME} {
    position: absolute;
    left: 0;
    right: 0;
    top: -4px;
    bottom: 0;
    width: 20%;
    height: 15%;
    margin: auto;
    svg {
      width: 100%;
      height: 100%;
    }
  }
`

export default class Bowl extends PureComponent {
  static propTypes = {
    animationDuration: PropTypes.number,
    percent: PropTypes.number,
    width: PropTypes.number,
    className: PropTypes.string,
  }

  static defaultProps = {
    animationDuration: 3000,
    percent: 50,
    width: 180,
    className: null,
  }

  state = {
    key: 0,
  }

  componentDidMount() {
    this.runAnimation()
  }

  componentDidUpdate({ percent }) {
    if (percent !== this.props.percent) {
      this.reset()
    }
  }

  reset = () => this.setState({ key: uniqid() }, this.runAnimation)
  runAnimation() {
    if (!SVG || this.displayIcon() || process.env.STORYBOOK_LOKI_BUILD) {
      // SVG does not work without browser (in test env)
      return
    }
    this.animating = false
    const { animationDuration, percent } = this.props

    /** Animation settings */
    const amplitude = 1.3
    const period = 300
    const xspacing = 10
    const dx = ((2 * Math.PI) / period) * xspacing
    const pathGen = x =>
      0.7 * Math.sin(4 * x + 7) +
      2 * Math.sin(0.9 * x) +
      3 * Math.sin(2 * x) +
      1 * Math.sin(2 * x + 7)
    const theta = Math.random() * 10
    // decrease factor to increase the chance to reverse direction
    const reverseDirection = Math.random() > 0.2
    let speed = Math.random() - 0.5
    // decrease the divisor to increase the speed
    speed = speed > 0 ? (speed + 0.3) / 40 : (speed - 0.3) / 40

    // this binds the SVG fill to the ref group
    this.svgFillEl = SVG(this.fillWrapperRef)

    /** Fill group */
    const svgGroup = this.svgFillEl.group()
    svgGroup.transform({ x: 0, y: 0 })

    /** Mask */
    const mask = svgGroup.mask()
    const MASK_PADDING = 18
    const maskCircle = this.svgFillEl
      .circle(SVG_VIEWPORT_WIDTH - MASK_PADDING * 2)
      .move(MASK_PADDING, MASK_PADDING)
    mask.add(maskCircle)
    mask.fill('#fff')

    /** Group with mask */
    const fillGroup = svgGroup.group()
    fillGroup.maskWith(mask)

    /** Group with transform */
    this.transformGroup = fillGroup.group()
    this.minimumHeight = MASK_PADDING * 0.8
    this.totalHeight = 1.6 - this.minimumHeight / 100
    this.transformGroup.transform({ y: this.minimumHeight })

    /** Begin transition to percent animation */
    if (animationDuration) {
      this.animating = true
      this.transformGroup
        .animate(animationDuration)
        .transform({
          y: this.minimumHeight + (100 - percent) * this.totalHeight,
        })
        .afterAll(() => (this.animating = false))
    } else {
      this.transformGroup.transform({
        y: this.minimumHeight + (100 - percent) * this.totalHeight,
      })
    }

    /** Back fill path */
    this.backFill = this.transformGroup.path(
      getSVGFillCoordinates(0.5, xspacing, amplitude, pathGen, dx),
    )

    if (this.animating) {
      this.animate(
        'backFill',
        theta,
        pathGen,
        amplitude,
        xspacing,
        dx,
        reverseDirection ? -speed : speed,
      )
    }

    // use gradient as a workaround to support color morphing
    this.backFill.fill(
      this.createGradient(
        SVG_GRADIENT_COLORS.full.back[0],
        SVG_GRADIENT_COLORS.full.back[0],
        'back',
      ),
    )

    /** Front fill path */
    this.frontFill = this.transformGroup.path(
      getSVGFillCoordinates(1.8, xspacing, amplitude, pathGen, dx),
    )

    if (this.animating) {
      this.animate(
        'frontFill',
        theta + 0.3,
        pathGen,
        amplitude,
        xspacing,
        dx,
        speed * 2,
      )
    }

    this.frontFill.fill(
      this.createGradient(
        SVG_GRADIENT_COLORS.full.front[0],
        SVG_GRADIENT_COLORS.full.front[1],
        'front',
      ),
    )

    /** Reflection circles group */
    const circleGroupX = SVG_VIEWPORT_WIDTH * 0.6
    const circleGroupY = SVG_VIEWPORT_WIDTH * 0.3
    const circleMaskGroup = svgGroup.group()
    const circleTransformGroup = circleMaskGroup.group()
    circleTransformGroup.transform({ x: circleGroupX, y: circleGroupY })
    circleMaskGroup.maskWith(mask)
    this.circle1 = circleTransformGroup
      .circle(10)
      .fill({ color: '#fff', opacity: 0.3 })
      .move(8, 8)
    this.circle2 = circleTransformGroup
      .circle(6)
      .fill({ color: '#fff', opacity: 0.3 })
    if (animationDuration) {
      this.animating = true
      circleTransformGroup
        .animate(animationDuration)
        .transform({
          y: circleGroupY + (100 - percent),
        })
        .afterAll(() => {
          // move circles out of view if they don't fit
          if (percent < 25) {
            circleTransformGroup
              .animate(1000)
              .transform({
                y: SVG_VIEWPORT_WIDTH,
              })
              .afterAll(() => {
                this.animating = false
              })
          } else {
            this.animating = false
          }
        })

      this.animateCircles()
    } else {
      circleTransformGroup.transform({
        y:
          percent < 42
            ? circleGroupY + (142 - percent)
            : circleGroupY + (100 - percent),
      })
    }
  }

  getColor = (type, position) => {
    const { percent } = this.props

    let level = 'full'
    if (percent < 10) {
      level = 'warning'
    } else if (percent < 25) {
      level = 'low'
    } else if (percent < 60) {
      level = 'medium'
    }

    return new SVG.Color(SVG_GRADIENT_COLORS[level][type][position]).toHex()
  }

  createGradient = (firstColor, secondColor, fillType) => {
    let s1
    let s2
    const { animationDuration } = this.props

    const gradient = this.svgFillEl.gradient('radial', stop => {
      s1 = stop.at(0, firstColor)
      s2 = stop.at(1, secondColor)
    })
    gradient
      .from(0.8, 0)
      .to(0, 0)
      .radius(1.5)

    if (animationDuration) {
      s1.animate(animationDuration).update(0, this.getColor(fillType, 0))
      s2.animate(animationDuration).update(1, this.getColor(fillType, 1))
    } else {
      s1.update(0, this.getColor(fillType, 0))
      s2.update(1, this.getColor(fillType, 1))
    }

    return gradient
  }

  animate = (
    fill,
    theta,
    pathGen,
    amplitude,
    xspacing,
    dx,
    speed,
    offset = 0,
  ) => {
    const coords = `M0 ${pathGen(theta) * amplitude + offset}`
    theta += speed

    const plotCoords = getSVGFillCoordinates(
      theta,
      xspacing,
      amplitude,
      pathGen,
      dx,
      coords,
    )

    this[fill].plot(plotCoords)

    if (this.animating) {
      window.requestAnimationFrame(() =>
        this.animate(
          fill,
          theta,
          pathGen,
          amplitude,
          xspacing,
          dx,
          speed,
          offset,
        ),
      )
    } else {
      this[fill]
        .animate(this.props.animationDuration / 3, '>')
        .plot(
          getSVGFillCoordinates(
            fill === 'frontFill' ? 1.8 : 0.5,
            xspacing,
            amplitude,
            pathGen,
            dx,
          ),
        )
    }
  }

  animateCircles = () => {
    this.circle1.animate(1000).transform({
      x: Math.random() * 5,
      y: Math.random() * 5,
    })
    this.circle2
      .animate(1000)
      .transform({
        x: Math.random() * 5,
        y: Math.random() * 5,
      })
      .after(() => {
        if (this.animating) {
          this.animateCircles()
        }
      })
  }

  displayIcon = () => this.props.percent === 0

  render() {
    const {
      animationDuration,
      percent,
      width,
      className,
      ...props
    } = this.props
    const { key } = this.state

    return (
      <BowlWrapper
        className={cx(className, BOWL_CLASSNAME)}
        {...props}
        key={key}
      >
        <svg
          width={`${width}px`}
          viewBox={`0 0 ${SVG_VIEWPORT_WIDTH} ${SVG_VIEWPORT_WIDTH}`}
          className={MAIN_SVG_CLASSNAME}
        >
          <g ref={wrapper => (this.fillWrapperRef = wrapper)}>
            <g>
              <circle
                stroke="#DFDFE8"
                strokeWidth={4}
                cx={SVG_VIEWPORT_WIDTH / 2}
                cy={SVG_VIEWPORT_WIDTH / 2}
                r={SVG_VIEWPORT_WIDTH / 2 - 10}
                fill="#fff"
              />
            </g>
          </g>
        </svg>
        {this.displayIcon() && <Glyph name="warningM" color="richRed.base" />}
      </BowlWrapper>
    )
  }
}
