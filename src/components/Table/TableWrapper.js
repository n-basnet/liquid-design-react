import styled, { css } from 'styled-components'

import { getTableAuxComponentClassName } from '~/components/Table/tableIcons'
import { SIZES } from '~/components/Table/utils'
import { CHECKBOX_CLASSNAMES } from '~/elements/Checkbox'

const getCheckboxTranslateOffset = size => {
  switch (size) {
    case SIZES.small:
      return '27px, 0px'
    default:
      return '22px, 0px'
  }
}
const getArrowTranslateOffset = size => {
  switch (size) {
    case SIZES.small:
      return '23px, -2px'
    default:
      return '22px, -2px'
  }
}
const getTransformOffset = (type, size) =>
  ({
    Checkbox: getCheckboxTranslateOffset,
    Arrow: getArrowTranslateOffset,
  }[type](size))

const CheckboxClassName = getTableAuxComponentClassName('Checkbox')
const ArrowClassName = getTableAuxComponentClassName('Arrow')

export default styled.table`
  position: relative;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 14px;

  ${props => css`
    background-color: ${props.theme.colors.white.base};

    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: ${props.theme.colors.white.base};
    };

    td,
    th {
      vertical-align: top;
      .${CheckboxClassName} {
        transform: translate(${getTransformOffset('Checkbox', props.size)});
      }
      .${ArrowClassName} {
        transform: translate(${getTransformOffset('Arrow', props.size)});

        height: 20px;
      }
    }

    tr[disabled] {
      .${ArrowClassName} svg {
        fill: ${props.theme.colors.sensitiveGrey.darker};
      }
    }

    tbody tr:not([disabled]) {
      &:hover {
        .${CHECKBOX_CLASSNAMES.BASE} svg {
          fill: ${props.theme.colors.primary.base};
        }
      }
    }
    .${CHECKBOX_CLASSNAMES.UNCHECKED}:not(.${CHECKBOX_CLASSNAMES.HOVER}) svg {
      fill: ${props.theme.colors.sensitiveGrey.darker};
    }
  `};
`
