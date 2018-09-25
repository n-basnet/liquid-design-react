import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import RcSlider from 'rc-slider'

import SliderWrapper from '~/components/Slider/SliderWrapper'
import Handle from '~/components/Slider/Handle'
import { Tooltip } from '~/components/Slider/Tooltip'
import { SliderMax, SliderMin, SliderButton } from '~/components/Slider/SliderRanges'
import { Glyph } from '~/elements/Icon'
import Label from '~/elements/Label'

class Slider extends PureComponent {
  static propTypes = {
    defaultValue: PropTypes.number,
    disabled: PropTypes.bool,
    withIcon: PropTypes.bool,
    label: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    defaultValue: 50,
    disabled: false,
    withIcon: false,
    label: null,
    max: 100,
    min: 0,
    step: 1,
    value: null,
    onChange: null,
  }

  state = {
    value: this.props.defaultValue,
  }

  decreaseValue = () => {
    this.state.value > this.props.min &&
      this.setState(prevState => ({
        value: this.state.value - this.props.step,
      }))
  }

  increaseValue = () => {
    this.state.value < this.props.max &&
      this.setState(prevState => ({
        value: this.state.value + this.props.step,
      }))
  }

  updateValue = value =>
    this.setState({ value }, () => {
      this.props.onChange && this.props.onChange(value)
    })

  render() {
    const { defaultValue, disabled, withIcon, min, max, label, step } = this.props
    let { value } = this.state
    if (this.props.value !== null) {
      value = this.props.value
    }

    return (
      <Fragment>
        {label && <Label style={{ opacity: disabled && 0.5 }}>{label}</Label>}
        <SliderWrapper disabled={disabled}>
          <SliderMin disabled={disabled} withIcon={withIcon}>
            {withIcon ? (
              <SliderButton
                disabled={disabled}
                withIcon={withIcon}
                onClick={disabled ? null : this.decreaseValue}
              >
                <Glyph
                  disabled={disabled}
                  color={disabled ? 'sensitiveGrey.darker' : 'primary.base'}
                  size={24}
                  name={'minus'}
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
            <Tooltip value={value}>{value}</Tooltip>
          </RcSlider>
          <SliderMax disabled={disabled} withIcon={withIcon}>
            {withIcon ? (
              <SliderButton
                disabled={disabled}
                withIcon={withIcon}
                onClick={disabled ? null : this.increaseValue}
              >
                <Glyph
                  color={disabled ? 'sensitiveGrey.darker' : 'primary.base'}
                  size={24}
                  name={'plus'}
                  style={{ marginBottom: '-2px', marginLeft: '-5px' }}
                />
              </SliderButton>
            ) : (
              <label>{max}</label>
            )}
          </SliderMax>
        </SliderWrapper>
      </Fragment>
    )
  }
}

export default Slider
