import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css, withTheme } from 'styled-components'
import { withResizeDetector } from 'react-resize-detector'
import cx from 'classnames'

import { Glyph, ICON_CLASSNAME } from '~/elements/Icon'
import { getGlyphName, getColor } from '~/components/StepProgressBar/helpers'
import { getClassName } from '~/components/misc/hoc/attachClassName'
import { cursorValue } from '~/utils/styling'

const STEP_PROGRESS_BAR_CLASSNAME = getClassName({ name: 'StepProgressBar' })
export const ICON_SIZE = 29
export const CONNECTOR_HEIGHT = 2

const MainContainer = styled.div`
  ${props =>
    props.hide &&
    css`
      opacity: 0;
    `};
`

const IndicatorsWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: -8px;
  ${props => css`
    width: calc(100% - ${props.sidePadding}px);
  `};
`

const StepsWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  ${props => css`
    .${ICON_CLASSNAME}[disabled] {
      cursor: not-allowed;
    }
  `};
`

const Connector = styled.div`
  position: relative;
  flex: 1;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: ${ICON_SIZE / 2 - CONNECTOR_HEIGHT / 2}px;
    height: ${CONNECTOR_HEIGHT}px;
    width: 100%;
    ${props => css`
      opacity: ${props.disabled ? 0.8 : 1};
      background-color: ${getColor(props)};
    `};
  }
`

export const SingleStepNameWrapper = styled.div`
  ${props => css`
    width: ${props.stepWidth}%;
    ${cursorValue({ ...props, defaultValue: props.onClick ? 'pointer' : 'default' })};
    opacity: ${props.disabled ? 0.3 : props.comingUp ? 0.4 : 1};
  `};
  padding-left: 5px;
  padding-right: 5px;
  font-size: 12px;
  text-align: center;
`

@withTheme
export class StepProgressBar extends PureComponent {
  static propTypes = {
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        disabled: PropTypes.bool,
      })
    ).isRequired,
    current: PropTypes.number,
    onUpdate: PropTypes.func,
    disabled: PropTypes.bool,
    /** from `react-resize-detector` */
    width: PropTypes.number,
    className: PropTypes.string,
  }
  static defaultProps = {
    current: 0,
    onUpdate: undefined,
    disabled: false,
    width: null,
    className: null,
  }
  getUpdateHandler = index => () => this.props.onUpdate(index)
  getStepState = index => {
    const { current } = this.props
    return {
      done: current > index,
      current: current === index,
      comingUp: current < index,
    }
  }
  getStepProps = (step, i) => {
    const { onUpdate, disabled } = this.props
    const isDisabled = step.disabled || disabled
    return {
      onClick: isDisabled || !onUpdate ? null : this.getUpdateHandler(i),
      disabled: isDisabled,
    }
  }
  render() {
    const { steps, width, className, current, onUpdate, ...props } = this.props
    const stepPixelWidth = width / steps.length
    const sidePadding = width && stepPixelWidth - ICON_SIZE
    return (
      <MainContainer
        // until width is updated, hide element
        hide={!sidePadding}
        {...props}
        className={cx(className, STEP_PROGRESS_BAR_CLASSNAME)}
      >
        <IndicatorsWrapper sidePadding={sidePadding}>
          <StepsWrapper>
            {steps.map((step, i) => {
              const stepProps = this.getStepProps(step, i)
              const stepState = this.getStepState(i)
              const nextStepState = this.getStepState(i + 1)
              return (
                <Fragment key={`icon-${i}`}>
                  <Glyph
                    name={getGlyphName(stepState)}
                    size={ICON_SIZE}
                    color={getColor({
                      ...props,
                      comingUp: stepState.comingUp,
                      disabled: stepProps.disabled,
                    })}
                    {...stepProps}
                  />
                  {i < steps.length - 1 && (
                    <Connector comingUp={nextStepState.comingUp} disabled={stepProps.disabled} />
                  )}
                </Fragment>
              )
            })}
          </StepsWrapper>
        </IndicatorsWrapper>
        <StepsWrapper>
          {steps.map((step, i) => {
            const stepState = this.getStepState(i)
            return step.name ? (
              <SingleStepNameWrapper
                key={`name-${i}`}
                stepWidth={100 / steps.length}
                {...stepState}
                {...this.getStepProps(step, i)}
              >
                {step.name}
              </SingleStepNameWrapper>
            ) : null
          })}
        </StepsWrapper>
      </MainContainer>
    )
  }
}

export default withResizeDetector(StepProgressBar)
