import styled, { css } from 'styled-components'

import { media } from '~/utils/styling'
import { INPUT_CLASSNAME } from '~/components/aux/Input'
import { TEXT_FIELD_CLASSNAMES } from '~/elements/TextField'
import { ICON_CLASSNAME } from '~/elements/Icon'

export const DatePickerWrapper = styled.section`
  position: relative;
`

export const InputWrapper = styled.section`
  display: flex;
  .${TEXT_FIELD_CLASSNAMES.BASE} {
    width: 120px;
    margin-right: 9px;
    &:first-child {
      margin-right: 10px;
    }
    label {
      ${props =>
    props.disabled &&
        css`
          opacity: 0.5;
        `};
    }
    .${INPUT_CLASSNAME} {
      ${media.max.phone`
        font-size: 14px;
      `};
    }
  }
  .${ICON_CLASSNAME} {
    top: 36px;
    ${props =>
    props.disabled &&
      css`
        cursor: not-allowed;
      `};
  }
`

export const CalendarContainer = styled.section`
  position: absolute;
  z-index: 1;
  top: 68px;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`
