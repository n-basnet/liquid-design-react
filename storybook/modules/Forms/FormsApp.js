import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { action } from '@storybook/addon-actions'

import { Headline, Checkbox, Button } from '~'
import { CHECKBOX_CLASSNAMES } from '~/elements/Checkbox'
import { BUTTON_CLASSNAME } from '~/elements/Button'
import { HEADLINE_CLASSNAME } from '~/elements/Headline'
import { ICON_CLASSNAME } from '~/elements/Icon'
import { INPUT_CLASSNAME } from '~/components/misc/Input'
import TextField, { TEXT_FIELD_CLASSNAMES } from '~/elements/TextField'
import Dropdown, { DROPDOWN_CLASSNAME } from '~/elements/Dropdown'
import DatePicker, { DATE_PICKER_CLASSNAMES } from '~/modules/DatePicker'
import { YEAR_INPUT_CLASSNAME } from '~/modules/Calendar'
import { media, nonTouchDevicesHoverStyles } from '~/utils/styling'

import FlexRowsWrapper from './FlexRowsWrapper'
import ProfileFormPart from './ProfileFormPart'
import { MOBILE_BREAKPOINT, FIELD_TYPES } from './consts'
import { getTextKnob, Fragment } from '../../helpers'

const FormAppContainer = styled.div`
  .${HEADLINE_CLASSNAME}--H2 {
    margin-bottom: 45px;
  }
  .${TEXT_FIELD_CLASSNAMES.BASE} {
    margin-bottom: 20px;
  }
  .${INPUT_CLASSNAME}:not(.${YEAR_INPUT_CLASSNAME}) {
    input,
    textarea {
      font-size: 16px;
      padding: 8px 15px 10px;
    }
  }
  .${DROPDOWN_CLASSNAME} {
    min-width: 0;
    width: 100%;
    margin-bottom: 23px;
    margin-top: 6px;
  }
  .${DATE_PICKER_CLASSNAMES.CALENDAR_CONTAINER} {
    right: 34px;
    ${media.max.phone`
      right: 20px;
    `};
    .${TEXT_FIELD_CLASSNAMES.BASE} {
      margin-bottom: 0;
    }
  }
  .${DATE_PICKER_CLASSNAMES.INPUT_WRAPPER} {
    > section:first-child {
      justify-content: space-between;
    }
    .${INPUT_CLASSNAME}:not(.${YEAR_INPUT_CLASSNAME}) input {
      font-size: 14px;
      padding-bottom: 14px;
      padding-top: 7px;
      ${props =>
    !props.grey &&
        css`
          background-color: ${props.theme.colors.white.base};
        `}
    }
    .${TEXT_FIELD_CLASSNAMES.BASE} {
      width: 100%;
      ${media.customMin(MOBILE_BREAKPOINT)`
        width: 190px;
      `};
    }
    .${ICON_CLASSNAME} {
      top: 30px;
      right: -13px;
      &,
      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
`

const BottomSectionWrapper = styled(FlexRowsWrapper)`
  align-items: center;
  > div {
    margin-bottom: 20px;
    &:last-child {
      text-align: right;
    }
  }
  .${BUTTON_CLASSNAME} {
    &:first-child {
      margin-right: 12px;
    }
    &:last-child {
      margin-right: 2px;
    }
  }
  ${props => css`
    .${CHECKBOX_CLASSNAMES.BASE} {
      margin-top: 2px;
    }
    .${CHECKBOX_CLASSNAMES.UNCHECKED} {
      svg {
        fill: ${props.theme.colors.sensitiveGrey.darker};
      }
      ${nonTouchDevicesHoverStyles(`
        svg {
          fill: ${props.theme.colors.primary.base};
        }
      `)}
    }
  `};
`

const CheckboxTextWrapper = styled.div`
  display: flex;
  align-items: center;
  a {
    font-size: 14px;
    padding-left: 2px;
    text-decoration: none;
    color: inherit;
  }
  ${media.customMax(350)`
    a {
      height: 30px;
      line-height: 34px;
    }
    a,
    label {
      font-size: 12px;
    }
  `};
`

const FormApp = ({
  acceptButtonText,
  checkboxText,
  checkboxLinkText,
  headerText,
  onWhiteBackground,
  isProfile,
  fields,
}) => {
  const fieldProps = {
    grey: onWhiteBackground,
  }
  return (
    <FormAppContainer grey={onWhiteBackground}>
      <Headline type='H2'>{getTextKnob({ defaultText: headerText })}</Headline>

      {isProfile && <ProfileFormPart fieldProps={fieldProps} />}

      <FlexRowsWrapper>
        {fields.map(({ type, ...field }, i) => {
          if (type === FIELD_TYPES.DATE_PICKER) {
            return <DatePicker key={i} withCalendar />
          } else if (type === FIELD_TYPES.SELECT) {
            return (
              <div key={i}>
                <Dropdown {...field} />
              </div>
            )
          } else {
            return <TextField key={i} style={field.style} {...fieldProps} {...field} type={type} />
          }
        })}
      </FlexRowsWrapper>

      <BottomSectionWrapper>
        <div>
          {checkboxText && (
            <CheckboxTextWrapper>
              <Checkbox label={checkboxText} />
              {checkboxLinkText && <a href=''>{checkboxLinkText}</a>}
            </CheckboxTextWrapper>
          )}
        </div>
        <div>
          <Fragment>
            <Button size='big' appearance='ghost' onClick={action('click cancel')}>
              Cancel
            </Button>
            <Button onClick={action('click accept')}>{acceptButtonText}</Button>
          </Fragment>
        </div>
      </BottomSectionWrapper>
    </FormAppContainer>
  )
}

FormApp.propTypes = {
  fields: PropTypes.array.isRequired,
  acceptButtonText: PropTypes.string,
  headerText: PropTypes.string,
  checkboxText: PropTypes.string,
  checkboxLinkText: PropTypes.string,
  onWhiteBackground: PropTypes.bool,
  isProfile: PropTypes.bool,
}
FormApp.defaultProps = {
  acceptButtonText: null,
  headerText: null,
  checkboxText: null,
  checkboxLinkText: null,
  onWhiteBackground: false,
  isProfile: false,
}

export default FormApp
