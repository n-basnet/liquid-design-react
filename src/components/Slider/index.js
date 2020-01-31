import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import RcSlider from 'rc-slider'
import cx from 'classnames'

import SliderWrapper from '../../components/Slider/SliderWrapper'
import Handle from '../../components/Slider/Handle'
import { Tooltip } from '../../components/Slider/Tooltip'
import {
  SliderMax,
  SliderMin,
  SliderButton,
} from '../../components/Slider/SliderRanges'
import { Glyph } from '../../elements/Icon'
import Label from '../../elements/Label'
import { getClassName } from '../../components/misc/hoc/attachClassName'

const SLIDER_CLASSNAME = getClassName({ name: 'Slider' })

class Slider extends PureComponent {
  static propTypes = {
    defaultValue: PropTypes.number,
    disabled: PropTypes.bool,
    /** Display plus and minus buttons */
    withButtons: PropTypes.bool,
    /** Label to display above the slider */
    label: PropTypes.node,
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    /** For external control */
    value: PropTypes.number,
    onChange: PropTypes.func,
    className: PropTypes.string,
  }

  static defaultProps = {
    defaultValue: 0,
    disabled: false,
    withButtons: false,
    label: null,
    max: 100,
    min: 0,
    step: 1,
    value: null,
    onChange: null,
    className: null,
  }

  state = {
    value: this.props.value || this.props.defaultValue,
  }

  decreaseValue = () => {
    this.state.value > this.props.min &&
      this.setState(
        ({ value }) => ({
          value: value - this.props.step,
        }),
        () => {
          this.props.onChange && this.props.onChange(this.state.value)
        },
      )
  }

  increaseValue = () => {
    this.state.value < this.props.max &&
      this.setState(
        ({ value }) => ({
          value: value + this.props.step,
        }),
        () => {
          this.props.onChange && this.props.onChange(this.state.value)
        },
      )
  }

  updateValue = value =>
    this.setState({ value }, () => {
      this.props.onChange && this.props.onChange(value)
    })

  render() {
    const {
      defaultValue,
      disabled,
      withButtons,
      min,
      max,
      label,
      step,
      className,
      ...props
    } = this.props
    let { value } = this.state
    if (this.props.value !== null) {
      value = this.props.value
    }

    return (
      <div className={cx(className, SLIDER_CLASSNAME)} {...props}>
        {label && <Label style={{ opacity: disabled && 0.5 }}>{label}</Label>}
        <SliderWrapper disabled={disabled}>
          <SliderMin disabled={disabled} withButtons={withButtons}>
            {withButtons ? (
              <SliderButton
                disabled={disabled}
                withButtons={withButtons}
                onClick={disabled ? null : this.decreaseValue}
              >
                <Glyph
                  disabled={disabled}
                  color={disabled ? 'sensitiveGrey.darkest' : 'primary.base'}
                  size={24}
                  name="minus"
                  style={{ marginRight: '-5px', marginBottom: '-1.5px' }}
                />
              </SliderButton>
            ) : (
              <label>{min}</label>
            )}
          </SliderMin>
          <RcSlider
            defaultValue={defaultValue}
            disabled={disabled}
            max={max}
            min={min}
            handle={Handle}
            step={step}
            value={value}
            onChange={this.updateValue}
          >
            <Tooltip max={max} value={value}>
              {value}
            </Tooltip>
          </RcSlider>
          <SliderMax disabled={disabled} withButtons={withButtons}>
            {withButtons ? (
              <SliderButton
                disabled={disabled}
                withButtons={withButtons}
                onClick={disabled ? null : this.increaseValue}
              >
                <Glyph
                  color={disabled ? 'sensitiveGrey.darkest' : 'primary.base'}
                  size={24}
                  name="plus"
                  style={{ marginBottom: '-2px', marginLeft: '-5px' }}
                />
              </SliderButton>
            ) : (
              <label>{max}</label>
            )}
          </SliderMax>
        </SliderWrapper>
      </div>
    )
  }
}

export default Slider
