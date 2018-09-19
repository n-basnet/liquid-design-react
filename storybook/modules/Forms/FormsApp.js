import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { getTextKnob } from '../../helpers'
import { action } from '@storybook/addon-actions'

import { TextField, Headline, Checkbox, Button } from '~'
import { CHECKBOX_CLASSNAMES } from '~/elements/Checkbox'
import { BUTTON_CLASSNAME } from '~/elements/Button'
import { HEADLINE_CLASSNAME } from '~/elements/Headline'
import Dropdown, { DROPDOWN_CLASSNAME } from '~/elements/Dropdown'
import FlexRowsWrapper from './FlexRowsWrapper'
import ProfileFormPart from './ProfileFormPart'
import { media } from '~/utils/styling'

const FormAppContainer = styled.div`
  .${HEADLINE_CLASSNAME}--H2 {
    margin-bottom: 45px;
  }
  input,
  textarea {
    font-size: 16px;
  }
  .${DROPDOWN_CLASSNAME} {
    min-width: 0;
    width: 100%;
    margin-bottom: 20px;
  }
`

const BottomSectionWrapper = FlexRowsWrapper.extend`
  margin-top: 5px;
  align-items: center;
  > div {
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
      margin-left: -3px;
    }
    .${CHECKBOX_CLASSNAMES.UNCHECKED} svg {
      fill: ${props.theme.colors.sensitiveGrey.darker};
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
    <FormAppContainer>
      <Headline type='H2'>{getTextKnob({ defaultText: headerText })}</Headline>

      {isProfile && <ProfileFormPart fieldProps={fieldProps} />}

      <FlexRowsWrapper>
        {fields.map(({ type, ...field }, i) => {
          if (type === 'select') {
            return (
              <div key={i}>
                <Dropdown {...field} />
              </div>
            )
          } else {
            return (
              <TextField key={i} style={field.style} {...fieldProps} {...field} type={field.type} />
            )
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
            <Button size='big' appearance='ghost' label='Cancel' onClick={action('click cancel')} />
            <Button label={acceptButtonText} onClick={action('click accept')} />
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
