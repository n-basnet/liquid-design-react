import styled from 'styled-components'
import rcSliderStyles from 'rc-slider/assets/index.css'

const SliderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-top: 27px;
  ${rcSliderStyles};
  .rc-slider {
    cursor: ${props => props.disabled && 'not-allowed'};
  }
  .rc-slider-track {
    height: 2px;
    background: ${props => props.theme.colors.primary.base};
  }
  .rc-slider-rail {
    height: 2px;
    background: ${props => props.theme.colors.sensitiveGrey.darkest};
  }
  .rc-slider-disabled {
    background-color: transparent;
    opacity: 0.5;
    .rc-slider-track {
      background: ${props => props.theme.colors.sensitiveGrey.darkest};
    }
  }
  .rc-slider-handle:focus {
    box-shadow: none;
  }
`

export default SliderWrapper
